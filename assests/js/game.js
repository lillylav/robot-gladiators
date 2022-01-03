// initial variables for player's robot
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// enemy robot variables
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function (enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
        // fight choice prompt
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player chooses to skip
        if (promptFight === "skip" || promptFight === "Skip" || promptFight === "SKIP") {
            // confirm player skip selection
            var confirmSkip = window.confirm("Are you sure you would like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money from playerMoney variable for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        // if player chooses to fight, then fight
        else if (promptFight === "fight" || promptFight === "Fight" || promptFight === "FIGHT") {
            // subtract playerAttack variable from enemyHealth variable
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );
            // check enemy health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");

                // award player money for winning
                playerMoney = playerMoney + 20;

                // leave while loop since enemy is dead
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health remaining.");
            }

            // substract enemyAttack variable from playerHealth variable
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                // leave whole loop if player is dead
                break;
            } else {
                window.alert(playerName + " still has " + playerHealth + " health remaining.");
            }
        }
        // if no (false), ask question again by running fight() function
        else {
            fight();
            window.alert("You need to choose a valid option. Try again!")
        }
        console.log(playerName, playerHealth, playerAttack, playerMoney);
    }
};

// function to start new game when all rounds are played
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // let player know what round they're in (arrays start at 0 so i + 1 to calculate)
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick next enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset enemyHealth for new enemy before starting another fight
            enemyHealth = 50;

            // pass the pickedEnemyName variable into the fight function where it will assume the name of enemyName parameter
            fight(pickedEnemyName);

            // if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length -1) {
                // ask if player wanted to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                
                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            // let player know they've lost
            window.alert("You have lost your robot in battle! Game over!");

            // stop loop
            break;
        }
    }
};

// function to end entire game
var endGame = function() {
    if (playerHealth > 0) {
        // if player wins
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        // if player loses
        window.alert("You've lost your robot in battle.")
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        // restart game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter your selection: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "Refill":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;

        case "UPGRADE":
        case "Upgrade":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        
        case "LEAVE":
        case "Leave":
        case "leave":
            window.alert("Leaving the store.");
            //do nothing so function will end
            break;

        default:
            window.alert("You did not select a valid option. Please try again.");
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// run upon page loading
startGame();
// after loop ends by being out of health or out of enemies to fight, send player to endGame function
endGame();