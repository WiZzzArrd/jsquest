import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StartScreen from "@/pages/StartScreen";
import LevelScreen from "@/pages/LevelScreen";
import GameScreen from "@/pages/GameScreen";
import QuizScreen from "@/pages/QuizScreen";

type Screen = 'start' | 'levels' | 'game' | 'quiz';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [currentLevel, setCurrentLevel] = useState<number>(0);

  const handleStart = () => {
    setCurrentScreen('levels');
  };

  const handleStartQuiz = () => {
    setCurrentScreen('quiz');
  };

  const handleSelectLevel = (levelId: number) => {
    setCurrentLevel(levelId);
    setCurrentScreen('game');
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="h-screen w-screen overflow-hidden">
          {currentScreen === 'start' && (
            <StartScreen onStart={handleStart} onStartQuiz={handleStartQuiz} />
          )}
          {currentScreen === 'levels' && (
            <LevelScreen onSelectLevel={handleSelectLevel} onStartQuiz={handleStartQuiz} />
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
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
