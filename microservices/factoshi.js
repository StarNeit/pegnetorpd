const request = require('request');
const Redis = require('ioredis');
const redisClient = new Redis();

const SYNC_INTERVAL = 60;
const ApiUrl = 'https://pegapi.factoshi.io/';

const setRedisWith = async (ret) => {
    const res = {};
    try {
        res['PEG'] = Number(ret.price) || 0;
    } catch (e) {
        console.log('[Parsing error]', e);
    }
    await redisClient.set('Factoshi.io', JSON.stringify(res));
};

const sync = async () => {
    request({
        'method': 'GET',
        'url': ApiUrl,
        'headers': {
            'Content-Type': 'application/json'
        }
    }, async (error, response) => {
        if (error) {
            console.log(error);
        } else {
            await setRedisWith(JSON.parse(response.body));
        }
        setTimeout(sync, SYNC_INTERVAL * 1000);
    });
};

module.exports = sync;
