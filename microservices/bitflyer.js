const ccxt = require ('ccxt');
const Redis = require('ioredis');
const { SUPPORT_ASSETS } = require('../config/assets');

const redisClient = new Redis();
const SYNC_INTERVAL = 65;

const filterAsynSymbol = (sym) => {
    if (sym === 'XBT') return 'BTC';
    if (sym === 'XBC') return 'BCH';
    return sym;
};

const filterSymbol = (sym) => {
    if (sym === 'BTC') return 'XBT';
    if (sym === 'BCH') return 'XBC';
    return sym;
};

const sync = async () => {
    const res = {};
    try {
        let bitflyer  = new ccxt.bitflyer ({ verbose: false });
        await Promise.all(
            SUPPORT_ASSETS.map(async (item, index) => {
                const sym = filterAsynSymbol(item[0]);
                const isCrypto = item[1];
                if (isCrypto) {
                    try {
                        const data = await bitflyer.fetchTicker (`${sym}/USD`);
                        res[filterSymbol(sym)] = (data.bid + data.ask) / 2 || 0;
                    } catch (e) {}
                }
            })
        );
        await redisClient.set('bitFlyer', JSON.stringify(res));
    } catch (e) {
        console.log('[bitflyer error]', e);
    }
    setTimeout(sync, SYNC_INTERVAL * 1000);
};

module.exports = sync;
