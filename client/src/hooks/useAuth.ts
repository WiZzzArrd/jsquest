import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { InsertUser, LoginUser } from '@shared/schema';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const TOKEN_KEY = 'codequest_token';
const USER_KEY = 'codequest_user';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(TOKEN_KEY);
      const savedUser = localStorage.getItem(USER_KEY);
      const user = savedUser ? JSON.parse(savedUser) : null;
      return {
        token,
        user,
        isAuthenticated: !!(token && user)
      };
    }
    return {
      token: null,
      user: null,
      isAuthenticated: false
    };
  });

  const queryClient = useQueryClient();

  // Verify token and get user data
  const { isLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      if (!authState.token) {
        return null;
      }
      
      try {
        const userData = await apiRequest('GET', '/api/auth/me');
        setAuthState(prev => ({ 
          ...prev, 
          user: userData, 
          isAuthenticated: true 
        }));
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        return userData;
      } catch (error) {
        // Token is invalid, clear it
        logout();
        return null;
      }
    },
    enabled: !!authState.token && !authState.user,
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
      
      setAuthState({
        token: data.token,
        user: data.user,
        isAuthenticated: true
      });
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
      
      setAuthState({
        token: data.token,
        user: data.user,
        isAuthenticated: true
      });
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
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false
    });
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('codequest_progress');
    queryClient.clear();
  };

  return {
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
    login,
    register,
    logout,
  };
}