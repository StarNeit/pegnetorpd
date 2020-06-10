const request = require('request');
const Redis = require('ioredis');
const redisClient = new Redis();

const SYNC_INTERVAL = 3600;
const ApiUrl = 'https://api.alternative.me/v2/ticker?convert=USD&limit=300';

const filterSymbol = (sym) => {
    if (sym === 'BTC') return 'XBT';
    if (sym === 'BCH') return 'XBC';
    return sym;
}

const setRedisWith = async (ret) => {
    const res = {};
    try {
        const data = Object.values(ret.data) || [];
        data.map((item, index) => {
            const symbol = filterSymbol(item.symbol);
            res[symbol] = Number(item.quotes.USD.price) || 0;
        });
    } catch (e) {
        console.log('[Parsing error]', e);
    }
    await redisClient.set('Alternative.me', JSON.stringify(res));
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
