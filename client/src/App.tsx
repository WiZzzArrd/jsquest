import { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import StartScreen from "@/pages/StartScreen";
import LevelScreen from "@/pages/LevelScreen";
import GameScreen from "@/pages/GameScreen";
import QuizScreen from "@/pages/QuizScreen";
import AuthScreen from "@/pages/AuthScreen";

type Screen = 'start' | 'levels' | 'game' | 'quiz' | 'auth';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  
  // Use centralized auth state
  const { isAuthenticated, user, logout } = useAuth();
  
  // Debug auth state
  useEffect(() => {
    console.log('App auth state changed:', { isAuthenticated, user: user?.username });
  }, [isAuthenticated, user]);

  // Clear old progress data on app load
  useEffect(() => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('codequest_progress') && key !== 'codequest_progress_anonymous') {
        localStorage.removeItem(key);
      }
    });
  }, []);

  const handleStart = () => {
    if (!isAuthenticated) {
      setCurrentScreen('auth');
    } else {
      setCurrentScreen('levels');
    }
  };

  const handleStartQuiz = () => {
    if (!isAuthenticated) {
      setCurrentScreen('auth');
      return;
    }
    setCurrentScreen('quiz');
  };

  const handleSelectLevel = (levelId: number) => {
    // All levels require authentication
    if (!isAuthenticated) {
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
    setCurrentScreen('levels');
  };

  const handleLogout = () => {
    logout();
    setCurrentScreen('start');
  };

  const handleBackToLevels = () => {
    setCurrentScreen('levels');
  };

  const handleBackToStart = () => {
    setCurrentScreen('start');
  };

  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1;
    
    // All levels require authentication
    if (!isAuthenticated) {
      setCurrentScreen('auth');
      return;
    }
    
    if (nextLevel < 30) { // We have 30 levels (0-29)
      setCurrentLevel(nextLevel);
    } else {
      setCurrentScreen('levels');
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {currentScreen === 'start' && (
        <StartScreen 
          onStart={handleStart} 
          onStartQuiz={handleStartQuiz}
          onAuth={handleAuth}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          username={user?.username}
        />
      )}
      {currentScreen === 'levels' && (
        <LevelScreen 
          onSelectLevel={handleSelectLevel} 
          onStartQuiz={handleStartQuiz}
          onAuth={handleAuth}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          username={user?.username}
        />
      )}
      {currentScreen === 'game' && (
        <GameScreen 
          levelId={currentLevel}
          onBack={handleBackToLevels}
          onNextLevel={handleNextLevel}
          isAuthenticated={isAuthenticated}
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
