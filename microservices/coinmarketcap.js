const request = require('request');
const Redis = require('ioredis');

const start = async () => {
    const options = {
        'method': 'GET',
        'url': 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1,2,131,2011,328,512,1027,1087,1168,1437,1697,1765,1831,1839,1975,2010,2577,3794,4979,74,1321,1376,2502,2566,3077,3635,4642,4030&convert=USD',
        'headers': {
            'X-CMC_PRO_API_KEY': '63a5dcd4-72cd-46f9-9cee-d105768dfa07',
            'Content-Type': 'application/json'
        }
    };
    request(options, async (error, response) => {
        if (error) throw new Error(error);

        const redisClient = new Redis();
        await redisClient.set('coinmarketcap', response.body);

        setTimeout(start, 10000);
    });
};

module.exports = start;
