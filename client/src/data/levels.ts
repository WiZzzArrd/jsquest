export interface Level {
  id: number;
  name: string;
  description: string;
  tutorial: string;
  taskTitle: string;
  taskDescription: string;
  expectedOutput: string;
  initialCode: string;
  solution: string;
  hints: string[];
}

export const levels: Level[] = [
  {
    id: 0,
    name: "Переменные и типы данных",
    description: "Изучите основы хранения и управления данными в JavaScript.",
    tutorial: `📖 Переменные в JavaScript

Переменные — это контейнеры для хранения значений данных.

Пример:
let name = "Герой";
const age = 25;
var score = 100;

Используйте let для переменных, которые могут изменяться.
Используйте const для констант, которые не изменяются.
Используйте var для старого JavaScript (не рекомендуется).

Типы данных:
• Строка: "Привет мир"
• Число: 42, 3.14
• Логический: true, false
• Неопределённый: undefined
• Нулевой: null`,
    taskTitle: "* Исправьте сломанный код *",
    taskDescription: "В переменных ниже есть ошибки. Исправьте их, чтобы код работал правильно!",
    expectedOutput: "Привет, меня зовут Алекс и мне 25 лет.",
    initialCode: `let nam = "Алекс;
const age = 25
var message = "Привет, меня зовут " + name + " и мне " + age + " лет."
console.log(messag);`,
    solution: `let name = "Алекс";
const age = 25;
var message = "Привет, меня зовут " + name + " и мне " + age + " лет.";
console.log(message);`,
    hints: [
      "💡 Проверьте имена переменных - они должны совпадать при использовании",
      "💡 Не забывайте точки с запятой в конце операторов",
      "💡 Убедитесь, что строки правильно заключены в кавычки",
      "💡 Проверьте оператор console.log на опечатки"
    ]
  },
  {
    id: 1,
    name: "Функции",
    description: "Создавайте переиспользуемые блоки кода для выполнения конкретных задач.",
    tutorial: `📖 Функции в JavaScript

Функции — это переиспользуемые блоки кода для выполнения конкретных задач.

Синтаксис:
function functionName(parameters) {
  // код для выполнения
  return result;
}

Пример:
function greet(name) {
  return "Привет, " + name + "!";
}

Стрелочные функции:
const add = (a, b) => a + b;

Вызов функций:
greet("Алиса"); // Возвращает: "Привет, Алиса!"
add(5, 3); // Возвращает: 8`,
    taskTitle: "* Создайте функцию калькулятора *",
    taskDescription: "Создайте функцию, которая принимает два числа и возвращает их сумму.",
    expectedOutput: "Сумма 5 и 3 равна: 8",
    initialCode: `// Создайте функцию с именем 'add', которая принимает два параметра
function add(a, b) {
  // Верните сумму a и b
  
}

// Вызовите функцию и сохраните результат
const result = add(5, 3);
console.log("Сумма 5 и 3 равна: " + result);`,
    solution: `function add(a, b) {
  return a + b;
}

const result = add(5, 3);
console.log("Сумма 5 и 3 равна: " + result);`,
    hints: [
      "💡 Используйте ключевое слово 'return' для возврата значения из функции",
      "💡 Сложите два параметра с помощью оператора +",
      "💡 Убедитесь, что ваша функция имеет правильное имя",
      "💡 Не забудьте вернуть результат из вашей функции"
    ]
  },
  {
    id: 2,
    name: "Массивы",
    description: "Храните несколько значений в одной переменной, используя массивы.",
    tutorial: `📖 Массивы в JavaScript

Массивы хранят несколько значений в одной переменной.

Создание массивов:
const fruits = ["яблоко", "банан", "апельсин"];
const numbers = [1, 2, 3, 4, 5];

Доступ к элементам:
fruits[0] // "яблоко" (первый элемент)
fruits[1] // "банан" (второй элемент)

Свойства массива:
fruits.length // 3 (количество элементов)

Основные методы:
• push() - добавляет в конец
• pop() - удаляет с конца
• shift() - удаляет с начала
• unshift() - добавляет в начало`,
    taskTitle: "* Работа с массивами *",
    taskDescription: "Исправьте код для правильного доступа и изменения массива.",
    expectedOutput: "Первый фрукт: яблоко, Последний фрукт: виноград, Всего фруктов: 4",
    initialCode: `const fruits = ["яблоко", "банан", "апельсин"];

// Добавить новый фрукт в конец
fruits.push("виноград");

// Получить первый фрукт
const firstFruit = fruits[];

// Получить последний фрукт  
const lastFruit = fruits[fruits.length];

// Получить общее количество фруктов
const totalFruits = fruits.length;

console.log("Первый фрукт: " + firstFruit + ", Последний фрукт: " + lastFruit + ", Всего фруктов: " + totalFruits);`,
    solution: `const fruits = ["яблоко", "банан", "апельсин"];

fruits.push("виноград");

const firstFruit = fruits[0];
const lastFruit = fruits[fruits.length - 1];
const totalFruits = fruits.length;

console.log("Первый фрукт: " + firstFruit + ", Последний фрукт: " + lastFruit + ", Всего фруктов: " + totalFruits);`,
    hints: [
      "💡 Индексы массива начинаются с 0, поэтому первый элемент имеет индекс 0",
      "💡 Последний элемент имеет индекс (length - 1)",
      "💡 Не забудьте указать индекс при доступе к элементам массива",
      "💡 Используйте квадратные скобки [] для доступа к элементам массива"
    ]
  },
  {
    id: 3,
    name: "Объекты",
    description: "Группируйте связанные данные и функции вместе, используя объекты.",
    tutorial: `📖 Объекты в JavaScript

Объекты группируют связанные данные и функции вместе.

Создание объектов:
const person = {
  name: "Иван",
  age: 30,
  city: "Москва"
};

Доступ к свойствам:
person.name // "Иван"
person["age"] // 30

Добавление свойств:
person.job = "Разработчик";

Методы в объектах:
const car = {
  brand: "Toyota",
  start: function() {
    return "Машина заведена!";
  }
};`,
    taskTitle: "* Свойства объектов *",
    taskDescription: "Исправьте код для правильного доступа к свойствам и методам объекта.",
    expectedOutput: "Герой: Алиса, Уровень: 5, Оружие: меч, Действие: Атака мечом!",
    initialCode: `const hero = {
  name: "Алиса",
  level: 5,
  weapon: "меч",
  attack: function() {
    return "Атака " + this.weapon + "!";
  }
};

// Получить доступ к свойствам героя
const heroName = hero.;
const heroLevel = hero[""];
const heroWeapon = hero.weapon;

// Вызвать метод атаки
const action = hero.();

console.log("Герой: " + heroName + ", Уровень: " + heroLevel + ", Оружие: " + heroWeapon + ", Действие: " + action);`,
    solution: `const hero = {
  name: "Алиса",
  level: 5,
  weapon: "меч",
  attack: function() {
    return "Атака " + this.weapon + "!";
  }
};

const heroName = hero.name;
const heroLevel = hero["level"];
const heroWeapon = hero.weapon;

const action = hero.attack();

console.log("Герой: " + heroName + ", Уровень: " + heroLevel + ", Оружие: " + heroWeapon + ", Действие: " + action);`,
    hints: [
      "💡 Используйте точечную нотацию (object.property) для доступа к свойствам",
      "💡 Используйте скобочную нотацию (object['property']) с кавычками для имён свойств",
      "💡 Не забывайте скобки () при вызове методов",
      "💡 Убедитесь, что завершили операторы доступа к свойствам"
    ]
  },
  {
    id: 4,
    name: "Условные операторы",
    description: "Принимайте решения в коде, используя операторы if/else.",
    tutorial: `📖 Условные операторы в JavaScript

Условные операторы позволяют коду принимать решения.

Оператор If:
if (условие) {
  // код для выполнения, если условие истинно
}

If-Else:
if (условие) {
  // код, если условие истинно
} else {
  // код, если условие ложно
}

If-Else If:
if (условие1) {
  // код, если условие1 истинно
} else if (условие2) {
  // код, если условие2 истинно
} else {
  // код, если все условия ложны
}

Операторы сравнения:
• === (равно)
• !== (не равно)
• > (больше)
• < (меньше)
• >= (больше или равно)
• <= (меньше или равно)`,
    taskTitle: "* Проверка возрастной категории *",
    taskDescription: "Завершите условную логику для правильной категоризации возраста.",
    expectedOutput: "Возраст 25: Вы взрослый.",
    initialCode: `const age = 25;
let category;

if (age < 13) {
  category = "Вы ребёнок.";
} else if (age < 20) {
  category = "Вы подросток.";
} else if (age < 60) {
  category = "Вы взрослый.";
} {
  category = "Вы пожилой.";
}

console.log("Возраст " + age + ": " + category);`,
    solution: `const age = 25;
let category;

if (age < 13) {
  category = "Вы ребёнок.";
} else if (age < 20) {
  category = "Вы подросток.";
} else if (age < 60) {
  category = "Вы взрослый.";
} else {
  category = "Вы пожилой.";
}

console.log("Возраст " + age + ": " + category);`,
    hints: [
      "💡 Финальное условие должно быть 'else', а не просто блок",
      "💡 Каждое условие проверяет, меньше ли возраст определённого числа",
      "💡 Убедитесь, что все ваши операторы if-else правильно структурированы",
      "💡 Ключевое слово 'else' обрабатывает все остальные случаи"
    ]
  },
  {
    id: 5,
    name: "Циклы",
    description: "Эффективно повторяйте код, используя циклы for и while.",
    tutorial: `📖 Циклы в JavaScript

Циклы повторяют код множество раз.

Цикл For:
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

Цикл While:
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}

Цикл For...of (для массивов):
const fruits = ["яблоко", "банан"];
for (const fruit of fruits) {
  console.log(fruit);
}

Компоненты цикла:
• Инициализация: let i = 0
• Условие: i < 5
• Приращение: i++`,
    taskTitle: "* Счётчик чисел *",
    taskDescription: "Исправьте цикл для подсчёта от 1 до 5 и вычисления суммы.",
    expectedOutput: "Числа: 1 2 3 4 5 Сумма: 15",
    initialCode: `let numbers = "";
let sum = 0;

// Исправьте этот цикл для подсчёта от 1 до 5
for (let i = 1; i  5; i++) {
  numbers += i + " ";
  sum += ;
}

console.log("Числа: " + numbers + "Сумма: " + sum);`,
    solution: `let numbers = "";
let sum = 0;

for (let i = 1; i <= 5; i++) {
  numbers += i + " ";
  sum += i;
}

console.log("Числа: " + numbers + "Сумма: " + sum);`,
    hints: [
      "💡 Используйте <= (меньше или равно) чтобы включить число 5",
      "💡 Добавьте текущее значение 'i' к сумме",
      "💡 Условие цикла должно позволить i достичь 5",
      "💡 Убедитесь, что включили переменную цикла в вычисление суммы"
    ]
  },
  {
    id: 6,
    name: "Работа с DOM",
    description: "Взаимодействуйте с элементами веб-страницы, используя объектную модель документа.",
    tutorial: `📖 Работа с DOM в JavaScript

DOM позволяет взаимодействовать с HTML элементами.

Выбор элементов:
document.getElementById("myId")
document.querySelector(".myClass")
document.querySelectorAll("p")

Изменение содержимого:
element.textContent = "Новый текст";
element.innerHTML = "<b>Жирный текст</b>";

Изменение стилей:
element.style.color = "red";
element.style.backgroundColor = "blue";

Создание элементов:
const newDiv = document.createElement("div");
newDiv.textContent = "Привет!";
document.body.appendChild(newDiv);

События:
element.addEventListener("click", function() {
  console.log("Нажато!");
});`,
    taskTitle: "* Обновление текста *",
    taskDescription: "Завершите код для обновления текстового содержимого элемента.",
    expectedOutput: "Текст элемента изменён на: Привет, JavaScript!",
    initialCode: `// Имитация получения элемента (в реальном браузере это работало бы)
const mockElement = {
  textContent: "Исходный текст",
  style: {}
};

// Обновить текстовое содержимое
mockElement. = "Привет, JavaScript!";

// Обновить стиль
mockElement.style. = "blue";

console.log("Текст элемента изменён на: " + mockElement.textContent);
console.log("Цвет элемента изменён на: " + mockElement.style.color);`,
    solution: `const mockElement = {
  textContent: "Исходный текст",
  style: {}
};

mockElement.textContent = "Привет, JavaScript!";
mockElement.style.color = "blue";

console.log("Текст элемента изменён на: " + mockElement.textContent);
console.log("Цвет элемента изменён на: " + mockElement.style.color);`,
    hints: [
      "💡 Используйте свойство 'textContent' для изменения текста элемента",
      "💡 Используйте 'style.color' для изменения цвета текста",
      "💡 Получайте доступ к свойствам объекта с помощью точечной нотации",
      "💡 Устанавливайте свойства с помощью оператора присваивания (=)"
    ]
  },
  {
    id: 7,
    name: "События",
    description: "Реагируйте на взаимодействия пользователя, такие как клики, нажатия клавиш и отправка форм.",
    tutorial: `📖 События в JavaScript

События позволяют коду реагировать на взаимодействия пользователя.

Добавление обработчиков событий:
element.addEventListener("click", function() {
  console.log("Кнопка нажата!");
});

Распространённые события:
• click - клик мыши
• keydown - нажата клавиша
• submit - отправлена форма
• load - страница загружена
• change - изменён ввод

Объект события:
element.addEventListener("click", function(event) {
  console.log("Клик в:", event.clientX, event.clientY);
  event.preventDefault(); // Остановить поведение по умолчанию
});

Стрелочные функции:
element.addEventListener("click", (event) => {
  console.log("Событие стрелочной функции!");
});`,
    taskTitle: "* Обработчик событий *",
    taskDescription: "Завершите обработчик событий для реагирования на нажатия кнопки.",
    expectedOutput: "Кнопка нажата! Счёт: 1",
    initialCode: `// Имитация объекта кнопки
const mockButton = {
  clickHandlers: [],
  addEventListener: function(event, handler) {
    this.clickHandlers.push(handler);
  },
  click: function() {
    this.clickHandlers.forEach(handler => handler());
  }
};

let clickCount = 0;

// Добавить обработчик событий для событий клика
mockButton.addEventListener("", function() {
  clickCount++;
  console.log("Кнопка нажата! Счёт: " + clickCount);
});

// Имитировать нажатие кнопки
mockButton.click();`,
    solution: `const mockButton = {
  clickHandlers: [],
  addEventListener: function(event, handler) {
    this.clickHandlers.push(handler);
  },
  click: function() {
    this.clickHandlers.forEach(handler => handler());
  }
};

let clickCount = 0;

mockButton.addEventListener("click", function() {
  clickCount++;
  console.log("Кнопка нажата! Счёт: " + clickCount);
});

mockButton.click();`,
    hints: [
      "💡 Первый параметр должен быть именем события в кавычках",
      "💡 Используйте 'click' как имя события для кликов мыши",
      "💡 Имена событий — это строки, поэтому нужны кавычки",
      "💡 Убедитесь, что имя события точно совпадает"
    ]
  },
  {
    id: 8,
    name: "Обработка ошибок",
    description: "Обрабатывайте и предотвращайте ошибки в коде, используя операторы try-catch.",
    tutorial: `📖 Обработка ошибок в JavaScript

Обработка ошибок предотвращает падение кода при возникновении проблем.

Try-Catch:
try {
  // Код, который может вызвать ошибку
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  // Обработать ошибку
  console.log("Ошибка:", error.message);
}

Try-Catch-Finally:
try {
  // Рискованный код
} catch (error) {
  // Обработать ошибку
} finally {
  // Всегда выполняется
}

Генерация ошибок:
if (age < 0) {
  throw new Error("Возраст не может быть отрицательным");
}

Распространённые типы ошибок:
• ReferenceError - переменная не определена
• TypeError - неправильный тип данных
• SyntaxError - синтаксическая ошибка`,
    taskTitle: "* Обработчик ошибок *",
    taskDescription: "Добавьте правильную обработку ошибок для перехвата и обработки потенциальных ошибок.",
    expectedOutput: "Ошибка перехвачена: Нельзя делить на ноль",
    initialCode: `function divide(a, b) {
  if (b === 0) {
    throw new Error("Нельзя делить на ноль");
  }
  return a / b;
}

// Добавить try-catch для обработки ошибки
 {
  const result = divide(10, 0);
  console.log("Результат:", result);
}  (error) {
  console.log("Ошибка перехвачена:", error.message);
}`,
    solution: `function divide(a, b) {
  if (b === 0) {
    throw new Error("Нельзя делить на ноль");
  }
  return a / b;
}

try {
  const result = divide(10, 0);
  console.log("Результат:", result);
} catch (error) {
  console.log("Ошибка перехвачена:", error.message);
}`,
    hints: [
      "💡 Используйте ключевое слово 'try' для начала блока try",
      "💡 Используйте ключевое слово 'catch' для обработки ошибок",
      "💡 Структура try-catch нуждается в обоих ключевых словах",
      "💡 Поместите рискованный код в блок try"
    ]
  },
  {
    id: 9,
    name: "Финальный вызов",
    description: "Проверьте все свои навыки в этом комплексном испытании.",
    tutorial: `📖 Финальный вызов

Это испытание объединяет всё, что вы изучили:
• Переменные и типы данных
• Функции
• Массивы и объекты
• Условные операторы
• Циклы
• Работа с DOM
• События
• Обработка ошибок

Вы создадите полную мини-программу, которая использует множество концепций JavaScript вместе.

Советы:
• Внимательно читайте требования
• Разбивайте проблему на меньшие части
• Используйте console.log для отладки кода
• Не бойтесь экспериментировать!

Удачи, отважный программист!`,
    taskTitle: "* Главное испытание *",
    taskDescription: "Создайте калькулятор оценок студентов, который обрабатывает массив объектов студентов.",
    expectedOutput: "Студент: Алиса, Оценка: B, Статус: Сдал\nСтудент: Боб, Оценка: D, Статус: Не сдал\nСредний балл класса: 72.5",
    initialCode: `// Завершите этот калькулятор оценок студентов
const students = [
  { name: "Алиса", scores: [85, 92, 78, 96] },
  { name: "Боб", scores: [45, 67, 58, 72] }
];

function calculateAverage(scores) {
  // Вычислите и верните среднее значение массива оценок
  
}

function getLetterGrade(average) {
  // Верните буквенную оценку на основе среднего балла
  // A: 90+, B: 80-89, C: 70-79, D: 60-69, F: ниже 60
  
}

function getPassStatus(average) {
  // Верните "Сдал" если средний балл >= 70, "Не сдал" в противном случае
  
}

// Обработать каждого студента
let classTotal = 0;
for (const student of students) {
  const average = calculateAverage(student.scores);
  const grade = getLetterGrade(average);
  const status = getPassStatus(average);
  
  console.log(\`Студент: \${student.name}, Оценка: \${grade}, Статус: \${status}\`);
  classTotal += average;
}

// Вычислить и показать средний балл класса
const classAverage = classTotal / students.length;
console.log("Средний балл класса: " + classAverage);`,
    solution: `const students = [
  { name: "Alice", scores: [85, 92, 78, 96] },
  { name: "Bob", scores: [45, 67, 58, 72] }
];

function calculateAverage(scores) {
  let sum = 0;
  for (const score of scores) {
    sum += score;
  }
  return sum / scores.length;
}

function getLetterGrade(average) {
  if (average >= 90) {
    return "A";
  } else if (average >= 80) {
    return "B";
  } else if (average >= 70) {
    return "C";
  } else if (average >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function getPassStatus(average) {
  if (average >= 70) {
    return "Pass";
  } else {
    return "Fail";
  }
}

let classTotal = 0;
for (const student of students) {
  const average = calculateAverage(student.scores);
  const grade = getLetterGrade(average);
  const status = getPassStatus(average);
  
  console.log(\`Student: \${student.name}, Grade: \${grade}, Status: \${status}\`);
  classTotal += average;
}

const classAverage = classTotal / students.length;
console.log("Class Average: " + classAverage);`,
    hints: [
      "💡 Use a loop to sum all scores, then divide by the length",
      "💡 Use if-else statements to determine letter grades",
      "💡 Compare the average to 70 for pass/fail status",
      "💡 Don't forget to return values from your functions"
    ]
  }
];
