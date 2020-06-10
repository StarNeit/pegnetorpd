const request = require('request');
const Redis = require('ioredis');
const redisClient = new Redis();

const SYNC_INTERVAL = 3600;
const ApiUrl = 'http://api.coincap.io/v2/assets?ids=bitcoin,ethereum,bitcoin-cash,litecoin,eos,binance-coin,cosmos,monero,stellar,cardano,tezos,chainlink,dash,zcash,basic-attention-token,decred,ravencoin,factom,neo,ethereum-classic,ontology,dogecoin,vechain,huobi-token,algorand';

const filterSymbol = (sym) => {
    if (sym === 'BTC') return 'XBT';
    if (sym === 'BCH') return 'XBC';
    return sym;
};

const setRedisWith = async (ret) => {
    const res = {};
    try {
        const data = ret.data || [];
        data.map((item, index) => {
            const symbol = filterSymbol(item.symbol);
            res[symbol] = Number(item.priceUsd) || 0;
        });
    } catch (e) {
        console.log('[Parsing error]', e);
    }
    await redisClient.set('Coincap.io', JSON.stringify(res));
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
