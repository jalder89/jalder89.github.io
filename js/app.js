/*
 * Create a list that holds all of your cards
 */
const cards = ['Diamond', 'Plane', 'Anchor', 'Bolt', 'Cube', 'Leaf', 'Bicycle', 'Bomb', 'Diamond', 'Plane', 'Anchor', 'Bolt', 'Cube', 'Leaf', 'Bicycle', 'Bomb'];

// Intialize and store deck and alert box element variables
const DECK = document.querySelector('.deck');
const ALERTBOX = document.querySelector('.alert');
const ALERTSCORE = document.querySelector('.alert .score');
const REPLAYBTN = document.querySelector('.restart');
const TIME = document.querySelector('.score-panel .timer');
const ALERTTIME = document.querySelector('.alert .timer');
const CLOSEBUTTON = document.querySelector('.alert .close .button');
const REPLAYALRTBUTTON = document.querySelector('.alert .retry .button');
ALERTSCORE.innerHTML = '&star;&star;&star;';


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 *   - build score table and timer
 */

// Shuffle and create cards
shuffle(cards);
createCards();
appendCards();

// Create card html function
function createCards() {
  for (let i = 0; i < cards.length; i++) {

    if (cards[i] === 'Diamond') {
      cards[i] = '<li class="card">' +
      '<i class="fa fa-diamond"></i>' +
      '</li>';
    }

    if (cards[i] === 'Plane') {
      cards[i] = '<li class="card">' +
      '<i class="fa fa-paper-plane-o"></i>' +
      '</li>';
    }

    if (cards[i] === 'Anchor') {
      cards[i] = '<li class="card">' +
      '<i class="fa fa-anchor"></i>' +
      '</li>';
    }

    if (cards[i] === 'Bolt') {
      cards[i] = '<li class="card">' +
      '<i class="fa fa-bolt"></i>' +
      '</li>';
    }

    if (cards[i] === 'Cube') {
      cards[i] = '<li class="card">' +
      '<i class="fa fa-cube"></i>' +
      '</li>';
    }

    if (cards[i] === 'Leaf') {
      cards[i] = '<li class="card">' +
      '<i class="fa fa-leaf"></i>' +
      '</li>';
    }

    if (cards[i] === 'Bicycle') {
      cards[i] = '<li class="card">' +
      '<i class="fa fa-bicycle"></i>' +
      '</li>';
    }

    if (cards[i] === 'Bomb') {
      cards[i] = '<li class="card">' +
      '<i class="fa fa-bomb"></i>' +
      '</li>';
    }
  }
}

// Append HTML to deck function
function appendCards(){
  for (let i = 0; i < cards.length; i++) {
    DECK.innerHTML += cards[i];
  }
}

// Timer for timing the game
let start = Date.now();

let myTimer = setInterval(timerFunc, 1000)
let timer = 0;

function timerFunc() {
  let difference = Date.now() - start;
  timer = Math.floor(difference / 1000);
  TIME.innerHTML = timer;
  ALERTTIME.innerHTML = timer;
}

function stopTimer() {
  clearInterval(myTimer);
}

// Add stars for scoring, needs refactoring for efficiency
const scoreTable = document.querySelector('.score-panel .stars');
const scoreBox1 = document.createElement('li');
const scoreBox2 = document.createElement('li');
const scoreBox3 = document.createElement('li');
const scoreStars1 = document.createElement('i');
const scoreStars2 = document.createElement('i');
const scoreStars3 = document.createElement('i');

scoreStars1.classList.add('fa')
scoreStars1.classList.add('fa-star');
scoreStars2.classList.add('fa')
scoreStars2.classList.add('fa-star');
scoreStars3.classList.add('fa')
scoreStars3.classList.add('fa-star');

scoreBox1.appendChild(scoreStars1);
scoreBox2.appendChild(scoreStars2);
scoreBox3.appendChild(scoreStars3);

scoreTable.appendChild(scoreBox1);
scoreTable.appendChild(scoreBox2);
scoreTable.appendChild(scoreBox3);



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move clickCounter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCards = [];
let matchedCards = [];
let clickCounter = 0;
let movesCounter = 0;
let moves = document.querySelector('.moves');

