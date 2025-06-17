import { useDifficultyProfile } from "@/hooks/useDifficultyProfile";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Clock, RotateCcw } from "lucide-react";

export default function DifficultyIndicator() {
  const { profile, isLoading, getDifficultyLabel, getDifficultyColor, getPerformanceFeedback } = useDifficultyProfile();

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-sm">Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-sm">Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Complete more levels to see your performance analysis!</p>
        </CardContent>
      </Card>
    );
  }

  const difficultyLevel = profile.currentDifficultyLevel;
  const difficultyLabel = getDifficultyLabel(difficultyLevel);
  const difficultyColor = getDifficultyColor(difficultyLevel);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Target className="w-4 h-4" />
          Adaptive Difficulty
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Level:</span>
          <Badge variant="outline" className={difficultyColor}>
            {difficultyLabel}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Success Rate</span>
            <span className="font-medium">{profile.successRate}%</span>
          </div>
          <Progress value={profile.successRate} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-1">
            <RotateCcw className="w-3 h-3 text-gray-500" />
            <span className="text-gray-600">Avg Attempts:</span>
            <span className="font-medium">{profile.averageAttempts}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="text-gray-600">Avg Time:</span>
            <span className="font-medium">{Math.round(profile.averageCompletionTime / 60)}m</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs">
          {profile.adaptiveMultiplier > 100 ? (
            <TrendingUp className="w-3 h-3 text-red-500" />
          ) : profile.adaptiveMultiplier < 100 ? (
            <TrendingDown className="w-3 h-3 text-green-500" />
          ) : (
            <Target className="w-3 h-3 text-blue-500" />
          )}
          <span className="text-gray-700">{getPerformanceFeedback(profile)}</span>
        </div>
      </CardContent>
    </Card>
  );
}