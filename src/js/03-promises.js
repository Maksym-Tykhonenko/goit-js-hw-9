//function createPromise(position, delay) {
//  const shouldResolve = Math.random() > 0.3;
//  if (shouldResolve) {
//    // Fulfill
//  } else {
//    // Reject
//  }
//}
const horses = [
    'СЕКРИТАРИАТ',
    'ЭКЛИПС',
    'ВЕСТ АВСТРАЛИАН',
    'ФЛАИНГ ФОКС',
    'СЕБИСКЕТ',
];

let raceCounter = 0;

const refs = {
    startBtn: document.querySelector('.js-rase-btn'),
    winner: document.querySelector('.winner'),
    progress: document.querySelector('.progress'),
    tableBody: document.querySelector('.js-result-table > tbody'),
};

refs.startBtn.addEventListener('click', onStart);

function onStart() {
    raceCounter += 1;
    const promises = horses.map(horse => run(horse));

    updWinnerField('');
    updProgressField('Заезд начался, ставки не принимаются');
    determinateWinner(promises);
    waitForAll(promises);
};


function determinateWinner(horsesP) {
    Promise.race(horsesP)
        .then(({ horse, time }) => {
            updWinnerField(`Победил ${horse}, финишировал за ${time}`)
            updResultTable({ horse, time, raceCounter })
        });
};

function waitForAll(horsesP) {
    Promise.all(horsesP).then(() =>
        updProgressField('Заезд окончен, принимаются ставки.')
    );
};

function updWinnerField(message) {
    refs.winner.textContent = message;
};

function updProgressField(message) {
    refs.progress.textContent = message;
};

function updResultTable({ horse, time, raceCounter }) {
    const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`;
    refs.tableBody.insertAdjacentHTML('beforeend', tr);
};

function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function run(horse) {
    return new Promise((resolve) => {
        const time = getRandomTime(2000, 3500);

        setTimeout(() => {
            resolve({ horse, time });
        }, time);
    })
};
