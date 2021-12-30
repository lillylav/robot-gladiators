// initial variables for player's robot
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
// console return
console.log(playerName, playerHealth, playerAttack);

// enemy robot variables
var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;
//console return
console.log(enemyName, enemyHealth, enemyAttack);

// welcome message function
var fight = function(){
    // alerts players the round is starting
    window.alert("Welcome to Robot Gladiators!");
    // subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in 'enemyHealth'
    enemyHealth = enemyHealth - playerAttack;
    // log resulting message to console so we know it worked
    console.log (
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );
    // check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.")
    };
    // subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in 'playerHealth'
    playerHealth = playerHealth - enemyAttack;
    // log resulting message to console so we know it worked
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );
    // check player's health
    if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
    }
    else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    };
};
// execute function
fight();