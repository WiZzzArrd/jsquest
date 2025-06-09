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
      <div className="pixel-border bg-undertale-panel p-4 md:p-6 max-w-md w-full mx-2">
        <div className="text-center">
          <div className="text-2xl md:text-3xl mb-3 md:mb-4">⚠️</div>
          <h2 className="text-lg md:text-xl font-bold text-undertale-red mb-3 md:mb-4">
            ПРЕДУПРЕЖДЕНИЕ
          </h2>
          <p className="text-white mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
            Вы действительно хотите сбросить весь прогресс?
          </p>
          <p className="text-undertale-yellow mb-4 md:mb-6 text-xs md:text-sm">
            ⚡ Все пройденные уровни будут заблокированы<br/>
            ⚡ Вам придется начать сначала<br/>
            ⚡ Это действие нельзя отменить
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <PixelButton
              onClick={onClose}
              variant="secondary"
              disabled={isLoading}
              className="text-xs md:text-sm"
            >
              ОТМЕНА
            </PixelButton>
            <PixelButton
              onClick={onConfirm}
              variant="danger"
              disabled={isLoading}
              className="text-xs md:text-sm"
            >
              {isLoading ? "СБРОС..." : "СБРОСИТЬ ПРОГРЕСС"}
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
}