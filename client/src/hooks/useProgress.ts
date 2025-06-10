import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from './useAuth';
import type { Progress } from '@shared/schema';

const STORAGE_KEY = 'codequest_progress';

// Local storage functions with user-specific keys
const getLocalProgress = (userId?: number): Record<number, boolean> => {
  try {
    const key = userId ? `${STORAGE_KEY}_${userId}` : `${STORAGE_KEY}_anonymous`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const setLocalProgress = (progress: Record<number, boolean>, userId?: number) => {
  try {
    const key = userId ? `${STORAGE_KEY}_${userId}` : `${STORAGE_KEY}_anonymous`;
    localStorage.setItem(key, JSON.stringify(progress));
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
        // For anonymous users, return empty progress always
        return {};
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
        return getLocalProgress(user?.id);
      } catch (error) {
        console.error('Failed to fetch progress:', error);
        // Fallback to local storage
        return getLocalProgress(user?.id);
      }
    },
    staleTime: 0,
    enabled: true,
  });

  const completeLevelMutation = useMutation({
    mutationFn: async (levelId: number) => {
      if (!isAuthenticated || !user) {
        // For unauthenticated users, don't save progress
        console.log('Progress not saved - user not authenticated');
        return {};
      }

      try {
        console.log('Saving progress for user:', user.id, 'level:', levelId);
        await apiRequest('POST', '/api/progress', {
          levelId,
          completed: true
        });
        
        // Update local state immediately
        const currentProgress = queryClient.getQueryData(['/api/progress', isAuthenticated, user?.id]) as Record<number, boolean> || {};
        console.log('Updated progress:', { ...currentProgress, [levelId]: true });
        return { ...currentProgress, [levelId]: true };
      } catch (error) {
        console.error('Failed to save progress:', error);
        // Fallback to local storage
        const currentProgress = getLocalProgress(user?.id);
        const newProgress = { ...currentProgress, [levelId]: true };
        setLocalProgress(newProgress, user?.id);
        return newProgress;
      }
    },
    onSuccess: (data) => {
      if (isAuthenticated && user) {
        queryClient.setQueryData(['/api/progress', isAuthenticated, user?.id], (old: Record<number, boolean> = {}) => {
          if (data && typeof data === 'object') {
            return data;
          }
          return { ...old };
        });
        // Also invalidate to refetch from server
        queryClient.invalidateQueries({ queryKey: ['/api/progress', isAuthenticated, user?.id] });
      }
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
        // For unauthenticated users, no progress to reset
        return {};
      }

      try {
        await apiRequest('DELETE', '/api/progress');
        return {};
      } catch (error) {
        console.error('Failed to reset progress:', error);
        // Fallback to local storage
        setLocalProgress({}, user?.id);
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
