export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const quizQuestions: QuizQuestion[] = [
  // Переменные и типы данных
  {
    id: 1,
    question: "Какое ключевое слово используется для объявления константы в JavaScript?",
    options: ["var", "let", "const", "final"],
    correctAnswer: 2,
    explanation: "const используется для объявления констант, значения которых не могут быть изменены.",
    topic: "Переменные",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Какой тип данных будет у переменной: let age = 25;",
    options: ["string", "number", "boolean", "undefined"],
    correctAnswer: 1,
    explanation: "25 - это число, поэтому тип данных будет number.",
    topic: "Типы данных",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "Что выведет console.log(typeof 'Hello');?",
    options: ["string", "text", "char", "undefined"],
    correctAnswer: 0,
    explanation: "typeof возвращает тип данных. 'Hello' - это строка, поэтому результат 'string'.",
    topic: "Типы данных",
    difficulty: "easy"
  },
  {
    id: 4,
    question: "Какая разница между let и var?",
    options: [
      "Никакой разницы нет",
      "let имеет блочную область видимости, var - функциональную",
      "var новее чем let",
      "let работает только в строгом режиме"
    ],
    correctAnswer: 1,
    explanation: "let имеет блочную область видимости, что делает код более предсказуемым.",
    topic: "Переменные",
    difficulty: "medium"
  },

  // Функции
  {
    id: 5,
    question: "Как правильно объявить функцию в JavaScript?",
    options: [
      "function myFunc() {}",
      "def myFunc() {}",
      "func myFunc() {}",
      "function: myFunc() {}"
    ],
    correctAnswer: 0,
    explanation: "Функции в JavaScript объявляются с помощью ключевого слова function.",
    topic: "Функции",
    difficulty: "easy"
  },
  {
    id: 6,
    question: "Что возвращает функция, если не указан return?",
    options: ["null", "undefined", "0", "false"],
    correctAnswer: 1,
    explanation: "Если в функции нет return, она возвращает undefined.",
    topic: "Функции",
    difficulty: "easy"
  },
  {
    id: 7,
    question: "Какой синтаксис стрелочной функции правильный?",
    options: [
      "const func = () -> {}",
      "const func = () => {}",
      "const func = () = {}",
      "const func => () {}"
    ],
    correctAnswer: 1,
    explanation: "Стрелочные функции используют синтаксис () => {}.",
    topic: "Функции",
    difficulty: "medium"
  },
  {
    id: 8,
    question: "Что такое параметры функции?",
    options: [
      "Значения, которые функция возвращает",
      "Переменные, которые функция принимает на вход",
      "Код внутри функции",
      "Название функции"
    ],
    correctAnswer: 1,
    explanation: "Параметры - это переменные, которые функция принимает для работы с ними.",
    topic: "Функции",
    difficulty: "easy"
  },

  // Условия и логика
  {
    id: 9,
    question: "Какой оператор используется для строгого сравнения?",
    options: ["==", "===", "=", "!="],
    correctAnswer: 1,
    explanation: "=== проверяет равенство значения и типа данных одновременно.",
    topic: "Условия",
    difficulty: "medium"
  },
  {
    id: 10,
    question: "Что выведет: console.log(5 == '5');?",
    options: ["true", "false", "undefined", "error"],
    correctAnswer: 0,
    explanation: "== делает преобразование типов, поэтому 5 равно '5'.",
    topic: "Условия",
    difficulty: "medium"
  },
  {
    id: 11,
    question: "Что выведет: console.log(5 === '5');?",
    options: ["true", "false", "undefined", "error"],
    correctAnswer: 1,
    explanation: "=== не делает преобразование типов, 5 (число) не равно '5' (строка).",
    topic: "Условия",
    difficulty: "medium"
  },
  {
    id: 12,
    question: "Какая структура используется для множественного выбора?",
    options: ["if", "switch", "for", "while"],
    correctAnswer: 1,
    explanation: "switch позволяет проверить переменную на соответствие нескольким значениям.",
    topic: "Условия",
    difficulty: "easy"
  },

  // Циклы
  {
    id: 13,
    question: "Какой цикл выполнится хотя бы один раз?",
    options: ["for", "while", "do...while", "if"],
    correctAnswer: 2,
    explanation: "do...while проверяет условие после выполнения блока кода.",
    topic: "Циклы",
    difficulty: "medium"
  },
  {
    id: 14,
    question: "Что делает оператор break в цикле?",
    options: [
      "Продолжает следующую итерацию",
      "Завершает цикл полностью",
      "Приостанавливает цикл",
      "Ничего не делает"
    ],
    correctAnswer: 1,
    explanation: "break полностью прерывает выполнение цикла.",
    topic: "Циклы",
    difficulty: "easy"
  },
  {
    id: 15,
    question: "Для чего используется continue в цикле?",
    options: [
      "Завершает цикл",
      "Пропускает текущую итерацию и переходит к следующей",
      "Начинает цикл заново",
      "Выводит сообщение в консоль"
    ],
    correctAnswer: 1,
    explanation: "continue пропускает оставшийся код в текущей итерации и переходит к следующей.",
    topic: "Циклы",
    difficulty: "medium"
  },

  // Массивы
  {
    id: 16,
    question: "Как создать пустой массив?",
    options: ["let arr = {};", "let arr = [];", "let arr = ();", "let arr = new Object();"],
    correctAnswer: 1,
    explanation: "Квадратные скобки [] используются для создания массивов.",
    topic: "Массивы",
    difficulty: "easy"
  },
  {
    id: 17,
    question: "Как получить длину массива?",
    options: ["arr.size", "arr.length", "arr.count", "arr.size()"],
    correctAnswer: 1,
    explanation: "Свойство length возвращает количество элементов в массиве.",
    topic: "Массивы",
    difficulty: "easy"
  },
  {
    id: 18,
    question: "Что делает метод push()?",
    options: [
      "Удаляет последний элемент",
      "Добавляет элемент в начало",
      "Добавляет элемент в конец",
      "Сортирует массив"
    ],
    correctAnswer: 2,
    explanation: "push() добавляет один или несколько элементов в конец массива.",
    topic: "Массивы",
    difficulty: "easy"
  },

  // Объекты
  {
    id: 19,
    question: "Как создать объект в JavaScript?",
    options: ["let obj = [];", "let obj = {};", "let obj = ();", "let obj = new Array();"],
    correctAnswer: 1,
    explanation: "Фигурные скобки {} используются для создания объектов.",
    topic: "Объекты",
    difficulty: "easy"
  },
  {
    id: 20,
    question: "Как получить значение свойства объекта?",
    options: [
      "obj.property или obj['property']",
      "obj->property",
      "obj::property",
      "get obj.property"
    ],
    correctAnswer: 0,
    explanation: "Можно использовать точечную нотацию obj.property или скобочную obj['property'].",
    topic: "Объекты",
    difficulty: "easy"
  }
];

