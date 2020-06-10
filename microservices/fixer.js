const request = require('request');
const Redis = require('ioredis');
const { API_KEY_FIXER } = require('../config');

const redisClient = new Redis();
const SYNC_INTERVAL = 3600;
const ApiUrl = `http://data.fixer.io/api/latest?access_key=${API_KEY_FIXER}`;

const setRedisWith = async (ret) => {
    const res = {};
    try {
        const data = ret.rates || {};
        const usdRate = data['USD'] || 1;
        const symbols = Object.keys(data) || [];
        symbols.map((item, index) => {
            res[item] = 1 / Number(data[item]) * usdRate || 0;
        });
    } catch (e) {
        console.log('[Parsing error]', e);
    }
    await redisClient.set('Fixer.io', JSON.stringify(res));
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
