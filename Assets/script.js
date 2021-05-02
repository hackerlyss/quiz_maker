const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerEl = document.getElementById('question-container');
let shuffledQ, currentQ ;
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const quizTimer = document.getElementById('quiz-timer')
const userScore = 0;
var secondsLeft = 60;

startButton.addEventListener('click', () => {
    startGame()
    setTime()
})
nextButton.addEventListener('click', () => {
    currentQ++
    setNextQ()
})

var questions = [
    {
        question: 'What does CSS stand for?',
        answers: [
            { text:"Cascading Style Sheet", correct: true},
        {text:"Cats Stand Straight", correct:false},
        {text:"Computation Style Sciences", correct: false}
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            {text:"Horizontal Type Modulation Locale",correct:false},
         {text:"Happy Typers Make Lotsacash",correct:false},
          {text:"HyperText Markup Language", correct:true}
    ]
        
    },
    {
        question: 'Which of the statements are true?',
        answers: [
            {text:"Java is equivalent to JavaScript",correct: false},
        {text:"JQuery is a third-party API",correct:true},
        {text:"You can only style your website with CSS",correct:false}
        ]
        
    },
    {
        question: 'What are the 3 scopes in JavaScript?',
        answers: [
            {text:"Global, local, block",correct:true},
        {text:"Micro, Macro, Kaleido",correct:false},
        {text:'Frontal, occupational, ventral',correct:false}
        ]
    
    },
    {
        question: 'Which of the following is semantic HTML?',
        answers: [
            {text:"&#60; b &#62;",correct:false},
         {text:"&#60; br &#62;",correct:false},
         {text:"&#60; header &#62;",correct:true}
        ]
    },
    {
        question: 'What two things does addEventListener need to function?',
        answers: [
            {text:"for-loop and child",correct:false},
        {text:"event to listen to and an action to execute",correct:true},
        {text:"a cup of coffe and their favorite podcast",correct:false}
        ]
        
    },
    {
        question: 'What does DOM stand for?',
        answers: [
            {text:"Doctorate of Machination",correct:false},
        {text:"Document Object Model",correct:true},
        {text:"Data Organization Multiplex",correct:false}
        ]
    },
    {
        question: 'What does API stand for?',
        answers: [
            {text:"Application Programming Interface",correct:true},
        {text:"Artificial Programming Intelligence",correct:false},
        {text:"Anarchy Potential Introversion",correct: false}
        ]
    },
]
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      quizTimer.textContent = secondsLeft + " seconds left.";
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide')
      }
  
    }, 1000);
  }

function startGame() {
  startButton.classList.add('hide');
  shuffledQ = questions.sort(() => Math.random() -.5);
  currentQ = 0;
  questionContainerEl.classList.remove('hide');
  setNextQ();

}

function setNextQ() {
    resetState();
    showQuestion(shuffledQ[currentQ]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn');
      if (answer.correct) {
          button.dataset.correct = answer.correct;
      }  else {
          secondsLeft-10;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsEl.appendChild(button)
      })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
       
    })
    if (shuffledQ.length > currentQ +1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide')
    }
 
}


function setStatusClass(element,correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
       
    } else {
        element.classList.add('wrong');
        secondsLeft-10;
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}





