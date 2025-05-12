const words = ["Ahmed", "Mohamed", "Ali", "Khaled", "Yasser"];

const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upComingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

input.onpaste = function () {
  return false;
};

startButton.onclick = function () {
  this.remove();
  input.focus();
  genWords();
};

function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);

  theWord.innerHTML = randomWord;
  upComingWords.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upComingWords.appendChild(div);
  }

  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;

    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);

      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "god";
          let spanText = document.createTextNode("Well Done");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          upComingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
