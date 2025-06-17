import { useState, useEffect } from 'react';
import PixelButton from '@/components/PixelButton';
import SuccessModal from '@/components/SuccessModal';
import { levels } from '@/data/levels';
import { useProgress } from '@/hooks/useProgress';

interface GameScreenProps {
  levelId: number;
  onBack: () => void;
  onNextLevel: () => void;
  isAuthenticated?: boolean;
}

export default function GameScreen({ levelId, onBack, onNextLevel, isAuthenticated = false }: GameScreenProps) {
  const [code, setCode] = useState('');
  const [console, setConsole] = useState<string[]>(['Вывод консоли будет отображаться здесь...']);
  const [showSuccess, setShowSuccess] = useState(false);
  const [solutionShown, setSolutionShown] = useState(false);
  const { completeLevel, isLevelCompleted } = useProgress();

  // Reset code when level changes
  useEffect(() => {
    const level = levels[levelId];
    if (level) {
      setCode(level.initialCode || '');
      setConsole(['Вывод консоли будет отображаться здесь...']);
      setShowSuccess(false);
      setSolutionShown(false);
    }
  }, [levelId]);

  const level = levels[levelId];
  
  if (!level) {
    return (
      <div className="min-h-screen bg-undertale-dark flex items-center justify-center">
        <div className="text-white text-xl">Уровень не найден</div>
      </div>
    );
  }

  const runCode = () => {
    try {
      setConsole(['Код запущен...']);
      
      // Try to execute the actual code
      setTimeout(() => {
        try {
          // Create a safe environment for code execution
          const capturedOutput: string[] = [];
          
          // Override console.log to capture output
          const originalConsoleLog = console.log;
          const mockConsole = {
            log: (...args: any[]) => {
              capturedOutput.push(args.join(' '));
            }
          };
          
          // Replace console in the code string for execution
          let executableCode = code;
          
          // Simple validation - check if code has basic syntax
          if (!executableCode.trim()) {
            setConsole(['Ошибка: Пустой код!']);
            return;
          }
          
          // Check for basic JavaScript syntax errors
          try {
            // Replace console.log with our mock version
            executableCode = executableCode.replace(/console\.log/g, 'mockConsole.log');
            
            // Create a function to execute the code safely
            const executeCode = new Function('mockConsole', executableCode);
            executeCode(mockConsole);
            
            if (capturedOutput.length > 0) {
              setConsole(['Результат выполнения:', ...capturedOutput]);
            } else {
              setConsole(['Код выполнен успешно (без вывода)']);
            }
          } catch (syntaxError) {
            // Show actual syntax errors
            setConsole([`Ошибка выполнения: ${syntaxError}`]);
          }
        } catch (error) {
          setConsole([`Ошибка: ${error}`]);
        }
      }, 300);
    } catch (error) {
      setConsole([`Ошибка: ${error}`]);
    }
  };

  const checkSolution = () => {
    // Check if user has made meaningful changes from initial code
    const normalizeCode = (codeStr: string) => codeStr.replace(/\s+/g, ' ').trim().toLowerCase();
    const normalizedCode = normalizeCode(code);
    const normalizedInitial = normalizeCode(level.initialCode);
    const normalizedSolution = normalizeCode(level.solution);
    
    // If code is identical to initial code, it's not solved
    if (normalizedCode === normalizedInitial) {
      setConsole(['✗ Вы не изменили код! Сначала исправьте ошибки или добавьте недостающие части.']);
      return;
    }
    
    // Check if using shown solution
    if (solutionShown && normalizedCode === normalizedSolution) {
      setConsole(['⚠️ Вы использовали готовое решение! Попробуйте написать код самостоятельно для лучшего обучения.']);
      return;
    }
    
    // Level-specific validation logic
    let isCorrect = false;
    
    if (levelId === 0) {
      // First level: Check for specific fixes
      const hasCorrectName = code.includes('let name = "Алекс"') || code.includes("let name = 'Алекс'");
      const hasCorrectAge = code.includes('const age = 25');
      const hasCorrectMessage = code.includes('console.log(message)');
      const hasSemicolons = code.split(';').length >= 4; // At least 3 statements with semicolons
      
      isCorrect = hasCorrectName && hasCorrectAge && hasCorrectMessage && hasSemicolons;
    } else if (levelId === 1) {
      // Second level: Check for function implementation
      const hasReturnStatement = code.includes('return a + b') || code.includes('return (a + b)');
      const functionCallWorks = code.includes('add(5, 3)');
      const hasConsoleLog = code.includes('console.log');
      
      isCorrect = hasReturnStatement && functionCallWorks && hasConsoleLog;
    } else {
      // For other levels, do more sophisticated checking
      const codeLines = code.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      const solutionLines = level.solution.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      
      let correctElements = 0;
      const requiredElements = solutionLines.length;
      
      solutionLines.forEach(solutionLine => {
        const hasMatch = codeLines.some(codeLine => {
          return normalizeCode(codeLine) === normalizeCode(solutionLine);
        });
        if (hasMatch) correctElements++;
      });
      
      isCorrect = correctElements >= Math.floor(requiredElements * 0.9); // 90% match threshold for other levels
    }
    
    if (isCorrect) {
      setConsole(['✓ Решение правильное! Отлично!']);
      setTimeout(() => {
        if (!isLevelCompleted(levelId)) {
          completeLevel(levelId);
        }
        setShowSuccess(true);
      }, 1000);
    } else {
      setConsole(['✗ Решение неправильное. Проверьте синтаксис и попробуйте снова.']);
    }
  };

  const getHint = () => {
    const randomHint = level.hints[Math.floor(Math.random() * level.hints.length)];
    setConsole([randomHint]);
  };

  const showSolution = () => {
    setCode(level.solution);
    setSolutionShown(true);
    setConsole(['📖 Решение показано. Изучите код и попробуйте написать подобное самостоятельно на следующем уровне.']);
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
    <div className="min-h-screen bg-undertale-dark flex flex-col lg:flex-row overflow-hidden">
      {/* Tutorial Panel */}
      <div className="w-full lg:w-1/4 p-2 sm:p-4 order-2 lg:order-1">
        <div className="pixel-border bg-undertale-panel h-40 sm:h-48 lg:h-full p-2 sm:p-4 flex flex-col">
          <h3 className="text-sm sm:text-lg mb-2 sm:mb-4 text-undertale-yellow border-b border-white pb-1 sm:pb-2 font-bold">
            * Обучение *
          </h3>
          <div className="text-xs sm:text-sm space-y-2 sm:space-y-3 overflow-y-auto flex-1">
            <div className="whitespace-pre-wrap text-white">
              {level.tutorial}
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 p-2 sm:p-4 flex flex-col order-1 lg:order-2">
        {/* Task Description */}
        <div className="pixel-border bg-undertale-panel p-2 sm:p-4 mb-2 sm:mb-4">
          <h2 className="text-lg sm:text-xl mb-2 text-undertale-yellow font-bold">
            {level.taskTitle}
          </h2>
          <p className="mb-3 sm:mb-4 text-white text-sm sm:text-base">
            {level.taskDescription}
          </p>
          
          {/* Expected Output */}
          <div className="bg-black border-2 border-undertale-green p-2 sm:p-3 text-xs sm:text-sm">
            <p className="text-undertale-green mb-1 font-bold">Ожидаемый результат:</p>
            <code className="text-white whitespace-pre-wrap break-words">{level.expectedOutput}</code>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 mb-2 sm:mb-4">
          <div className="code-editor h-full p-2 sm:p-4 text-xs sm:text-sm">
            <div className="mb-2 text-undertale-green">// Исправьте ошибки в этом коде:</div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-5/6 bg-transparent text-white resize-none outline-none font-mono text-xs sm:text-sm"
              spellCheck="false"
              placeholder="Введите ваш код здесь..."
            />
          </div>
        </div>

        {/* Input Panel */}
        <div className="pixel-border bg-undertale-panel p-2 sm:p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
            <PixelButton onClick={runCode} variant="success" className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
              ЗАПУСТИТЬ
            </PixelButton>
            <PixelButton onClick={checkSolution} variant="warning" className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
              ПРОВЕРИТЬ
            </PixelButton>
            <PixelButton onClick={getHint} variant="primary" className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
              ПОДСКАЗКА
            </PixelButton>
            <PixelButton onClick={showSolution} variant="danger" className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
              РЕШЕНИЕ
            </PixelButton>
            <PixelButton onClick={onBack} variant="secondary" className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 col-span-2 sm:col-span-1">
              НАЗАД
            </PixelButton>
          </div>
          
          {/* Output Console */}
          <div className="bg-black border-2 border-gray-600 p-2 sm:p-3 h-20 sm:h-24 overflow-y-auto text-xs sm:text-sm">
            {console.map((line, index) => (
              <div key={index} className={`
                ${line.includes('✓') ? 'text-undertale-green' : ''}
                ${line.includes('✗') || line.includes('Error') ? 'text-undertale-red' : ''}
                ${line.includes('💡') ? 'text-undertale-cyan' : ''}
                ${line.includes('📖') ? 'text-undertale-yellow' : ''}
                ${line.includes('⚠️') ? 'text-undertale-red' : ''}
                ${!line.includes('✓') && !line.includes('✗') && !line.includes('Error') && !line.includes('💡') && !line.includes('📖') && !line.includes('⚠️') ? 'text-gray-400' : ''}
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
