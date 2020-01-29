/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// global variables declaration
var scores, roundScore, activePlayer, activeGame, prevRoll, player1name, player2name, targetScore, diceNum;

// go to game page by hiding title card/rules
document.querySelector('.start-game').addEventListener('click', function() {
    document.querySelector('.titlecard').style.display = "none";
});

// automatically start a new game by displaying new-game-menu
showNewGameMenu();

// new game button stops current game and displays new-game-menu
document.querySelector('.btn-new').addEventListener('click', showNewGameMenu);

// choose between single or double dice game from new-game menu, saving selection in diceNum
document.querySelector('.btn-1dice').addEventListener('click', function() {
    diceNum = 1;
    initGame();
});

document.querySelector('.btn-2dice').addEventListener('click', function() {
    diceNum = 2;
    initGame();
});

// upon clicking 'roll' button, check if game is still active, then call function based on current game mode
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (activeGame) {
        if (diceNum === 1) {
            oneDiceGame();
        } else {
            twoDiceGame();
        }
    } else {
        alert('Please start a new game');
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (activeGame) {
        // store roundScore to active player's global score
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        // check if player wins upon updating their global score;
        // if win, display winner and stop gameplay, otherwise change player
        if (scores[activePlayer] >= targetScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            activeGame = false;
        } else {
            changePlayer();
        }
    } else {
        alert('Please start a new game');
    }
});

// display new-game-menu
function showNewGameMenu() {
    document.getElementById('new-game-menu').style.display = "block";
}

// initialize new game based on user-entered values in new-game-menu
function initGame() {
    // go to gameplay by first hiding new-game-menu
    document.getElementById('new-game-menu').style.display = "none";
    var player1DOM = document.getElementById('player-1');
    var player2DOM = document.getElementById('player-2');
    var targetScoreDOM = document.getElementById('target-score');
    
    // if user entered values for player names or custom target score, then update display, otherwise use defaults
    if (player1DOM.value) {
        player1name = player1DOM.value;
    } else {
        player1name = player1DOM.placeholder;
    }

    if (player2DOM.value) {
        player2name = player2DOM.value;
    } else {
        player2name = player2DOM.placeholder;
    }

    if (!targetScoreDOM.value) {
        targetScore = 100;
    } else if (targetScoreDOM.value <= 0) {
        alert('Invalid target score. Defaulting to 100.');
        targetScore = 100;
    } else {
        targetScore = targetScoreDOM.value;
    }
        //console.log(player1name, player2name, targetScore, diceNum);
    
    // update target score display
    document.querySelector('.target-score-display').textContent = "Target Score: " + targetScore;

    // turn on gameplay, set all scores to 0, refresh game state, then make player 1 active
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    activeGame = true;
    
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = player1name;
    document.getElementById('name-1').textContent = player2name;
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function oneDiceGame() {
    // generate random dice roll
    var diceRoll = Math.floor(Math.random() * 6) + 1;
        //console.log(dice);
    
    // show correct dice graphic based on roll
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + diceRoll + '.png';
    
    // if roll is 1, change player, if double 6 is rolled, clear global score and change player,
    // otherwise add roll to roundScore and display, and save roll
    if (diceRoll === 1) {
        changePlayer();
    } else if (diceRoll === 6 && prevRoll === 6) {
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = 0;
        changePlayer();
    } else {
        roundScore += diceRoll;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        prevRoll = diceRoll;
    }
}

function twoDiceGame() {
    // generate 2 random dice rolls
    var diceRoll1 = Math.floor(Math.random() * 6) + 1;
    var diceRoll2 = Math.floor(Math.random() * 6) + 1;

    // update both dice graphic based on rolls
    var diceDOM1 = document.querySelector('.dice1');
    var diceDOM2 = document.querySelector('.dice2');
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'dice-' + diceRoll1 + '.png';
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + diceRoll2 + '.png';

    // if either roll is 1, change player, otherwise add roll to roundScore and display
    if (diceRoll1 === 1 || diceRoll2 === 1) {
        changePlayer();
    } else {
        roundScore += diceRoll1 + diceRoll2;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }
}

// clear current player's roundScore, change activePlayer, reset prevRoll, and toggle 'active' class for display
function changePlayer() {
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer = 1 - activePlayer;
    roundScore = 0;
    prevRoll = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
