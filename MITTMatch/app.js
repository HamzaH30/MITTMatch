// Modifying Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function (array) {
  // Creating a new array so that the array referenced passed in does not get affected
  let newShuffledArray = [];
  for (let element of array) {
    newShuffledArray.push(element);
  }

  let currentIndex = newShuffledArray.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newShuffledArray[currentIndex];
    newShuffledArray[currentIndex] = newShuffledArray[randomIndex];
    newShuffledArray[randomIndex] = temporaryValue;
  }

  return newShuffledArray;
};

// This function is responsible for resetting the gameState
function generateGameState() {
  // Populating the icons
  // Shuffles all the list elements of the cards.
  const elementCards = shuffle([...document.getElementsByClassName("card")]);
  for (let i = 0; i < elementCards.length; i++) {
    const cardIcon = elementCards[i].firstElementChild.classList[1];
    gameState.board[i].icon = cardIcon;
    gameState.board[i].matched = false;
    gameState.board[i].show = false;
  }

  renderBoard();
}

// This function is responsible for rendering the game board to match the information in the gameState
function renderBoard() {
  const elementCards = [...document.getElementsByClassName("card")];
  for (let i = 0; i < elementCards.length; i++) {
    // Replacing the icon class name to match the icon class name in gameState
    const currentCard = elementCards[i].firstElementChild;
    const currentIcon = currentCard.classList[1];
    const newIcon = gameState.board[i].icon;
    currentCard.classList.replace(currentIcon, newIcon);

    // Adding or removing the match class
    if (gameState.board[i].matched) {
      elementCards[i].classList.add("matched");
    } else {
      elementCards[i].classList.remove("matched");
    }

    // Adding or removing the show class
    if (gameState.board[i].show) {
      elementCards[i].classList.add("show");
    } else {
      elementCards[i].classList.remove("show");
    }
  }
}

function revealCard(event) {
  let clickedCardClass;
  /**
   * There are 2 areas a user can click
   * 1. The middle of the card -> the icon element
   * 2. Somewhere else on the card -> the list element
   */
  // Clicked somewhere other than the middle of the card
  if (event.target.classList.contains("card")) {
    clickedCardClass = event.target.firstElementChild.classList[1];
  } else {
    // Clicked right on the icon
    clickedCardClass = event.target.classList[1];
  }

  // TODO: Check a method to simplify above lines of code (nearest or closest name of the method)

  const gameStateCard = gameState.board.find(
    (element) => element.icon === clickedCardClass
  );

  // Check if the card clicked is a match
  if (clickedCardClass === gameState.cardToFind) {
    // The card clicked is a match, set matched to true
    gameStateCard.matched = true;
    renderBoard();
  } else {
    // The card clicked is not a match
    // Reveal the card to the user
    gameStateCard.show = true;
    renderBoard();

    // Removing the event listener to prevent the user from clicking again and revealing more than 1 card
    document.getElementById("cards").removeEventListener("click", revealCard);

    // Hide the card again after a set duration
    gameStateCard.show = false;
    setTimeout(() => {
      renderBoard();
      document.getElementById("cards").addEventListener("click", revealCard);
    }, 100); // TODO: Change this to 1000ms
  }
}

function newCardToFind() {}

// TODO:
/**
 * 5. If it is a match, then change the cardToFind variable to a new one.
 * 6. Fix a bug: Whenever there is a match, why is the board resetting?? - Seems to be only happening after a match - Calling Lines 51 - 54 twice???
 */

const gameState = {
  cardToFind: "fa-anchor",
  score: 0,
  board: [
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
    {
      icon: "",
      matched: false,
      show: false,
    },
  ],
};

generateGameState();

document
  .getElementsByClassName("restart")[0]
  .addEventListener("click", generateGameState);
document.getElementById("cards").addEventListener("click", revealCard);
