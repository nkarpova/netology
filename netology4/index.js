const readline = require('readline');
const path = require('path');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: index.js --file <file name>')
  .example([
    ['node index.js --start "log.json"', 'Start the game and save in log.json']
  ])    
  .option('start', {
        describe: 'Start the game',
        type: 'string'
    })

      .version(false)
      .help()
      .argv

if (argv.start) {
    startGame();
 }

function startGame(){
    const input = readline.createInterface(process.stdin);
    const rounds = [];
    let secretNumber = startRound();
    input.on('line', number => {
    if (+number !== 1 && +number !== 2) {
      console.log('Enter the correct number 1 or 2');
      return;
} else if (+number === secretNumber) {
    console.log('Congratulations!You are win!');
    endRound(rounds, true);
    secretNumber = startRound();
  } else {
    console.log('Unfortunately you have lost, you can try again!');
    endRound(rounds, false);
    secretNumber = startRound();
  }
});
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function parseRoundsJson(roundsJson) {
    try {
      return JSON.parse(roundsJson);
    } catch (error) {
      return [];
    }
  }
  
  function startRound() {
    console.log('---');
    console.log('New round, enter the number(1 or 2):');
    return getRandomNumber(1, 3);
  }
  
  function endRound(rounds, win) {
    rounds.push({ number: rounds.length + 1, win });
    const filePath = path.join(__dirname, 'logs', argv.start);
    fs.writeFileSync(filePath, JSON.stringify(rounds));
  }