function cardClicked(clickEvent) {
  // Tracks current cards class list for matching and catch purposes.
  let thisEvent = clickEvent.target.classList;
  console.log('Why? ' + thisEvent);

  // Limits game code to not include already matched cards or clicking the deck.
  if (thisEvent != 'card match' && thisEvent != 'deck') {

    clickEvent.target.classList.add('match');
    openCards.push(clickEvent.target);
    clickCounter += 1;
    console.log(clickCounter + '' + thisEvent);

    // Checks to make sure that openCards array is not empty or undefined.
    if (openCards !== undefined || openCards.length !== 0) {
      if (openCards.length > 1) {
        console.log('there is more than one card selected');

        // Checks to see if cards clicked matches and sets cardsMatch to True or False
        cardsMatch = openCards[0].innerHTML == openCards[1].innerHTML;

        // If cards match, add matched card to matchedCards array, clear openCards array, increments move counter, and resets click counter.
        if (cardsMatch) {
          console.log('cards matched!');
          matchedCards.push(openCards[0]);
          openCards.shift();
          openCards.shift();
          movesCounter += 1;
          clickCounter = 0;
          moves.textContent = movesCounter;

          // Checks to see if the matched card was the last one to match and displays win alert
          if (matchedCards.length == 8) {
            stopTimer();
            ALERTBOX.style.display = "block";

          }
        }

        // Checks to see if cards did not match, closes cards, increments move counter, and resets clicks.
        if (!cardsMatch) {
          console.log('cards did not match');
          if (clickCounter == 3) {
            for (let i = 0; i < openCards.length - 1; i++) {
              openCards[i].classList.remove('match');
            }
            openCards.shift();
            openCards.shift();
            movesCounter += 1;
            clickCounter = 1;
            moves.textContent = movesCounter;
          }

        }

      }

      // Removes stars from score as the move counter increases
      if (movesCounter == 10 && clickCounter == 1) {
        scoreStars3.parentNode.removeChild(scoreStars3);
        ALERTSCORE.innerHTML = '&star;&star;-';
      }else if (movesCounter == 15 && clickCounter == 1) {
        scoreStars2.parentNode.removeChild(scoreStars2);
        ALERTSCORE.innerHTML = '&star;--';
      }else if (movesCounter == 20 && clickCounter == 1) {
        scoreStars1.parentNode.removeChild(scoreStars1);
        ALERTSCORE.innerHTML = '---<br>Better Luck Next Time!';
      }

    }
  }
}

// Toggles Win Alert Box visibility
function toggleAlert() {
  if (ALERTBOX.style.display === "none") {
    ALERTBOX.style.display = "block";
  }else {
    ALERTBOX.style.display = "none";
  }
}
// Resets the game to a playable status after a win or clicking replay button
function replay() {
  // Flips cards back over
  for (let i = 0; i < matchedCards.length; i++) {
    matchedCards[i].classList.remove('match');
  }

  // Empties the matchedCard array so the win alert can display more than once
  let matchedCardsLength = matchedCards.length;
  for (let i = 0; i < matchedCardsLength; i++) {
    matchedCards.shift();
  }

  /* Shuffles cards, resets deck, rebuilds deck with new cards,
  * resets counters, score and timer for next play
  */
  shuffle(cards);
  DECK.innerHTML = '';
  appendCards();
  movesCounter = 0;
  clickCounter = 0;
  moves.textContent = 0;
  scoreBox1.appendChild(scoreStars1);
  scoreBox2.appendChild(scoreStars2);
  scoreBox3.appendChild(scoreStars3);
  timer = 0;
  start = Date.now();
  TIME.innerHTML = timer;
  myTimer = setInterval(timerFunc, 1000);
}

function alertReplay() {
  toggleAlert();
  replay();
}

DECK.addEventListener('click', cardClicked);
CLOSEBUTTON.addEventListener('click', toggleAlert);
REPLAYALRTBUTTON.addEventListener('click', alertReplay);
REPLAYBTN.addEventListener('click', replay);
