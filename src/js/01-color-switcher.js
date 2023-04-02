const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', changeBackgroundColor);
btnStop.addEventListener('click', stopChangeColor);

let interval = null;

function changeBackgroundColor() {
    interval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnStart.disabled = true;
};

function stopChangeColor() {
    clearInterval(interval);
    btnStart.disabled = false;
 }

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`
};

