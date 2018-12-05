// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max);
guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listner
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    console.log(e.target.className);
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Game over - won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(
        false,
        `Game Over, you lost. The correct nymber was ${winningNum}`
      );
    } else {
      // Change border color
      guessInput.style.borderColor = 'red';
      // Clear the input
      guessInput.value = '';
      // Game cotinues - answer wrong
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);

  // Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(`You've got me :) Winning number is ${num}`);
  return num;
}
