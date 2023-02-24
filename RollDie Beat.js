// PIG GAME
// TUT 82

// Selecting Element
const player0 = document.getElementById('p0');
const player1 = document.getElementById('p1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btnNew');
const btnRoll = document.querySelector('.btnRoll');
const btnHold = document.querySelector('.btnHold');
dice.classList.add('hidden');

let scoreLimit = prompt('Enter Score Limit - ');
const player0Name = prompt('Player 1 - ');
const player1Name = prompt('Player 2 - ');

document.getElementById('name--0').textContent = player0Name;
document.getElementById('name--1').textContent = player1Name;

if (scoreLimit === '') {
    scoreLimit = 100;
}

if (player0Name === '') {
    document.getElementById('name--0').textContent = 'Player 1';
}

if (player1Name === '') {
    document.getElementById('name--1').textContent = 'Player 2';
}

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0.classList.toggle('activePlayer');
    player1.classList.toggle('activePlayer');
}

let score, currentScore, activePlayer, playing;

const reset = function() {
    document.querySelector(`.current0`).style.backgroundColor = '#c7365f';
    document.querySelector(`.current1`).style.backgroundColor = '#c7365f';
    document.querySelector('.winMessage').style.backgroundColor = 'transparent';
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    // Start Conditions
    score0.textContent = 0;
    score1.textContent = 0;
    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('activePlayer');
    player1.classList.remove('activePlayer');
    document.querySelector('.winMessage').textContent = ``;
};

reset();

// Die Roll
btnRoll.addEventListener('click', function() {
    if (playing) {
        const randomRoll = Math.trunc(Math.random() * 6) + 1;
        // console.log(randomRoll);
        dice.classList.remove('hidden');
        dice.src = `dice-${randomRoll}.png`;
        document.querySelector(
            '.winMessage'
        ).textContent = `You rolled a ${randomRoll}.`;

        if (randomRoll !== 1) {
            currentScore += randomRoll;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            score[activePlayer];

        if (score[activePlayer] >= scoreLimit) {
            playing = false;
            const winner = document.getElementById(
                `name--${activePlayer}`
            ).textContent;
            // console.log(winner);
            document.querySelector(
                '.winMessage'
            ).textContent = `${winner} is the Winner.`;

            document.querySelector('.winMessage').style.backgroundColor = '#ddd';

            dice.classList.add('hidden');

            document
                .getElementById(`p${activePlayer}`)
                .classList.add('player--winner');

            document
                .getElementById(`p${activePlayer}`)
                .classList.remove('activePlayer');

            document.querySelector(`.current${activePlayer}`).style.backgroundColor =
                '#4ec736';
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', reset);