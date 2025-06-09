import PixelButton from "./PixelButton";

interface ResetProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function ResetProgressModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading = false 
}: ResetProgressModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="pixel-border bg-undertale-panel p-6 max-w-md w-full">
        <div className="text-center">
          <div className="text-3xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-undertale-red mb-4">
            ПРЕДУПРЕЖДЕНИЕ
          </h2>
          <p className="text-white mb-6 leading-relaxed">
            Вы действительно хотите сбросить весь прогресс?
          </p>
          <p className="text-undertale-yellow mb-6 text-sm">
            ⚡ Все пройденные уровни будут заблокированы<br/>
            ⚡ Вам придется начать сначала<br/>
            ⚡ Это действие нельзя отменить
          </p>
          
          <div className="flex gap-4 justify-center">
            <PixelButton
              onClick={onClose}
              variant="secondary"
              disabled={isLoading}
            >
              ОТМЕНА
            </PixelButton>
            <PixelButton
              onClick={onConfirm}
              variant="danger"
              disabled={isLoading}
            >
              {isLoading ? "СБРОС..." : "СБРОСИТЬ ПРОГРЕСС"}
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
}