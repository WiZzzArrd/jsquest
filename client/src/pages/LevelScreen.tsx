import { useState, useEffect } from "react";
import PixelButton from "@/components/PixelButton";
import ProgressBar from "@/components/ProgressBar";
import ResetProgressModal from "@/components/ResetProgressModal";
import { levels } from "@/data/levels";
import { useProgress } from "@/hooks/useProgress";

interface LevelScreenProps {
  onSelectLevel: (levelId: number) => void;
  onStartQuiz: () => void;
  onAuth: () => void;
  onLogout?: () => void;
  isAuthenticated: boolean;
  username?: string;
}

export default function LevelScreen({
  onSelectLevel,
  onStartQuiz,
  onAuth,
  onLogout,
  isAuthenticated,
  username,
}: LevelScreenProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const {
    isLevelCompleted,
    isLevelUnlocked,
    getCompletedCount,
    resetProgress,
    refreshProgress,
    isResetting,
  } = useProgress();

  // Обновляем прогресс при загрузке экрана
  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  const completedCount = getCompletedCount();
  const totalLevels = levels.length;

  const handleLevelClick = (levelId: number) => {
    // All levels require authentication
    if (!isAuthenticated) {
      onAuth();
      return;
    }

    if (isLevelUnlocked(levelId)) {
      setSelectedLevel(levelId);
    }
  };

  const handleStartLevel = () => {
    if (selectedLevel !== null) {
      onSelectLevel(selectedLevel);
    }
  };

  const hideSelectedLevel = () => {
    setSelectedLevel(null);
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowResetModal(false);
  };

  const getLevelNodeClass = (levelId: number) => {
    if (!isAuthenticated) {
      return "level-node auth-required";
    } else if (isLevelCompleted(levelId)) {
      return "level-node completed";
    } else if (isLevelUnlocked(levelId)) {
      return "level-node current";
    } else {
      return "level-node locked";
    }
  };

  const getLevelNodeContent = (levelId: number) => {
    if (!isAuthenticated) {
      return (
        <div>
          <div className="text-2xl">🔐</div>
          <div>{levelId + 1}</div>
        </div>
      );
    } else if (isLevelCompleted(levelId)) {
      return (
        <div>
          <div className="text-2xl">✓</div>
          <div>{levelId + 1}</div>
        </div>
      );
    } else if (isLevelUnlocked(levelId)) {
      return (
        <div>
          <div className="text-2xl">⚡</div>
          <div>{levelId + 1}</div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="text-2xl">🔒</div>
          <div>{levelId + 1}</div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-undertale-dark flex flex-col overflow-hidden">
      {/* Header */}
      <div className="pixel-border bg-undertale-panel p-2 sm:p-4 m-1 sm:m-2 md:m-4 flex-shrink-0">
        <div className="flex flex-col space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <h2 className="text-lg sm:text-xl md:text-2xl text-undertale-yellow font-bold text-center sm:text-left">
              * Выберите свой путь *
            </h2>
            {isAuthenticated && onLogout && (
              <button
                onClick={onLogout}
                className="text-undertale-red hover:text-red-400 text-xs sm:text-sm pixel-border px-2 py-1 bg-undertale-panel self-center sm:self-auto"
              >
                Выйти
              </button>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="text-xs sm:text-sm text-white">Прогресс:</span>
              <ProgressBar current={completedCount} total={totalLevels} className="flex-1 max-w-32 sm:max-w-none" />
              <span className="text-undertale-green text-xs sm:text-sm">
                {completedCount}/{totalLevels}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-1 sm:gap-2 sm:flex sm:flex-row">
              <PixelButton
                onClick={onStartQuiz}
                variant="warning"
                className="text-xs px-2 py-1"
              >
                БЛИЦ-ТЕСТ
              </PixelButton>
              <PixelButton
                onClick={refreshProgress}
                variant="primary"
                className="text-xs px-2 py-1"
              >
                ОБНОВИТЬ
              </PixelButton>
              <PixelButton
                onClick={() => setShowResetModal(true)}
                variant="danger"
                className="text-xs px-2 py-1"
                disabled={isResetting || completedCount === 0}
              >
                {isResetting ? "СБРОС..." : "СБРОСИТЬ"}
              </PixelButton>
            </div>
          </div>
        </div>
      </div>

      {/* Level Map Container */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4">
        {/* Группа 1: Базовые уровни (0-9) */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h3 className="text-sm sm:text-base md:text-lg text-undertale-cyan mb-2 sm:mb-3 md:mb-4 font-bold text-center sm:text-left">
            🟡 Основы JavaScript
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1 sm:gap-2 md:gap-4 justify-items-center">
            {levels.slice(0, 10).map((level) => (
              <div
                key={level.id}
                className={getLevelNodeClass(level.id)}
                onClick={() => handleLevelClick(level.id)}
              >
                {getLevelNodeContent(level.id)}
              </div>
            ))}
          </div>
        </div>

        {/* Группа 2: Средние уровни (10-19) */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h3 className="text-sm sm:text-base md:text-lg text-undertale-purple mb-2 sm:mb-3 md:mb-4 font-bold text-center sm:text-left">
            🟠 Средний уровень
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1 sm:gap-2 md:gap-4 justify-items-center">
            {levels.slice(10, 20).map((level) => (
              <div
                key={level.id}
                className={getLevelNodeClass(level.id)}
                onClick={() => handleLevelClick(level.id)}
              >
                {getLevelNodeContent(level.id)}
              </div>
            ))}
          </div>
        </div>

        {/* Группа 3: Продвинутые уровни (20-29) */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-base md:text-lg text-undertale-red mb-3 md:mb-4 font-bold text-center md:text-left">
            🔴 Продвинутый уровень
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-4 justify-items-center">
            {levels.slice(20, 30).map((level) => (
              <div
                key={level.id}
                className={getLevelNodeClass(level.id)}
                onClick={() => handleLevelClick(level.id)}
              >
                {getLevelNodeContent(level.id)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Level Info Panel */}
      {selectedLevel !== null && (
        <div className="pixel-border bg-undertale-panel p-3 md:p-4 m-2 md:m-4">
          <h3 className="text-lg md:text-xl mb-2 text-undertale-cyan font-bold text-center md:text-left">
            {levels[selectedLevel].name}
          </h3>
          <p className="mb-4 text-white text-sm md:text-base text-center md:text-left">
            {levels[selectedLevel].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <PixelButton
              onClick={handleStartLevel}
              variant="success"
              className="flex-1 sm:flex-none"
            >
              НАЧАТЬ УРОВЕНЬ
            </PixelButton>
            <PixelButton
              onClick={hideSelectedLevel}
              variant="secondary"
              className="flex-1 sm:flex-none"
            >
              НАЗАД
            </PixelButton>
          </div>
        </div>
      )}

      <ResetProgressModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleResetProgress}
        isLoading={isResetting}
      />
    </div>
  );
}
