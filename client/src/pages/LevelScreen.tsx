import { useState } from 'react';
import PixelButton from '@/components/PixelButton';
import ProgressBar from '@/components/ProgressBar';
import { levels } from '@/data/levels';
import { useProgress } from '@/hooks/useProgress';

interface LevelScreenProps {
  onSelectLevel: (levelId: number) => void;
}

export default function LevelScreen({ onSelectLevel }: LevelScreenProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const { isLevelCompleted, isLevelUnlocked, getCompletedCount } = useProgress();

  const completedCount = getCompletedCount();
  const totalLevels = levels.length;

  const handleLevelClick = (levelId: number) => {
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

  const getLevelNodeClass = (levelId: number) => {
    if (isLevelCompleted(levelId)) {
      return 'level-node completed';
    } else if (isLevelUnlocked(levelId)) {
      return 'level-node current';
    } else {
      return 'level-node locked';
    }
  };

  const getLevelNodeContent = (levelId: number) => {
    if (isLevelCompleted(levelId)) {
      return <div><div className="text-2xl">✓</div><div>{levelId + 1}</div></div>;
    } else if (isLevelUnlocked(levelId)) {
      return <div><div className="text-2xl">⚡</div><div>{levelId + 1}</div></div>;
    } else {
      return <div><div className="text-2xl">🔒</div><div>{levelId + 1}</div></div>;
    }
  };

  return (
    <div className="min-h-screen bg-undertale-dark flex flex-col">
      {/* Header */}
      <div className="pixel-border bg-undertale-panel p-4 m-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-undertale-yellow font-bold">
            * Выберите свой путь *
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-white">Прогресс:</span>
            <ProgressBar current={completedCount} total={totalLevels} />
            <span className="text-undertale-green">
              {completedCount}/{totalLevels}
            </span>
          </div>
        </div>
      </div>

      {/* Level Map Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Группа 1: Базовые уровни (0-9) */}
        <div className="mb-8">
          <h3 className="text-lg text-undertale-cyan mb-4 font-bold">🟡 Основы JavaScript</h3>
          <div className="flex flex-wrap gap-4">
            {levels.slice(0, 10).map((level, index) => (
              <div key={level.id} className="flex items-center">
                <div
                  className={getLevelNodeClass(level.id)}
                  onClick={() => handleLevelClick(level.id)}
                >
                  {getLevelNodeContent(level.id)}
                </div>
                {index < 9 && <div className="w-4 h-1 bg-white ml-4"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Группа 2: Средние уровни (10-19) */}
        <div className="mb-8">
          <h3 className="text-lg text-undertale-purple mb-4 font-bold">🟠 Средний уровень</h3>
          <div className="flex flex-wrap gap-4">
            {levels.slice(10, 20).map((level, index) => (
              <div key={level.id} className="flex items-center">
                <div
                  className={getLevelNodeClass(level.id)}
                  onClick={() => handleLevelClick(level.id)}
                >
                  {getLevelNodeContent(level.id)}
                </div>
                {index < 9 && <div className="w-4 h-1 bg-white ml-4"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Группа 3: Продвинутые уровни (20-29) */}
        <div className="mb-8">
          <h3 className="text-lg text-undertale-red mb-4 font-bold">🔴 Продвинутый уровень</h3>
          <div className="flex flex-wrap gap-4">
            {levels.slice(20, 30).map((level, index) => (
              <div key={level.id} className="flex items-center">
                <div
                  className={getLevelNodeClass(level.id)}
                  onClick={() => handleLevelClick(level.id)}
                >
                  {getLevelNodeContent(level.id)}
                </div>
                {index < 9 && <div className="w-4 h-1 bg-white ml-4"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Level Info Panel */}
      {selectedLevel !== null && (
        <div className="pixel-border bg-undertale-panel p-4 m-4">
          <h3 className="text-xl mb-2 text-undertale-cyan font-bold">
            {levels[selectedLevel].name}
          </h3>
          <p className="mb-4 text-white">
            {levels[selectedLevel].description}
          </p>
          <div className="flex space-x-4">
            <PixelButton onClick={handleStartLevel} variant="success">
              НАЧАТЬ УРОВЕНЬ
            </PixelButton>
            <PixelButton onClick={hideSelectedLevel} variant="secondary">
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
