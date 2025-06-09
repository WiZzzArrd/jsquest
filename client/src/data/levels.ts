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
  { name: "Алиса", scores: [85, 92, 78, 96] },
  { name: "Боб", scores: [45, 67, 58, 72] }
];

function calculateAverage(scores) {
  let total = 0;
  for (const score of scores) {
    total += score;
  }
  return total / scores.length;
}

function getLetterGrade(average) {
  if (average >= 90) return "A";
  if (average >= 80) return "B";
  if (average >= 70) return "C";
  if (average >= 60) return "D";
  return "F";
}

function getPassStatus(average) {
  return average >= 70 ? "Сдал" : "Не сдал";
}

let classTotal = 0;
for (const student of students) {
  const average = calculateAverage(student.scores);
  const grade = getLetterGrade(average);
  const status = getPassStatus(average);
  
  console.log(\`Студент: \${student.name}, Оценка: \${grade}, Статус: \${status}\`);
  classTotal += average;
}

const classAverage = classTotal / students.length;
console.log("Средний балл класса: " + classAverage);`,
    hints: [
      "💡 Используйте цикл для суммирования всех оценок в массиве, затем разделите на длину массива",
      "💡 Используйте операторы if-else для определения буквенных оценок на основе диапазонов",
      "💡 Используйте тернарный оператор или if-else для статуса сдал/не сдал",
      "💡 Не забудьте использовать шаблонные литералы с ${} для интерполяции строк",
      "💡 Убедитесь, что вычислили средний балл класса после обработки всех студентов"
    ]
  },
  // Уровни 10-19: Средний уровень
  {
    id: 10,
    name: "Деструктуризация",
    description: "Изучите современный способ извлечения значений из массивов и объектов.",
    tutorial: `📖 Деструктуризация в JavaScript

Деструктуризация позволяет извлекать значения из массивов и объектов.

Деструктуризация массивов:
const [first, second] = [1, 2, 3];
console.log(first); // 1
console.log(second); // 2

Деструктуризация объектов:
const {name, age} = {name: "Анна", age: 30};
console.log(name); // "Анна"

Значения по умолчанию:
const [a = 5, b = 10] = [1];
console.log(a); // 1
console.log(b); // 10

Переименование при деструктуризации:
const {name: userName} = {name: "Иван"};
console.log(userName); // "Иван"`,
    taskTitle: "* Извлечение данных *",
    taskDescription: "Используйте деструктуризацию для извлечения значений из массива и объекта.",
    expectedOutput: "Первый: 10, Второй: 20, Имя: Елена, Возраст: 28",
    initialCode: `const numbers = [10, 20, 30];
const person = {name: "Елена", age: 28, city: "Москва"};

// Извлеките первые два числа из массива
const [] = numbers;

// Извлеките имя и возраст из объекта person
const {} = person;

console.log("Первый: " + first + ", Второй: " + second + ", Имя: " + name + ", Возраст: " + age);`,
    solution: `const numbers = [10, 20, 30];
const person = {name: "Елена", age: 28, city: "Москва"};

const [first, second] = numbers;
const {name, age} = person;

console.log("Первый: " + first + ", Второй: " + second + ", Имя: " + name + ", Возраст: " + age);`,
    hints: [
      "💡 Используйте квадратные скобки [] для деструктуризации массивов",
      "💡 Используйте фигурные скобки {} для деструктуризации объектов",
      "💡 Имена переменных в деструктуризации объектов должны совпадать с именами свойств",
      "💡 Порядок важен при деструктуризации массивов"
    ]
  },
  {
    id: 11,
    name: "Шаблонные строки",
    description: "Освойте современный синтаксис для создания строк с переменными.",
    tutorial: `📖 Шаблонные строки в JavaScript

Шаблонные строки используют обратные кавычки и позволяют встраивать выражения.

Базовый синтаксис:
const name = "Мир";
const greeting = \`Привет, \${name}!\`;

Многострочные строки:
const text = \`Это
многострочная
строка\`;

Выражения в шаблонах:
const a = 5;
const b = 3;
const result = \`\${a} + \${b} = \${a + b}\`;

Вызов функций:
const upper = (str) => str.toUpperCase();
const message = \`Привет, \${upper("анна")}!\`;`,
    taskTitle: "* Создание сообщений *",
    taskDescription: "Используйте шаблонные строки для создания форматированных сообщений.",
    expectedOutput: "Пользователь Дмитрий (ID: 42) имеет 150 очков. Статус: АКТИВЕН",
    initialCode: `const user = {
  name: "Дмитрий",
  id: 42,
  points: 150,
  status: "активен"
};

// Создайте сообщение используя шаблонную строку
const message = "Пользователь " + user.name + " (ID: " + user.id + ") имеет " + user.points + " очков. Статус: " + user.status.toUpperCase();

console.log(message);`,
    solution: `const user = {
  name: "Дмитрий",
  id: 42,
  points: 150,
  status: "активен"
};

const message = \`Пользователь \${user.name} (ID: \${user.id}) имеет \${user.points} очков. Статус: \${user.status.toUpperCase()}\`;

console.log(message);`,
    hints: [
      "💡 Используйте обратные кавычки ` вместо обычных кавычек",
      "💡 Вставляйте переменные с помощью ${переменная}",
      "💡 Внутри ${} можно использовать любые выражения JavaScript",
      "💡 Методы объектов тоже можно вызывать внутри ${}"
    ]
  },
  {
    id: 12,
    name: "Методы массивов",
    description: "Изучите мощные методы для работы с массивами: map, filter, reduce.",
    tutorial: `📖 Методы массивов в JavaScript

Современные методы массивов делают код более читаемым и функциональным.

map() - преобразует каждый элемент:
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]

filter() - фильтрует элементы:
const ages = [12, 18, 25, 30];
const adults = ages.filter(age => age >= 18); // [18, 25, 30]

reduce() - сводит массив к одному значению:
const sum = [1, 2, 3].reduce((acc, curr) => acc + curr, 0); // 6

find() - находит первый элемент:
const users = [{id: 1, name: "Анна"}, {id: 2, name: "Иван"}];
const user = users.find(u => u.id === 2); // {id: 2, name: "Иван"}`,
    taskTitle: "* Обработка списка товаров *",
    taskDescription: "Используйте методы массивов для обработки списка товаров.",
    expectedOutput: "Дорогие товары: Ноутбук, Телефон. Общая стоимость: 180000",
    initialCode: `const products = [
  {name: "Книга", price: 500},
  {name: "Ноутбук", price: 120000},
  {name: "Телефон", price: 60000},
  {name: "Ручка", price: 50}
];

// Найдите товары дороже 1000 рублей
const expensiveProducts = [];

// Получите массив названий дорогих товаров
const expensiveNames = [];

// Вычислите общую стоимость дорогих товаров
const totalCost = 0;

console.log("Дорогие товары: " + expensiveNames.join(", ") + ". Общая стоимость: " + totalCost);`,
    solution: `const products = [
  {name: "Книга", price: 500},
  {name: "Ноутбук", price: 120000},
  {name: "Телефон", price: 60000},
  {name: "Ручка", price: 50}
];

const expensiveProducts = products.filter(product => product.price > 1000);
const expensiveNames = expensiveProducts.map(product => product.name);
const totalCost = expensiveProducts.reduce((sum, product) => sum + product.price, 0);

console.log("Дорогие товары: " + expensiveNames.join(", ") + ". Общая стоимость: " + totalCost);`,
    hints: [
      "💡 Используйте filter() для получения товаров дороже 1000",
      "💡 Используйте map() для извлечения названий товаров",
      "💡 Используйте reduce() для суммирования цен",
      "💡 Методы можно объединять в цепочки: array.filter().map()"
    ]
  },
  {
    id: 13,
    name: "Промисы",
    description: "Изучите основы асинхронного программирования с промисами.",
    tutorial: `📖 Промисы в JavaScript

Промисы позволяют работать с асинхронным кодом более элегантно.

Создание промиса:
const promise = new Promise((resolve, reject) => {
  if (успех) {
    resolve("Данные получены");
  } else {
    reject("Ошибка");
  }
});

Использование промисов:
promise
  .then(result => console.log(result))
  .catch(error => console.log(error));

Промис с таймером:
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

delay(1000).then(() => console.log("Прошла секунда"));

Состояния промиса:
• pending (ожидание)
• fulfilled (выполнен)
• rejected (отклонён)`,
    taskTitle: "* Загрузка данных *",
    taskDescription: "Создайте функцию, которая возвращает промис для загрузки пользователя.",
    expectedOutput: "Пользователь загружен: {\"id\":1,\"name\":\"Алексей\"}",
    initialCode: `// Создайте функцию loadUser, которая возвращает промис
function loadUser(id) {
  // Верните промис, который через 1 секунду resolve'ится с объектом пользователя
  
}

// Используйте промис
loadUser(1)
  .then(user => {
    console.log("Пользователь загружен: " + JSON.stringify(user));
  })
  .catch(error => {
    console.log("Ошибка: " + error);
  });`,
    solution: `function loadUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({id: id, name: "Алексей"});
      } else {
        reject("Неверный ID");
      }
    }, 1000);
  });
}

loadUser(1)
  .then(user => {
    console.log("Пользователь загружен: " + JSON.stringify(user));
  })
  .catch(error => {
    console.log("Ошибка: " + error);
  });`,
    hints: [
      "💡 Используйте конструктор new Promise((resolve, reject) => {})",
      "💡 Вызовите resolve() для успешного завершения",
      "💡 Используйте setTimeout для имитации задержки",
      "💡 Промис должен возвращать объект пользователя"
    ]
  },
  {
    id: 14,
    name: "Async/Await",
    description: "Освойте современный синтаксис для работы с асинхронным кодом.",
    tutorial: `📖 Async/Await в JavaScript

Async/await делает асинхронный код похожим на синхронный.

Объявление async функции:
async function fetchData() {
  // async функция всегда возвращает промис
}

Ожидание результата:
async function example() {
  try {
    const result = await somePromise;
    console.log(result);
  } catch (error) {
    console.log("Ошибка:", error);
  }
}

Параллельное выполнение:
async function loadAll() {
  const [user, posts] = await Promise.all([
    loadUser(),
    loadPosts()
  ]);
}

Async стрелочные функции:
const fetchUser = async (id) => {
  const response = await fetch(\`/users/\${id}\`);
  return response.json();
};`,
    taskTitle: "* Последовательная загрузка *",
    taskDescription: "Преобразуйте код с промисами в async/await синтаксис.",
    expectedOutput: "Пользователь: Мария, Посты: 5",
    initialCode: `// Функции-заглушки (уже готовые)
function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({name: "Мария", id: id}), 500);
  });
}

function fetchUserPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([1, 2, 3, 4, 5]), 300);
  });
}

// Перепишите эту функцию используя async/await
function loadUserData(userId) {
  return fetchUser(userId)
    .then(user => {
      return fetchUserPosts(user.id)
        .then(posts => {
          console.log("Пользователь: " + user.name + ", Посты: " + posts.length);
        });
    });
}

loadUserData(1);`,
    solution: `function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({name: "Мария", id: id}), 500);
  });
}

function fetchUserPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([1, 2, 3, 4, 5]), 300);
  });
}

async function loadUserData(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchUserPosts(user.id);
    console.log("Пользователь: " + user.name + ", Посты: " + posts.length);
  } catch (error) {
    console.log("Ошибка:", error);
  }
}

loadUserData(1);`,
    hints: [
      "💡 Добавьте ключевое слово async перед function",
      "💡 Используйте await перед промисами вместо .then()",
      "💡 Оберните код в try/catch для обработки ошибок",
      "💡 Уберите цепочки .then() и сделайте код линейным"
    ]
  },
  {
    id: 15,
    name: "Классы ES6",
    description: "Изучите современный синтаксис классов в JavaScript.",
    tutorial: `📖 Классы в JavaScript ES6

Классы предоставляют более чистый синтаксис для объектно-ориентированного программирования.

Объявление класса:
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Привет, я \${this.name}\`;
  }
}

Создание экземпляра:
const person = new Person("Анна", 25);

Наследование:
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // вызов конструктора родителя
    this.grade = grade;
  }
  
  study() {
    return \`\${this.name} учится\`;
  }
}

Статические методы:
class MathUtils {
  static add(a, b) {
    return a + b;
  }
}`,
    taskTitle: "* Система автомобилей *",
    taskDescription: "Создайте класс Car с методами и класс ElectricCar, наследующий от Car.",
    expectedOutput: "Машина: Tesla Model 3, Батарея: 85%, Поездка на 50 км, Батарея: 75%",
    initialCode: `// Создайте класс Car
class Car {
  constructor(brand, model) {
    // Инициализируйте свойства brand и model
  }
  
  getInfo() {
    // Верните строку "Машина: [brand] [model]"
  }
}

// Создайте класс ElectricCar, наследующий от Car
class ElectricCar extends Car {
  constructor(brand, model, batteryLevel) {
    // Вызовите конструктор родителя и инициализируйте batteryLevel
    
  }
  
  getBatteryInfo() {
    // Верните строку "Батарея: [batteryLevel]%"
  }
  
  drive(kilometers) {
    // Уменьшите уровень батареи на kilometers / 5 (округлить вниз)
    
  }
}

const tesla = new ElectricCar("Tesla", "Model 3", 85);
console.log(tesla.getInfo() + ", " + tesla.getBatteryInfo());
tesla.drive(50);
console.log("Поездка на 50 км, " + tesla.getBatteryInfo());`,
    solution: `class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  
  getInfo() {
    return \`Машина: \${this.brand} \${this.model}\`;
  }
}

class ElectricCar extends Car {
  constructor(brand, model, batteryLevel) {
    super(brand, model);
    this.batteryLevel = batteryLevel;
  }
  
  getBatteryInfo() {
    return \`Батарея: \${this.batteryLevel}%\`;
  }
  
  drive(kilometers) {
    this.batteryLevel -= Math.floor(kilometers / 5);
  }
}

const tesla = new ElectricCar("Tesla", "Model 3", 85);
console.log(tesla.getInfo() + ", " + tesla.getBatteryInfo());
tesla.drive(50);
console.log("Поездка на 50 км, " + tesla.getBatteryInfo());`,
    hints: [
      "💡 Используйте constructor для инициализации свойств",
      "💡 Для наследования используйте extends и super()",
      "💡 Методы класса объявляются без ключевого слова function",
      "💡 Используйте Math.floor() для округления вниз"
    ]
  },
  {
    id: 16,
    name: "Модули ES6",
    description: "Изучите систему модулей для организации кода.",
    tutorial: `📖 Модули ES6 в JavaScript

Модули позволяют разделить код на отдельные файлы и управлять зависимостями.

Экспорт (export):
// utils.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}

// Экспорт по умолчанию
export default class Calculator {
  // ...
}

Импорт (import):
// main.js
import Calculator, { PI, add } from './utils.js';
import * as Utils from './utils.js';

Именованный экспорт:
export { functionA, functionB };

Переименование при импорте:
import { add as sum } from './utils.js';

Динамический импорт:
const module = await import('./module.js');`,
    taskTitle: "* Система модулей *",
    taskDescription: "Организуйте код используя экспорт и импорт модулей.",
    expectedOutput: "Результат: 15, Площадь круга: 78.54",
    initialCode: `// Представим, что у нас есть модуль mathUtils
// Симуляция модуля mathUtils
const mathUtils = {
  multiply: (a, b) => a * b,
  PI: 3.14159,
  calculateCircleArea: (radius) => mathUtils.PI * radius * radius
};

// Представим, что у нас есть модуль Calculator (экспорт по умолчанию)
class Calculator {
  add(a, b) {
    return a + b;
  }
}

// Симулируем импорт модулей (в реальности это было бы import)
// import Calculator from './calculator.js';
// import { multiply, PI, calculateCircleArea } from './mathUtils.js';

// Используйте "импортированные" функции
const calc = new Calculator();
const result = calc.add(10, 5);

const area = mathUtils.calculateCircleArea(5);

console.log("Результат: " + result + ", Площадь круга: " + area.toFixed(2));`,
    solution: `// Симуляция экспорта модуля mathUtils
const mathUtils = {
  multiply: (a, b) => a * b,
  PI: 3.14159,
  calculateCircleArea: (radius) => mathUtils.PI * radius * radius
};

// Симуляция экспорта по умолчанию класса Calculator
class Calculator {
  add(a, b) {
    return a + b;
  }
}

// В реальности это было бы:
// export const { multiply, PI, calculateCircleArea } = mathUtils;
// export default Calculator;

// И импорт:
// import Calculator from './calculator.js';
// import { multiply, PI, calculateCircleArea } from './mathUtils.js';

const calc = new Calculator();
const result = calc.add(10, 5);
const area = mathUtils.calculateCircleArea(5);

console.log("Результат: " + result + ", Площадь круга: " + area.toFixed(2));`,
    hints: [
      "💡 Используйте export для экспорта функций и переменных",
      "💡 export default для экспорта основного элемента модуля",
      "💡 import { name } from './module' для именованного импорта",
      "💡 import DefaultName from './module' для импорта по умолчанию"
    ]
  },
  {
    id: 17,
    name: "Работа с JSON",
    description: "Научитесь работать с форматом обмена данными JSON.",
    tutorial: `📖 JSON в JavaScript

JSON (JavaScript Object Notation) - формат для обмена данными.

Преобразование в JSON:
const obj = {name: "Анна", age: 25};
const jsonString = JSON.stringify(obj);
// '{"name":"Анна","age":25}'

Парсинг JSON:
const jsonStr = '{"name":"Иван","age":30}';
const obj = JSON.parse(jsonStr);
// {name: "Иван", age: 30}

Работа с массивами:
const users = [{name: "Анна"}, {name: "Иван"}];
const json = JSON.stringify(users);

Обработка ошибок:
try {
  const obj = JSON.parse(invalidJson);
} catch (error) {
  console.log("Неверный JSON");
}

Параметры stringify:
JSON.stringify(obj, null, 2); // красивое форматирование`,
    taskTitle: "* Обработка данных пользователей *",
    taskDescription: "Преобразуйте объекты в JSON и обратно, обработайте ошибки.",
    expectedOutput: "JSON: {\"name\":\"София\",\"age\":32,\"city\":\"Москва\"}, Обратно: София из город Москва, Ошибка: Неверный JSON",
    initialCode: `const user = {
  name: "София",
  age: 32,
  city: "Москва",
  password: "secret123" // это поле не должно попасть в JSON
};

// Преобразуйте объект в JSON, исключив поле password
const userJson = JSON.stringify(user);

// Распарсите JSON обратно в объект
const parsedUser = JSON.parse(userJson);

// Попробуйте распарсить неверный JSON
const invalidJson = '{"name": "Анна", "age":}'; // неверный JSON

let errorResult;
try {
  JSON.parse(invalidJson);
  errorResult = "Успешно";
} catch (error) {
  errorResult = "Ошибка: Неверный JSON";
}

console.log("JSON: " + userJson + ", Обратно: " + parsedUser.name + " из город " + parsedUser.city + ", " + errorResult);`,
    solution: `const user = {
  name: "София",
  age: 32,
  city: "Москва",
  password: "secret123"
};

// Исключаем поле password при сериализации
const userJson = JSON.stringify(user, ['name', 'age', 'city']);

const parsedUser = JSON.parse(userJson);

const invalidJson = '{"name": "Анна", "age":}';

let errorResult;
try {
  JSON.parse(invalidJson);
  errorResult = "Успешно";
} catch (error) {
  errorResult = "Ошибка: Неверный JSON";
}

console.log("JSON: " + userJson + ", Обратно: " + parsedUser.name + " из город " + parsedUser.city + ", " + errorResult);`,
    hints: [
      "💡 Используйте JSON.stringify() для преобразования в строку",
      "💡 Второй параметр stringify может быть массивом полей для включения",
      "💡 JSON.parse() преобразует строку обратно в объект",
      "💡 Используйте try/catch для обработки ошибок парсинга"
    ]
  },
  {
    id: 18,
    name: "Замыкания",
    description: "Изучите мощную концепцию замыканий в JavaScript.",
    tutorial: `📖 Замыкания в JavaScript

Замыкание - это функция, которая имеет доступ к переменным из внешней области видимости.

Простое замыкание:
function outer(x) {
  function inner(y) {
    return x + y; // доступ к x из внешней функции
  }
  return inner;
}

const addFive = outer(5);
console.log(addFive(3)); // 8

Практическое применение:
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

Приватные переменные:
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: (amount) => balance += amount,
    getBalance: () => balance
  };
}`,
    taskTitle: "* Создание счетчика *",
    taskDescription: "Создайте функцию-фабрику для создания счетчиков с разными шагами.",
    expectedOutput: "Счетчик 1: 2, 4, 6. Счетчик 2: 5, 10, 15",
    initialCode: `// Создайте функцию createCounter, которая принимает step (шаг)
// и возвращает функцию-счетчик
function createCounter(step) {
  // Создайте приватную переменную count
  
  // Верните функцию, которая увеличивает count на step и возвращает новое значение
  
}

// Создайте два счетчика
const counter1 = createCounter(2);
const counter2 = createCounter(5);

// Используйте счетчики
const results1 = [counter1(), counter1(), counter1()];
const results2 = [counter2(), counter2(), counter2()];

console.log("Счетчик 1: " + results1.join(", ") + ". Счетчик 2: " + results2.join(", "));`,
    solution: `function createCounter(step) {
  let count = 0;
  
  return function() {
    count += step;
    return count;
  };
}

const counter1 = createCounter(2);
const counter2 = createCounter(5);

const results1 = [counter1(), counter1(), counter1()];
const results2 = [counter2(), counter2(), counter2()];

console.log("Счетчик 1: " + results1.join(", ") + ". Счетчик 2: " + results2.join(", "));`,
    hints: [
      "💡 Объявите переменную count внутри createCounter",
      "💡 Верните функцию, которая изменяет и возвращает count",
      "💡 Переменная count будет 'захвачена' возвращаемой функцией",
      "💡 Каждый вызов createCounter создает новую область видимости"
    ]
  },
  {
    id: 19,
    name: "Регулярные выражения",
    description: "Изучите мощный инструмент для работы с текстом.",
    tutorial: `📖 Регулярные выражения в JavaScript

Регулярные выражения (regex) позволяют искать и обрабатывать текст по шаблонам.

Создание регулярного выражения:
const regex1 = /hello/i; // i = игнорировать регистр
const regex2 = new RegExp("world", "g"); // g = глобальный поиск

Основные методы:
const text = "Hello World";
text.match(/world/i); // ["World"]
text.replace(/hello/i, "Hi"); // "Hi World"
/hello/i.test(text); // true

Специальные символы:
• . - любой символ
• * - 0 или более повторений
• + - 1 или более повторений
• ? - 0 или 1 повторение
• \\d - цифра
• \\w - буква или цифра
• \\s - пробельный символ

Группы и классы:
[abc] - любой из символов a, b, c
[0-9] - любая цифра
(abc) - группа символов`,
    taskTitle: "* Валидация данных *",
    taskDescription: "Используйте регулярные выражения для проверки email и телефона.",
    expectedOutput: "Email test@example.com: true, Email invalid-email: false, Телефон +7-123-456-78-90: true",
    initialCode: `// Создайте регулярное выражение для проверки email
// Должно содержать @ и точку после @
const emailRegex = //;

// Создайте регулярное выражение для проверки российского номера телефона
// Формат: +7-XXX-XXX-XX-XX
const phoneRegex = //;

// Тестовые данные
const email1 = "test@example.com";
const email2 = "invalid-email";
const phone1 = "+7-123-456-78-90";

// Проверьте данные
const emailTest1 = emailRegex.test(email1);
const emailTest2 = emailRegex.test(email2);
const phoneTest1 = phoneRegex.test(phone1);

console.log("Email " + email1 + ": " + emailTest1 + ", Email " + email2 + ": " + emailTest2 + ", Телефон " + phone1 + ": " + phoneTest1);`,
    solution: `const emailRegex = /^[^@]+@[^@]+\\.[^@]+$/;
const phoneRegex = /^\\+7-\\d{3}-\\d{3}-\\d{2}-\\d{2}$/;

const email1 = "test@example.com";
const email2 = "invalid-email";
const phone1 = "+7-123-456-78-90";

const emailTest1 = emailRegex.test(email1);
const emailTest2 = emailRegex.test(email2);
const phoneTest1 = phoneRegex.test(phone1);

console.log("Email " + email1 + ": " + emailTest1 + ", Email " + email2 + ": " + emailTest2 + ", Телефон " + phone1 + ": " + phoneTest1);`,
    hints: [
      "💡 Используйте /pattern/ для создания регулярного выражения",
      "💡 ^ означает начало строки, $ означает конец",
      "💡 \\d означает цифру, {3} означает ровно 3 повторения",
      "💡 Используйте метод .test() для проверки соответствия"
    ]
  },
  // Уровни 20-29: Продвинутый уровень
  {
    id: 20,
    name: "Map и Set",
    description: "Изучите новые коллекции данных ES6.",
    tutorial: `📖 Map и Set в JavaScript

Map и Set - это новые типы коллекций в ES6.

Map - коллекция ключ-значение:
const map = new Map();
map.set('name', 'Анна');
map.set(1, 'число');
map.get('name'); // 'Анна'
map.has('name'); // true
map.delete('name');
map.size; // количество элементов

Итерация по Map:
for (const [key, value] of map) {
  console.log(key, value);
}

Set - коллекция уникальных значений:
const set = new Set();
set.add(1);
set.add(2);
set.add(1); // дубликат, не добавится
set.has(1); // true
set.size; // 2

Преобразование массива в Set:
const uniqueNumbers = new Set([1, 1, 2, 3, 3]); // Set {1, 2, 3}`,
    taskTitle: "* Система тегов *",
    taskDescription: "Используйте Map для подсчета тегов и Set для уникальных значений.",
    expectedOutput: "Уникальные теги: javascript, react, nodejs. Популярные теги: javascript: 3, react: 2",
    initialCode: `const articles = [
  {title: "Изучаем JS", tags: ["javascript", "основы"]},
  {title: "React hooks", tags: ["react", "javascript"]},
  {title: "Node.js сервер", tags: ["nodejs", "javascript"]},
  {title: "React компоненты", tags: ["react", "components"]}
];

// Создайте Set для уникальных тегов
const uniqueTags = new Set();

// Создайте Map для подсчета количества каждого тега
const tagCounts = new Map();

// Обработайте все теги из всех статей
for (const article of articles) {
  for (const tag of article.tags) {
    // Добавьте тег в Set
    
    // Увеличьте счетчик для тега в Map
    
  }
}

// Найдите теги, которые встречаются больше 1 раза
const popularTags = [];
for (const [tag, count] of tagCounts) {
  if (count > 1) {
    popularTags.push(tag + ": " + count);
  }
}

console.log("Уникальные теги: " + Array.from(uniqueTags).join(", ") + ". Популярные теги: " + popularTags.join(", "));`,
    solution: `const articles = [
  {title: "Изучаем JS", tags: ["javascript", "основы"]},
  {title: "React hooks", tags: ["react", "javascript"]},
  {title: "Node.js сервер", tags: ["nodejs", "javascript"]},
  {title: "React компоненты", tags: ["react", "components"]}
];

const uniqueTags = new Set();
const tagCounts = new Map();

for (const article of articles) {
  for (const tag of article.tags) {
    uniqueTags.add(tag);
    tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
  }
}

const popularTags = [];
for (const [tag, count] of tagCounts) {
  if (count > 1) {
    popularTags.push(tag + ": " + count);
  }
}

console.log("Уникальные теги: " + Array.from(uniqueTags).join(", ") + ". Популярные теги: " + popularTags.join(", "));`,
    hints: [
      "💡 Используйте set.add() для добавления в Set",
      "💡 Используйте map.set() и map.get() для работы с Map",
      "💡 Используйте || 0 для установки значения по умолчанию",
      "💡 Array.from() преобразует Set в массив"
    ]
  },
  {
    id: 21,
    name: "Fetch API",
    description: "Изучите современный способ выполнения HTTP-запросов.",
    tutorial: `📖 Fetch API в JavaScript

Fetch API - современный способ выполнения HTTP-запросов.

Базовый GET запрос:
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data));

Использование с async/await:
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

POST запрос:
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({name: 'Анна'})
});

Проверка статуса ответа:
if (!response.ok) {
  throw new Error('Ошибка HTTP: ' + response.status);
}`,
    taskTitle: "* Загрузка данных пользователя *",
    taskDescription: "Симулируйте загрузку данных пользователя с обработкой ошибок.",
    expectedOutput: "Пользователь загружен: Андрей",
    initialCode: `// Симуляция fetch API
function mockFetch(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('/users/1')) {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({id: 1, name: 'Андрей'})
        });
      } else {
        resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({error: 'Пользователь не найден'})
        });
      }
    }, 500);
  });
}

// Создайте async функцию loadUser
async function loadUser(userId) {
  try {
    // Выполните запрос с помощью mockFetch
    const response = await mockFetch(\`/users/\${userId}\`);
    
    // Проверьте, успешен ли ответ
    if (!response.ok) {
      throw new Error('Пользователь не найден');
    }
    
    // Получите JSON данные
    const user = await response.json();
    
    console.log("Пользователь загружен: " + user.name);
    return user;
  } catch (error) {
    console.log("Ошибка загрузки: " + error.message);
  }
}

// Вызовите функцию
loadUser(1);`,
    solution: `function mockFetch(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('/users/1')) {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({id: 1, name: 'Андрей'})
        });
      } else {
        resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({error: 'Пользователь не найден'})
        });
      }
    }, 500);
  });
}

async function loadUser(userId) {
  try {
    const response = await mockFetch(\`/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error('Пользователь не найден');
    }
    
    const user = await response.json();
    
    console.log("Пользователь загружен: " + user.name);
    return user;
  } catch (error) {
    console.log("Ошибка загрузки: " + error.message);
  }
}

loadUser(1);`,
    hints: [
      "💡 Используйте await для ожидания результата fetch",
      "💡 Проверяйте response.ok перед обработкой данных",
      "💡 Используйте response.json() для получения JSON данных",
      "💡 Оберните код в try/catch для обработки ошибок"
    ]
  },
  {
    id: 22,
    name: "LocalStorage",
    description: "Изучите сохранение данных в браузере пользователя.",
    tutorial: `📖 LocalStorage в JavaScript

LocalStorage позволяет сохранять данные в браузере пользователя.

Сохранение данных:
localStorage.setItem('username', 'Анна');
localStorage.setItem('settings', JSON.stringify({theme: 'dark'}));

Получение данных:
const username = localStorage.getItem('username');
const settings = JSON.parse(localStorage.getItem('settings'));

Удаление данных:
localStorage.removeItem('username');
localStorage.clear(); // удалить все

Проверка поддержки:
if (typeof(Storage) !== "undefined") {
  // LocalStorage поддерживается
}

Обработка событий изменения:
window.addEventListener('storage', (e) => {
  console.log('Изменился ключ:', e.key);
});

Важно: LocalStorage сохраняет только строки!`,
    taskTitle: "* Система настроек *",
    taskDescription: "Создайте систему сохранения и загрузки пользовательских настроек.",
    expectedOutput: "Настройки сохранены. Загруженная тема: dark, язык: ru",
    initialCode: `// Симуляция localStorage для тестирования
const mockLocalStorage = {
  data: {},
  setItem(key, value) {
    this.data[key] = value;
  },
  getItem(key) {
    return this.data[key] || null;
  },
  removeItem(key) {
    delete this.data[key];
  }
};

// Используем mockLocalStorage вместо localStorage для тестирования
const storage = mockLocalStorage;

// Создайте объект с настройками пользователя
const userSettings = {
  theme: 'dark',
  language: 'ru',
  notifications: true
};

// Сохраните настройки в localStorage
// Помните: localStorage сохраняет только строки

// Загрузите настройки из localStorage
const loadedSettings = null; // замените на код загрузки

// Проверьте, что настройки загрузились правильно
if (loadedSettings) {
  console.log("Настройки сохранены. Загруженная тема: " + loadedSettings.theme + ", язык: " + loadedSettings.language);
} else {
  console.log("Ошибка загрузки настроек");
}`,
    solution: `const mockLocalStorage = {
  data: {},
  setItem(key, value) {
    this.data[key] = value;
  },
  getItem(key) {
    return this.data[key] || null;
  },
  removeItem(key) {
    delete this.data[key];
  }
};

const storage = mockLocalStorage;

const userSettings = {
  theme: 'dark',
  language: 'ru',
  notifications: true
};

// Сохраняем настройки как JSON строку
storage.setItem('userSettings', JSON.stringify(userSettings));

// Загружаем и парсим настройки
const settingsString = storage.getItem('userSettings');
const loadedSettings = settingsString ? JSON.parse(settingsString) : null;

if (loadedSettings) {
  console.log("Настройки сохранены. Загруженная тема: " + loadedSettings.theme + ", язык: " + loadedSettings.language);
} else {
  console.log("Ошибка загрузки настроек");
}`,
    hints: [
      "💡 Используйте JSON.stringify() для преобразования объекта в строку",
      "💡 Используйте JSON.parse() для преобразования строки обратно в объект",
      "💡 Проверяйте, что данные существуют перед парсингом",
      "💡 localStorage.getItem() возвращает null, если ключ не найден"
    ]
  },
  {
    id: 23,
    name: "WeakMap и WeakSet",
    description: "Изучите коллекции со слабыми ссылками.",
    tutorial: `📖 WeakMap и WeakSet в JavaScript

WeakMap и WeakSet - коллекции со слабыми ссылками на объекты.

WeakMap:
const wm = new WeakMap();
const obj = {};
wm.set(obj, 'значение');
wm.get(obj); // 'значение'
wm.has(obj); // true
wm.delete(obj);

Особенности WeakMap:
• Ключи могут быть только объектами
• Не итерируется
• Автоматическая сборка мусора
• Нет свойства size

WeakSet:
const ws = new WeakSet();
const obj1 = {};
ws.add(obj1);
ws.has(obj1); // true
ws.delete(obj1);

Практическое применение:
// Приватные данные
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, {name});
  }
  
  getName() {
    return privateData.get(this).name;
  }
}`,
    taskTitle: "* Приватные данные классов *",
    taskDescription: "Используйте WeakMap для создания приватных свойств класса.",
    expectedOutput: "Счет: 100, Попытка прямого доступа: undefined",
    initialCode: `// Создайте WeakMap для хранения приватных данных
const privateData = new WeakMap();

class BankAccount {
  constructor(initialBalance) {
    // Сохраните баланс в WeakMap
    
  }
  
  getBalance() {
    // Получите баланс из WeakMap
    
  }
  
  deposit(amount) {
    // Получите текущий баланс, увеличьте его и сохраните обратно
    
  }
  
  withdraw(amount) {
    const data = privateData.get(this);
    if (data.balance >= amount) {
      data.balance -= amount;
      return true;
    }
    return false;
  }
}

const account = new BankAccount(100);
console.log("Счет: " + account.getBalance());

// Попытка прямого доступа к приватным данным
console.log("Попытка прямого доступа: " + account.balance);`,
    solution: `const privateData = new WeakMap();

class BankAccount {
  constructor(initialBalance) {
    privateData.set(this, {balance: initialBalance});
  }
  
  getBalance() {
    return privateData.get(this).balance;
  }
  
  deposit(amount) {
    const data = privateData.get(this);
    data.balance += amount;
  }
  
  withdraw(amount) {
    const data = privateData.get(this);
    if (data.balance >= amount) {
      data.balance -= amount;
      return true;
    }
    return false;
  }
}

const account = new BankAccount(100);
console.log("Счет: " + account.getBalance());
console.log("Попытка прямого доступа: " + account.balance);`,
    hints: [
      "💡 Используйте WeakMap.set(this, data) для сохранения приватных данных",
      "💡 Используйте WeakMap.get(this) для получения приватных данных",
      "💡 Приватные данные недоступны извне класса",
      "💡 WeakMap автоматически очищается при удалении объекта"
    ]
  },
  {
    id: 24,
    name: "Symbol и итераторы",
    description: "Изучите Symbol и создание собственных итераторов.",
    tutorial: `📖 Symbol и итераторы в JavaScript

Symbol - уникальный примитивный тип данных.

Создание Symbol:
const sym1 = Symbol();
const sym2 = Symbol('описание');
const sym3 = Symbol('описание');
sym2 !== sym3 // true, каждый Symbol уникален

Symbol как ключ объекта:
const obj = {};
const sym = Symbol('key');
obj[sym] = 'значение';

Итераторы:
const iterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return {value: this.data[index++], done: false};
        }
        return {done: true};
      }
    };
  }
};

for (const item of iterable) {
  console.log(item); // 1, 2, 3
}`,
    taskTitle: "* Создание итератора *",
    taskDescription: "Создайте класс Range с собственным итератором для перебора чисел.",
    expectedOutput: "Числа от 1 до 5: 1, 2, 3, 4, 5",
    initialCode: `class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  // Добавьте метод Symbol.iterator
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    
    return {
      next() {
        // Реализуйте логику итератора
        // Должен возвращать {value: число, done: false} или {done: true}
        
      }
    };
  }
}

const range = new Range(1, 5);
const numbers = [];

// Используйте for...of для перебора
for (const num of range) {
  numbers.push(num);
}

console.log("Числа от 1 до 5: " + numbers.join(", "));`,
    solution: `class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    
    return {
      next() {
        if (current <= end) {
          return {value: current++, done: false};
        }
        return {done: true};
      }
    };
  }
}

const range = new Range(1, 5);
const numbers = [];

for (const num of range) {
  numbers.push(num);
}

console.log("Числа от 1 до 5: " + numbers.join(", "));`,
    hints: [
      "💡 Используйте [Symbol.iterator]() для создания итератора",
      "💡 Метод next() должен возвращать объект с value и done",
      "💡 done: false означает продолжение итерации",
      "💡 done: true означает конец итерации"
    ]
  },
  {
    id: 25,
    name: "Генераторы",
    description: "Изучите функции-генераторы для ленивого создания последовательностей.",
    tutorial: `📖 Генераторы в JavaScript

Генераторы - функции, которые могут приостанавливать и возобновлять выполнение.

Создание генератора:
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();
console.log(gen.next()); // {value: 1, done: false}
console.log(gen.next()); // {value: 2, done: false}

Бесконечный генератор:
function* infiniteNumbers() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

Делегирование генератора:
function* gen1() {
  yield 1;
  yield 2;
}

function* gen2() {
  yield* gen1();
  yield 3;
}

Генератор с параметрами:
function* paramGenerator() {
  const x = yield 'введите x';
  const y = yield 'введите y';
  return x + y;
}`,
    taskTitle: "* Генератор последовательности Фибоначчи *",
    taskDescription: "Создайте генератор для чисел Фибоначчи.",
    expectedOutput: "Первые 7 чисел Фибоначчи: 0, 1, 1, 2, 3, 5, 8",
    initialCode: `// Создайте генератор fibonacci
function* fibonacci() {
  let a = 0;
  let b = 1;
  
  // Бесконечно генерируйте числа Фибоначчи
  while (true) {
    // Выдайте текущее число a
    
    // Вычислите следующие числа последовательности
    
  }
}

// Получите первые 7 чисел Фибоначчи
const fibGen = fibonacci();
const fibNumbers = [];

for (let i = 0; i < 7; i++) {
  const result = fibGen.next();
  fibNumbers.push(result.value);
}

console.log("Первые 7 чисел Фибоначчи: " + fibNumbers.join(", "));`,
    solution: `function* fibonacci() {
  let a = 0;
  let b = 1;
  
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fibGen = fibonacci();
const fibNumbers = [];

for (let i = 0; i < 7; i++) {
  const result = fibGen.next();
  fibNumbers.push(result.value);
}

console.log("Первые 7 чисел Фибоначчи: " + fibNumbers.join(", "));`,
    hints: [
      "💡 Используйте function* для объявления генератора",
      "💡 Используйте yield для выдачи значений",
      "💡 Деструктуризация [a, b] = [b, a + b] для обновления значений",
      "💡 while (true) создает бесконечный генератор"
    ]
  },
  {
    id: 26,
    name: "Proxy и Reflect",
    description: "Изучите перехват и настройку операций с объектами.",
    tutorial: `📖 Proxy и Reflect в JavaScript

Proxy позволяет перехватывать и настраивать операции с объектами.

Создание Proxy:
const target = {name: 'Анна'};
const proxy = new Proxy(target, {
  get(obj, prop) {
    console.log(\`Чтение свойства \${prop}\`);
    return obj[prop];
  },
  set(obj, prop, value) {
    console.log(\`Запись свойства \${prop} = \${value}\`);
    obj[prop] = value;
    return true;
  }
});

Валидация с Proxy:
const user = new Proxy({}, {
  set(obj, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new Error('Возраст должен быть числом');
    }
    obj[prop] = value;
    return true;
  }
});

Reflect API:
Reflect.get(obj, 'prop');
Reflect.set(obj, 'prop', value);
Reflect.has(obj, 'prop');
Reflect.deleteProperty(obj, 'prop');`,
    taskTitle: "* Валидация объекта *",
    taskDescription: "Создайте Proxy для валидации свойств пользователя.",
    expectedOutput: "Пользователь создан: Михаил, возраст 30. Ошибка: Возраст должен быть положительным числом",
    initialCode: `// Создайте Proxy для валидации объекта User
function createValidatedUser() {
  return new Proxy({}, {
    set(target, property, value) {
      // Валидация для свойства 'name'
      if (property === 'name') {
        if (typeof value !== 'string' || value.length < 2) {
          throw new Error('Имя должно быть строкой длиной минимум 2 символа');
        }
      }
      
      // Валидация для свойства 'age'
      if (property === 'age') {
        // Добавьте проверку: должно быть числом и больше 0
        
      }
      
      // Сохраните значение
      target[property] = value;
      return true;
    },
    
    get(target, property) {
      // Верните значение свойства
      return target[property];
    }
  });
}

// Тестирование
const user1 = createValidatedUser();
user1.name = 'Михаил';
user1.age = 30;

console.log("Пользователь создан: " + user1.name + ", возраст " + user1.age);

// Тест с ошибкой
const user2 = createValidatedUser();
try {
  user2.age = -5;
} catch (error) {
  console.log("Ошибка: " + error.message);
}`,
    solution: `function createValidatedUser() {
  return new Proxy({}, {
    set(target, property, value) {
      if (property === 'name') {
        if (typeof value !== 'string' || value.length < 2) {
          throw new Error('Имя должно быть строкой длиной минимум 2 символа');
        }
      }
      
      if (property === 'age') {
        if (typeof value !== 'number' || value <= 0) {
          throw new Error('Возраст должен быть положительным числом');
        }
      }
      
      target[property] = value;
      return true;
    },
    
    get(target, property) {
      return target[property];
    }
  });
}

const user1 = createValidatedUser();
user1.name = 'Михаил';
user1.age = 30;

console.log("Пользователь создан: " + user1.name + ", возраст " + user1.age);

const user2 = createValidatedUser();
try {
  user2.age = -5;
} catch (error) {
  console.log("Ошибка: " + error.message);
}`,
    hints: [
      "💡 Используйте new Proxy(target, handler) для создания прокси",
      "💡 Метод set срабатывает при записи свойства",
      "💡 Проверяйте typeof value для валидации типа",
      "💡 Возвращайте true из set для успешной записи"
    ]
  },
  {
    id: 27,
    name: "Web Workers",
    description: "Изучите выполнение JavaScript в фоновых потоках.",
    tutorial: `📖 Web Workers в JavaScript

Web Workers позволяют выполнять JavaScript в фоновых потоках.

Создание Worker:
// main.js
const worker = new Worker('worker.js');

worker.postMessage({data: 'hello'});

worker.onmessage = function(e) {
  console.log('Получено:', e.data);
};

// worker.js
self.onmessage = function(e) {
  const data = e.data;
  // Выполнить тяжелые вычисления
  const result = heavyCalculation(data);
  self.postMessage(result);
};

Передача данных:
worker.postMessage({
  command: 'start',
  data: [1, 2, 3, 4, 5]
});

Завершение Worker:
worker.terminate();

Обработка ошибок:
worker.onerror = function(error) {
  console.error('Ошибка в Worker:', error);
};`,
    taskTitle: "* Симуляция Web Worker *",
    taskDescription: "Создайте симуляцию Web Worker для вычисления суммы массива.",
    expectedOutput: "Вычисления начаты. Результат: 15",
    initialCode: `// Симуляция Web Worker API
class MockWorker {
  constructor(workerFunction) {
    this.workerFunction = workerFunction;
    this.onmessage = null;
  }
  
  postMessage(data) {
    // Симулируем асинхронную работу
    setTimeout(() => {
      const result = this.workerFunction(data);
      if (this.onmessage) {
        this.onmessage({data: result});
      }
    }, 100);
  }
}

// Функция "воркера" для вычисления суммы
function workerFunction(messageData) {
  const numbers = messageData.numbers;
  let sum = 0;
  
  // Вычислите сумму массива чисел
  for (const num of numbers) {
    
  }
  
  return {
    operation: 'sum',
    result: sum
  };
}

// Создайте "воркер"
const worker = new MockWorker(workerFunction);

// Настройте обработчик сообщений
worker.onmessage = function(e) {
  const data = e.data;
  console.log("Результат: " + data.result);
};

// Отправьте данные воркеру
console.log("Вычисления начаты");
worker.postMessage({
  numbers: [1, 2, 3, 4, 5]
});`,
    solution: `class MockWorker {
  constructor(workerFunction) {
    this.workerFunction = workerFunction;
    this.onmessage = null;
  }
  
  postMessage(data) {
    setTimeout(() => {
      const result = this.workerFunction(data);
      if (this.onmessage) {
        this.onmessage({data: result});
      }
    }, 100);
  }
}

function workerFunction(messageData) {
  const numbers = messageData.numbers;
  let sum = 0;
  
  for (const num of numbers) {
    sum += num;
  }
  
  return {
    operation: 'sum',
    result: sum
  };
}

const worker = new MockWorker(workerFunction);

worker.onmessage = function(e) {
  const data = e.data;
  console.log("Результат: " + data.result);
};

console.log("Вычисления начаты");
worker.postMessage({
  numbers: [1, 2, 3, 4, 5]
});`,
    hints: [
      "💡 Web Worker общается через postMessage и onmessage",
      "💡 Данные передаются асинхронно между потоками",
      "💡 Используйте цикл for...of для суммирования",
      "💡 Worker возвращает результат через postMessage"
    ]
  },
  {
    id: 28,
    name: "Service Workers",
    description: "Изучите основы Service Workers для кеширования и PWA.",
    tutorial: `📖 Service Workers в JavaScript

Service Workers работают как прокси между приложением и сетью.

Регистрация Service Worker:
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('SW зарегистрирован');
    });
}

События в Service Worker:
// sw.js
self.addEventListener('install', event => {
  console.log('Service Worker установлен');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

Кеширование:
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(['/index.html', '/app.js']);
    })
  );
});

Обновление кеша:
self.addEventListener('activate', event => {
  // Очистка старых кешей
});`,
    taskTitle: "* Симуляция Service Worker *",
    taskDescription: "Создайте базовую логику Service Worker для кеширования ресурсов.",
    expectedOutput: "SW установлен и активирован. Запрос /api/data: найден в кеше. Запрос /new-api: загружен из сети",
    initialCode: `// Симуляция Service Worker API
class MockServiceWorker {
  constructor() {
    this.cache = new Map();
    this.listeners = new Map();
  }
  
  addEventListener(eventType, handler) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(handler);
  }
  
  triggerEvent(eventType, eventData) {
    const handlers = this.listeners.get(eventType) || [];
    handlers.forEach(handler => handler(eventData));
  }
  
  // Симуляция кеша
  addToCache(url, response) {
    this.cache.set(url, response);
  }
  
  getFromCache(url) {
    return this.cache.get(url);
  }
}

// Создайте mock Service Worker
const sw = new MockServiceWorker();

// Добавьте обработчик события install
sw.addEventListener('install', (event) => {
  // Добавьте в кеш ресурс '/api/data' с ответом 'cached data'
  
  console.log('SW установлен и активирован');
});

// Добавьте обработчик события fetch
sw.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Проверьте, есть ли ресурс в кеше
  const cachedResponse = sw.getFromCache(url);
  
  if (cachedResponse) {
    console.log("Запрос " + url + ": найден в кеше");
  } else {
    console.log("Запрос " + url + ": загружен из сети");
  }
});

// Симулируйте события
sw.triggerEvent('install', {});
sw.triggerEvent('fetch', {request: {url: '/api/data'}});
sw.triggerEvent('fetch', {request: {url: '/new-api'}});`,
    solution: `class MockServiceWorker {
  constructor() {
    this.cache = new Map();
    this.listeners = new Map();
  }
  
  addEventListener(eventType, handler) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(handler);
  }
  
  triggerEvent(eventType, eventData) {
    const handlers = this.listeners.get(eventType) || [];
    handlers.forEach(handler => handler(eventData));
  }
  
  addToCache(url, response) {
    this.cache.set(url, response);
  }
  
  getFromCache(url) {
    return this.cache.get(url);
  }
}

const sw = new MockServiceWorker();

sw.addEventListener('install', (event) => {
  sw.addToCache('/api/data', 'cached data');
  console.log('SW установлен и активирован');
});

sw.addEventListener('fetch', (event) => {
  const url = event.request.url;
  const cachedResponse = sw.getFromCache(url);
  
  if (cachedResponse) {
    console.log("Запрос " + url + ": найден в кеше");
  } else {
    console.log("Запрос " + url + ": загружен из сети");
  }
});

sw.triggerEvent('install', {});
sw.triggerEvent('fetch', {request: {url: '/api/data'}});
sw.triggerEvent('fetch', {request: {url: '/new-api'}});`,
    hints: [
      "💡 Service Worker кеширует ресурсы для офлайн работы",
      "💡 addEventListener регистрирует обработчики событий",
      "💡 Событие install происходит при установке SW",
      "💡 Событие fetch перехватывает сетевые запросы"
    ]
  },
  {
    id: 29,
    name: "Финальный мастер-класс",
    description: "Объедините все изученные концепции в одном проекте.",
    tutorial: `📖 Финальный мастер-класс

В этом уровне вы объедините все изученные концепции:
• ES6+ синтаксис (классы, модули, async/await)
• Работа с данными (Map, Set, JSON)
• Асинхронность (Promise, fetch)
• Функциональное программирование
• Метапрограммирование (Proxy, Symbol)

Создайте полноценное приложение для управления задачами с:
• Классовой архитектурой
• Асинхронной загрузкой данных
• Валидацией через Proxy
• Кешированием в localStorage
• Обработкой ошибок

Это испытание покажет ваш уровень владения JavaScript!

Удачи, мастер кода!`,
    taskTitle: "* Система управления задачами *",
    taskDescription: "Создайте полную систему управления задачами с валидацией, кешированием и асинхронностью.",
    expectedOutput: "Задача создана: Изучить React. Задачи загружены из кеша: 1. Задача завершена: Изучить React",
    initialCode: `// Создайте систему управления задачами

// 1. Создайте класс Task
class Task {
  constructor(id, title, completed = false) {
    // Инициализируйте свойства
    
  }
  
  complete() {
    // Пометьте задачу как выполненную
    
  }
  
  toJSON() {
    // Верните объект для сериализации
    
  }
}

// 2. Создайте класс TaskManager с валидацией через Proxy
class TaskManager {
  constructor() {
    this.tasks = new Map();
    this.nextId = 1;
    
    // Оберните в Proxy для валидации
    return new Proxy(this, {
      set(target, property, value) {
        // Добавьте валидацию для критических свойств
        
        target[property] = value;
        return true;
      }
    });
  }
  
  async createTask(title) {
    // Создайте задачу с валидацией
    if (!title || title.length < 3) {
      throw new Error('Название должно быть длиннее 2 символов');
    }
    
    const task = new Task(this.nextId++, title);
    this.tasks.set(task.id, task);
    
    // Сохраните в localStorage
    await this.saveToStorage();
    
    console.log("Задача создана: " + title);
    return task;
  }
  
  async loadFromStorage() {
    // Загрузите задачи из localStorage
    
  }
  
  async saveToStorage() {
    // Сохраните задачи в localStorage
    
  }
  
  completeTask(id) {
    const task = this.tasks.get(id);
    if (task) {
      task.complete();
      console.log("Задача завершена: " + task.title);
    }
  }
}

// 3. Тестирование системы
async function testTaskManager() {
  const manager = new TaskManager();
  
  // Загрузите данные из кеша
  await manager.loadFromStorage();
  
  // Создайте задачу
  await manager.createTask("Изучить React");
  
  // Завершите задачу
  manager.completeTask(1);
}

// Запустите тест
testTaskManager();`,
    solution: `class Task {
  constructor(id, title, completed = false) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.createdAt = new Date().toISOString();
  }
  
  complete() {
    this.completed = true;
  }
  
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      createdAt: this.createdAt
    };
  }
}

class TaskManager {
  constructor() {
    this.tasks = new Map();
    this.nextId = 1;
    
    return new Proxy(this, {
      set(target, property, value) {
        if (property === 'nextId' && typeof value !== 'number') {
          throw new Error('nextId должно быть числом');
        }
        target[property] = value;
        return true;
      }
    });
  }
  
  async createTask(title) {
    if (!title || title.length < 3) {
      throw new Error('Название должно быть длиннее 2 символов');
    }
    
    const task = new Task(this.nextId++, title);
    this.tasks.set(task.id, task);
    
    await this.saveToStorage();
    
    console.log("Задача создана: " + title);
    return task;
  }
  
  async loadFromStorage() {
    try {
      const stored = localStorage.getItem('tasks');
      if (stored) {
        const tasksData = JSON.parse(stored);
        for (const taskData of tasksData) {
          const task = new Task(taskData.id, taskData.title, taskData.completed);
          this.tasks.set(task.id, task);
        }
        this.nextId = Math.max(...Array.from(this.tasks.keys())) + 1;
        console.log("Задачи загружены из кеша: " + this.tasks.size);
      }
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  }
  
  async saveToStorage() {
    try {
      const tasksArray = Array.from(this.tasks.values()).map(task => task.toJSON());
      localStorage.setItem('tasks', JSON.stringify(tasksArray));
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  }
  
  completeTask(id) {
    const task = this.tasks.get(id);
    if (task) {
      task.complete();
      console.log("Задача завершена: " + task.title);
    }
  }
}

// Симуляция localStorage
const mockStorage = {
  data: {},
  getItem(key) { return this.data[key] || null; },
  setItem(key, value) { this.data[key] = value; }
};
const localStorage = mockStorage;

async function testTaskManager() {
  const manager = new TaskManager();
  await manager.loadFromStorage();
  await manager.createTask("Изучить React");
  manager.completeTask(1);
}

testTaskManager();`,
    hints: [
      "💡 Используйте Map для хранения задач по ID",
      "💡 Proxy нужен для валидации критических свойств",
      "💡 JSON.stringify/parse для работы с localStorage",
      "💡 async/await для асинхронных операций с хранилищем",
      "💡 Обрабатывайте ошибки с помощью try/catch"
    ]
  }
];
