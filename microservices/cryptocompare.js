const request = require('request');
const Redis = require('ioredis');
const redisClient = new Redis();

const SYNC_INTERVAL = 3600;
const ApiUrl = 'https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&fsyms=BTC,ETH,BCH,LTC,EOS,BNB,ATOM,XMR,XLM,ADA,XTZ,LINK,DASH,ZEC,BAT,DCR,RVN,FCT,NEO,ETC,ONT,DOGE,VET,HT,ALGO';

const filterSymbol = (sym) => {
    if (sym === 'BTC') return 'XBT';
    if (sym === 'BCH') return 'XBC';
    return sym;
}

const setRedisWith = async (ret) => {
    const res = {};
    try {
        const data = Object.values(ret.RAW) || [];
        data.map((item, index) => {
            const symbol = filterSymbol(item.USD.FROMSYMBOL);
            res[symbol] = Number(item.USD.PRICE) || 0;
        });
    } catch (e) {
        console.log('[Parsing error]', e);
    }
    await redisClient.set('CryptoCompare', JSON.stringify(res));
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
