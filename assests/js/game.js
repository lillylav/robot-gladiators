// FIGHT SEQUENCE START
var fight = function (enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
        // fight choice prompt
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if player chooses to skip
        if (promptFight === "skip" || promptFight === "Skip" || promptFight === "SKIP") {
            // confirm player skip selection
            var confirmSkip = window.confirm("Are you sure you would like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                // subtract money from playerInfo.money variable for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }

        // if player chooses to fight, then fight
        else if (promptFight === "fight" || promptFight === "Fight" || promptFight === "FIGHT") {
            //generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // subtract playerInfo.attack variable from enemy.health variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
            // check enemy health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while loop since enemy is dead
                break;
            } else {
                // display results of attack
                window.alert(enemy.name + " still has " + enemy.health + " health remaining.");
            }
            // generate random damage value based on enemy's attack power
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            // substract enemy.attack variable from playerInfo.health variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // leave whole loop if player is dead
                break;
            } else {
                // display results of attack
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health remaining.");
            }
        }
        // if no (false), ask question again by running fight() function
        else {
            fight();
            window.alert("You need to choose a valid option. Try again!")
        }
        console.log(playerInfo.name, playerInfo.health, playerInfo.attack, playerInfo.money);
    }
};
// FIGHT SEQUENCE END


// GAME & PLAYER INFO START
// random number generator
var randomNumber = function(min, max) {
    //generate random number between 40 & 60
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// player's name validation
var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null){
        name = prompt("What's your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
};

// initial variables for player's robot
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if(this.money>= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

// enemy robot variables
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14),
        health: randomNumber(40, 60)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14),
        health: randomNumber(40, 60)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14),
        health: randomNumber(40, 60)
    }
];
// GAME & PLAYER INFO END


// GAME START/STOP CRITERIA & FUNCTIONS START
// function to start new game when all rounds are played
var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let player know what round they're in (arrays start at 0 so i + 1 to calculate)
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick next enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy.health for new enemy before starting another fight to a number between 40 & 60
            pickedEnemyObj.health = randomNumber(40, 60);

            // pass the pickedenemy.name variable into the fight function where it will assume the name of enemy.name parameter
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
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
    if (playerInfo.health > 0) {
        // if player wins
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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
// GAME START/STOP CRITERIA & FUNCTIONS END


// GAME SHOP START
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
            playerInfo.refillHealth();
            break;

        case "UPGRADE":
        case "Upgrade":
        case "upgrade":
            playerInfo.upgradeAttack();
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
// GAME SHOP END

// RUN JS FILE
// run upon page loading
startGame();
// after loop ends by being out of health or out of enemies to fight, send player to endGame function
endGame();