import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StartScreen from "@/pages/StartScreen";
import LevelScreen from "@/pages/LevelScreen";
import GameScreen from "@/pages/GameScreen";
import QuizScreen from "@/pages/QuizScreen";
import AuthScreen from "@/pages/AuthScreen";

type Screen = 'start' | 'levels' | 'game' | 'quiz' | 'auth';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  
  // Simple local authentication state for demo
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleStart = () => {
    setCurrentScreen('levels');
  };

  const handleStartQuiz = () => {
    if (!isAuthenticated) {
      setCurrentScreen('auth');
      return;
    }
    setCurrentScreen('quiz');
  };

  const handleSelectLevel = (levelId: number) => {
    // Check if level requires authentication
    if (levelId >= 2 && !isAuthenticated) {
      setCurrentScreen('auth');
      return;
    }
    
    setCurrentLevel(levelId);
    setCurrentScreen('game');
  };

  const handleAuth = () => {
    setCurrentScreen('auth');
  };

  const handleAuthSuccess = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData.user);
    setCurrentScreen('levels');
  };

  const handleBackToLevels = () => {
    setCurrentScreen('levels');
  };

  const handleBackToStart = () => {
    setCurrentScreen('start');
  };

  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1;
    if (nextLevel < 30) { // We have 30 levels (0-29)
      setCurrentLevel(nextLevel);
    } else {
      setCurrentScreen('levels');
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      {currentScreen === 'start' && (
        <StartScreen 
          onStart={handleStart} 
          onStartQuiz={handleStartQuiz}
          onAuth={handleAuth}
          isAuthenticated={isAuthenticated}
          username={user?.username}
        />
      )}
      {currentScreen === 'levels' && (
        <LevelScreen 
          onSelectLevel={handleSelectLevel} 
          onStartQuiz={handleStartQuiz}
          onAuth={handleAuth}
          isAuthenticated={isAuthenticated}
          username={user?.username}
        />
      )}
      {currentScreen === 'game' && (
        <GameScreen 
          levelId={currentLevel}
          onBack={handleBackToLevels}
          onNextLevel={handleNextLevel}
        />
      )}
      {currentScreen === 'quiz' && (
        <QuizScreen onBack={handleBackToLevels} />
      )}
      {currentScreen === 'auth' && (
        <AuthScreen 
          onAuthSuccess={handleAuthSuccess}
          onBack={handleBackToStart}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
