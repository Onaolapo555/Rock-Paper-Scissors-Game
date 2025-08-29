const backgroundSound = new Audio('/sound/game-tone.mp3');
  backgroundSound.loop = true;
  window.addEventListener('load', () => {
    backgroundSound.play();
    backgroundSound.volume = 0.2;
  });


const beats = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  spock: ['scissors', 'rock'],
  lizard: ['spock', 'paper']
};

const shadowStyles = {
  rock: "0px 4px 0px #B40A0A, inset 0px 4px 0px #CBCBCB",
  paper: "0px 4px 0px #1340C4, inset 0px 4px 0px #CBCBCB",
  scissors: "0px 4px 0px #CC8808, inset 0px 4px 0px #CBCBCB",
  spock: "0px 4px 0px #2E87AD, inset 0px 4px 0px #CBCBCB",
  lizard: "0px 4px 0px #7952C9, inset 0px 4px 0px #CBCBCB",
};


const colors = {
  rock: 'red',
  paper: 'royalblue',
  scissors: 'orange',
  spock: 'deepskyblue',
  lizard: 'mediumpurple'
};

const choicesArr = ['rock', 'paper', 'scissors', 'spock', 'lizard'];

// Game sounds
const winSound = document.getElementById('win-sound');
const lossSound = document.getElementById('loss-sound');
const showDown = document.getElementById('showdown');
//const backgroundSound = document.getElementById('background-sound');



//Game elements
const gameContainer = document.querySelector('.game-container');
const sectionWinner = document.querySelector('.section-winner');
const winLose = document.querySelector('.win-lose');
const humanPick = document.querySelector('.human');
const computerPick = document.querySelector('.computer');
const humanImg = document.getElementById('image');
const computerImg = document.getElementById('computer-image');
const scoreNum = document.getElementById('score-num');
const playAgainBtn = document.querySelector('.play-again');
const rulesBtn = document.querySelector('.modal');

// Initialize score to 0 on load (overrides HTML hardcoded value)
scoreNum.textContent = 0;


//Rules Button Modal
const openBtn = document.querySelector('.rules');
const closeBtn = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

//Rules button onclick
openBtn.addEventListener('click', () => {
  console.log('button click')
  modal.classList.remove('hidden');
});
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden')
});


playAgainBtn.addEventListener('click', () => {
  sectionWinner.style.display = 'none';
  gameContainer.style.display = 'block';
  winLose.style.display = 'none';
  humanImg.src = '';
  computerImg.src = '';
  humanPick.style.border = '';
  humanPick.style.backgroundColor = '#161B54';
  computerPick.style.border = '';
  computerPick.style.backgroundColor = '#161B54';
  computerPick.style.boxShadow = '';
  winSound.pause();
    winSound.currentTime = 0;
    lossSound.pause();
    lossSound.currentTime = 0;
});

const choiceButtons = document.querySelectorAll('.pentagon button');
choiceButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const userChoice = e.currentTarget.className;
    const userImgSrc = e.currentTarget.querySelector('img').src;

    const computerChoiceIndex = Math.floor(Math.random() * 5);
    const computerChoice = choicesArr[computerChoiceIndex];
    const computerImgSrc = document.querySelector(`.${computerChoice} img`).src;

    // Set user pick
    humanImg.src = userImgSrc;
    humanPick.style.border = `15px solid ${colors[userChoice]}`;
    humanPick.style.backgroundColor = 'white';
    humanPick.style.objectFit = 'cover';
    humanPick.style.width = '130px';
    humanPick.style.height = '130px';
    humanPick.style.boxShadow = shadowStyles[userChoice];
    
    

    // Set computer placeholder
    computerImg.src = '';
    computerPick.style.border = ``;
    computerPick.style.backgroundColor = '#161B54';

    // Hide game container and show winner section
    gameContainer.style.display = 'none';
    sectionWinner.style.display = 'block';
    showDown.play()
    showDown.volume = 0.3;
    

    // Simulate house picking after delay
    setTimeout(() => {
      computerImg.src = computerImgSrc;
      computerPick.style.border = `15px solid ${colors[computerChoice]}`;
      computerPick.style.backgroundColor = 'white';
      computerPick.style.width = '130px';
      computerPick.style.height = '130px';
      computerPick.style.boxShadow = shadowStyles[computerChoice];
    showDown.pause();
    showDown.currentTime = 0;


      // Determine result and update score
      let result;
      let score = parseInt(scoreNum.textContent);
      if (userChoice === computerChoice) {
        result = "IT'S A TIE";
        // No score change on tie
      } else if (beats[userChoice].includes(computerChoice)) {
        result = 'YOU WIN';
        scoreNum.textContent = score + 5;
        humanPick.classList.add('winning-button');
        winSound.play();
        winSound.volume = 0.5;
  setTimeout(() => {
    humanPick.classList.remove('winning-button');
  }, 2000);
      } else{
        result = 'YOU LOSE';
        score = Math.max(0, score - 5); // Prevent negative score
        scoreNum.textContent = score;
        computerPick.classList.add('winning-button');
        lossSound.play();
        lossSound.volume = 0.5;
setTimeout(() => {
  computerPick.classList.remove('winning-button');
}, 2000);
      }

      document.querySelector('.win-lose h1').textContent = result;

      // Show result after another short delay
      setTimeout(() => {
        winLose.style.display = 'block';
      }, 500);
    }, 4000);
  });
});



