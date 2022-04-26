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
    startTimer(20);
    startTimeLine(0);
}

let triviaWidth = (triviaBox.offsetWidth) - 1;
let timeValue = 20;
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
    timeValue = 20;
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
    if(questionsCount < questions.length -1){
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

    for(let i=0; i < option.length; i++) {
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

            for(let i=0; i < allOptions; i++){
                if(optionList.children[i].textContent == correctAnswer){ // 
                    optionList.children[i].setAttribute("class", "option correct"); 
                    optionList.children[i].insertAdjacentHTML("beforeend", rightIconTag); 
                }
        }
    }
        for(let i=0; i < allOptions; i++){
            optionList.children[i].classList.add("disabled"); 
        }
        nextButton.classList.add("show"); 
}

// Show results function

function showResults() {
    infoBox.classList.remove("activeInfo"); 
    triviaBox.classList.remove("activeTrivia"); 
    resultBox.classList.add("activeResult"); 
    const scoreText = resultBox.querySelector(".score_text");
    if(userScore == 10) {
        let scoreTag = '<span>Perfect! You got <p>'+ userScore +'</p> answers right out of <p>'+ questions.length +'</p>possible ones.</span>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore <= 9 && userScore > 4){
        let scoreTag = '<span>Nice! You got <p>'+ userScore +'</p> answers right out of <p>'+ questions.length +'</p>possible ones.</span>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore <= 4 && userScore > 1){
        let scoreTag = '<span>Hmm, you got <p>'+ userScore +'</p> answers right out of <p>'+ questions.length +'</p>possible ones.</span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore == 1) {
        let scoreTag = '<span>Oh, you got <p>'+ userScore +'</p> answer right out of <p>'+ questions.length +'</p>possible ones.</span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore == 0) {
        let scoreTag = '<span>Unfortunately you got 0 answers correct, but we would recommend you to try and complete this trivia again!</span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
        counter = setInterval (timer, 1000);
        function timer(){
            timeCount.textContent = time;
            time--;
            if(time < 9){
                let addZero = timeCount.textContent; 
                timeCount.textContent = "0" + addZero;
            }
            if(time < 0){
                clearInterval(counter); 
                timeText.textContent = "Time's off"; 
                const allOptions = optionList.children.length; 
                let correctAnswer = questions[questionsCount].answer;
                    for(let i=0; i < allOptions; i++){
                    if(optionList.children[i].textContent == correctAnswer){ 
                        optionList.children[i].setAttribute("class", "option correct"); 
                        optionList.children[i].insertAdjacentHTML("beforeend", rightIconTag); 
                    }
                }
                for(let i=0; i < allOptions; i++){
                    optionList.children[i].classList.add("disabled"); 
                }
                    nextButton.classList.add("show");
            }
        }
    }


        function startTimeLine(time){
            let delay = 0;
            if(triviaWidth > 500){
                delay = 37.5; 
            }
            else if(triviaWidth < 400) {
                 delay = 60; 
            }
                          
               counterLine = setInterval(timer, delay); 
            function timer(){
                time += 1; 
                timeLine.style.width = time + "px"; 
                if(time > triviaWidth){ 
                    clearInterval(counterLine); 
                }
            }
    }

// Final results 

function questionsCounter(index){
    let totalQuestionsCounterTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> questions</span>';
    bottomQuestionsCounter.innerHTML = totalQuestionsCounterTag;  
}