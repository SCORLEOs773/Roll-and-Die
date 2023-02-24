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

let timeLimit = prompt('Enter Time Limit in minutes(Default 5 min) -');
timeLimit = Number(timeLimit * 60 * 1000);
let setTime = setTimeout(stop, timeLimit); //-----------------------------|>><<|
const player0Name = prompt('Player 1 - ');
const player1Name = prompt('Player 2 - ');

document.getElementById('name--0').textContent = player0Name;
document.getElementById('name--1').textContent = player1Name;

if (timeLimit === '') {
    timeLimit = 300000; // In Millieconds --> 300 Seconds --> 5 minutes
}

if (player0Name === '') {
    document.getElementById('name--0').textContent = 'Player 1';
}

if (player1Name === '') {
    document.getElementById('name--1').textContent = 'Player 2';
}

function stop() {
    alert('Time Over');
    current0.value = 0;
    current1.value = 0;
    timeLimit = 0;
    document.querySelector('.btnHold').textContent = 'Check Winner';
}

function declareWinner() {
    const winner = document.getElementById(`name--${activePlayer}`).textContent;
    // console.log(winner);
    document.querySelector(
        '.winMessage'
    ).textContent = `${winner} is the Winner.`;

    document.getElementById(`p${activePlayer}`).classList.add('player--winner');

    document.getElementById(`p${activePlayer}`).classList.remove('activePlayer');

    document.querySelector(`.current${activePlayer}`).style.backgroundColor =
        '#4ec736';
}

function timeOver() {
    current0.textContent = 0;
    current1.textContent = 0;
    playing = false;
    if (Number(score0.textContent) > Number(score1.textContent)) {
        activePlayer = 0;
        declareWinner();
    } else if (Number(score1.textContent) > Number(score0.textContent)) {
        activePlayer = 1;
        declareWinner();
    } else {
        document.querySelector('.winMessage').textContent = `It is a Tie`;
        document
            .getElementById(`p${activePlayer}`)
            .classList.remove('player--winner');
        document
            .getElementById(`p${activePlayer}`)
            .classList.remove('activePlayer');
    }

    document.querySelector('.winMessage').style.backgroundColor = '#ddd';

    dice.classList.add('hidden');
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
    playing = true;
    timeLimit = prompt('Enter Time Limit in minutes(Default 5 min) -');
    timeLimit = Number(timeLimit * 60 * 1000);
    setTime = setTimeout(stop, timeLimit);
    document.querySelector('.btnHold').textContent = '📥 Hold';
    document.querySelector(`.current0`).style.backgroundColor = '#c7365f';
    document.querySelector(`.current1`).style.backgroundColor = '#c7365f';
    document.querySelector('.winMessage').style.backgroundColor = 'transparent';
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    // startTimer();

    // Start Conditions
    score0.textContent = 0;
    score1.textContent = 0;
    // score0.textContent = 0;
    // score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('activePlayer');
    player1.classList.remove('activePlayer');
    document.querySelector('.winMessage').textContent = ``;
};

// reset();
playing = true;
score = [0, 0];
currentScore = 0;
activePlayer = 0;

// Die Roll
btnRoll.addEventListener('click', function() {
    if (playing && timeLimit !== 0) {
        const randomRoll = Math.trunc(Math.random() * 6) + 1;
        // console.log(randomRoll);
        dice.classList.remove('hidden');
        dice.src = `dice-${randomRoll}.png`;
        document.querySelector(
            '.winMessage'
        ).textContent = `You rolled a ${randomRoll}`;

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
    if (timeLimit !== 0) {
        if (playing) {
            score[activePlayer] += currentScore;
            document.getElementById(`score--${activePlayer}`).textContent =
                score[activePlayer];
            switchPlayer();
        }
    } else {
        timeOver();
    }
});

function superReset() {
    reset();
    clockFunc();
}

btnNew.addEventListener('click', superReset);

// -------------------------------------------------------------------------------------------------------

// Countdown Clock

clockFunc();

function clockFunc() {
    const FULL_DASH_ARRAY = 283;
    let WARNING_THRESHOLD = 10;
    let ALERT_THRESHOLD = 5;

    // if (timeLimit >= 10) {
    //     WARNING_THRESHOLD = 120;
    //     ALERT_THRESHOLD = 60;
    // } else if (timeLimit >= 5) {
    //     WARNING_THRESHOLD = 60;
    //     ALERT_THRESHOLD = 30;
    // } else {
    //     WARNING_THRESHOLD = 30;
    //     ALERT_THRESHOLD = 10;
    // }

    const COLOR_CODES = {
        info: {
            color: 'green',
        },
        warning: {
            color: 'orange',
            threshold: WARNING_THRESHOLD,
        },
        alert: {
            color: 'red',
            threshold: ALERT_THRESHOLD,
        },
    };

    if (timeLimit === '') {
        timeLimit = 300000; // In Millieconds --> 300 Seconds --> 5 minutes
    }

    const TIME_LIMIT = timeLimit * 0.001;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    document.getElementById('app').innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

    startTimer();

    function onTimesUp() {
        clearInterval(timerInterval);
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById('base-timer-label').innerHTML =
                formatTime(timeLeft);
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {
                onTimesUp();
            }
        }, 1000);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document
                .getElementById('base-timer-path-remaining')
                .classList.remove(warning.color);
            document
                .getElementById('base-timer-path-remaining')
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById('base-timer-path-remaining')
                .classList.remove(info.color);
            document
                .getElementById('base-timer-path-remaining')
                .classList.add(warning.color);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
        document
            .getElementById('base-timer-path-remaining')
            .setAttribute('stroke-dasharray', circleDasharray);
    }
}