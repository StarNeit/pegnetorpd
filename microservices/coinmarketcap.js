const request = require('request');
const Redis = require('ioredis');
const redisClient = new Redis();
const { API_KEY_COINMARKETCAP } = require('../config');

const SYNC_INTERVAL = 3600;
const ApiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=1,2,131,2011,328,512,1027,1087,1168,1437,1697,1765,1831,1839,1975,2010,2577,3794,4979,74,1321,1376,2502,2566,3077,3635,4642,4030&convert=USD';

const filterSymbol = (sym) => {
    if (sym === 'BTC') return 'XBT';
    if (sym === 'BCH') return 'XBC';
    return sym;
};

const setRedisWith = async (ret) => {
    const res = {};
    try {
        const data = Object.values(ret.data) || [];
        data.map((item, index) => {
            const symbol = filterSymbol(item.symbol);
            res[symbol] = Number(item.quote.USD.price) || 0;
        });
    } catch (e) {
        console.log('[Parsing error]', e);
    }
    await redisClient.set('Coinmarketcap', JSON.stringify(res));
};

const sync = async () => {
    request({
        'method': 'GET',
        'url': ApiUrl,
        'headers': {
            'X-CMC_PRO_API_KEY': API_KEY_COINMARKETCAP,
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
