const images = [
    'img1.png', 'img2.png', 'img3.png', 'img4.png',
    'img1.png', 'img2.png', 'img3.png', 'img4.png'
];

let firstCard = null;
let secondCard = null;
let matchedPairs = 0;
let timerInterval = null;
let startTime = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // 게임 보드를 초기화합니다.
    const shuffledImages = shuffle(images.slice());
    shuffledImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const img = document.createElement('img');
        img.src = image;

        card.appendChild(img);
        gameBoard.appendChild(card);

        card.addEventListener('click', () => {
            if (!startTime) startTimer();

            if (card.classList.contains('flipped') || secondCard) return;

            card.classList.add('flipped');
            if (!firstCard) {
                firstCard = card;
            } else if (!secondCard) {
                secondCard = card;

                if (firstCard.dataset.image === secondCard.dataset.image) {
                    firstCard = null;
                    secondCard = null;
                    matchedPairs += 1;
                    if (matchedPairs === images.length / 2) {
                        clearInterval(timerInterval);
                        setTimeout(() => alert(`게임 끝! 시간: ${formatTime(Date.now() - startTime)}`), 500);
                    }
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove('flipped');
                        secondCard.classList.remove('flipped');
                        firstCard = null;
                        secondCard = null;
                    }, 1000);
                }
            }
        });
    });
}

function startTimer() {
    startTime = Date.now();
    document.getElementById('timer').textContent = `시간: 0.000초`;
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        document.getElementById('timer').textContent = `시간: ${formatTime(elapsedTime)}초`;
    }, 10);
}

function formatTime(timeInMs) {
    const timeInSec = timeInMs / 1000;
    return timeInSec.toFixed(3);
}

document.getElementById('restart-button').addEventListener('click', () => {
    firstCard = null;
    secondCard = null;
    matchedPairs = 0;
    clearInterval(timerInterval);
    startTime = null;
    document.getElementById('timer').textContent = `시간: 0.000초`;
    createBoard();
});

// 초기화 및 게임 시작
createBoard();
