const riddlesEng = [
  {
    question: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
    answer: "candle"
  },
  {
    question: "What is full of holes but still holds water?",
    answer: "sponge"
  },
  {
    question: "What is always in front of you but can’t be seen?",
    answer: "future"
  },
  {
    question: "What can you break, even if you never pick it up or touch it?",
    answer: "promise"
  },
  { question: "What gets wet while drying?", answer: "towel" },
  { question: "What can you keep after giving to someone?", answer: "word" },
  {
    question: "I shave every day, but my beard stays the same. What am I?",
    answer: "barber"
  },
  {
    question: "What has many keys but can’t open a single lock?",
    answer: "piano"
  },
  {
    question: "What invention lets you look right through a wall?",
    answer: "window"
  },
  { question: "What has hands, but can’t clap?", answer: "clock" },
  {
    question:
      "What can travel all around the world without leaving its corner?",
    answer: "stamp"
  },
  {
    question: "What has a thumb and four fingers, but is not a hand?",
    answer: "glove"
  },
  { question: "What has a head and a tail but no body?", answer: "coin" },
  {
    question: "If two’s company, and three’s a crowd, what are four and five?",
    answer: "nine"
  },
  {
    question:
      "What five-letter word becomes shorter when you add two letters to it?",
    answer: "short"
  },
  {
    question: "What is so fragile that saying its name breaks it?",
    answer: "silence"
  },
  {
    question: "What has to be broken before you can use it?",
    answer: "egg"
  },
  {
    question: "What goes up but never comes down?",
    answer: "age"
  },
  {
    question: "Where does one wall meet the other wall?",
    answer: "corner"
  },
  {
    question:
      "I am an odd number. Take away a letter and I become even. What number am I?",
    answer: "seven"
  },
  {
    question: "What word of five letters has one left when two are removed?",
    answer: "stone"
  }
];

const riddlesUkr = [
  {
    question:
      "Я маю ріки без води, гори без каменю, міста без будинків. Хто я?",
    answer: "карта"
  },
  {
    question: "Що високе у молодості і низьке у старості?",
    answer: "свічка"
  },
  {
    question: "Що повно дір має і воду тримає?",
    answer: "губка"
  },
  {
    question: "Що йде вгору і йде вниз, але не рухається?",
    answer: "східці"
  },
  {
    question: "Якщо двоє - компанія, троє - натовп, то що чотири і п'ять?",
    answer: "дев'ять"
  },
  {
    question: "Хто зникне, якщо вимовити її ім'я?",
    answer: "тиша"
  }
];

let lastStepEng = [
  "Great! ",
  "Last step: ",
  "compose ",
  "the word ",
  "from these ",
  "letters!"
];

let lastStepUkr = [
  "Чудово! ",
  "Останній крок: ",
  "складіть ",
  "слово ",
  "із цих ",
  "букв!"
];

let changeLangFlag = 0;
function changeLang() {
  changeLangFlag === 0 ? (changeLangFlag = 1) : (changeLangFlag = 0);
}

let welcomePhraseEn = "Let's play!";
let welcomePhraseUkr = "Зіграємо!";

function changeWelcomePhrase() {
  changeLangFlag === 1
    ? (document.getElementById("question").innerHTML = `${welcomePhraseUkr}`)
    : (document.getElementById("question").innerHTML = `${welcomePhraseEn}`);
}

let riddleButtonTextEn = "New Riddle";
let riddleButtonTextUkr = "Нова загадка!";

function changeRiddleButtonText() {
  changeLangFlag === 1
    ? (document.getElementById("newRiddle").value = `${riddleButtonTextUkr}`)
    : (document.getElementById("newRiddle").value = `${riddleButtonTextEn}`);
}

let randomNum;
let riddle;
let answerRiddle;
let listOfRiddlesLength;
let congratsEn = "congrats!";
let congratsUkr = "так!";
let tryAgainEn = "Try again!";
let tryAgainUkr = "Спробуйте ще!";
let ind;

function showInputField() {
  document.getElementById("submitForm").classList.add("showSubmitForm");
}

