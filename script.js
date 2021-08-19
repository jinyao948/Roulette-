const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const black = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
];
const oneToThirtyFour = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
const twoToThirtyFive = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
const threeToThirtySix = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
const table = document.querySelector(".table");

var x = document.getElementById("myAudio");
function playAudio() {
  x.play();
}
x.volume = 0.1;
function pauseAudio() {
  x.pause();
}
const flexContainer = document.getElementsByClassName("flex-container");
const playButton = document.getElementsByClassName("btn btn-success btn-lg")[0];
const bank = document.getElementsByClassName("cashAmount");
const initalInputSection = document.querySelectorAll(".bank-section");
const betChoiceButtons = document.querySelectorAll("[data-bet-choice]");
const betAmountButtons = document.querySelectorAll("[data-bet-amount]");
const betSubmitButton = document.getElementById("bet-submit-button");
const betchoice = document.getElementById("bet-choice");
const betamount = document.getElementById("bet-amount");
const resultDisplay = document.getElementById("result-display");
const winStatus = document.getElementsByClassName("win-status");
const lowerContainer = document.getElementsByClassName("roulette-lower-container");
lowerContainer[0].style.display = "none";
flexContainer[0].style.display = "none";
let bet = 0;
let cash = 0;
let additional;
let current = 0;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const rollBall = () => {
  resultNum = getRandomInt(1, 36);
};

playButton.addEventListener("click", () => {
  cash = prompt("exchange your money for chips bro");
  bank[0].innerText = cash;
  playButton.style.display = "none";
  lowerContainer[0].style.display = "";
  flexContainer[0].style.display = "";
});

betChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    betchoice.innerText = button.innerText;
  });
});

betAmountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let current = parseInt(betamount.innerText);
    additional = parseInt(button.innerText.slice(1));
    betamount.innerText = current + additional;
  });
});

const resetButton = document.querySelector("[data-bet-reset]");
resetButton.addEventListener("click", () => {
  betamount.innerText = "0";
});

betSubmitButton.addEventListener("click", () => {
  bank[0].innerText -= parseInt(betamount.innerText);
  if (betchoice.innerText != "none" && parseInt(betamount.innerText) > 0) {
    rollBall();
    setTimeout(printResult, 1000);
    checkResult();
    setTimeout(incrementBank, 2500);
    setTimeout(youLose, 3501);
  } else {
    alert("Please select a bet and a stake amount");
  }
});

const printResult = () => {
  resultDisplay.innerText = `${resultNum} ${checkWinColour()}`;
};

const checkWinColour = () => {
  if (red.includes(resultNum)) {
    return "Red";
  } else {
    return "Black";
  }
};

const checkColumnA = () => {
  if (oneToThirtyFour.includes(resultNum)) {
    return "You win";
  } else if (threeToThirtySix.includes(resultNum)) {
    return "Wrong Row bro";
  } else if (twoToThirtyFive.includes(resultNum)) {
    return "Wrong Row bro";
  }
};
const checkColumnB = () => {
  if (twoToThirtyFive.includes(resultNum)) {
    return "You win";
  } else if (threeToThirtySix.includes(resultNum)) {
    return "Wrong Row bro";
  } else if (oneToThirtyFour.includes(resultNum)) {
    return "Wrong Row bro";
  }
};

const checkColumnC = () => {
  if (threeToThirtySix.includes(resultNum)) {
    return "You win";
  } else if (oneToThirtyFour.includes(resultNum)) {
    return "Wrong Row bro";
  } else if (twoToThirtyFive.includes(resultNum)) {
    return "Wrong Row bro";
  }
};
table.addEventListener("click", (event) => {
  const singleBet = event.target.id;
  betchoice.innerText = singleBet;
});

const checksingleBet = () => {
  if (singleBet.includes(resultNum)) {
    return "You win";
  } else {
    return "Lose";
  }
};

const checkWinOdd = () => {
  console.log(resultNum % 2);
  if (resultNum % 2 !== 0) {
    console.log("Odd win");
    return "You win";
  } else {
    console.log("Odd lose");
    return "Even";
  }
};

const checkWinEven = () => {
  if (resultNum % 2 === 0) {
    return "You win";
  } else {
    return "Odd";
  }
};

const checkResult = () => {
  let returnValue = ["LOST!", false];

  let stake = parseInt(betamount.innerText);
  if (betchoice.innerText === "RED") {
    if (checkWinColour() === "Red") {
      returnValue = [`You win ${stake * 2} `, true];
    }
  } else if (betchoice.innerText === "BLACK") {
    if (checkWinColour() === "Black") {
      returnValue = [`You win ${stake * 2} `, true];
    }
  } else if (betchoice.innerText === "ODD") {
    if (checkWinOdd() === "You win") {
      returnValue = [`You win ${stake * 2} `, true];
    }
  } else if (betchoice.innerText === "EVEN") {
    if (checkWinEven() === "You win") {
      returnValue = [`You win ${stake * 2} `, true];
    }
  } else if (betchoice.innerText === "1 TO 34") {
    if (checkColumnA() === "You win") {
      returnValue = [`You win ${stake * 2} `, true];
    }
  } else if (betchoice.innerText === "2 TO 35") {
    if (checkColumnB() === "You win") {
      returnValue = [`You win ${stake * 2} `, true];
    }
  } else if (betchoice.innerText === "3 TO 36") {
    if (checkColumnC() === "You win") {
      returnValue = [`You win ${stake * 2} `, true];
    }
  } else if (betchoice.innerText === "singleBet") {
    if (checksingleBet() === "You win") {
      returnValue = [`You win' ${stake * 19}`, true];
    }
  }
  return returnValue;
}; 

const incrementBank = () => {
  if (checkResult()[1] == true) {
    bank[0].innerText =
      parseInt(bank[0].innerText) + parseInt(betamount.innerText) * 2;
    winStatus[0].innerText = "WIN!";
  } else {
    winStatus[0].innerText = "You lost money to the casino";
  }
};

const youLose = () => {
  if (parseInt(bank[0].innerText) < 1) {
    let playAgain = confirm(`YOU LOSE!!!! Play Again?`);
    if (playAgain) {
      location.reload();
    }
  }
};
