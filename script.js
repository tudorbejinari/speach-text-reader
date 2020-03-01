const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/thirsty.jpeg',
    text: "I'm Thirsty!"
  },
  {
    image: './img/hungry.jpeg',
    text: "I'm Hungry!"
  },
  {
    image: './img/sleepy.jpeg',
    text: "I'm Tired!"
  },
  {
    image: './img/hurt.jpeg',
    text: "I'm Hurt!"
  },
  {
    image: './img/happy.jpeg',
    text: "I'm Happy!"
  },
  {
    image: './img/angry.jpeg',
    text: "I'm Angry!"
  },
  {
    image: './img/sad.jpeg',
    text: "I'm Sad!"
  },
  {
    image: './img/scared.jpeg',
    text: "I'm Scared!"
  }
];

data.forEach(createBox);

//Create speech boxes
function createBox(item) {
  const box = document.createElement('div');
  const { image, text } = item;
  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p class="info">${text}</p>
    `;
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();
    //add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

//Init speech synth
const message = new SpeechSynthesisUtterance();

//store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}
//Set text
function setTextMessage(text) {
  message.text = text;
}
//Speak text
function speakText() {
  speechSynthesis.speak(message);
}
//Set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

///voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

//toggle text box
toggleBtn.addEventListener('click', () => {
  document.getElementById('text-box').classList.toggle('show');
});
//close button
closeBtn.addEventListener('click', () => {
  document.getElementById('text-box').classList.remove('show');
});

//change voice
voicesSelect.addEventListener('change', setVoice);

//Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
