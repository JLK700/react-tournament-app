# Images / Videos Tournament App

## Description

Web application which can help you and your friends create and conduct
single elimination tournament where every contender is represented by an image or
video.  
Just vote for your favorite contestant and let draws be broken by RNG.  
After all you'll be provided with detailed statistics and information about a tournament.


#### Technologies
  - React JS
  - HTML5
  - Tailwind
  - CSS modules

## How to use
#### Starting the Tournament

  Select required CSVs and press start tournament button.

#### Conducting the Tournament

  For each match select vote of each player and if there is a draw winner will be determined randomly.


#### Finalizing the Tournament and Final Statistics

  Statistics after ending the tournament:
- winner path and scores
- amount of games and avg dmg for every contender

#### CSVs details

Templates for both required types of CSV can be found in CSVs folder
- Tournament CSV
- Player CSV


## Acknowledgements
- Karol S. for general frontend mentorship and code reviews.
- Krzysztof N. for help with asyncs and sanity checks


## Future work

#### Bugs to fix:
- fixed size of single match rectangle in tournament tree
- possibility of changing the match site before the match ends
- routing problems
- currently CSV structure isn't checked before tournament starts.
- background minor errors

#### Further Development
- double elimination ladder
- not only powers of 2 number of
