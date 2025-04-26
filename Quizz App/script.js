let currentQuestionIndex = 0;
let score = 0;
let totalTime = 120; // 2 minutes (120 seconds) for the whole quiz
let timerInterval;
let startTime = 0; // Used for detecting cheating (if quiz takes less than 10 seconds)
let cheatingDetected = false;
let userName = "";

const questions = [
  { question: 'What is the output of print(2 + 3 * 4)? (Python)', options: ['14', '20', '12', '10'], answer: '14' },
  { question: 'What keyword is used to define a function in Python?', options: ['def', 'func', 'function', 'method'], answer: 'def' },
  { question: 'Which data type is used to store a sequence of characters in Python?', options: ['list', 'string', 'tuple', 'dictionary'], answer: 'string' },
  { question: 'Which of the following is the correct way to define a class in Java?', options: ['class MyClass {}', 'def MyClass():', 'class MyClass()', 'MyClass class {}'], answer: 'class MyClass {}' },
  { question: 'What is the result of 10 + "10" in JavaScript?', options: ['20', '1010', 'NaN', 'Error'], answer: '1010' },
  { question: 'Which of the following is a mutable data type in Python?', options: ['tuple', 'string', 'list', 'dictionary'], answer: 'list' },
  { question: 'Which method is used to add an element to the end of an array in JavaScript?', options: ['append()', 'add()', 'push()', 'insert()'], answer: 'push()' },
  { question: 'What is the output of console.log(10 == "10") in JavaScript?', options: ['true', 'false', 'NaN', 'Error'], answer: 'true' },
  { question: 'Which function is used to get user input in Python?', options: ['input()', 'scan()', 'read()', 'get()'], answer: 'input()' },
  { question: 'What is the correct file extension for Python files?', options: ['.py', '.java', '.cpp', '.exe'], answer: '.py' },
  { question: 'In Java, what is the default value of a boolean variable?', options: ['true', 'false', 'null', '0'], answer: 'false' },
  { question: 'In Python, which of the following is a valid loop?', options: ['for i in range()', 'loop i in range()', 'for (i in range())', 'each i in range()'], answer: 'for i in range()' },
  { question: 'How do you define an object in JavaScript?', options: ['var obj = {}', 'var obj = []', 'var obj = ""', 'var obj = ();'], answer: 'var obj = {}' },
  { question: 'Which of the following is used to terminate a loop in Python?', options: ['break', 'continue', 'exit', 'stop'], answer: 'break' },
  { question: 'Which keyword is used to create a class in JavaScript?', options: ['class', 'new', 'define', 'function'], answer: 'class' },
  { question: 'Which of the following is not a type of error in Python?', options: ['SyntaxError', 'TypeError', 'IndexError', 'NullError'], answer: 'NullError' }
];

let userAnswers = [];

// Start Quiz
function startQuiz() {
  userName = document.getElementById('userName').value;
  if (userName.trim() === '') {
    alert('Please enter your name to start the quiz!');
    return;
  }
  document.getElementById('startPage').classList.add('hidden');
  document.getElementById('quizPage').classList.remove('hidden');
  startTime = Date.now(); // Start time when quiz begins
  loadQuestion();
  startTimer();
}

// Load Question
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  const quizForm = document.getElementById('quizForm');
  quizForm.innerHTML = `
    <div class="question-container">
      <p class="question">${currentQuestionIndex + 1}. ${question.question}</p>
      ${question.options.map((opt, i) => `
        <label>
          <input type="radio" name="question" value="${opt}"> ${opt}
        </label><br>
      `).join('')}
    </div>
    <button id="nextButton" type="button" onclick="nextQuestion()">Next Question</button>
  `;
}

// Move to the Next Question
function nextQuestion() {
  const selectedAnswer = document.querySelector('input[name="question"]:checked');
  // Hide the validation error if an answer is selected
  document.getElementById('validationError').style.display = 'none';

  if (selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    userAnswers.push({
      question: questions[currentQuestionIndex].question,
      selected: selectedAnswer.value,
      correct: correctAnswer
    });
    if (selectedAnswer.value === correctAnswer) {
      score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      submitQuiz();
    }
  } else {
    // Show the validation error if no answer is selected
    document.getElementById('validationError').style.display = 'block';
  }
}

// Submit Quiz and Show Results
function submitQuiz() {
  clearInterval(timerInterval);
  const timeTaken = (Date.now() - startTime) / 1000; // Time in seconds
  if (timeTaken < 10) {
    cheatingDetected = true; // Assume cheating if time taken is less than 10 seconds
  }
  showResult();
}

// Show Results
function showResult() {
  document.getElementById('quizPage').classList.add('hidden');
  document.getElementById('resultPage').classList.remove('hidden');
  const resultMessage = cheatingDetected ? 'Cheating detected! You are disqualified.' : `You scored ${score} out of ${questions.length}`;
  document.getElementById('resultMessage').textContent = resultMessage;
  document.getElementById('celebrationMessage').textContent = cheatingDetected ? '💥🔥💣' : '🎉🎉🎉';
  document.getElementById('finalScore').textContent = `Your Final Score: ${score}`;
}

// Start Timer
function startTimer() {
  let timeLeft = totalTime;
  const timerElement = document.getElementById('timer');
  timerInterval = setInterval(function() {
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerElement.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}
