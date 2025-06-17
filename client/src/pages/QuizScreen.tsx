import { useState, useEffect } from 'react';
import PixelButton from '@/components/PixelButton';
import ProgressBar from '@/components/ProgressBar';
import { getRandomQuestions, calculateScore, type QuizQuestion } from '@/data/quiz';

interface QuizScreenProps {
  onBack: () => void;
}

export default function QuizScreen({ onBack }: QuizScreenProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      finishQuiz();
    }
  }, [timeLeft, quizStarted, showResults]);

  const startQuiz = () => {
    const randomQuestions = getRandomQuestions(10);
    setQuestions(randomQuestions);
    setQuizStarted(true);
    setTimeLeft(300);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        finishQuiz(newAnswers);
      }
    }
  };

  const finishQuiz = (finalAnswers?: number[]) => {
    const answersToUse = finalAnswers || answers;
    setAnswers(answersToUse);
    setShowResults(true);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setShowResults(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setTimeLeft(300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-undertale-dark flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div className="pixel-border bg-undertale-panel p-4 sm:p-8 max-w-md w-full my-4">
          <h2 className="text-xl sm:text-2xl text-undertale-yellow font-bold mb-4 text-center">
            * Блиц-тест *
          </h2>
          <div className="text-white space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <p className="text-sm sm:text-base">Проверьте свои знания JavaScript!</p>
            <ul className="text-xs sm:text-sm space-y-2">
              <li>• 10 случайных вопросов</li>
              <li>• 5 минут на выполнение</li>
              <li>• Вопросы по всем изученным темам</li>
              <li>• Оценка знаний в конце</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <PixelButton onClick={startQuiz} variant="success" className="w-full text-sm sm:text-base">
              НАЧАТЬ ТЕСТ
            </PixelButton>
            <PixelButton onClick={onBack} variant="secondary" className="w-full text-sm sm:text-base">
              НАЗАД
            </PixelButton>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const result = calculateScore(answers, questions);
    return (
      <div className="min-h-screen bg-undertale-dark flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div className="pixel-border bg-undertale-panel p-4 sm:p-8 max-w-lg w-full my-4">
          <h2 className="text-xl sm:text-2xl text-undertale-yellow font-bold mb-4 sm:mb-6 text-center">
            * Результаты теста *
          </h2>
          
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-3xl sm:text-4xl text-undertale-green font-bold mb-2">
              {result.percentage}%
            </div>
            <div className="text-lg sm:text-xl text-undertale-cyan mb-2">
              {result.grade}
            </div>
            <div className="text-xs sm:text-sm text-white mb-3 sm:mb-4">
              Правильных ответов: {result.score} из {questions.length}
            </div>
            <ProgressBar current={result.score} total={questions.length} className="mb-3 sm:mb-4" />
          </div>

          <div className="bg-black border-2 border-undertale-green p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-white text-xs sm:text-sm leading-relaxed">
              {result.feedback}
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 max-h-32 sm:max-h-40 overflow-y-auto">
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              return (
                <div key={question.id} className="text-xs">
                  <div className={`flex items-start gap-2 ${isCorrect ? 'text-undertale-green' : 'text-undertale-red'}`}>
                    <span className="text-xs sm:text-sm">{isCorrect ? '✓' : '✗'}</span>
                    <span className="text-white break-words">{question.question}</span>
                  </div>
                  {!isCorrect && (
                    <div className="text-gray-400 ml-4 mt-1 break-words">
                      Правильный ответ: {question.options[question.correctAnswer]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            <PixelButton onClick={restartQuiz} variant="warning" className="w-full text-sm sm:text-base">
              ПРОЙТИ ЕЩЕ РАЗ
            </PixelButton>
            <PixelButton onClick={onBack} variant="secondary" className="w-full text-sm sm:text-base">
              ВЕРНУТЬСЯ К УРОВНЯМ
            </PixelButton>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-undertale-dark flex flex-col overflow-hidden">
      {/* Header */}
      <div className="pixel-border bg-undertale-panel p-2 sm:p-4 m-1 sm:m-2 md:m-4 flex-shrink-0">
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <h2 className="text-lg sm:text-xl text-undertale-yellow font-bold">
            Блиц-тест
          </h2>
          <div className={`text-sm sm:text-lg font-bold ${timeLeft < 60 ? 'text-undertale-red' : 'text-undertale-green'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-white text-xs sm:text-sm">
            Вопрос {currentQuestion + 1} из {questions.length}
          </span>
          <ProgressBar current={currentQuestion + 1} total={questions.length} className="flex-1" />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div className="pixel-border bg-undertale-panel p-3 sm:p-6 max-w-2xl w-full my-4">
          <div className="mb-4 sm:mb-6">
            <div className="text-xs sm:text-sm text-undertale-cyan mb-2">
              {question.topic} • {question.difficulty === 'easy' ? 'Легкий' : question.difficulty === 'medium' ? 'Средний' : 'Сложный'}
            </div>
            <h3 className="text-base sm:text-lg text-white font-bold mb-4 sm:mb-6 break-words">
              {question.question}
            </h3>
          </div>

          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`w-full p-2 sm:p-4 text-left border-2 transition-colors text-sm sm:text-base break-words ${
                  selectedAnswer === index
                    ? 'border-undertale-yellow bg-undertale-yellow bg-opacity-20 text-white'
                    : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-400 hover:text-white'
                }`}
              >
                <span className="font-bold mr-2 sm:mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
            <PixelButton
              onClick={onBack}
              variant="danger"
              className="text-sm sm:text-base px-3 sm:px-4 py-2"
            >
              ВЫЙТИ
            </PixelButton>
            
            <PixelButton
              onClick={nextQuestion}
              variant="success"
              disabled={selectedAnswer === null}
              className="text-sm sm:text-base px-3 sm:px-4 py-2"
            >
              {currentQuestion === questions.length - 1 ? 'ЗАВЕРШИТЬ' : 'ДАЛЕЕ'}
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
}