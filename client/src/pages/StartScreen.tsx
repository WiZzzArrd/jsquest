import PixelButton from '@/components/PixelButton';

interface StartScreenProps {
  onStart: () => void;
  onStartQuiz: () => void;
  onAuth: () => void;
  onLogout?: () => void;
  isAuthenticated: boolean;
  username?: string;
}

export default function StartScreen({ onStart, onStartQuiz, onAuth, onLogout, isAuthenticated, username }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-undertale-dark flex items-center justify-center p-4">
      <div className="pixel-border bg-undertale-panel p-8 max-w-2xl text-center relative">
        {isAuthenticated && onLogout && (
          <button
            onClick={onLogout}
            className="absolute top-4 right-4 text-undertale-red hover:text-red-400 text-sm pixel-border px-2 py-1 bg-undertale-panel"
          >
            Выйти
          </button>
        )}
        <h1 className="text-4xl mb-6 text-undertale-yellow font-bold">
          * КодКвест *
        </h1>
        {isAuthenticated && (
          <p className="text-undertale-green text-sm mb-4">
            Добро пожаловать обратно, {username}!
          </p>
        )}
        <div className="text-left space-y-4 mb-8 text-white">
          <p>* Вы оказались в загадочном цифровом мире...</p>
          <p>* Единственный способ выбраться — овладеть древним искусством JavaScript.</p>
          <p>* Каждый пройденный уровень приближает вас к званию настоящего программиста.</p>
          <p>* Примете ли вы этот вызов, отважный искатель приключений?</p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <PixelButton 
            onClick={onStart} 
            variant="warning"
            className="text-xl px-8 py-4"
          >
            НАЧАТЬ ПРИКЛЮЧЕНИЕ
          </PixelButton>
          <div className="flex gap-4">
            <PixelButton 
              onClick={onStartQuiz} 
              variant="primary"
              className="text-lg px-6 py-3"
            >
              БЛИЦ-ТЕСТ
            </PixelButton>
            <PixelButton 
              onClick={onAuth} 
              variant="success"
              className="text-lg px-6 py-3"
            >
              {isAuthenticated ? `ПРИВЕТ, ${username}!` : 'ВХОД / РЕГИСТРАЦИЯ'}
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
}
