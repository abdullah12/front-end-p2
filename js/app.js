"use strict";

/*
 * Create a list that holds all of your cards
 */
const cardClassesList = [
    'fa-diamond',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-anchor',
    'fa-bolt',
    'fa-bolt',
    'fa-cube',
    'fa-cube',
    'fa-bomb',
    'fa-bomb',
    'fa-bicycle',
    'fa-bicycle',
    'fa-leaf',
    'fa-leaf'
]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

const deck = document.querySelector(".deck");

function shuffleAddCardsToDeck() {
//shuffle the cards and let them in a new array
let shuffeledcards = shuffle(cardClassesList) ;
deck.innerHTML ='' ;

//create the card element from shuffledcards and append them to the deck elemnt
const fragment = document.createDocumentFragment() ;
for (let card of shuffeledcards) {
    const newElement = document.createElement('li');
    newElement.classList.add('card')
    newElement.innerHTML = `<i class="fa ${card}"></i>` ;
    fragment.appendChild(newElement);
}
deck.appendChild(fragment);
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

let opencards // the pair that has been fliped temporarily
let moves // for the score, the number of moves; one pair flip is one move
let noOfOpendCards //to keep number of those who has been matched 
let i  ; // for timer
let firstmove // boolean varibale to start the counter
let noOfStars // score : no of stars


const stars = document.querySelectorAll('.fa-star')
const timer = document.querySelector(".timer");
const modal = document.getElementById('simpleModal') ;
const modalBtn = document.getElementById('modalBtn') ;
const closeBtn = document.getElementById('closeBtn') ;
const modalContent = document.getElementsByClassName('modal-content')[0] ;

//reset every thing
function initilizeGame() {
    opencards = []
    moves = 0 ;
    noOfOpendCards = 0 ;
    i = 0 ;
 
    shuffleAddCardsToDeck() ;
    firstmove = true ;
    noOfStars = 3 ;
}

initilizeGame() 

function openModal(){
    document.getElementById('moveScore').innerHTML = moves ;
    document.getElementById('timeScore').innerHTML = timer.innerHTML ;
    document.getElementById('starScore').innerHTML = noOfStars ;
    modal.style.display = 'block' ;
}

//function to flip the cards back and forth
var flipcard = function(card) {
    //e.target.classList.toggle('show') ;
    card.classList.add('open','show','disabled') ;
}

var flipbackcards = function(cards) {
    cards[0].classList.remove ('open', 'show' , 'disabled')
    cards[1].classList.remove ('open', 'show', 'disabled')
}

function startCounter(){
    var interval = setInterval(function() {
      timer.innerHTML= i++;
    }, 1000);
  }

function stopCounter(){
    clearInterval(interval);
}


var matched = function(cards) {
    if (cards[0].innerHTML === cards[1].innerHTML){
        return true;
    }
}

var play = function (e) {

    //start the timing
    if (firstmove) {
        startCounter()
        firstmove = false ;
    }

    if (e.target.classList.contains('card')) {
        if (! (e.target.classList.contains('match') || (e.target.classList.contains('disabled') ))) {
            flipcard(e.target) ;
            opencards.push(e.target) ;

            if (opencards.length === 2) {
                if (matched(opencards)) {
                    flipbackcards(opencards)
                    opencards[0].classList.add('match') ;
                    opencards[1].classList.add('match') ;
                    noOfOpendCards += 2 ;
                } else
                {
                    setTimeout ( flipbackcards ,500 ,opencards)
                }

                opencards = []
                moves +=1 ;

                document.querySelector('.moves').textContent = moves ;
                console.log(moves)

                if (noOfOpendCards === cardClassesList.length) {

                    stopCounter() ;
                    setTimeout(openModal , 500)
                }

                if ( (moves  == 18) && (noOfStars != 1)) {
                    noOfStars -- ;
                    stars[noOfStars].style.visibility = 'hidden'
                    
                } else if ((moves  == 24) && (noOfStars != 1)) {
                    noOfStars -- ;
                    stars[noOfStars].style.visibility = 'hidden'
                } 
            }
        }
    }
}

deck.addEventListener('click', play) ;

let repeatbtn = document.querySelector('.fa-repeat') ; 
repeatbtn.addEventListener('click' , function(){
     stopCounter() ;
    initilizeGame() ;
})

closeBtn.addEventListener('click' , function (){
    modal.style.display = 'none'
})

let playAgainbtn = document.querySelector('#playAgain') ;
playAgainbtn.addEventListener('click', () => {
    modal.style.display = 'none'
    initilizeGame() ;
})