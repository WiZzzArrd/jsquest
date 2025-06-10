import { useState, useEffect, createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { InsertUser, LoginUser } from '@shared/schema';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: LoginUser) => Promise<void>;
  register: (userData: InsertUser) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = 'codequest_token';
const USER_KEY = 'codequest_user';

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem(USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const queryClient = useQueryClient();

  // Verify token and get user data
  const { isLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      if (!token) {
        setUser(null);
        return null;
      }
      
      try {
        const userData = await apiRequest('GET', '/api/auth/me');
        setUser(userData);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        return userData;
      } catch (error) {
        // Token is invalid, clear it
        logout();
        return null;
      }
    },
    enabled: !!token,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (userData: LoginUser) => {
      return await apiRequest('POST', '/api/auth/login', userData);
    },
    onSuccess: (data) => {
      console.log('Login success, setting user:', data.user);
      
      // Clear all existing local progress data for all users
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('codequest_progress')) {
          localStorage.removeItem(key);
        }
      });
      
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      
      // Clear all cached queries and fetch fresh data
      queryClient.clear();
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: InsertUser) => {
      return await apiRequest('POST', '/api/auth/register', userData);
    },
    onSuccess: (data) => {
      // Clear all existing local progress data for all users
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('codequest_progress')) {
          localStorage.removeItem(key);
        }
      });
      
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      
      // Clear all cached queries and fetch fresh data
      queryClient.clear();
    },
  });

  const login = async (userData: LoginUser) => {
    return loginMutation.mutateAsync(userData);
  };

  const register = async (userData: InsertUser) => {
    return registerMutation.mutateAsync(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('codequest_progress');
    queryClient.clear();
  };

  // Initialize user from localStorage on mount
  useEffect(() => {
    if (token && !user) {
      // Force re-fetch user data if we have token but no user
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    }
  }, [token, user, queryClient]);

  return {
    user,
    token,
    isAuthenticated: !!user,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
    login,
    register,
    logout,
  };
}