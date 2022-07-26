//Use objects to define the questions for the coding quiz.

let questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    },

];

//Set variables for selecting on header
let timer = document.querySelector("#timer");
let viewHighScores = document.querySelector("#viewHighScores");

//Set variables for selecting on homepage
let homepage = document.querySelector("#homepage");
let welcome = document.querySelector("#welcome");
let start = document.querySelector("#start");

//Set variables for selecting on question page
let question = document.querySelector("#question");
let newQuestion = document.querySelector("#new_question");
let anyAnswer = document.querySelectorAll(".any_answer");
let answer1 = document.querySelector("#answer1");
let answer2 = document.querySelector("#answer2");
let answer3 = document.querySelector("#answer3");
let answer4 = document.querySelector("#answer4");
let checkAnswer = document.querySelector("#check_answer");

//Set variables for selecting on final score page
let FinalScorePage = document.querySelector("#final_score_page");
let finalScore = document.querySelector("#final_score");
let timesUp = document.querySelector("#times_up");
let initials = document.querySelector("#initials");
let submitScore = document.querySelector("#submit_score");

//Set variables for selecting on high score page
let highscore = document.querySelector("#highscore");


//Select variables for resetting high scores
let back = document.querySelector("#back");
let reset = document.querySelector("#reset");


//Global variables for functions below
let totalScore = 0;
let secondsLeft = 60;
let questionNo = 0;


// Start countdown timer for quiz play
function quizTimer() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timer.innerText = `Time left: ${secondsLeft}`
        // If time expires, timer displays 0, Time is up is displayed on final score page and gameOver is executed
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timer.innerText = 0;
            timesUp.innerText = "Time is up!";
            gameOver();
            //Else all questions are answered and gameOver is executed
        } else if (questionNo >= questions.length) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

//Starts the quiz
function startQuiz() {
    homepage.style.display = "none";
    question.style.display = "block";
    quizTimer();
    showQuestion(questionNo);

}
//Show question and answer choices
function showQuestion(num) {
    newQuestion.innerText = questions[num].title;
    answer1.innerText = questions[num].choices[0];
    answer2.innerText = questions[num].choices[1];
    answer3.innerText = questions[num].choices[2];
    answer4.innerText = questions[num].choices[3];
    questionNo = num;
}

//Verify user selected answer to the question object
function verifyAnswer(event) {
    event.preventDefault();
    //Display correct or wrong
    checkAnswer.style.display = "block";
    //Will display correct or wrong for one second and then go away
    setTimeout(function () {
        checkAnswer.style.display = 'none';
    }, 1000);

    // If correct, display correct and add 5 to the user's score
    if (questions[questionNo].answer == event.target.textContent) {
        checkAnswer.innerText = "Correct!";
        totalScore = totalScore + 5;

        // Remove 15 seconds from the timer and display wrong
    } else {
        secondsLeft = secondsLeft - 15;
        checkAnswer.innerText = "Wrong!";
    }
    //If not all questions have been displayed, then display next question
    if (questionNo < questions.length - 1) {
        showQuestion(questionNo + 1);
    } else {
        gameOver();
    }

}
//Displays final score page with user's final score and hides the timer
function gameOver() {
    question.style.display = "none";
    FinalScorePage.style.display = "block";
    // show final score
    finalScore.innerText = `Your final score is: ${totalScore}`
    // clearInterval(timerInterval);  
    timer.style.display = "none";
};

// Retrieve current high scores with user initials
function getScores() {
    let scoreList = localStorage.getItem("ScoreList");
    if (scoreList !== null) {
        let currentList = JSON.parse(scoreList);
        return currentList;
    } else {
        currentList = [];
    }
    return currentList;

};


// Show scores on high scores page
function showScore() {
    highscoreList.innerHTML = "";
    highscoreList.style.display = "block";
    let highScores = rankScores();
    // Slice the high scores array to only show the top five high scores. 
    let topScores = highScores.slice(0, 5);
    for (let i = 0; i < topScores.length; i++) {
        let topScore = topScores[i];
        // Show the high scores
        let newLi = document.createElement("li");
        newLi.innerText = `${topScore.user} - ${topScore.score}`;
        highscoreList.appendChild(newLi);

    }
};

// Retrieve the scores and rank each by the .score property on the object
function rankScores() {
    let scores = getScores();
    if (getScores == null) {
        return;
    } else {
        scores.sort(function (a, b) {
            return b.score - a.score;
        })
        return scores;
    }
};

//Save user initials and score in an object and then stores in local storage
function saveScore() {
    let newHighInfo = {
        user: initials.value,
        score: totalScore
    }
    let scoreInfo = getScores();
    scoreInfo.push(newHighInfo);
    localStorage.setItem("ScoreList", JSON.stringify(scoreInfo));

}

//Click to start quiz
start.addEventListener("click", startQuiz);

//Click on any answer to the question, and execute verifyAnswer function
anyAnswer.forEach(function (event) {
    event.addEventListener("click", verifyAnswer);
});


//Save user initials and score and then displays on high score page
submitScore.addEventListener("click", function (event) {
    event.preventDefault();
    FinalScorePage.style.display = "none";
    homepage.style.display = "none";
    highscore.style.display = "block";
    question.style.display = "none";
    saveScore();
    showScore();
});

// Shows the high scores on the high score page
viewHighScores.addEventListener("click", function (event) {
    event.preventDefault();
    FinalScorePage.style.display = "none";
    homepage.style.display = "none";
    highscore.style.display = "block";
    question.style.display = "none";
    showScore();
});

//Displays homepage and refreshes the page
back.addEventListener("click", function (event) {
    event.preventDefault();
    FinalScorePage.style.display = "none";
    homepage.style.display = "block";
    highscore.style.display = "none";
    question.style.display = "none";
    location.reload();
});

//Clear local storage and display empty high score page
reset.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    showScore();
});