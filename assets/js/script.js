var startBtn = document.querySelector("#start-button");
var questionSectionEl = document.querySelector("#question-section");
var startScreen = document.querySelector("#start-screen");
var headerEl = document.querySelector("#header");
var questionEl = document.querySelector("#question");
var answerBtnEl = document.querySelector("#answer-button");

var questions = [
  {
    question: "Who invented JavaScript?",
    choices: [
      {A: "Douglas Crockford"},
      {B: "Sheryl Sandberg"},
      {C: "Brendan Eich"}
      {answer: "C"}
    ]
  }
]

var startGame = function() {
  console.log("started");
  startScreen.classList.add("hide");
  questionSectionEl.classList.remove("hide");
  headerEl.classList.remove("hide");
  var currentQuestion = 0;
  newQuestion();
};

startBtn.addEventListener("click", startGame);

var showQuestion = function(question) {

}

var newQuestion = function() {
  showQuestion(questions[currentQuestion]);
};

var answer = function() {

};
