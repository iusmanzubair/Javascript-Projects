import { wordList } from "./word-list.js";

const keyboardDiv = document.querySelector('.keyboard');
const wordDisplayDiv = document.querySelector('.word-display');
const gussesTextDiv = document.querySelector('.guesses-text b');
const hangmanImage = document.querySelector('.hangman-box img');
const gameModal = document.querySelector('.game-modal');
const playAgainBtn = document.querySelector('.play-again');

let currentWord, wrongGuessCount, correctGuess;
const MAX_GUESS_COUNT = 6;

const gameOver = (isVictory) => {
    setTimeout(()=> {
        gameModal.querySelector('img').src = `images/${isVictory ? 'victory' : 'lost'}.gif`
        gameModal.querySelector('h4').innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector('p').innerHTML = `${isVictory ? 'You found the word: ' : 'The correct word was: '} <b>${currentWord}</b>`
        gameModal.classList.add('show')
    }, 300)
}

const resetGame = ()=> {
    wrongGuessCount = 0;
    correctGuess = [];
    wordDisplayDiv.innerHTML = currentWord.split("").map(()=> `<li class="letter"></li>`).join("");
    gussesTextDiv.innerText = `${wrongGuessCount} / ${MAX_GUESS_COUNT} `
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    keyboardDiv.querySelectorAll('button').forEach(btn => btn.disabled = false);
    gameModal.classList.remove('show')
}

const randomWord = ()=> {
    const {hint, word} = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word;
    document.querySelector('.hint-text b').innerText = hint;
    resetGame();
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctGuess.push(letter);
                wordDisplayDiv.querySelectorAll('li')[index].innerText = letter;
                wordDisplayDiv.querySelectorAll('li')[index].classList.add('guessed');
            }
        })
    } else {
        ++wrongGuessCount;
        gussesTextDiv.innerText = `${wrongGuessCount} / ${MAX_GUESS_COUNT} `
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    }

    button.disabled = true;
    if(correctGuess.length === currentWord.length) return gameOver(true);
    if(wrongGuessCount === MAX_GUESS_COUNT) return gameOver(false);
}

for(let i = 97; i <= 122; ++i) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener('click', e => initGame(e.target, String.fromCharCode(i)));
}

randomWord();

playAgainBtn.addEventListener('click', randomWord);

