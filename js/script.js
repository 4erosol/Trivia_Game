const startButton = document.querySelector(".start_button button");
const infoBox = document.querySelector(".info_box");
const exitButton = infoBox.querySelector(".buttons .exit");
const continueButton = infoBox.querySelector(".buttons .restart");
const triviaBox = document.querySelector(".trivia_box");
const resultBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");
const timeLine = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_text");
const timeCount = document.querySelector(".timer .timer_sec");

// If Start button is clicked
startButton.onclick = ()=> {
    infoBox.classList.add("activeInfo");
} 

// If Exit button is clicked
exitButton.onclick = ()=> {
    infoBox.classList.remove("activeInfo"); 
}

// If I'm ready button is clicked
continueButton.onclick = ()=> {
    infoBox.classList.remove("activeInfo");
    triviaBox.classList.add("activeTrivia");
    showQuestions(0);
    questionsCounter(1);
    startTimer(30);
    startTimeLine(0);
}

let timeValue = 30;
let questionsCount = 0;
let questionsNumber = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restartTrivia = resultBox.querySelector(".buttons .restart");
const exitTrivia = resultBox.querySelector(".buttons .exit");

// If Play again button is clicked

restartTrivia.onclick = ()=> {
    triviaBox.classList.add("activeTrivia");
    resultBox.classList.remove("activeResult");
    timeValue = 30;
    questionsCount = 0;
    questionsNumber = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(questionsCount);
    questionsCounter(questionsNumber);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimeLine(widthValue);
    timeText.textContent = "Time left";
    nextButton.classList.remove("show");
}

// If Exit button is clicked

exitTrivia.onclick = ()=> {
    window.location.reload();
}

const nextButton = document.querySelector("footer .next_button");
const bottomQuestionsCounter = document.querySelector("footer .total_questions");

// If Next button is clicked

nextButton.onclick = () => {
    if(questionsCount < questionsCount.length -1){
        questionsCount++;
        questionsNumber++;
        showQuestions(questionsCount);
        questionsCounter(questionsNumber);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimeLine(widthValue);
        timeText.textContent = "Time left";
        nextButton.classList.remove("show");
    }
    else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResults();
    }
}

// Getting Q&A from an array

function showQuestions(index) {
    const questionText = document.querySelector(".question_text");
    let questionTag = '<span>'+ questions[index].number + ". " + questions[index].question +'</span>';
    let optionTag = 
    '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>' 
    + '<div class="option"><span>'+ questions[index].options[4] +'</span></div>';

    questionText.innerHTML = questionTag;
    optionList.innerHTML = optionTag;

    const option = optionList.querySelectorAll(".option");

    for(i=0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let rightIconTag = '<div class="icon right"><i class="fas fa-check"></i></div>';
let wrongIconTag = '<div class="icon wrong"><i class="fas fa-times"></i></div>';

// If an Option is clicked

function optionSelected(answer) {
        clearInterval(counter);
        clearInterval(counterLine);
        let userAnswer = answer.textContent;
        let correctAnswer = questions[questionsCount].answer;
        const allOptions = optionList.children.length;

        if(userAnswer == correctAnswer){
            userScore += 1;
            answer.classList.add("correct");
            answer.insertAdjacentHTML("beforeend", rightIconTag);
        } else {
            answer.classList.add("incorrect"); 
            answer.insertAdjacentHTML("beforeend", wrongIconTag); 

            for(i=0; i < allOptions; i++){
                if(optionList.children[i].textContent == correctAnswer){ // 
                    optionList.children[i].setAttribute("class", "option correct"); 
                    optionList.children[i].insertAdjacentHTML("beforeend", rightIconTag); 
                }
        }
    }
        for(i=0; i < allOptions; i++){
            optionList.children[i].classList.add("disabled"); 
        }
        nextButton.classList.add("show"); 
}

// Show results function

function showResults() {
    infoBox.classList.remove("activeInfo"); 
    triviaBox.classList.remove("activeTrivia"); 
    resultBox.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 7) {
        let scoreTag = '<span>Congratulations! You got <p>'+ userScore +'</p> answers right out of <p>'+ questions.length +'</p>possible ones.</span>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 4){
        let scoreTag = '<span>Very nice! You got <p>'+ userScore +'</p> answers right out of <p>'+ questions.length +'</p>possible ones.</span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>Bad luck! You got <p>'+ userScore +'</p> answers right out of <p>'+ questions.length +'</p>possible ones.</span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
        counter = setInterval (time, 1000);
        function timer(){
            timeCount.textContent = time;
            time--;
            if(time < 29){
                let addZero = timeCount.textContent; 
                timeCount.textContent = "0" + addZero;
            }
            if(time < 0){
                clearInterval(counter); 
                timeText.textContent = "Time's off"; 
                const allOptions = optionList.children.length; 
                let correctAnswer = questions[questionCount].answer;
                    }
                }
                for(i=0; i < allOptions; i++){
                    if(optionList.children[i].textContent == correctAnswer){ 
                        optionList.children[i].setAttribute("class", "option correct"); 
                        optionList.children[i].insertAdjacentHTML("beforeend", rightIconTag); 
                    }
                    nextButton.classList.add("show");
            }
        }
        function startTimeLine(time){
            counterLine = setInterval(timer, 29);
            function timer(){
                time += 1; 
                timeLine.style.width = time + "px"; 
                if(time > 549){ 
                    clearInterval(counterLine); 
                }
            }
    }

// Final results 

function questionsCounter(index){
    let totalQuestionsCounterTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottomQuestionsCounter.innerHTML = totalQuestionsCounterTag;  
}