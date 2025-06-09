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
            * Choose Your Path *
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-white">Progress:</span>
            <ProgressBar current={completedCount} total={totalLevels} />
            <span className="text-undertale-green">
              {completedCount}/{totalLevels}
            </span>
          </div>
        </div>
      </div>

      {/* Level Map Container */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
        <div className="flex items-center space-x-12 h-full min-w-max px-8">
          {levels.map((level, index) => (
            <div key={level.id} className="flex items-center space-x-12">
              <div
                className={getLevelNodeClass(level.id)}
                onClick={() => handleLevelClick(level.id)}
              >
                {getLevelNodeContent(level.id)}
              </div>
              {index < levels.length - 1 && (
                <div className="w-8 h-1 bg-white"></div>
              )}
            </div>
          ))}
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
              START LEVEL
            </PixelButton>
            <PixelButton onClick={hideSelectedLevel} variant="secondary">
              BACK
            </PixelButton>
          </div>
        </div>
      )}
    </div>
  );
}
