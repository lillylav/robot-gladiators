// initial variables for player's robot
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// enemy robot variables
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName){
        while(playerHealth > 0 && enemyHealth > 0) {
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
                    // leave while loop if player is dead
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
    }

for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}