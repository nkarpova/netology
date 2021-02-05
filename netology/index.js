const moment = require('moment');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const today = new Date();
console.log(moment(today).toDate());

//  TASK 1
const argv = yargs(hideBin(process.argv))
 
  .command(
    'current',
    'Current date',
    yargs => commandArgv(yargs, 'boolean'),
    argv => {
      const optionsComands = {
        y: () => console.log(moment().format('YYYY')),
        m: () => console.log(moment().format('MM')),
        d: () => console.log(moment().calendar())
      };
      const currentDate = () => console.log(moment().toDate());
      onCommand(argv, optionsComands, currentDate, 'boolean');
    }
  )
  
  .command(
    'add',
    'Date in the future',
    yargs => commandArgv(yargs, 'number'),
    argv => {
      const optionsComands = {
        y: (count) => console.log(moment().add(count, 'y').toDate()),
        m: (count) => console.log(moment().add(count, 'M').toDate()),
        d: (count) => console.log(moment().add(count, 'd').toDate())
      };
      onCommand(argv, optionsComands, null, 'number');
    }
  )
  .command(
    'sub',
    'Date in the past',
    yargs => commandArgv(yargs, 'number'),
    argv => {
      const optionsComands = {
        y: (count) => console.log(moment().subtract(count, 'y').toDate()),
        m: (count) => console.log(moment().subtract(count, 'M').toDate()),
        d: (count) => console.log(moment().subtract(count, 'd').toDate())
      };
      onCommand(argv, optionsComands, null, 'number');
    }
  )
  
  .help('h')
  .alias('h', 'help')
  .argv;

function commandArgv(yargs, optionType) {
  return yargs
    .option('y', { alias: 'year', describe: 'Year', type: optionType })
    .option('m', { alias: 'month', describe: 'Month', type: optionType })
    .option('d', { alias: 'date', describe: 'Day', type: optionType })
    .help('h')
    .alias('h', 'help')
}

function onCommand(argv, optionsComands, currentDate, optionType) {
  const options = Object.keys(optionsComands);
  const isOption = options.some(option => {
    if (!argv[option]) return false;
    optionType === 'number' ? optionsComands[option](argv[option]) : optionsComands[option]();
    return true;
  });
  if (!isOption && currentDate) currentDate();
}
