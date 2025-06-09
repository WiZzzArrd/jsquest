import PixelButton from './PixelButton';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  levelName: string;
  isLastLevel?: boolean;
}

export default function SuccessModal({ 
  isOpen, 
  onClose, 
  onNext, 
  levelName, 
  isLastLevel = false 
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="pixel-border bg-undertale-panel p-8 max-w-md text-center animate-level-unlock">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-2xl mb-4 text-undertale-yellow">
          * Level Complete! *
        </h3>
        <p className="mb-6">
          Excellent work, brave programmer! You've mastered {levelName}.
        </p>
        <div className="mb-6">
          <div className="text-undertale-green">XP Gained: +100</div>
          <div className="text-undertale-cyan">Achievement: {levelName} Master</div>
        </div>
        <div className="flex gap-4 justify-center">
          {!isLastLevel ? (
            <PixelButton onClick={onNext} variant="success">
              CONTINUE ADVENTURE
            </PixelButton>
          ) : (
            <PixelButton onClick={onClose} variant="warning">
              CONGRATULATIONS!
            </PixelButton>
          )}
          <PixelButton onClick={onClose} variant="secondary">
            BACK TO LEVELS
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
