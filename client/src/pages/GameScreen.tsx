import { useState } from 'react';
import PixelButton from '@/components/PixelButton';
import SuccessModal from '@/components/SuccessModal';
import { levels } from '@/data/levels';
import { useProgress } from '@/hooks/useProgress';

interface GameScreenProps {
  levelId: number;
  onBack: () => void;
  onNextLevel: () => void;
}

export default function GameScreen({ levelId, onBack, onNextLevel }: GameScreenProps) {
  const [code, setCode] = useState(levels[levelId]?.initialCode || '');
  const [console, setConsole] = useState<string[]>(['Console output will appear here...']);
  const [showSuccess, setShowSuccess] = useState(false);
  const { completeLevel, isLevelCompleted } = useProgress();

  const level = levels[levelId];
  
  if (!level) {
    return (
      <div className="min-h-screen bg-undertale-dark flex items-center justify-center">
        <div className="text-white text-xl">Level not found</div>
      </div>
    );
  }

  const runCode = () => {
    try {
      // Simple code execution simulation
      setConsole(['Code executed successfully!']);
      
      // Simulate console.log output
      if (code.includes('console.log')) {
        setTimeout(() => {
          // Extract and simulate console.log statements
          const lines = code.split('\n');
          const consoleLogs = lines.filter(line => line.trim().includes('console.log'));
          
          if (consoleLogs.length > 0) {
            // For demo purposes, show expected output
            const outputs = [level.expectedOutput];
            setConsole(prev => [...prev, ...outputs]);
          }
        }, 500);
      }
    } catch (error) {
      setConsole([`Error: ${error}`]);
    }
  };

  const checkSolution = () => {
    // Simple solution checking logic
    const codeLines = code.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const solutionLines = level.solution.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Check if the code contains key elements of the solution
    let correctElements = 0;
    const requiredElements = solutionLines.length;
    
    solutionLines.forEach(solutionLine => {
      const hasMatch = codeLines.some(codeLine => {
        // Simple string matching - in a real implementation, you'd use AST parsing
        return codeLine.includes(solutionLine.replace(/\s+/g, ' ')) || 
               codeLine.replace(/\s+/g, ' ') === solutionLine.replace(/\s+/g, ' ');
      });
      if (hasMatch) correctElements++;
    });
    
    const isCorrect = correctElements >= Math.floor(requiredElements * 0.8); // 80% match threshold
    
    if (isCorrect) {
      setConsole(['✓ Solution correct! Well done!']);
      setTimeout(() => {
        if (!isLevelCompleted(levelId)) {
          completeLevel(levelId);
        }
        setShowSuccess(true);
      }, 1000);
    } else {
      setConsole(['✗ Solution incorrect. Check your syntax and try again.']);
    }
  };

  const getHint = () => {
    const randomHint = level.hints[Math.floor(Math.random() * level.hints.length)];
    setConsole([randomHint]);
  };

  const handleNextLevel = () => {
    setShowSuccess(false);
    onNextLevel();
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onBack();
  };

  const isLastLevel = levelId === levels.length - 1;

  return (
    <div className="min-h-screen bg-undertale-dark flex">
      {/* Tutorial Panel */}
      <div className="w-1/4 p-4">
        <div className="pixel-border bg-undertale-panel h-full p-4 flex flex-col">
          <h3 className="text-lg mb-4 text-undertale-yellow border-b border-white pb-2 font-bold">
            * Tutorial *
          </h3>
          <div className="text-sm space-y-3 overflow-y-auto flex-1">
            <div className="whitespace-pre-wrap text-white">
              {level.tutorial}
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Task Description */}
        <div className="pixel-border bg-undertale-panel p-4 mb-4">
          <h2 className="text-xl mb-2 text-undertale-yellow font-bold">
            {level.taskTitle}
          </h2>
          <p className="mb-4 text-white">
            {level.taskDescription}
          </p>
          
          {/* Expected Output */}
          <div className="bg-black border-2 border-undertale-green p-3 text-sm">
            <p className="text-undertale-green mb-1 font-bold">Expected Output:</p>
            <code className="text-white whitespace-pre-wrap">{level.expectedOutput}</code>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 mb-4">
          <div className="code-editor h-full p-4 text-sm">
            <div className="mb-2 text-undertale-green">// Fix the errors in this code:</div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-5/6 bg-transparent text-white resize-none outline-none font-mono"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Input Panel */}
        <div className="pixel-border bg-undertale-panel p-4">
          <div className="flex items-center space-x-4 mb-4">
            <PixelButton onClick={runCode} variant="success">
              RUN CODE
            </PixelButton>
            <PixelButton onClick={checkSolution} variant="warning">
              CHECK SOLUTION
            </PixelButton>
            <PixelButton onClick={getHint} variant="primary">
              HINT
            </PixelButton>
            <PixelButton onClick={onBack} variant="secondary">
              BACK
            </PixelButton>
          </div>
          
          {/* Output Console */}
          <div className="bg-black border-2 border-gray-600 p-3 h-24 overflow-y-auto text-sm">
            {console.map((line, index) => (
              <div key={index} className={`
                ${line.includes('✓') ? 'text-undertale-green' : ''}
                ${line.includes('✗') || line.includes('Error') ? 'text-undertale-red' : ''}
                ${line.includes('💡') ? 'text-undertale-cyan' : ''}
                ${!line.includes('✓') && !line.includes('✗') && !line.includes('Error') && !line.includes('💡') ? 'text-gray-400' : ''}
              `}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        onNext={handleNextLevel}
        levelName={level.name}
        isLastLevel={isLastLevel}
      />
    </div>
  );
}
