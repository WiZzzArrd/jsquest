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
    name: "Variables & Data Types",
    description: "Learn the fundamentals of storing and manipulating data in JavaScript.",
    tutorial: `📖 Variables in JavaScript

Variables are containers that store data values.

Example:
let name = "Hero";
const age = 25;
var score = 100;

Use let for variables that can change.
Use const for constants that won't change.
Use var for older JavaScript (not recommended).

Data Types:
• String: "Hello World"
• Number: 42, 3.14
• Boolean: true, false
• Undefined: undefined
• Null: null`,
    taskTitle: "* Fix the Broken Code *",
    taskDescription: "The variables below have errors. Fix them to make the code work properly!",
    expectedOutput: "Hello, my name is Alex and I am 25 years old.",
    initialCode: `let nam = "Alex;
const age = 25
var message = "Hello, my name is " + name + " and I am " + age + " years old."
console.log(messag);`,
    solution: `let name = "Alex";
const age = 25;
var message = "Hello, my name is " + name + " and I am " + age + " years old.";
console.log(message);`,
    hints: [
      "💡 Check your variable names - they should match when used later",
      "💡 Don't forget semicolons at the end of statements",
      "💡 Make sure your strings are properly quoted",
      "💡 Check the console.log statement for typos"
    ]
  },
  {
    id: 1,
    name: "Functions",
    description: "Create reusable blocks of code that perform specific tasks.",
    tutorial: `📖 Functions in JavaScript

Functions are reusable blocks of code that perform specific tasks.

Syntax:
function functionName(parameters) {
  // code to execute
  return result;
}

Example:
function greet(name) {
  return "Hello, " + name + "!";
}

Arrow Functions:
const add = (a, b) => a + b;

Function calls:
greet("Alice"); // Returns: "Hello, Alice!"
add(5, 3); // Returns: 8`,
    taskTitle: "* Create a Calculator Function *",
    taskDescription: "Create a function that takes two numbers and returns their sum.",
    expectedOutput: "The sum of 5 and 3 is: 8",
    initialCode: `// Create a function called 'add' that takes two parameters
function add(a, b) {
  // Return the sum of a and b
  
}

// Call the function and store the result
const result = add(5, 3);
console.log("The sum of 5 and 3 is: " + result);`,
    solution: `function add(a, b) {
  return a + b;
}

const result = add(5, 3);
console.log("The sum of 5 and 3 is: " + result);`,
    hints: [
      "💡 Use the 'return' keyword to send a value back from the function",
      "💡 Add the two parameters together using the + operator",
      "💡 Make sure your function has the correct name",
      "💡 Don't forget to return the result from your function"
    ]
  },
  {
    id: 2,
    name: "Arrays",
    description: "Store multiple values in a single variable using arrays.",
    tutorial: `📖 Arrays in JavaScript

Arrays store multiple values in a single variable.

Creating Arrays:
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];

Accessing Elements:
fruits[0] // "apple" (first element)
fruits[1] // "banana" (second element)

Array Properties:
fruits.length // 3 (number of elements)

Common Methods:
• push() - adds to end
• pop() - removes from end
• shift() - removes from start
• unshift() - adds to start`,
    taskTitle: "* Array Manipulation *",
    taskDescription: "Fix the code to properly access and modify the array.",
    expectedOutput: "First fruit: apple, Last fruit: grape, Total fruits: 4",
    initialCode: `const fruits = ["apple", "banana", "orange"];

// Add a new fruit to the end
fruits.push("grape");

// Get the first fruit
const firstFruit = fruits[];

// Get the last fruit  
const lastFruit = fruits[fruits.length];

// Get the total number of fruits
const totalFruits = fruits.length;

console.log("First fruit: " + firstFruit + ", Last fruit: " + lastFruit + ", Total fruits: " + totalFruits);`,
    solution: `const fruits = ["apple", "banana", "orange"];

fruits.push("grape");

const firstFruit = fruits[0];
const lastFruit = fruits[fruits.length - 1];
const totalFruits = fruits.length;

console.log("First fruit: " + firstFruit + ", Last fruit: " + lastFruit + ", Total fruits: " + totalFruits);`,
    hints: [
      "💡 Array indexes start at 0, so the first element is at index 0",
      "💡 The last element is at index (length - 1)",
      "💡 Don't forget to specify an index when accessing array elements",
      "💡 Use square brackets [] to access array elements"
    ]
  },
  {
    id: 3,
    name: "Objects",
    description: "Group related data and functions together using objects.",
    tutorial: `📖 Objects in JavaScript

Objects group related data and functions together.

Creating Objects:
const person = {
  name: "John",
  age: 30,
  city: "New York"
};

Accessing Properties:
person.name // "John"
person["age"] // 30

Adding Properties:
person.job = "Developer";

Methods in Objects:
const car = {
  brand: "Toyota",
  start: function() {
    return "Car started!";
  }
};`,
    taskTitle: "* Object Properties *",
    taskDescription: "Fix the code to properly access object properties and methods.",
    expectedOutput: "Hero: Alice, Level: 5, Weapon: sword, Action: Attack with sword!",
    initialCode: `const hero = {
  name: "Alice",
  level: 5,
  weapon: "sword",
  attack: function() {
    return "Attack with " + this.weapon + "!";
  }
};

// Access the hero's properties
const heroName = hero.;
const heroLevel = hero[""];
const heroWeapon = hero.weapon;

// Call the attack method
const action = hero.();

console.log("Hero: " + heroName + ", Level: " + heroLevel + ", Weapon: " + heroWeapon + ", Action: " + action);`,
    solution: `const hero = {
  name: "Alice",
  level: 5,
  weapon: "sword",
  attack: function() {
    return "Attack with " + this.weapon + "!";
  }
};

const heroName = hero.name;
const heroLevel = hero["level"];
const heroWeapon = hero.weapon;

const action = hero.attack();

console.log("Hero: " + heroName + ", Level: " + heroLevel + ", Weapon: " + heroWeapon + ", Action: " + action);`,
    hints: [
      "💡 Use dot notation (object.property) to access properties",
      "💡 Use bracket notation (object['property']) with quotes for property names",
      "💡 Don't forget parentheses () when calling methods",
      "💡 Make sure to complete the property access statements"
    ]
  },
  {
    id: 4,
    name: "Conditionals",
    description: "Make decisions in your code using if/else statements.",
    tutorial: `📖 Conditionals in JavaScript

Conditionals allow your code to make decisions.

If Statement:
if (condition) {
  // code to run if true
}

If-Else:
if (condition) {
  // code if true
} else {
  // code if false
}

If-Else If:
if (condition1) {
  // code if condition1 is true
} else if (condition2) {
  // code if condition2 is true
} else {
  // code if all conditions are false
}

Comparison Operators:
• === (equal to)
• !== (not equal to)
• > (greater than)
• < (less than)
• >= (greater than or equal)
• <= (less than or equal)`,
    taskTitle: "* Age Category Checker *",
    taskDescription: "Complete the conditional logic to categorize ages correctly.",
    expectedOutput: "Age 25: You are an adult.",
    initialCode: `const age = 25;
let category;

if (age < 13) {
  category = "You are a child.";
} else if (age < 20) {
  category = "You are a teenager.";
} else if (age < 60) {
  category = "You are an adult.";
} {
  category = "You are a senior.";
}

console.log("Age " + age + ": " + category);`,
    solution: `const age = 25;
let category;

if (age < 13) {
  category = "You are a child.";
} else if (age < 20) {
  category = "You are a teenager.";
} else if (age < 60) {
  category = "You are an adult.";
} else {
  category = "You are a senior.";
}

console.log("Age " + age + ": " + category);`,
    hints: [
      "💡 The final condition should be 'else', not just a plain block",
      "💡 Each condition checks if age is less than a certain number",
      "💡 Make sure all your if-else statements are properly structured",
      "💡 The 'else' keyword handles all remaining cases"
    ]
  },
  {
    id: 5,
    name: "Loops",
    description: "Repeat code efficiently using for and while loops.",
    tutorial: `📖 Loops in JavaScript

Loops repeat code multiple times.

For Loop:
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

While Loop:
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}

For...of Loop (arrays):
const fruits = ["apple", "banana"];
for (const fruit of fruits) {
  console.log(fruit);
}

Loop Components:
• Initialization: let i = 0
• Condition: i < 5
• Increment: i++`,
    taskTitle: "* Number Counter *",
    taskDescription: "Fix the loop to count from 1 to 5 and calculate the sum.",
    expectedOutput: "Numbers: 1 2 3 4 5 Sum: 15",
    initialCode: `let numbers = "";
let sum = 0;

// Fix this loop to count from 1 to 5
for (let i = 1; i  5; i++) {
  numbers += i + " ";
  sum += ;
}

console.log("Numbers: " + numbers + "Sum: " + sum);`,
    solution: `let numbers = "";
let sum = 0;

for (let i = 1; i <= 5; i++) {
  numbers += i + " ";
  sum += i;
}

console.log("Numbers: " + numbers + "Sum: " + sum);`,
    hints: [
      "💡 Use <= (less than or equal) to include the number 5",
      "💡 Add the current value of 'i' to the sum",
      "💡 The loop condition should allow i to reach 5",
      "💡 Make sure to include the loop variable in your sum calculation"
    ]
  },
  {
    id: 6,
    name: "DOM Manipulation",
    description: "Interact with web page elements using the Document Object Model.",
    tutorial: `📖 DOM Manipulation in JavaScript

The DOM allows you to interact with HTML elements.

Selecting Elements:
document.getElementById("myId")
document.querySelector(".myClass")
document.querySelectorAll("p")

Changing Content:
element.textContent = "New text";
element.innerHTML = "<b>Bold text</b>";

Changing Styles:
element.style.color = "red";
element.style.backgroundColor = "blue";

Creating Elements:
const newDiv = document.createElement("div");
newDiv.textContent = "Hello!";
document.body.appendChild(newDiv);

Events:
element.addEventListener("click", function() {
  console.log("Clicked!");
});`,
    taskTitle: "* Text Updater *",
    taskDescription: "Complete the code to update the text content of an element.",
    expectedOutput: "Element text changed to: Hello, JavaScript!",
    initialCode: `// Simulate getting an element (in a real browser, this would work)
const mockElement = {
  textContent: "Original text",
  style: {}
};

// Update the text content
mockElement. = "Hello, JavaScript!";

// Update the style
mockElement.style. = "blue";

console.log("Element text changed to: " + mockElement.textContent);
console.log("Element color changed to: " + mockElement.style.color);`,
    solution: `const mockElement = {
  textContent: "Original text",
  style: {}
};

mockElement.textContent = "Hello, JavaScript!";
mockElement.style.color = "blue";

console.log("Element text changed to: " + mockElement.textContent);
console.log("Element color changed to: " + mockElement.style.color);`,
    hints: [
      "💡 Use 'textContent' property to change the text of an element",
      "💡 Use 'style.color' to change the text color",
      "💡 Access object properties using dot notation",
      "💡 Set properties using the assignment operator (=)"
    ]
  },
  {
    id: 7,
    name: "Events",
    description: "Respond to user interactions like clicks, keypresses, and form submissions.",
    tutorial: `📖 Events in JavaScript

Events allow your code to respond to user interactions.

Adding Event Listeners:
element.addEventListener("click", function() {
  console.log("Button clicked!");
});

Common Events:
• click - mouse click
• keydown - key pressed
• submit - form submitted
• load - page loaded
• change - input changed

Event Object:
element.addEventListener("click", function(event) {
  console.log("Clicked at:", event.clientX, event.clientY);
  event.preventDefault(); // Stop default behavior
});

Arrow Functions:
element.addEventListener("click", (event) => {
  console.log("Arrow function event!");
});`,
    taskTitle: "* Event Handler *",
    taskDescription: "Complete the event handler to respond to button clicks.",
    expectedOutput: "Button clicked! Count: 1",
    initialCode: `// Mock button object
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

// Add event listener for click events
mockButton.addEventListener("", function() {
  clickCount++;
  console.log("Button clicked! Count: " + clickCount);
});

// Simulate clicking the button
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
  console.log("Button clicked! Count: " + clickCount);
});

mockButton.click();`,
    hints: [
      "💡 The first parameter should be the event name in quotes",
      "💡 Use 'click' as the event name for mouse clicks",
      "💡 Event names are strings, so they need quotation marks",
      "💡 Make sure the event name matches exactly"
    ]
  },
  {
    id: 8,
    name: "Error Handling",
    description: "Handle and prevent code errors using try-catch statements.",
    tutorial: `📖 Error Handling in JavaScript

Error handling prevents your code from crashing when things go wrong.

Try-Catch:
try {
  // Code that might throw an error
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  // Handle the error
  console.log("Error:", error.message);
}

Try-Catch-Finally:
try {
  // Risky code
} catch (error) {
  // Handle error
} finally {
  // Always runs
}

Throwing Errors:
if (age < 0) {
  throw new Error("Age cannot be negative");
}

Common Error Types:
• ReferenceError - variable not defined
• TypeError - wrong data type
• SyntaxError - code syntax error`,
    taskTitle: "* Error Handler *",
    taskDescription: "Add proper error handling to catch and handle potential errors.",
    expectedOutput: "Error caught: Cannot divide by zero",
    initialCode: `function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

// Add try-catch to handle the error
 {
  const result = divide(10, 0);
  console.log("Result:", result);
}  (error) {
  console.log("Error caught:", error.message);
}`,
    solution: `function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  const result = divide(10, 0);
  console.log("Result:", result);
} catch (error) {
  console.log("Error caught:", error.message);
}`,
    hints: [
      "💡 Use 'try' keyword to start a try block",
      "💡 Use 'catch' keyword to handle errors",
      "💡 The try-catch structure needs both keywords",
      "💡 Put the risky code inside the try block"
    ]
  },
  {
    id: 9,
    name: "Final Challenge",
    description: "Put all your skills to the test in this comprehensive challenge.",
    tutorial: `📖 Final Challenge

This challenge combines everything you've learned:
• Variables and data types
• Functions
• Arrays and objects
• Conditionals
• Loops
• DOM manipulation
• Events
• Error handling

You'll create a complete mini-program that uses multiple JavaScript concepts together.

Tips:
• Read the requirements carefully
• Break down the problem into smaller parts
• Use console.log to debug your code
• Don't be afraid to experiment!

Good luck, brave programmer!`,
    taskTitle: "* The Ultimate Challenge *",
    taskDescription: "Create a student grade calculator that processes an array of student objects.",
    expectedOutput: "Student: Alice, Grade: B, Status: Pass\nStudent: Bob, Grade: D, Status: Fail\nClass Average: 72.5",
    initialCode: `// Complete this student grade calculator
const students = [
  { name: "Alice", scores: [85, 92, 78, 96] },
  { name: "Bob", scores: [45, 67, 58, 72] }
];

function calculateAverage(scores) {
  // Calculate and return the average of the scores array
  
}

function getLetterGrade(average) {
  // Return letter grade based on average
  // A: 90+, B: 80-89, C: 70-79, D: 60-69, F: below 60
  
}

function getPassStatus(average) {
  // Return "Pass" if average >= 70, "Fail" otherwise
  
}

// Process each student
let classTotal = 0;
for (const student of students) {
  const average = calculateAverage(student.scores);
  const grade = getLetterGrade(average);
  const status = getPassStatus(average);
  
  console.log(\`Student: \${student.name}, Grade: \${grade}, Status: \${status}\`);
  classTotal += average;
}

// Calculate and display class average
const classAverage = classTotal / students.length;
console.log("Class Average: " + classAverage);`,
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
