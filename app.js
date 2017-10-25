var playerScore = 0
var computerScore = 0
var playerWinMessages = [
    "What, you want a medal or something?",
    "Oh wow, you beat probability. Great job.",
    "You win. Good for you, I guess."
]
var playerLossMessages = [
    "Just give up. You're embarrassing yourself.",
    "Pathetic.",
    "Nice attempt. Well, not really."
]
var playerDrawMessages = [
    "A draw. How boring.",
    "I hate tie games.",
]
var defaultStatusMessage = "Choose an option, I guess."

function updateGameInfo() {
    drawMessage('playerVictoryCounter', playerScore)
    drawMessage('computerVictoryCounter', computerScore)
}

function play(playerChoice) {

    var computerChoice = randomPlayChoice()
    var status = getPlayerStatus(playerChoice, computerChoice)
    var playerChoiceMessage; computerChoiceMessage;
    var statusMessagePrimary; statusMessageSecondary;

    console.log(`player choooses: ${playerChoice}`)
    console.log(`computer chooses: ${computerChoice}`)
    console.log(`player status: ${status}`)

    switch (status) {
        case 'win':
            statusMessagePrimary = "Player wins."
            statusMessageSecondary = getPlayerWinMessage()
            playerScore += 1
            break
        case 'draw':
            statusMessagePrimary = "Draw."
            statusMessageSecondary = getPlayerDrawMessage()
            break
        case 'loss':
            statusMessagePrimary = "Computer wins."
            statusMessageSecondary = getPlayerLossMessage()
            computerScore += 1
            break
    }

    updateGameInfo()
    drawMessage('statusMessagePrimary', statusMessagePrimary)
    drawMessage('statusMessageSecondary', statusMessageSecondary)

}

function drawMessage(id, message) {
    document.getElementById(id).innerText = message
}

function randomArrayChoice(arr) {
    return arr[Math.floor((Math.random() * arr.length))]
}

function getPlayerWinMessage() {
    return randomArrayChoice(playerWinMessages)
    
}

function getPlayerLossMessage() {
    return randomArrayChoice(playerLossMessages)
}

function getPlayerDrawMessage() {
    return randomArrayChoice(playerDrawMessages)
}




function randomPlayChoice() {
    var output;
    var randNum = Math.floor(Math.random() * 3)
    console.log(randNum)
    if (randNum === 0) {
        output = 'rock'
    } else if (randNum === 2) {
        output = 'paper'
    } else {
        output = 'scissors'
    }
    return output
}

function getPlayerStatus(playerChoice, computerChoice) {

    drawMessage('playerChoiceMessage', `Player chooses ${playerChoice}.`)
    drawMessage('computerChoiceMessage', `Computer chooses ${computerChoice}.`)

    var playerLossConditions = {
        // key is player choice, value is computer choice
        'rock': 'paper',
        'paper': 'scissors',
        'scissors': 'rock'
    }
    var output;

    if (computerChoice === playerChoice) {
        output = 'draw'
    } else if (computerChoice === playerLossConditions[playerChoice]) {
        output = 'loss'
    } else {
        output = 'win'
    }
    return output
}

function setInitialConditions() {
    playerScore = 0
    computerScore = 0
    drawMessage('playerChoiceMessage', '')
    drawMessage('computerChoiceMessage', '')
    drawMessage('statusMessagePrimary', defaultStatusMessage)
    drawMessage('statusMessageSecondary', '')
    updateGameInfo()
}

setInitialConditions()

