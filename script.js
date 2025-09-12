// Initialize variables
let score = 0;
let attempts = 0;
let currentProblem = generateProblem();

// DOM elements
const problemElement = document.getElementById('problem');
const resultElement = document.getElementById('result');
const answerInput = document.getElementById('answer');
const checkButton = document.getElementById('check-btn');
const newProblemButton = document.getElementById('new-problem');
const scoreElement = document.getElementById('score');
const attemptsElement = document.getElementById('attempts');

// Display initial problem
displayProblem();

// Event listeners
checkButton.addEventListener('click', checkAnswer);
newProblemButton.addEventListener('click', generateNewProblem);
answerInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// Function to generate a multiplication problem
function generateProblem() {
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    return {
        num1: num1,
        num2: num2,
        answer: num1 * num2
    };
}

// Function to display the current problem
function displayProblem() {
    problemElement.textContent = `${currentProblem.num1} × ${currentProblem.num2} = ?`;
    resultElement.textContent = 'Enter your answer';
    resultElement.style.color = '#4caf50';
    answerInput.value = '';
    answerInput.focus();
}

// Function to check the answer
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    
    if (isNaN(userAnswer)) {
        resultElement.textContent = 'Please enter a number';
        resultElement.style.color = '#f44336';
        return;
    }
    
    attempts++;
    attemptsElement.textContent = attempts;
    
    if (userAnswer === currentProblem.answer) {
        resultElement.textContent = 'Correct! Well done!';
        resultElement.style.color = '#4caf50';
        score++;
        scoreElement.textContent = score;
        
        // Generate new problem after a short delay
        setTimeout(generateNewProblem, 1500);
    } else {
        resultElement.textContent = `Incorrect. Try again! (Answer: ${currentProblem.answer})`;
        resultElement.style.color = '#f44336';
    }
}

// Function to generate a new problem
function generateNewProblem() {
    currentProblem = generateProblem();
    displayProblem();
}

// Add vibration on mobile for feedback if available
function vibrate() {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}