function getRiddle() {
  hintCount = 2; //declared below (see below, one line up the 'getHint()' function). We need to set this value back to '2', because getHint() function decrements this value and we'll not be able to get hints)
  listOfRiddlesLength = riddlesEng.length;
  randomNum = Math.floor(Math.random() * listOfRiddlesLength);
  riddle = riddlesEng[randomNum].question;
  answerRiddle = riddlesEng[randomNum].answer;
  document.getElementById("question").innerHTML = `<span>${riddle}</span>`;
  if (changeLangFlag === 1) {
    listOfRiddlesLength = riddlesUkr.length;
    randomNum = Math.floor(Math.random() * listOfRiddlesLength);
    riddle = riddlesUkr[randomNum].question;
    answerRiddle = riddlesUkr[randomNum].answer;
    document.getElementById("question").innerHTML = `<span>${riddle}</span>`;
  }
  //changes the value of 'answer' button
  let value = document.getElementById("showAnswer").value;
  if (value != answerButtonEn || value != answerButtonUkr) {
    changeAnswerButtonLang();
  }
  // we have to reset the value of ind, so that with each new riddle our index (used in the addAnimationClass() and removeAnimationClass() functions) becomes 0 again
  ind = 0;
}

let answer = [];
//get answer (string) and split it into array of letters
//as split() function returns an array, we push this array into the answer array.
// so now answer array has one element, which is an array of strings.
//that's why we need to specify 'answer[0]' to access values of the array
//before pushing 'answer' to the array, we first need to delete previous 'answer' to the previous 'riddle'
function enterLetter() {
  if (answer.length > 0) {
    answer.length = 0;
  }
  answer.push(answerRiddle.split(""));
}

let resultArr = [];
let tempArr = [];

function getInput(event) {
  //we need to make input letters lowercase (so they are compared with the lowercase-letters in the 'answer')
  let input = document.getElementById("userInput").value.toLowerCase();

  if (input.length === 1) {
    //check if 'answer' array has a letter from user input
    if (answer[0].includes(input)) {
      let letter = document.getElementById("listOfLetters");
      let answeRiddleArr = answerRiddle.split(""); //get array of letters
      //each list item has index according to its position in answerRiddleArr, that is, we get correct position of a letter in a word
      letter.innerHTML += `<li id="${++ind}">${input}</li>`;

      addAnimationClass(ind);
      //add animation only to the current letter, so that previous one (already animated) is not animated again
      if (ind > 1) {
        removeAnimationClass(ind);
      }

      //remove letter, the one which was added to innerHTML, from the 'answer' array, because if they are not removed, we'll be able to constantly add them to innerHTML
      resultArr.push(input);
      answer[0].splice(answer[0].indexOf(input), 1); //find index of 'letter' and remove 1 letter from that position

      //if there are no letters left in the 'answer' array, it means the user guessed all letters right
      if (answer[0].length === 0) {
        disableHintButton();
        tempArr = resultArr;
        resultArr = [];
        //check if elements from tempArr and answeRiddleArr are equal
        let equal = tempArr.every(function(el, i) {
          return el === answeRiddleArr[i];
        });

        if (equal) {
          changeLangFlag === 0
            ? (document.getElementById(
                "congrats"
              ).innerHTML = `<span class="congratulation">${congratsEn}</span>`)
            : (document.getElementById(
                "congrats"
              ).innerHTML = `<span class="congratulation">${congratsUkr}</span>`);
        } else {
          lastStep();
        }
      }
    }
  } // if user makes a guess (submits word, not letter) and their guess is wrong
  if (input.length > 1 && input !== answerRiddle) {
    changeLangFlag === 0
      ? (document.getElementById(
          "tryAgain"
        ).innerHTML = `<span class="again">${tryAgainEn}</span>`)
      : (document.getElementById(
          "tryAgainUkr"
        ).innerHTML = `<span class="again">${tryAgainUkr}</span>`);
  } //if the guess is right
  if (input === answerRiddle) {
    disableHintButton();

    //create an array of size equal to the number of the elements from the 'answer' array
    //this will be the array which will hold letters according to their position in the 'answer' array
    let listOfLetters = document.getElementById("listOfLetters");
    listOfLetters.innerHTML = input
      .split("")
      .map(function(el) {
        return `<li>${el}</li>`;
      })
      .join("");

    changeLangFlag === 0
      ? (document.getElementById(
          "congrats"
        ).innerHTML = `<span class="congratulation">${congratsEn}</span>`)
      : (document.getElementById(
          "congrats"
        ).innerHTML = `<span class="congratulation">${congratsUkr}</span>`);
  }
  event.preventDefault();
}

