const request = require('request');
const Redis = require('ioredis');

const start = async () => {
    const options = {
        'method': 'GET',
        'url': 'http://data.fixer.io/api/latest?access_key=e6f01076c1ef1ce39b7444cb05f7ec5c',
        'headers': {
            'Content-Type': 'application/json'
        }
    };
    request(options, async (error, response) => {
        if (error) throw new Error(error);

        const redisClient = new Redis();
        await redisClient.set('fixer', response.body);

        setTimeout(start, 10000);
    });
};

module.exports = start;
