// fight or skip data validation loop
var fightOrSkip = function() {
    // fight choice prompt
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? SKIP will cost you 10 points. Enter 'FIGHT' or 'SKIP' to choose.");

    // conditional recursive function call
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    };

    promptFight = promptFight.toLocaleLowerCase();

    // if player chooses to skip
    if (promptFight === "skip") {
        // confirm player skip selection
        var confirmSkip = window.confirm("Are you sure you would like to quit?");
    
        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. 10 points have been deducted from " + playerInfo.name + "'s score. Goodbye!");
            // subtract money from playerInfo.money variable for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            // return true if player wants to leave
            return true;
        }
    } 
    return false;
};

// FIGHT SEQUENCE START
var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;

    // randomly assign player or enemy to go first
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    // repeat and execute fight as long as player and enemy health > 0
    while (playerInfo.health > 0 && enemy.health > 0) {
        if (fightOrSkip()) {
            // if true, leave fight by breaking loop
            break;
        };
        
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        // subtract playerInfo.attack variable from enemy.health variable
        enemy.health = Math.max(0, enemy.health - damage);
            console.log(
            playerInfo.name 
            + " attacked " 
            + enemy.name 
            + ". " 
            + enemy.name 
            + " now has " 
            + enemy.health 
            + " health remaining."
        );
        // check enemy health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died! " + playerInfo.name + " has been awarded 20 points!");

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
            enemy.name 
            + " attacked " 
            + playerInfo.name 
            + ". " 
            + playerInfo.name 
            + " now has " 
            + playerInfo.health 
            + " health remaining."
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
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
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
            window.alert("Refilling player's health by 20 for 7 points. Player health is now " + playerInfo.health + ".");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 points. Player attack will now be boosted by 6.");
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
    window.alert("The game has now ended. Let's see how you did!");

    // win or lose
    if (playerInfo.health > 0) {
        // if player wins
        window.alert("Great job, " + playerInfo.name + " survived the game with " + playerInfo.money + " points! " + playerInfo.name + " WINS!!");
    } else {
        // if player loses
        window.alert("You've lost your robot in battle.")
    }

    // check local storage for high score, if it's not there use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
    // if player has more money than high score, player has new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // play again prompt
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
        playerInfo.name + " has " + playerInfo.money + " points and " + playerInfo.health + " health remaining. Would you like to REFILL your health by 20 for 7 points, UPGRADE your attack by 6 for 7 points, or LEAVE the store? Please enter your selection: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );

    // convert from string to integer
    shopOptionPrompt = parseInt(shopOptionPrompt);

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;
        
        case 3:
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