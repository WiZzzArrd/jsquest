import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { UpdateProgress } from "@shared/schema";

interface PerformanceMetrics {
  attempts: number;
  timeSpent: number;
  hintsUsed: number;
  completed: boolean;
  score: number;
}

export function usePerformanceTracker(levelId: number) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    attempts: 1,
    timeSpent: 0,
    hintsUsed: 0,
    completed: false,
    score: 0,
  });

  const startTimeRef = useRef<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const queryClient = useQueryClient();

  // Start tracking when component mounts
  useEffect(() => {
    startTimeRef.current = new Date();
    
    // Update time spent every second
    timerRef.current = setInterval(() => {
      if (startTimeRef.current && !metrics.completed) {
        const timeElapsed = Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000);
        setMetrics(prev => ({ ...prev, timeSpent: timeElapsed }));
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [levelId, metrics.completed]);

  const updateMetricsMutation = useMutation({
    mutationFn: async (metricsData: UpdateProgress) => {
      const response = await fetch(`/api/progress/${levelId}/metrics`, {
        method: "PUT",
        body: JSON.stringify(metricsData),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token') || ''}`,
        },
      });
      if (!response.ok) throw new Error('Failed to update metrics');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/difficulty-profile'] });
    },
  });

  const incrementAttempts = () => {
    setMetrics(prev => ({ ...prev, attempts: prev.attempts + 1 }));
  };

  const incrementHints = () => {
    setMetrics(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
  };

  const completeLevel = (score: number = 100) => {
    const finalTimeSpent = startTimeRef.current 
      ? Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000)
      : metrics.timeSpent;

    const finalMetrics = {
      ...metrics,
      completed: true,
      score,
      timeSpent: finalTimeSpent,
    };

    setMetrics(finalMetrics);

    // Stop the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Send metrics to server
    updateMetricsMutation.mutate(finalMetrics);

    return finalMetrics;
  };

  const resetMetrics = () => {
    setMetrics({
      attempts: 1,
      timeSpent: 0,
      hintsUsed: 0,
      completed: false,
      score: 0,
    });
    startTimeRef.current = new Date();
  };

  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    metrics,
    incrementAttempts,
    incrementHints,
    completeLevel,
    resetMetrics,
    formatTime,
    isUpdating: updateMetricsMutation.isPending,
  };
}