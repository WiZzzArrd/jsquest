import PixelButton from '@/components/PixelButton';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-undertale-dark flex items-center justify-center p-4">
      <div className="pixel-border bg-undertale-panel p-8 max-w-2xl text-center">
        <h1 className="text-4xl mb-6 text-undertale-yellow font-bold">
          * КодКвест *
        </h1>
        <div className="text-left space-y-4 mb-8 text-white">
          <p>* Вы оказались в загадочном цифровом мире...</p>
          <p>* Единственный способ выбраться — овладеть древним искусством JavaScript.</p>
          <p>* Каждый пройденный уровень приближает вас к званию настоящего программиста.</p>
          <p>* Примете ли вы этот вызов, отважный искатель приключений?</p>
        </div>
        <PixelButton 
          onClick={onStart} 
          variant="warning"
          className="text-xl px-8 py-4"
        >
          НАЧАТЬ ПРИКЛЮЧЕНИЕ
        </PixelButton>
      </div>
    </div>
  );
}