export function getRandomQuestions(count: number = 10): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function calculateScore(answers: number[], questions: QuizQuestion[]): {
  score: number;
  percentage: number;
  grade: string;
  feedback: string;
} {
  const correctAnswers = answers.filter((answer, index) => 
    answer === questions[index].correctAnswer
  ).length;
  
  const percentage = Math.round((correctAnswers / questions.length) * 100);
  
  let grade = '';
  let feedback = '';
  
  if (percentage >= 90) {
    grade = 'Отлично!';
    feedback = 'Вы превосходно знаете JavaScript! Можете переходить к более сложным темам.';
  } else if (percentage >= 80) {
    grade = 'Хорошо!';
    feedback = 'У вас хорошие знания JavaScript. Немного практики и вы станете экспертом!';
  } else if (percentage >= 70) {
    grade = 'Удовлетворительно';
    feedback = 'Базовые знания есть, но стоит повторить некоторые темы.';
  } else if (percentage >= 60) {
    grade = 'Нужна практика';
    feedback = 'Рекомендуем вернуться к изучению основ и пройти уровни еще раз.';
  } else {
    grade = 'Начинающий';
    feedback = 'Не расстраивайтесь! Продолжайте изучать основы JavaScript через игровые уровни.';
  }
  
  return {
    score: correctAnswers,
    percentage,
    grade,
    feedback
  };
}