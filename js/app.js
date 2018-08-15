/*
 * Create a list that holds all of your cards
 */

// Array of card icons
let icons = ["diamond", "bomb", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle"];
let cardIcons = icons.concat(icons);

// shuffle card Icons
let shuffledIcons = shuffle(cardIcons);
// add the cards to the page
function createCard() {
    for (let i = 0; i < 16; i++) {
        let card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = "<i class= 'fa fa-" + shuffledIcons[i] + "'></i>";
        document.querySelector('.deck').appendChild(card);
    }
}
createCard();


// start Game function to start game
function startGame() {
    document.querySelector('.deck').innerHTML = "";
    createCard();
    moveCount = 0;
    matchedCard = 0;
    minutes = 0;
    seconds = 0;
    firstClick = false;
    document.querySelector('.timer').innerHTML = minutes + "mins " + seconds + "secs";
    cardList = [];
    currentStars = `<li><i class='fa fa-star'></i></li><li><i class="fa fa-star"></i></li> <li> <i class="fa fa-star"></i></li>`;
    document.querySelector('.stars').innerHTML = currentStars;
    document.querySelector('.moves').innerHTML = moveCount;
    clearInterval(timerInterval);

    // let listWrapper = document.querySelector('.card');
    // listWrapper.children.classList.remove('show', 'open', 'match', 'unmatched', 'click-none');
}
// Start game again
document.querySelector('.restart').addEventListener('click', startGame);

//TODO: function to stop the timer and launch Modal
function endGame() {
    if (matchedCard === 8) {
        stopTime();
        launchModal();
    }
}

// variables used
let cardList = [];
let moveCount = 0;
let matchedCard = 0;
let timerInterval;
let firstClick = false;
let minutes = 0;
let seconds = 0;
// rating stars
let currentStars = `<li><i class='fa fa-star'></i></li><li>
<i class="fa fa-star"></i>
</li>
<li>
<i class="fa fa-star"></i>
</li>`;
document.querySelector('.stars').innerHTML = currentStars;

// Card click logic
document.querySelector('.deck').addEventListener('click', function (e) {
    if (e.target.nodeName == 'LI') {
        // target the card been clicked
        e.target.classList.add('show');
        e.target.classList.add('open');
        e.target.classList.add('click-none');
        // pass clicked cards into cardList array
        cardList.push(e.target);
        startTime();

        // I dentify two cards has been clicked
        if (cardList.length === 2) {
            let cardOne = cardList[0].firstElementChild.classList[1];
            let cardTwo = cardList[1].firstElementChild.classList[1];
            moveCount++;
            countMoves();
            starRating();

            // check if clicked cards' icons match
            if (cardOne === cardTwo) {
                // add class match if clicked cards matches and remove open and show classes
                cardList[0].classList.add('match');
                cardList[1].classList.add('match');
                cardList[0].classList.remove('open', 'show');
                cardList[1].classList.remove('open', 'show');
                // counts number of matches
                matchedCard++;
                cardList = [];
                endGame();
            } else {
                // remove class open and show if cards don't match and add unmatched class
                cardList[0].classList.remove('open', 'show', 'match');
                cardList[1].classList.remove('open', 'show', 'match');
                cardList[1].classList.add('unmatched');
                cardList[0].classList.add('unmatched');
                // sets timeout so the code can rerun on another click
                setTimeout(function () {
                    cardList[0].classList.remove("show", "open", 'click-none', "unmatched");
                    cardList[1].classList.remove("show", "open", 'click-none', "unmatched");
                    cardList = [];
                }, 350);
            }

        }
    }
})

// add counts to score board
function countMoves() {
    document.querySelector('.moves').innerHTML = moveCount;
}


// Star Rating Function
function starRating() {
    // removes a star at different move count
    if (moveCount === 12) {
        currentStars = `<li><i class='fa fa-star'></i></li><li>
        <i class="fa fa-star"></i>
        </li>`;
        document.querySelector('.stars').innerHTML = currentStars;

    } else if (moveCount === 18) {
        currentStars = `<li><i class='fa fa-star'></i></li>`;
        document.querySelector('.stars').innerHTML = currentStars;

    }
}

// Function to start timer
function startTime() {
    if (!firstClick) {
        firstClick = true;
        timerInterval = setInterval(updateTime, 1000);
    }
}
// function to update Timer
function updateTime() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    document.querySelector('.timer').innerHTML = minutes + "mins " + seconds + "secs";
}
// function to stop timer when the game is won
function stopTime() {
    clearInterval(timerInterval);
}

// function for launching congratulatory modal
function launchModal() {
    // Time for modal to launch after last match as beem made
    setTimeout(function () {
        document.querySelector('.modal').classList.remove('show-modal');
        document.querySelector('.modal-play-again').addEventListener('click', startGame);
        // Displays congratulatory message with scores
        document.querySelector('.modal-text').innerHTML =
            "You made " + moveCount + " moves in " + document.querySelector('.timer').innerHTML + " time and your rating is " + currentStars;
    }, 2000);
    // close modal upon click
    document.querySelector('.close-modal').addEventListener('click', function () {
        document.querySelector('.modal').classList.add('show-modal');
    })
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

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
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */