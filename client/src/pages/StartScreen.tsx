import PixelButton from "@/components/PixelButton";

interface StartScreenProps {
  onStart: () => void;
  onStartQuiz: () => void;
  onAuth: () => void;
  onLogout?: () => void;
  isAuthenticated: boolean;
  username?: string;
}

export default function StartScreen({
  onStart,
  onStartQuiz,
  onAuth,
  onLogout,
  isAuthenticated,
  username,
}: StartScreenProps) {
  return (
    <div className="min-h-screen bg-undertale-dark flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="pixel-border bg-undertale-panel p-4 sm:p-8 w-full max-w-2xl text-center relative my-4">
        {isAuthenticated && onLogout && (
          <button
            onClick={onLogout}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-undertale-red hover:text-red-400 text-xs sm:text-sm pixel-border px-2 py-1 bg-undertale-panel"
          >
            Выйти
          </button>
        )}
        <h1 className="text-2xl sm:text-4xl mb-4 sm:mb-6 text-undertale-yellow font-bold">
          * КодКвест *
        </h1>
        {isAuthenticated && (
          <p className="text-undertale-green text-xs sm:text-sm mb-4">
            Добро пожаловать обратно, {username}!
          </p>
        )}
        <div className="text-left space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-white text-sm sm:text-base">
          <p>* Вы оказались в загадочном цифровом мире...</p>
          <p>
            * Единственный способ выбраться — овладеть древним искусством
            JavaScript.
          </p>
          <p>
            * Каждый пройденный уровень приближает вас к званию настоящего
            программиста.
          </p>
          <p>* Примете ли вы этот вызов, отважный искатель приключений?</p>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 items-center">
          <PixelButton
            onClick={onStart}
            variant="warning"
            className="text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
          >
            НАЧАТЬ ПРИКЛЮЧЕНИЕ
          </PixelButton>
          <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
            <PixelButton
              onClick={onStartQuiz}
              variant="primary"
              className="text-sm sm:text-lg px-4 sm:px-6 py-2 sm:py-3 flex-1 sm:flex-none"
            >
              БЛИЦ-ТЕСТ
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
}
