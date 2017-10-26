/* 
    Global Variables
*/

var playerScore = 0
var computerScore = 0

var playerWinMessages = [
    "What, you want a medal or something?",
    "Oh wow, you beat probability. Great job.",
    "You win. Good for you, I guess.",
    "I don't even *like* The Big Bang Theory...",
    "Don't get cocky, kid.",
    "No fair, you cheated."
]
var playerLossMessages = [
    "Just give up. You're embarrassing yourself.",
    "Pathetic.",
    "Nice attempt. Well, not really.",
    "Terrible. Just terrible.",
    "It's like all you do is fail.",
    "Perhaps the worst failure in the history of failures."
]
var playerDrawMessages = [
    "How boring.",
    "I hate tied games."
]
var defaultStatusMessage = "Choose an option, I guess."

var playerLossConditions = {
    // Key is player choice, value is array of corresponding computer choices that result in player loss
    'paper': ['scissors', 'lizard'],
    'rock': ['Spock', 'paper'],
    'scissors': ['rock', 'Spock'],
    'lizard': ['scissors', 'rock'],
    'Spock': ['paper', 'lizard']
}
var reasonsForLoss = {
    /* 
    Key is losing choice, value is array of objects in which each object.choice describes the winning 
    choice and each object.reason describes the reason for the outcome
    */
    'paper': [
        {
            name: 'scissors',
            reason: 'Scissors cut paper.'
        },
        {
            name: 'lizard',
            reason: 'Lizard eats paper.'
        }
    ],
    'rock': [
        {
            name: 'Spock',
            reason: 'Spock vaporizes rock.'
        },
        {
            name: 'paper',
            reason: 'Paper covers rock.'
        }
    ],
    'scissors': [
        {
            name: 'rock',
            reason: 'Rock crushes scissors.'
        },
        {
            name: 'Spock',
            reason: 'Spock smashes scissors.'
        }
    ],
    'lizard': [
        {
            name: 'scissors',
            reason: 'Scissors decapitate lizard.'
        },
        {
            name: 'rock',
            reason: 'Rock crushes lizard.'
        }
    ],
    'Spock': [
        {
            name: 'paper',
            reason: 'Paper disproves Spock.'
        },
        {
            name: 'lizard',
            reason: 'Lizard posions Spock.'
        }
    ],
}

/* 
    Array Functions
*/

function randomArrayChoice(arr) {
    return arr[Math.floor((Math.random() * arr.length))]
}

function includesItem(item, arr) {
    // similar to Array.prototype.includes()
    var includes = false
    for (var i = 0; i < arr.length; i++) {
        arrItem = arr[i]
        if (item === arrItem) {
            includes = true
            break
        }
    }
    return includes
}

/* 
   Primary Game Functions
*/

function play(playerChoice) {

    var computerChoice = randomPlayChoice()
    var status = getPlayerStatus(playerChoice, computerChoice)
    var playerChoiceMessage; var computerChoiceMessage;
    var statusMessagePrimary; var statusMessageSecondary;
    var outcomeReasonMessage = ''

    console.log(`player choooses: ${playerChoice}`)
    console.log(`computer chooses: ${computerChoice}`)
    console.log(`player status: ${status}`)

    switch (status) {
        case 'win':
            statusMessagePrimary = "Player wins."
            statusMessageSecondary = getPlayerWinMessage()
            outcomeReasonMessage = getOutcomeReason(playerChoice, computerChoice)
            playerScore += 1
            break
        case 'draw':
            statusMessagePrimary = "Draw."
            statusMessageSecondary = getPlayerDrawMessage()
            break
        case 'loss':
            statusMessagePrimary = "Computer wins."
            statusMessageSecondary = getPlayerLossMessage()
            outcomeReasonMessage = getOutcomeReason(computerChoice, playerChoice)
            computerScore += 1
            break
    }

    updateGameInfo()
    drawMessage('outcomeReasonMessage', outcomeReasonMessage)
    drawMessage('statusMessagePrimary', statusMessagePrimary)
    drawMessage('statusMessageSecondary', statusMessageSecondary)

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

function getOutcomeReason(winningChoice, losingChoice) {
    var output
    for (var choiceKey in reasonsForLoss) {
        if (choiceKey === losingChoice) {
            for (var i = 0; i < reasonsForLoss[choiceKey].length; i++) {
                var choiceObj = reasonsForLoss[choiceKey][i]
                if (choiceObj.name === winningChoice) {
                    output = choiceObj.reason
                    break
                }
            }
        }
    }
    return output
}

function drawMessage(id, message) {
    document.getElementById(id).innerText = message
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

function updateGameInfo() {
    drawMessage('playerVictoryCounter', playerScore)
    drawMessage('computerVictoryCounter', computerScore)
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

