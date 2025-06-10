import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from './useAuth';
import type { Progress } from '@shared/schema';

const STORAGE_KEY = 'codequest_progress';

// Local storage functions
const getLocalProgress = (): Record<number, boolean> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const setLocalProgress = (progress: Record<number, boolean>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage errors
  }
};

export function useProgress() {
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuth();

  const { data: progress = {} } = useQuery({
    queryKey: ['/api/progress', isAuthenticated, user?.id],
    queryFn: async () => {
      if (!isAuthenticated) {
        return getLocalProgress();
      }
      
      try {
        const response = await fetch('/api/progress', { 
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('codequest_token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Convert array to object for easier lookup
          const progressMap: Record<number, boolean> = {};
          data.forEach((p: Progress) => {
            progressMap[p.levelId] = Boolean(p.completed);
          });
          return progressMap;
        }
        // Fallback to local storage
        return getLocalProgress();
      } catch (error) {
        console.error('Failed to fetch progress:', error);
        // Fallback to local storage
        return getLocalProgress();
      }
    },
    staleTime: 0,
    enabled: true,
  });

  const completeLevelMutation = useMutation({
    mutationFn: async (levelId: number) => {
      if (!isAuthenticated || !user) {
        // Fallback to local storage for unauthenticated users
        const currentProgress = getLocalProgress();
        const newProgress = { ...currentProgress, [levelId]: true };
        setLocalProgress(newProgress);
        return newProgress;
      }

      try {
        await apiRequest('POST', '/api/progress', {
          userId: user.id,
          levelId,
          completed: true,
          score: 100
        });
        
        // Update local state immediately
        return { ...progress, [levelId]: true };
      } catch (error) {
        console.error('Failed to save progress:', error);
        // Fallback to local storage
        const currentProgress = getLocalProgress();
        const newProgress = { ...currentProgress, [levelId]: true };
        setLocalProgress(newProgress);
        return newProgress;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/progress', isAuthenticated, user?.id], (old: Record<number, boolean> = {}) => {
        if (data && typeof data === 'object') {
          return data;
        }
        return { ...old };
      });
      // Also invalidate to refetch from server
      queryClient.invalidateQueries({ queryKey: ['/api/progress', isAuthenticated, user?.id] });
    },
  });

  const isLevelCompleted = (levelId: number): boolean => {
    return progress[levelId] || false;
  };

  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 0) return true;
    return isLevelCompleted(levelId - 1);
  };

  const getCompletedCount = (): number => {
    return Object.values(progress).filter(Boolean).length;
  };

  const resetProgressMutation = useMutation({
    mutationFn: async () => {
      if (!isAuthenticated) {
        // Fallback to local storage for unauthenticated users
        setLocalProgress({});
        return {};
      }

      try {
        await apiRequest('DELETE', '/api/progress');
        return {};
      } catch (error) {
        console.error('Failed to reset progress:', error);
        // Fallback to local storage
        setLocalProgress({});
        return {};
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(['/api/progress', isAuthenticated, user?.id], {});
      queryClient.invalidateQueries({ queryKey: ['/api/progress', isAuthenticated, user?.id] });
    },
  });

  const completeLevel = (levelId: number) => {
    completeLevelMutation.mutate(levelId);
  };

  const resetProgress = () => {
    resetProgressMutation.mutate();
  };

  const refreshProgress = () => {
    queryClient.invalidateQueries({ queryKey: ['/api/progress', isAuthenticated, user?.id] });
  };

  return {
    progress,
    isLevelCompleted,
    isLevelUnlocked,
    getCompletedCount,
    completeLevel,
    resetProgress,
    refreshProgress,
    isLoading: completeLevelMutation.isPending,
    isResetting: resetProgressMutation.isPending,
  };
}
