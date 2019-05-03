/*
 * Create a list that holds all of your cards
 */
let cardClassesList = [
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

function addCardsToDeck() {
//shuffle the cards and let them in a new array
let shuffeledcards = shuffle(cardClassesList) ;
deck.innerHTML ='' ;

//create the card element from shuffledcards and append them to the deck elemnt
const fragment = document.createDocumentFragment() ;
for (card of shuffeledcards) {
    const newElement = document.createElement('li');
    newElement.classList.add('card')
    //newElement.classList.add('match')
    newElement.innerHTML = `<i class="fa ${card}"></i>` ;

    //document.querySelector(".deck").appendChild(newElement) ;
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

let opencards 
let moves 
let noOfOpendCards 
let i  ;
let firstmove 
let noOfStars


let stars = document.querySelectorAll('.fa-star')
let timer = document.querySelector(".timer");
let modal = document.getElementById('simpleModal') ;
let modalBtn = document.getElementById('modalBtn') ;
let closeBtn = document.getElementById('closeBtn') ;
let modalContent = document.getElementsByClassName('modal-content')[0] ;

function initilizeGame() {
    opencards = []
    moves = 0 ;
    noOfOpendCards = 0 ;
    i = 0 ;
 
    addCardsToDeck() ;
    firstmove = true ;
    noOfStars = 3 ;
}

initilizeGame() 

function openModal(){
        modalContent.innerHTML = `
        <p>your moves was ${moves}</p>
        <p>your times was ${timer.innerHTML}</p>
        `
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
    interval = setInterval(function() {
      timer.innerHTML= i++;
    }, 1000);
  }


matched = function(cards) {
    if (cards[0].innerHTML === cards[1].innerHTML){
        return true ;
    }
}

play = function (e) {

    //start the timing
    if (firstmove) {
        startCounter() 
        firstmove = false ;
    }

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
                //you need to write your own !
                function stopCounter(){
                    clearInterval(interval);
                  }
                stopCounter() ;
                setTimeout(openModal , 500)
            }
            
                    // rewview this one

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

deck.addEventListener('click', play) ;


let repeatbtn = document.querySelector('.fa-repeat') ; 
repeatbtn.addEventListener('click' , function(){
    initilizeGame() ;
})





modalBtn.addEventListener('click' , openModal )

closeBtn.addEventListener('click' , function (){
    modal.style.display = 'none'
})