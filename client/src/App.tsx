import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StartScreen from "@/pages/StartScreen";
import LevelScreen from "@/pages/LevelScreen";
import GameScreen from "@/pages/GameScreen";

type Screen = 'start' | 'levels' | 'game';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [currentLevel, setCurrentLevel] = useState<number>(0);

  const handleStart = () => {
    setCurrentScreen('levels');
  };

  const handleSelectLevel = (levelId: number) => {
    setCurrentLevel(levelId);
    setCurrentScreen('game');
  };

  const handleBackToLevels = () => {
    setCurrentScreen('levels');
  };

  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1;
    if (nextLevel < 10) { // We have 10 levels (0-9)
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
            <StartScreen onStart={handleStart} />
          )}
          {currentScreen === 'levels' && (
            <LevelScreen onSelectLevel={handleSelectLevel} />
          )}
          {currentScreen === 'game' && (
            <GameScreen 
              levelId={currentLevel}
              onBack={handleBackToLevels}
              onNextLevel={handleNextLevel}
            />
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
