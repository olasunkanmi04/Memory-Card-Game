/*
 * Create a list that holds all of your cards
 */

let cardIcons = ["diamond", "bomb", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "diamond", "bomb", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle"];

let shuffledIcons = shuffle(cardIcons);


for (let i = 0; i < 16; i++) {
    let card = document.createElement('li');

    card.classList.add('card');
    card.innerHTML = "<i class= 'fa fa-" + shuffledIcons[i] + "'></i>";

    document.querySelector('.deck').appendChild(card);
}

function startGame() {
    document.location.reload();
}

let cardList = [];
let count = 0;
let cardMatched = 0;

$('.card').on('click', function () {
    $(this).addClass('show');
    $(this).addClass('open');
    $(this).addClass('click-none');
    cardList.push(this);



    if (cardList.length === 2) {
        let cardOne = cardList[0].firstElementChild.classList[1];
        let cardTwo = cardList[1].firstElementChild.classList[1];
        count++;
        moveCount()
        if (cardOne === cardTwo) {
            cardList[0].classList.add('match');
            cardList[1].classList.add('match');
            cardList[0].classList.remove('open', 'show');
            cardList[1].classList.remove('open', 'show');
            cardMatched++;
            cardList = [];
            starRating();
        } else {
            cardList[0].classList.remove('open', 'show', 'match');
            cardList[1].classList.remove('open', 'show', 'match');
            cardList[1].classList.add('unmatched');
            cardList[0].classList.add('unmatched');
            setTimeout(function () {
                cardList[0].classList.remove("show", "open", 'click-none', "unmatched");
                cardList[1].classList.remove("show", "open", 'click-none', "unmatched");
                cardList = [];
            }, 1100);


        }

    }
})

function moveCount() {
    document.querySelector('.moves').innerHTML = count;
}


// Star Rating Function
function starRating() {
    if (cardMatched === 3) {
        let unordered = document.querySelector('.stars');
        let starList = unordered.firstElementChild;
        let starClassList = starList.firstElementChild.classList;
        starClassList.add("rated-star");
    } else if (cardMatched === 6) {
        let unordered = document.querySelector('.stars');
        let starList = unordered.firstElementChild;
        let secondList = starList.nextElementSibling;
        let secondStar = secondList.firstElementChild;
        secondStar.classList.add("rated-star");
    } else if (cardMatched === 8) {
        let unordered = document.querySelector('.stars');
        let starList = unordered.firstElementChild;
        let secondList = starList.nextElementSibling;
        let thirdList = secondList.nextElementSibling;
        let thirdStar = thirdList.firstElementChild;
        thirdStar.classList.add("rated-star");
        setTimeout(function () {
            alert("Congratulations, you have completed the game. You made " + count + " moves");
        }, 2000);

    }
}





document.querySelector('.restart').addEventListener('click', startGame);


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