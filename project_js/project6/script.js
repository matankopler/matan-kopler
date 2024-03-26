const cards = document.querySelectorAll('.memory-card');
var text = document.querySelector("#second");
let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
var counter = 0;
var sound = new Howl({ urls: ['Tada.mp3'] });
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flip");
    //first click
    if (!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
        return;
    }
    // second click
    secondCard = this;
    checkForMatch();

}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCard();
}
function disableCards() {

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    counter++;
    resetBoard();
}
function unflipCard() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);


}
function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    if (counter === 6) {
        sound.play();
        text.style.display = "block";

    }
}
(function shuffle() {

    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;

    });
})();//this is an expression for IIFE(Immediate Invoked Function Expression)
cards.forEach(card => card.addEventListener("click", flipCard));