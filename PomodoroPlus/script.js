let workDuration = parseInt(localStorage.getItem('workDuration')) || 25;
let breakDuration = parseInt(localStorage.getItem('breakDuration')) || 5;
let isWork = localStorage.getItem('isWork') === "false" ? false : true;
let timeLeft = (isWork ? workDuration : breakDuration) * 60;
let timer = null;

const timeEl = document.getElementById('time');
const modeLabel = document.getElementById('mode-label');
const progress = document.getElementById('progress');
const alarm = document.getElementById('alarm-sound');

const workInput = document.getElementById('work-duration');
const breakInput = document.getElementById('break-duration');

workInput.value = workDuration;
breakInput.value = breakDuration;

function formatTime(sec){
    const m = Math.floor(sec/60).toString().padStart(2,'0');
    const s = (sec%60).toString().padStart(2,'0');
    return `${m}:${s}`;
}

function updateDisplay(){
    timeEl.textContent = formatTime(timeLeft);
    modeLabel.textContent = isWork ? "Work" : "Break";
    const total = isWork ? workDuration*60 : breakDuration*60;
    progress.style.width = ((total - timeLeft)/total*100) + '%';
}

function tick(){
    if(timeLeft>0){
        timeLeft--;
        updateDisplay();
    } else {
        alarm.play();
        clearInterval(timer);
    }
}

document.getElementById('start').onclick = ()=>{
    if(!timer) timer = setInterval(tick,1000);
};
document.getElementById('pause').onclick = ()=>{
    clearInterval(timer); timer=null;
};
document.getElementById('reset').onclick = ()=>{
    clearInterval(timer); timer=null;
    timeLeft = (isWork ? workDuration : breakDuration) * 60;
    updateDisplay();
};

document.getElementById('switch').onclick = ()=>{
    clearInterval(timer); timer=null;
    isWork = !isWork;
    localStorage.setItem('isWork', isWork);
    timeLeft = (isWork ? workDuration : breakDuration) * 60;
    updateDisplay();
};

workInput.onchange = ()=>{
    workDuration = parseInt(workInput.value);
    localStorage.setItem('workDuration', workDuration);
    if(isWork) timeLeft = workDuration*60;
    updateDisplay();
};
breakInput.onchange = ()=>{
    breakDuration = parseInt(breakInput.value);
    localStorage.setItem('breakDuration', breakDuration);
    if(!isWork) timeLeft = breakDuration*60;
    updateDisplay();
};

// Dark mode
document.getElementById('dark-toggle').onclick = ()=>{
    document.body.classList.toggle('dark');
};

// awal
updateDisplay();

document.getElementById('alarm-sound').play();
