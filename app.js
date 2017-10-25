var playerScore = 0
var computerScore = 0
var playerWinMessages = [
    "What, you want a medal or something?",
    "Oh wow, you beat probability. Great job.",
    "You win. Good for you, I guess.",
    "I don't even like The Big Bang Theory...",
    "Don't get cocky, kid.",
    "You cheated."
]
var playerLossMessages = [
    "Just give up. You're embarrassing yourself.",
    "Pathetic.",
    "Nice attempt. Well, not really.",
    "Terrible.",
    "It's like all you do is fail.",
    "Perhaps the worst failure in the history of failures."

]
var playerDrawMessages = [
    "How boring.",
    "I hate tie games."
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

function includesItem(item, arr) {
    var includes = false
    for(var i = 0; i < arr.length; i++) {
        arrItem = arr[i]
        if (item === arrItem) {
            includes = true
            break
        }
    }
    return includes
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
    var randNum = Math.floor(Math.random() * 5)
    console.log(randNum)
    if (randNum === 0) {
        output = 'rock'
    } else if (randNum === 1) {
        output = 'paper'
    } else if (randNum === 2) {
        output = 'scissors'
    } else if (randNum === 3) {
        output = 'lizard'
    } else {
        output = 'Spock'
    }
    return output
}

function getPlayerStatus(playerChoice, computerChoice) {

    drawMessage('playerChoiceMessage', `Player chooses ${playerChoice}.`)
    drawMessage('computerChoiceMessage', `Computer chooses ${computerChoice}.`)

    var playerLossConditions = {
        // key is player choice, value is array of computer choices resulting in player loss
        'paper': ['scissors', 'lizard'],
        'rock': ['Spock', 'paper'],
        'scissors': ['rock', 'Spock'],
        'lizard': ['scissors', 'rock'],
        'Spock': ['paper', 'lizard']
    }
    var output;

    if (computerChoice === playerChoice) {
        output = 'draw'
    } else if (includesItem(computerChoice, playerLossConditions[playerChoice])) {
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

