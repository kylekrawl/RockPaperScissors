/* 
    Global Variables
*/

var playerScore = 0
var computerScore = 0

var playerWinMessages = [
    "What, you want a medal or something?",
    "Oh wow, you beat probability. Great job.",
    "You win. Good for you, I guess.",
    "I don't even like The Big Bang Theory...",
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

var lossConditions = {
    /* 
    Key is losing choice, value is array of objects in which each Object.name designates the winning 
    choice and each Object.reason describes the reason for the outcome
    */
    paper: [
        {
            name: 'scissors',
            reason: 'Scissors cut paper.'
        },
        {
            name: 'lizard',
            reason: 'Lizard eats paper.'
        }
    ],
    rock: [
        {
            name: 'Spock',
            reason: 'Spock vaporizes rock.'
        },
        {
            name: 'paper',
            reason: 'Paper covers rock.'
        }
    ],
    scissors: [
        {
            name: 'rock',
            reason: 'Rock crushes scissors.'
        },
        {
            name: 'Spock',
            reason: 'Spock smashes scissors.'
        }
    ],
    lizard: [
        {
            name: 'scissors',
            reason: 'Scissors decapitate lizard.'
        },
        {
            name: 'rock',
            reason: 'Rock crushes lizard.'
        }
    ],
    Spock: [
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
    return randomArrayChoice(Object.keys(lossConditions))
}

function getPlayerStatus(playerChoice, computerChoice) {

    drawMessage('playerChoiceMessage', `Player chooses ${playerChoice}.`)
    drawMessage('computerChoiceMessage', `Computer chooses ${computerChoice}.`)

    var output;

    if (computerChoice === playerChoice) {
        output = 'draw'
    } else if (isPlayerLossCondition(playerChoice, computerChoice)) {
        output = 'loss'
    } else {
        output = 'win'
    }
    return output
}

function isPlayerLossCondition(playerChoice, computerChoice) {
    var output = false
    for (var i = 0; i < lossConditions[playerChoice].length; i++) {
        var choiceObj = lossConditions[playerChoice][i]
        if (choiceObj.name === computerChoice) {
            output = true
            break
        }
    }
    return output
}

function getOutcomeReason(winningChoice, losingChoice) {
    var output
    for (var choiceKey in lossConditions) {
        if (choiceKey === losingChoice) {
            for (var i = 0; i < lossConditions[choiceKey].length; i++) {
                var choiceObj = lossConditions[choiceKey][i]
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
    drawMessage('outcomeReasonMessage', '')
    drawMessage('statusMessagePrimary', defaultStatusMessage)
    drawMessage('statusMessageSecondary', '')
    updateGameInfo()
}

setInitialConditions()

