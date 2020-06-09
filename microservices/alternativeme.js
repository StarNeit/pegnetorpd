const request = require('request');
const Redis = require('ioredis');

const start = async () => {
    const options = {
        'method': 'GET',
        'url': 'https://api.alternative.me/v2/ticker?convert=USD&limit=300',
        'headers': {
            'Content-Type': 'application/json'
        }
    };
    request(options, async (error, response) => {
        if (error) throw new Error(error);

        const redisClient = new Redis();
        await redisClient.set('alternativeme', response.body);

        setTimeout(start, 10000);
    });
};

module.exports = start;
