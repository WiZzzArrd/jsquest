import { useQuery } from "@tanstack/react-query";
import type { UserDifficultyProfile } from "@shared/schema";

interface DifficultyProfileData {
  currentDifficultyLevel: number;
  adaptiveMultiplier: number;
  successRate: number;
  averageAttempts: number;
  averageCompletionTime: number;
}

export function useDifficultyProfile() {
  const { data: profile, isLoading } = useQuery<DifficultyProfileData>({
    queryKey: ['/api/difficulty-profile'],
    retry: false,
  });

  const getDifficultyLabel = (level: number): string => {
    switch (level) {
      case 1: return "Beginner";
      case 2: return "Easy";
      case 3: return "Normal";
      case 4: return "Challenging";
      case 5: return "Expert";
      default: return "Normal";
    }
  };

  const getDifficultyColor = (level: number): string => {
    switch (level) {
      case 1: return "text-green-600";
      case 2: return "text-blue-600";
      case 3: return "text-yellow-600";
      case 4: return "text-orange-600";
      case 5: return "text-red-600";
      default: return "text-yellow-600";
    }
  };

  const getPerformanceFeedback = (profile: DifficultyProfileData | undefined): string => {
    if (!profile) return "Keep practicing to see your performance analysis!";
    
    const { successRate, averageAttempts, currentDifficultyLevel } = profile;
    
    if (successRate >= 80 && averageAttempts <= 1.5) {
      return "Excellent! You're mastering the challenges. Difficulty has been increased.";
    } else if (successRate >= 60 && averageAttempts <= 2) {
      return "Great progress! You're doing well with current challenges.";
    } else if (successRate >= 40) {
      return "Good work! Continue practicing to improve your skills.";
    } else if (successRate >= 20) {
      return "Keep trying! Difficulty has been reduced to help you learn better.";
    } else {
      return "Don't give up! Challenges are now easier to help you build confidence.";
    }
  };

  return {
    profile,
    isLoading,
    getDifficultyLabel,
    getDifficultyColor,
    getPerformanceFeedback,
  };
}