function lastStep() {
  let changeLangOption;
  changeLangFlag === 0
    ? (changeLangOption = lastStepEng)
    : (changeLangOption = lastStepUkr);

  document.getElementById("lastStepRemark").innerHTML = changeLangOption
    .map(function(e, i) {
      // setTimeout(function() {
      return `<span id="${i + 1}">${e}</span>`;
      // }, i * 300);
    })
    .join("");
}

function removeListItems() {
  let listItems = document.getElementById("listOfLetters");
  listItems.innerHTML = "";
}

function disableInputField() {
  let checkValue = document.getElementById("congrats").innerHTML;
  if (checkValue != "") {
    document.getElementById("userInput").disabled = true;
  }
}

function enableInputField() {
  document.getElementById("userInput").disabled = false;
}

function hideCongrats() {
  document.getElementById("congrats").innerHTML = "";
}

function hideTryAgain() {
  document.getElementById("tryAgain").innerHTML = "";
}

function clearInput() {
  document.getElementById("userInput").value = "";
}

let hintCount = 2;
function getHint() {
  if (hintCount === 2) {
    changeLangFlag === 0
      ? (document.getElementById(
          "hintContainer"
        ).innerHTML = `<span class="myHint">Letters left: <span id="hintNumber">${answer[0].length}</span></span>`)
      : (document.getElementById(
          "hintContainer"
        ).innerHTML = `<span class="myHint">Лишилось букв: <span id="hintNumber">${answer[0].length}</span></span>`);
    hintCount -= 1;
    return;
  }

  if (hintCount === 1) {
    changeLangFlag === 0
      ? (document.getElementById(
          "hintContainer"
        ).innerHTML = `<span class="myHint">There's letter <span id="hintLetter">${answer[0][0]}</span> in this word </span>`)
      : (document.getElementById(
          "hintContainer"
        ).innerHTML = `<span class="myHint">У слові є буква <span id="hintLetter">${answer[0][0]}</span></span>`);
    hintCount -= 1;
  }

  disableHintButton();
}

let hintButtonUkr = "підказка";
let hintButtonEn = "get a hint";

function changeHintButtonLanguage() {
  changeLangFlag === 1
    ? (document.getElementById("hintButton").value = `${hintButtonUkr}`)
    : (document.getElementById("hintButton").value = `${hintButtonEn}`);
}

function hideHint() {
  document.getElementById("hintContainer").innerHTML = "";
}

function enableHintButton() {
  document.getElementById("hintButton").disabled = false;
}

function disableHintButton() {
  document.getElementById("hintButton").disabled = true;
}

function addAnimationClass(i) {
  document.getElementById(`${i}`).classList.add("animate");
}

function removeAnimationClass(i) {
  document.getElementById(`${i - 1}`).className = "";
}

function removeLastStepRemark() {
  document.getElementById("lastStepRemark").innerHTML = "";
}

function removeCheers() {
  document.getElementById("tryAgain").innerHTML = "";
}

function showAnswer() {
  document.getElementById("showAnswer").value = `${answerRiddle}`;
}

function enableAnswerButton() {
  document.getElementById("showAnswer").disabled = false;
}

function disableAnswerButton() {
  document.getElementById("showAnswer").disabled = true;
}

let answerButtonEn = "answer";
let answerButtonUkr = "відповідь";
function changeAnswerButtonLang() {
  changeLangFlag === 1
    ? (document.getElementById("showAnswer").value = `${answerButtonUkr}`)
    : (document.getElementById("showAnswer").value = `${answerButtonEn}`);
}

function changeValueLangButton() {
  document.getElementById("switchLangButtonId").value === "Укр"
    ? (document.getElementById("switchLangButtonId").value = "EN")
    : (document.getElementById("switchLangButtonId").value = "Укр");
}
