startBtn = document.getElementById('start');
nextBtn = document.getElementById('next');
questionContainerElement = document.getElementById('container');
questionElement = document.getElementById('question');
answerButtonsElement = document.getElementById('answer-buttons');
questionPic = document.getElementById('question');
instructions = document.getElementById('instructions');
textbox = document.getElementById('textbox');
questionPrompt = document.getElementById('questionPrompt');

resultInfo = document.getElementById('result');




let shuffledQuestions, currentQuestionIndex;
var quizAnswer;
var correct = 0;

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', ()=>{

    var inputVal = document.getElementById('textbox').value;

    if(quizAnswer == inputVal ){
        console.log('correct');
        correct++;
    }
    else{
        console.log('incorrect');
    }
    console.log("Correct: " + correct);
    document.getElementById('textbox').value = "";

    currentQuestionIndex++;
    if(currentQuestionIndex < 12){
        setNextQuestion();

    }
    else{
        nextBtn.classList.add('hide');
        textbox.classList.add('hide');
        questionPic.classList.add('hide');
        questionPrompt.classList.add('hide');
        resultInfo.classList.remove('hide');

        var score = document.getElementById('score');

        var total = correct/12;
        console.log(total);
        score.innerHTML = correct + ' / ' + 12 + " Questions Correct";

        if(correct < 10){
            var info = document.getElementById('quizInfo');
            info.innerText = "Based on the data collected during this quiz, you may be color blind. A passing score on " +
                "this quiz would require you to answer 12/14 questions correctly. Based on this quiz it is likely that " +
                "you are protan (red) or deuteran (green) blind which is the most common form of color blindness.";
        }
        else{
             var info = document.getElementById('quizInfo');
                        info.innerText = "You have normal color vision.";
        }
    }

})

function startGame(){
    startBtn.classList.add('hide');
    instructions.classList.add('hide');

    shuffledQuestions = questions.sort();
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    questionPrompt.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question;
    var img = document.createElement("img");

    if(currentQuestionIndex == 0) {
        img.src = "static/resources/8.png";
        questionPic.appendChild(img);
    }
    else if(currentQuestionIndex == 1) {
        img.src = "static/resources/5.png";
        questionPic.appendChild(img);
    }
    else if(currentQuestionIndex == 2){
        img.src = "static/resources/6.png";
        questionPic.appendChild(img);
    }
    else if(currentQuestionIndex == 3) {
        img.src = "static/resources/5yellow.png";
        questionPic.appendChild(img);
    }
    else if(currentQuestionIndex == 4){
        img.src = "static/resources/74.png";
        questionPic.appendChild(img);
    }
    else if(currentQuestionIndex == 5) {
        img.src = "static/resources/3.png";
        questionPic.appendChild(img);
    }
    else if(currentQuestionIndex == 6){
        img.src = "static/resources/16.png";
        questionPic.appendChild(img);
    }
    else if(currentQuestionIndex == 7) {
        img.src = "static/resources/29.png";
        questionPic.appendChild(img);
    }
    else if(currentQuestionIndex == 8){
        img.src = "static/resources/7.png";
        questionPic.appendChild(img);
    }
    else if(currentQuestionIndex == 9) {
        img.src = "static/resources/73.png";
        questionPic.appendChild(img);
    }
    else if(currentQuestionIndex == 10){
        img.src = "static/resources/45.png";
        questionPic.appendChild(img);
    }
    else if(currentQuestionIndex == 11) {
        img.src = "static/resources/15.png";
        questionPic.appendChild(img);
    }
    question.answers.forEach(answer =>{
        if(answer.correct){
            quizAnswer = answer.text;
        }
    })
}

function resetState(){
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

const questions = [
    {
        question: "",
        answers:[
            {text: '8', correct: true}
        ],
    },
    {
        question: "",
        answers:[
            {text: '5', correct: true}
        ]
    },
    {
        question: "",
        answers:[
            {text: '6', correct: true}
        ]
    },
    {
        question: "",
        answers:[
            {text: '5', correct: true}
        ]
    },
    {
        question: "",
        answers:[
            {text: '74', correct: true}
        ],
    },
    {
        question: "",
        answers:[
            {text: '3', correct: true}
        ]
    },
    {
        question: "",
        answers:[
            {text: '16', correct: true}
        ]
    },
    {
        question: "",
        answers:[
            {text: '29', correct: true}
        ]
    },
    {
        question: "",
        answers:[
            {text: '7', correct: true}
        ],
    },
    {
        question: "",
        answers:[
            {text: '73', correct: true}
        ]
    },
    {
        question: "",
        answers:[
            {text: '45', correct: true}
        ]
    },
    {
        question: "",
        answers:[
            {text: '15', correct: true}
        ]
    }
];