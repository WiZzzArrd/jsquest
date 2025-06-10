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
      if (!token) return null;
      
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
    enabled: !!token && !user,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (userData: LoginUser) => {
      return await apiRequest('POST', '/api/auth/login', userData);
    },
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: InsertUser) => {
      return await apiRequest('POST', '/api/auth/register', userData);
    },
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
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
    queryClient.clear();
  };

  // Set up axios interceptor for token
  useEffect(() => {
    // This will be handled in the apiRequest function
  }, [token]);

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