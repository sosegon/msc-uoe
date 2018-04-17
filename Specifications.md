## Game modifications
- **Modes**:
  - *Classic*: The original game, just try to create the 2048 tile.
  - *Reach the tile*: The game displays a tile with a value 512. The user has to match that tile. This might require to increase the difficulty of the game by using the logic from [here](https://aj-r.github.io/Evil-2048/").

- **Sounds**:
  - *Matching tiles* ([see](https://github.com/gabrielecirulli/2048/issues/117))
  - *Game over*
  - *Win*

- **Tricks**:
  - *Bomb*: Destroy all tiles with number 2.
  - *Gift*: Puts a gift tile in the grid which matches any tile.
  - *Blocker*: Blocks new tiles for 1 turn.
  - *Undo*: Undoes the last movement.
  - *Doubler*: Doubles the value of the 2, 4 and 8 tiles in the grid.

- **Labels**:
  - *Score*
  - *Best score*
  - *Money*

- **Options**:
  - *Modes*
  - *Leaderboard*
  - *Earn anki money*
  - *Restart game*
  - *Mute*

## Anki modifications
### Removals
- **Decks screen**:
  - Left side bar icon.
  - Sync icon in the top bar.
  - More options menu.
  - Plus button to add new decks.
  - Dialog when long tap in decks.

- **Flashcard screen**:
  - Left side bar icon.
  - More options menu.
  - Undo and fav options.

- **Deck info screen**:
  - Configurations button in the top bar.
  - More options menu.

- **Custom study dialog (when tapping "Study more")**:
  - Deck options.
  - More.

### Additions

- **Decks screen**:
  - A button to go back to the game. 

- **Flashcard screen**:
  - A field to display the amount of available money.
  - A button to go back to the game.

## Usage scenario

- The application displays daily notifications to remember the user to use it.

- At the end of the study, the users receives a notification to take the final test. The test is not mandatory, but the users are encouraged to take it in different ways. The final test is the same used in the initial stage.

### Experimental group
- The first time the user uses the application, it displays the game screen. The status of the game is the following:
  - Mode: classic
  - Anki money: A$10
  - Score: 0
  - Best: 0

- The user can buy resources to ease the game. If no enough money when buying a given resource, the application displays a message. The message encourages the user to use Anki to earn money.

- The first time the user decides to earn points, he has to take the initial test. The application shows the start screen for the test. The screen gives information about the test. The user receives A$1 for each card no matter the answer, and A$0.5 if the answer is correct. The test contains 20 cards.

- After the initial test, the application shows the screen of decks. The user selects the available deck, then, the revision starts. The application display the amount of money throughout the revision. The amount of money is updated after the user asseses a card. The amount of money earned depends on the assesed value, and the number of repetitions of the card. At some point, a card does not provide more money. 

- The user can take the session test after the revision. The test is similar to the initial one, but it contains only 5 cards. A correct answer rewards A$5.

- The user can make a revision as many times as he wants, but in each revision on the same day, the application displays new cards. 

- The users are encouraged to take the final test (at the end of the study) in order to know how much knowledge they gained and to get more points. 

### Control group

- The first time the user uses the application, it displays the game screen.
- Mode: classic
  - Mode: classic
  - Score: 0
  - Best: 0

- The user can use the resources to ease the game at will, there is no need to earn points to buy them.

- The user can switch the context of the application (game or Anki) at any time.

- The first time the user decides to use Anki, he has to take the initial test. The application shows the start screen for the test. The screen gives information about the test.

- The users are encouraged to take the final test (at the end of the study) in order to know how much knowledge they gained.