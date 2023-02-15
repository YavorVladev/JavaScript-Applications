const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = "Restart"
    startButton.classList.remove('hide')
  }
  nextButton.classList.remove('hide')

}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: "What is the game I spend most of my time when I was younger?",
    answers: [
      { text: "GTA Vice City", correct: false },
      { text: "Serious Sam", correct: false },
      { text: "League of Legends", correct: false },
      { text: "CS 1.6", correct: true },
    ],
  },

  {
    question: "What was my first clan in CS 1.6 called ?",
    answers: [
      { text: "!UnstoppableOnes!", correct: false },
      { text: "DownBringers", correct: false },
      { text: "Pr0 GaM!nG", correct: true },
      { text: "HeadHunters", correct: false },
    ],
  },

  {
    question: "Who was my first \"main\" in League of Legends ?",
    answers: [
      { text: "Riven", correct: true },
      { text: "Corki", correct: false },
      { text: "Shaco", correct: false },
      { text: "Vayne", correct: false },
    ],
  },

  {
    question: "What musical instrument do I play ?",
    answers: [
      { text: "Violin", correct: false },
      { text: "Guitar", correct: false },
      { text: "Cello", correct: false },
      { text: "Piano", correct: true },
    ],
  },

  {
    question: "Am I going to be successfull programmer ?",
    answers: [
      { text: "Yes", correct: true }
    ],
  },

  
];
