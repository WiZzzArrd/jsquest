import PixelButton from '@/components/PixelButton';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-undertale-dark flex items-center justify-center p-4">
      <div className="pixel-border bg-undertale-panel p-8 max-w-2xl text-center">
        <h1 className="text-4xl mb-6 text-undertale-yellow font-bold">
          * CodeQuest *
        </h1>
        <div className="text-left space-y-4 mb-8 text-white">
          <p>* You find yourself in a mysterious digital realm...</p>
          <p>* The only way to escape is by mastering the ancient art of JavaScript.</p>
          <p>* Each level you complete brings you closer to becoming a true programmer.</p>
          <p>* Will you accept this challenge, brave adventurer?</p>
        </div>
        <PixelButton 
          onClick={onStart} 
          variant="warning"
          className="text-xl px-8 py-4"
        >
          START ADVENTURE
        </PixelButton>
      </div>
    </div>
  );
}
