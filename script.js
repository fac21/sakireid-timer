//declare global variables
let timerOn = false;
let restImage = false;
let partyImage = false;
let customised = false;
let onBreak = false;
let paused = false;
let secs = 0;
let mins;
let time;
let customMins = 0;

const customise = document.getElementById("customise")
const what = document.getElementById("what")
const pomodoro = document.getElementById("pomodoro")
const shortbreak = document.getElementById("shortb")
const longbreak = document.getElementById("longb")
const startbutton = document.getElementById("startb")
const restartbutton = document.getElementById("restartb")
const tomato = document.getElementById("tmt-img")

startbutton.addEventListener("click", startTimer);
restartbutton.addEventListener("click", restartTimer);
pomodoro.addEventListener("click", () => { setImage(1), setTime(25)});
shortbreak.addEventListener("click", () => { setImage(2), setTime(5)});
longbreak.addEventListener("click", () => { setImage(3), setTime(15)});

// TIMER FUNCTIONATLIY 
function timer(){
  time = setTimeout(timer, 1000)
  if (secs < 60 && secs >= 1){
    writeTime();
    secs--;
  } else if (secs <= 0){
    writeTime();
    if (mins == 0 && secs == 0){
      document.getElementById("audio").play()
      stopTimer();
    }
    mins--;
    secs = 59;
  }
}

function startTimer() {
  checkStatus();
  paused = false;
  if (!timerOn) {
    timerOn = true;
    timer();
    startbutton.textContent = "stop";
  } else {
    stopTimer();
    startbutton.textContent = "start";
  }
}

function stopTimer(){
  clearTimeout(time)
  paused = true;
  timerOn = false;
  startbutton.textContent = "start";
}

function restartTimer() {
  stopTimer();
  paused = false;
  secs = 0;
  if (restImage){
    mins = 5;
  } else if (partyImage) {
    mins = 15;
  } else{
    checkStatus();
  }
  writeTime();
}

function checkStatus(){
  if (!timerOn && !paused) {
    if (!customised &!onBreak){
      mins = 25;
    } else if (customised && !onBreak){
      mins = customMins;
    } else if (customised && onBreak){
      secs = 0;
    }
  } 
}

function writeTime(){
  const minutes = document.getElementById("minscss");
  const seconds = document.getElementById("secscss");
  if (secs < 10 && mins < 10) {
    seconds.textContent = "0" + secs;
    minutes.textContent = "0" + mins;
  } else if (secs < 10){
    minutes.textContent = mins;
    seconds.textContent = "0" + secs;
  } else if (mins < 10){
    minutes.textContent = "0" + mins;
    seconds.textContent = secs;
  } else {
    minutes.textContent = mins;
    seconds.textContent = secs;
  }
}

function setTime(num){
  
  if (timerOn){
    timerOn = false;
    paused = true;
    startbutton.textContent = "start"
  }
  clearTimeout(time)
  if (num == 5 || num == 15){
    onBreak = true;
  } else{
    onBreak = false;
  }
  mins = num;
  secs = 0;
  checkStatus();
  writeTime();
}

function setImage(num){
  switch(num){
    case 1:
      tomato.src = "images/941.png"
      partyImage = false;
      restImage = false;
      break;
    case 2:
      tomato.src = "images/942.png"
      partyImage = false;
      restImage = true;
      break;
    case 3:
      tomato.src = "images/957.png"
      partyImage = true;
      restImage = false;
      break;
    default:
      tomato.src = "images/941.png"
  }
}

// CUSTOMISE FUNCTIONATLIY 

//global variables
const body = document.getElementById("body");
const container = document.createElement('div');
const form = document.createElement('form');
const input = document.createElement('input');
const insertButton = document.createElement('button');
const label = document.createElement('label');

customise.addEventListener("click", customiser)
what.addEventListener("click", whatPomodoro)

function customiser() {
  createOverlay();
  createForm();
  stopTimer();
  paused = false;
  
}

function createOverlay(){
  body.classList.add("overlay")
  body.style.display ='block'
  body.setAttribute("onclick", "off()")
  container.classList.add("custom");
  container.classList += " center"
  container.classList += " width-sm"
  body.appendChild(container)
}

function createForm(){
  form.classList.add("custom-form")
  container.appendChild(form)
  createLabel();
  createInput();
  createSubmit();
}

function createInput(){
  input.setAttribute('type', 'text')
  input.setAttribute('name', 'pomomins')
  form.appendChild(input);
}

function createSubmit(){
  insertButton.setAttribute('onclick', "return clicked()")
  insertButton.textContent = "save"
  form.appendChild(insertButton);
}

function createLabel(){
  label.setAttribute('for', 'pomomins')
  label.textContent = 'Enter Pomodoro Minutes: '
  form.appendChild(label)
}

function clicked() {
  if (!parseInt(input.value)){ //if user enters words etc. 
    alert("Please enter a valid number")
  } else{
    customised = true;
    if (!partyImage && !restImage){
      secs= 0;
    } else { //if break when customised button is pressed
      setImage(1)
      setTime(parseInt(input.value))
    }
    customMins = parseInt(input.value)
    checkStatus();
    writeTime();
    document.getElementById("body").style.display = "none";
  }
  return false;
}

// What is a Pomodoro Timer?
function whatPomodoro(){
  createOverlay(); 
  const pomoTechnique = document.createElement('div')
  pomoTechnique.classList.add('pomoTech')
  container.appendChild(pomoTechnique);

  const pomoHowQ = document.createElement('h2')
  pomoHowQ.textContent = 'How to Pomodoro?'
  pomoTechnique.appendChild(pomoHowQ);

  const pomoSt = document.createElement('p')
  pomoSt.textContent = 'The Pomodoro Technique is a time management system that encourages people to work with the time they have—rather than against it.'
  pomoTechnique.appendChild(pomoSt);

  const pomoHowA = document.createElement('p')
  pomoHowA.textContent = 'Break your workday into 25-minute chunks seperated by 5-minute breaks. These intervals are referred to as pomodoros. After about four pomodoros, you take a longer break of about 15 to 20 minutes.'
  pomoTechnique.appendChild(pomoHowA);

  const pomoWhat = document.createElement('p')
  pomoWhat.textContent = 'The idea behind the technique is that the timer instills a sense of urgency. Rather than feeling like you have endless time in the workday to get things done and then ultimately squandering those precious work hours on distractions, you know you only have 25 minutes to make as much progress on a task as possible.'
  pomoTechnique.appendChild(pomoWhat);

  const pomoBreak = document.createElement('p')
  pomoBreak.textContent = 'Additionally, the forced breaks help to cure that frazzled, burnt-out feeling most of us experience toward the end of the day. It’s impossible to spend hours in front of your computer without even realizing it, as that ticking timer reminds you to get up and take a breather.'
  pomoTechnique.appendChild(pomoBreak);
}

function off(){
  console.log('click')
  document.getElementById("body").style.display = "none";
}

