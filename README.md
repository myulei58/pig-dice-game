# PIG - 2-player Dice Game

PIG is a classic 2-player dice game where players take turns rolling dice to try to reach the target score. This version of the game supports two modes: **single-dice** and **double-dice** modes.

This web app is the first project from *The Complete JavaScript Course* by Jonas Schmedtmann. It uses ES5 syntax and basic DOM manipulation for JS practice. 


## Game Rules

### 1-Dice Rules:
Two players take turns repeatedly rolling a single dice. If a player rolls a 1, they score nothing for their turn and it becomes the other player's turn. If any other number is rolled, the number is added to the player's current turn total, and their turn continues. If a player chooses to 'hold', they add their turn total to their final score. However, if a player rolls two 6's in a row, they score nothing for their turn, their final score **becomes 0**, and turn passes to the other player. The first player to reach the target score wins.

### 2-Dice Rules:
Similar to the single-dice version, two players take turns rolling two dice during each turn. If any one of the two dice is a 1, then turn passes to the other player. For any other combination, both dice's numbers are added to their turn total. There is also no consecutive 6's rule. The first player to reach the target score wins.


## Screenshot

![screenshot](/PigGame_2.0/Screenshot.PNG)


## Acknowledgements
- Jonas Schmedtmann, for creating base HTML and CSS files which were modified upon
