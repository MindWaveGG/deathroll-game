const players = [];
const bets = {};
let pot = 0;
let currentPlayerIndex = 0;
let currentMaxRoll = 100;
let gameInProgress = false;

function joinGame(player, bet) {
    if (gameInProgress) {
        return `${player}, the game is already in progress. Please wait for the next game.`;
    }
    if (players.includes(player)) {
        return `${player}, you are already in the game.`;
    }
    players.push(player);
    bets[player] = bet;
    pot += bet;
    return `${player} has joined the game with a bet of ${bet} points.`;
}

function roll(player) {
    if (!gameInProgress) {
        return "No game in progress. Start a new game with !startdeathroll.";
    }
    if (players[currentPlayerIndex] !== player) {
        return `${player}, it's not your turn.`;
    }
    const rollResult = Math.floor(Math.random() * currentMaxRoll) + 1;
    currentMaxRoll = rollResult;
    let message = `${player} rolls a ${rollResult}. `;
    if (rollResult === 1) {
        players.splice(currentPlayerIndex, 1);
        message += `${player} is out of the game! `;
        currentPlayerIndex = currentPlayerIndex % players.length;
        if (players.length === 1) {
            message += `${players[0]} is the winner and wins ${pot} points!`;
            resetGame();
        } else {
            message += `Next player is ${players[currentPlayerIndex]}.`;
        }
    } else {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        message += `Next player is ${players[currentPlayerIndex]}.`;
    }
    return message;
}

function startGame() {
    if (players.length < 2) {
        return "Need at least 2 players to start the game.";
    }
    gameInProgress = true;
    currentPlayerIndex = 0;
    currentMaxRoll = 100;
    return `Game started! First player is ${players[currentPlayerIndex]}.`;
}

function resetGame() {
    players.length = 0;
    bets = {};
    pot = 0;
    gameInProgress = false;
}

module.exports = {
    joinGame,
    roll,
    startGame
};
