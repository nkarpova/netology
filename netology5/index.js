const http = require('http');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

require('dotenv').config();

console.log(process.env);
const argv = yargs(hideBin(process.argv))
  .locale('en')
  .usage('Usage: node index.js --city <name>')
  .option('city', {
    describe: 'City name',
    type: 'string',
    demandOption: true
  })
  .version(false)
  .help()
  .argv

const { city } = argv;
const getCity = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${city}`;
http.get(getCity, response => {
  const { statusCode, error } = response;
  if (statusCode !== 200) {
    console.log(`Error: Request failed (${statusCode}).`);
    return;
  } else if (error) {
    const { code } = error;
    console.log(`Error: Request failed (${code}).`);
    return;
  }

  response.setEncoding('utf8');
  let rawData = '';
  response.on('data', (chunk) => { rawData += chunk; });
  response.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error('Error: It is impossible to parse data.');
    }
  });
});