const request = require('request');
const Redis = require('ioredis');

const start = async () => {
    const options = {
        'method': 'GET',
        'url': 'https://api.exchangeratesapi.io/latest?base=USD',
        'headers': {
            'Content-Type': 'application/json'
        }
    };
    request(options, async (error, response) => {
        if (error) throw new Error(error);

        const redisClient = new Redis();
        await redisClient.set('exchangeratesapi', response.body);

        setTimeout(start, 10000);
    });
};

module.exports = start;
