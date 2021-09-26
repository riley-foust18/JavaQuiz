var startBtn = document.querySelector("#start-button");
var questionSectionEl = document.querySelector("#question-section");
var headerEl = document.querySelector("#header");
var questionEl = document.querySelector("#question");
var answerBtnEl = document.querySelector("#answer-buttons");
var endScreen = document.querySelector("#end-screen");
var quizTimerEl = document.querySelector("#quiz-timer");
var result = document.querySelector("#end");
var submitBtn = document.querySelector("#submit");
var highscoreList = document.querySelector("#highscore-list");
var initials = document.querySelector("#initials");
var viewHighscoreBtn = document.querySelector("#view-highscore")

var countdown = 75;
var currentQuestion = 0;
var score = 0;

var timer = function() {
  quizTimerEl.textContent = `Time Left: ${Math.max(countdown, 0)}`;
  countdown--;
}

var startTimer = function() {
  setInterval(timer, 1000);
}

const choices = [
  { 
    name: "Hyper Text Markup Language Stand For?",
    choices: ["JavaScript", "XHTML","CSS", "HTML"],
    answer: "3"
  },
  { 
    name: "Which language is used for styling web pages?",
    choices: ["HTML", "JQuery", "CSS", "XML"],
    answer: "2"
  },
  { 
    name: "Which is not a JavaScript Framework?",
    choices: ["Python Script", "JQuery","Django", "NodeJS"],
    answer: "2"
  },
  { 
    name: "Which of these is not a loop type?",
    choices: ["for", "while", "forEach", "per"],
    answer: "3"
  },
  { 
    name: "Which element creates a numbered list?",
    choices: ["ol", "ul", "li", "div"],
    answer: "0"
  }
];

var startGame = function() {
  startTimer();
  var startScreen = document.querySelector("#start-screen");
  startScreen.classList.add("hide");
  questionSectionEl.classList.remove("hide");
  headerEl.classList.remove("hide");
  questionLoop(choices[currentQuestion].name);
};

startBtn.addEventListener("click", startGame);

var questionLoop = function(question) {
  questionEl.textContent = question;
  createAnswers(choices[currentQuestion].choices);
  answerBtnEl.addEventListener("click", pickedAsnwer);
}

var createAnswers = function(answers) {
  viewHighscoreBtn.addEventListener("click", viewHighscores)
  for (var i = 0; i < answers.length; i++) {
    var newAnswer = document.querySelector("#btn");
    newAnswer.className = "btn"
    newAnswer.setAttribute("btn-id", i);
    newAnswer.textContent = answers[i]
    answerBtnEl.appendChild(newAnswer);
  }
}

var pickedAsnwer = function(event) {
  if (event.target.matches(".btn")) {
    var correctAnswer = event.target.getAttribute("btn-id");
    if (correctAnswer === choices[currentQuestion].answer) {
      currentQuestion++;
      rightAnswer();
    }
    else {
      currentQuestion++;
      wrongAnswer();
    }
  }
}

var rightAnswer = function() {
  if (currentQuestion === choices.length || countdown <= 0) {
    endQuiz();
  }
  else {
    questionLoop(choices[currentQuestion].name);
        result.textContent = "You got it!";
  }
}

var wrongAnswer = function() {
  if (currentQuestion === choices.length || countdown <= 0) {
    endQuiz();
  }
  else {
    questionLoop(choices[currentQuestion].name);
        result.textContent = "Uh oh wrong one!"
        countdown -= 15;
  }
}

var endQuiz = function() {
  headerEl.className = "hide"
  endScreen.classList.remove("hide");
  var endText = document.querySelector("#end-text");
  questionSectionEl.classList.add("hide");
  endText.textContent = "All done!";
  var endScore = document.querySelector("#end-score");
  endScore.textContent = `Your score: ${Math.max(countdown, 0)}`;
  score = Math.max(countdown, 0);
  submitBtn.addEventListener("click", function() {
    if (initials.value === "") {
      alert("Please enter your initials.")
    } 
    else if (initials.value.length > 2) {
      alert("Please use only 2 letters.")
    }
    else if (initials.value.length < 2) {
      alert("Please use at least 2 letters.")
    }
    viewHighscores();
  });
}

var viewHighscores = function() {
  endScreen.className = "hide"
  headerEl.className = "hide"
  questionSectionEl.classList.add("hide")
  var highscoreContainer = document.querySelector("#highscore-container")
  highscoreContainer.classList.remove("hide")
  var storedScores = JSON.parse(localStorage.getItem("Highscores"));
  var scoreList = []
  var userScore = `${initials.value} - ${score}`
  var storedScores = JSON.parse(localStorage.getItem("Highscores"))
  var highscoreLoop = function() {
    for (var i = 0; i < scoreList.length; i++) {
      var scoreListEl = document.createElement("li");
      scoreListEl.textContent = scoreList[i];
      highscoreList.appendChild(scoreListEl);
    }
  }
  if (initials.value === "") {
    scoreList = storedScores
    console.log(scoreList)
    if (storedScores === null) {
    var scoreListEl = document.createElement("li");
    scoreListEl.textContent = "No Highscores";
    highscoreList.appendChild(scoreListEl);
    }
    else {
      highscoreLoop();
    }
    
  }
  else if (storedScores === null) {
    scoreList.push(userScore.toUpperCase());
    localStorage.setItem("Highscores", JSON.stringify(scoreList));
    highscoreLoop();
  }
  else {
    scoreList = storedScores
    scoreList.push(userScore.toUpperCase())
    localStorage.setItem("Highscores", JSON.stringify(scoreList));
    highscoreLoop();
  }
}
