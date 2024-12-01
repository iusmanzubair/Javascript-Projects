import { questions } from "./questions.js";

const ContainerDiv = document.querySelector('.container')
const QuestionDiv = document.querySelector('.question')
const OptionsDiv = document.querySelector('.options')
const ResultDiv = document.querySelector('.result')
const SummaryDiv = document.querySelector('.summary')
const playAgain = document.querySelector('.play-again')

let index, count = 0, toSkip = [];
let correctAnswers = 0, wrongAnswers = 0;
const MAX_QUESTIONS = 10;

const playGameAgain = ()=> {
    count = 0;
    toSkip = [];
    correctAnswers = 0;
    wrongAnswers = 0;
    ResultDiv.style.display = 'none'
    ContainerDiv.style.display = 'block'

    randomQue();
}

const finalResult = ()=> {
    ResultDiv.style.display = 'block'
    ContainerDiv.style.display = 'none'
    SummaryDiv.innerHTML = `<p>Correct: <span>${correctAnswers}</span></p>
                            <p>Wrong: <span>${wrongAnswers}</span></p>`

    playAgain.addEventListener('click', playGameAgain)
}

const checkResult = (target, option, correct)=> {
    OptionsDiv.querySelectorAll('li').forEach((option)=> {
        if(option != target)
            option.classList.add('disabled')
    })


    if(option === correct) {
        ++correctAnswers;
        target.classList.add('success');
    }
    else {
        ++wrongAnswers;
        target.classList.add('fail');
    }

    setTimeout(()=> {
        if(count == MAX_QUESTIONS)
            return finalResult();
    
        randomQue();
    }, 500)
}

const randomQue = ()=> {
    ++count;
    while(1) {
        index = Math.floor(Math.random() * questions.length)
        if(!toSkip.includes(index)) 
            break;
    }

    toSkip.push(index);
    const {question, options, Correct} = questions[index];
    QuestionDiv.innerHTML = `<span>${count}. </span>${question}`
    OptionsDiv.innerHTML = ``
    options.map((option)=> {
        const opt = document.createElement("li")
        opt.innerText = option
        OptionsDiv.appendChild(opt)
        opt.addEventListener('click', e => checkResult(e.target, option, Correct))
    })
}

randomQue();