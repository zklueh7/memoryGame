const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
let counter = 0;
let cards = [];
let cardFlips = {};
let startButton = document.getElementById("start-button");
let startButtonPush = false;
let restartButton = document.getElementById("restart-button");
let scoreElement = document.getElementById("score");
let highScoreElement = document.getElementById("high-score");
let matches = 0;
let score = 0;
scoreElement.innerHTML = "Score: " + score;
let highScore;
if(localStorage.getItem("highScore") === null)
{
  highScore = "";
}
else
{
  highScore = localStorage.getItem("highScore");
}
highScoreElement.innerHTML = "High score: " + highScore;

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add(counter);
    counter++;

    // wait for start button to be pressed
    startButton.addEventListener("click", waitForStart);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // wait for restart button to be pressed
    restartButton.addEventListener("click", startOver);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    cards.push(newDiv);
  }
}

function waitForStart() {
  startButtonPush = true;
}

function cardMatchCheck() {
  score++;
  scoreElement.innerHTML = "Score: " + score;
  if((cardFlips.firstFlipColor === cardFlips.secondFlipColor) && (cardFlips.firstFlipIndex !== cardFlips.secondFlipIndex))
    {
      matches++;
      cardFlips = {};                                
    }
  else 
    {
      let firstCard = document.getElementsByClassName(cardFlips.firstFlipIndex);
      let secondCard = document.getElementsByClassName(cardFlips.secondFlipIndex);
      firstCard[0].style.backgroundColor = "white";
      secondCard[0].style.backgroundColor = "white";
      cardFlips = {};
    }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (startButtonPush === true)
  {
    let card = event.target;
    if(Object.keys(cardFlips).length === 0)
    {
      cardFlips.firstFlipColor = card.classList[0];
      cardFlips.firstFlipIndex = card.classList[1];
      card.style.backgroundColor = cardFlips.firstFlipColor;
    }
    else if(Object.keys(cardFlips).length === 2)
    {
      cardFlips.secondFlipColor = card.classList[0];
      cardFlips.secondFlipIndex = card.classList[1];
      card.style.backgroundColor = cardFlips.secondFlipColor;
      const gameTimeout = setTimeout(cardMatchCheck, 1000);
    }
  }
}

function startOver() {
  if(matches === 5)
  {
    for(let card of cards) {
      card.style.backgroundColor = "white";
    }
    if(localStorage.getItem("highScore") === null)
    {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      highScoreElement.innerHTML = "High score: " + highScore;
    }
    else if(localStorage.getItem("highScore") > score)
    {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      highScoreElement.innerHTML = "High score: " + highScore;
    }
  }
  score = 0;
  scoreElement.innerHTML = "Score: " + score;
}

// when the DOM loads
createDivsForColors(shuffledColors);
