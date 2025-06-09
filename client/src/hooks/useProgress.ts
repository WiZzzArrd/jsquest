import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
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

  const { data: progress = {} } = useQuery({
    queryKey: ['/api/progress'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/progress', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          // Convert array to object for easier lookup
          const progressMap: Record<number, boolean> = {};
          data.forEach((p: Progress) => {
            progressMap[p.levelId] = p.completed;
          });
          return progressMap;
        }
        // Fallback to local storage
        return getLocalProgress();
      } catch {
        // Fallback to local storage
        return getLocalProgress();
      }
    },
    staleTime: Infinity,
  });

  const completeLevelMutation = useMutation({
    mutationFn: async (levelId: number) => {
      try {
        await apiRequest('POST', '/api/progress', {
          userId: 'anonymous',
          levelId,
          completed: true,
          score: 100
        });
      } catch {
        // Fallback to local storage
        const currentProgress = getLocalProgress();
        const newProgress = { ...currentProgress, [levelId]: true };
        setLocalProgress(newProgress);
        return newProgress;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/progress'], (old: Record<number, boolean> = {}) => {
        if (data && typeof data === 'object') {
          return data;
        }
        return old;
      });
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
      try {
        await apiRequest('DELETE', '/api/progress');
      } catch {
        // Fallback to local storage
        setLocalProgress({});
        return {};
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(['/api/progress'], {});
    },
  });

  const completeLevel = (levelId: number) => {
    completeLevelMutation.mutate(levelId);
  };

  const resetProgress = () => {
    resetProgressMutation.mutate();
  };

  return {
    progress,
    isLevelCompleted,
    isLevelUnlocked,
    getCompletedCount,
    completeLevel,
    resetProgress,
    isLoading: completeLevelMutation.isPending,
    isResetting: resetProgressMutation.isPending,
  };
}
