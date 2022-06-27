// PIG GAME
// TUT 82

// Selecting Element
let pCount1 = 0,
    pCount2 = 0,
    rollP = 0,
    noRoll;
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

// let scoreLimit = prompt('Enter Score Limit - ');
noRoll = prompt('Enter number of Rounds(Default 10) - ');
const player0Name = prompt('Player 1 - ');
const player1Name = prompt('Player 2 - ');

document.getElementById('name--0').textContent = player0Name;
document.getElementById('name--1').textContent = player1Name;

if (noRoll === '') {
    noRoll = 10;
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

let score, currentScore, activePlayer, playing, pCount;

const reset = function() {
    document.querySelector(`.current0`).style.backgroundColor = '#c7365f';
    document.querySelector(`.current1`).style.backgroundColor = '#c7365f';
    document.querySelector('.winMessage').style.backgroundColor = 'transparent';
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    pCount1 = 0;
    pCount2 = 0;
    rollP = 0;
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
        rollP = rollP + 1;
        console.log(`rollP = `, rollP);

        const randomRoll = Math.trunc(Math.random() * 6) + 1;
        // console.log(randomRoll);
        dice.classList.remove('hidden');
        dice.src = `dice-${randomRoll}.png`;
        document.querySelector(
            '.winMessage'
        ).textContent = `You rolled a ${randomRoll}.`;

        if (rollP <= 3) {
            currentScore += randomRoll;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            if (activePlayer === 0) {
                pCount1 = pCount1 + 1;
            } else if (activePlayer === 1) {
                pCount2 = pCount2 + 1;
            }

            console.log(`Your turn got skipped.`);
            document.querySelector(
                '.winMessage'
            ).textContent = `Your turn got skipped`;
            console.log(pCount1, pCount2);

            switchPlayer();
            rollP = 0;
        }

        if (pCount1 >= noRoll && pCount2 >= noRoll) {
            playing = false;

            if (score0.textContent > score1.textContent) {
                activePlayer = 0;
            } else {
                activePlayer = 1;
            }

            if (pCount1 === pCount2) {
                document.querySelector('.roundInfo').textContent = `Round ${pCount1}`; //--------->><<
            }

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
        }

        // if (randomRoll !== 1) {
        //     currentScore += randomRoll;
        //     document.getElementById(`current--${activePlayer}`).textContent =
        //         currentScore;
        // } else {
        //     switchPlayer();
        // }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        score[activePlayer] += currentScore;

        rollP = 0;

        if (activePlayer === 0) {
            pCount1 = pCount1 + 1;
        } else if (activePlayer === 1) {
            pCount2 = pCount2 + 1;
        }

        if (pCount1 === pCount2) {
            document.querySelector('.roundInfo').textContent = `Round ${pCount1}`; //----------------->><<
        }

        console.log(pCount1, pCount2);

        document.getElementById(`score--${activePlayer}`).textContent =
            score[activePlayer];

        if (pCount1 >= noRoll && pCount2 >= noRoll) {
            playing = false;

            if (score0.textContent > score1.textContent) {
                activePlayer = 0;
            } else {
                activePlayer = 1;
            }

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

function superReset() {
    reset();
    noRoll = prompt('Enter number of Rounds(Default 10) - ');

    if (noRoll === '') {
        noRoll = 10;
    }
}

btnNew.addEventListener('click', superReset);