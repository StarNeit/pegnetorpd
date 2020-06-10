const request = require('request');
const Redis = require('ioredis');
const redisClient = new Redis();

const SYNC_INTERVAL = 3600;
const ApiUrl = 'https://www.freeforexapi.com/api/live?pairs=USDUSD,USDEUR,USDJPY,USDGBP,USDCAD,USDCHF,USDINR,USDSGD,USDCNY,USDHKD,USDKRW,USDBRL,USDPHP,USDMXN,USDXAU,USDXAG,USDAUD,USDNZD,USDSEK,USDNOK,USDRUB,USDZAR,USDTRY,USDAED,USDARS,USDTWD';

const setRedisWith = async (ret) => {
    const res = {};
    try {
        const data = ret.rates || {};
        const symbols = Object.keys(data) || [];
        symbols.map((item, index) => {
            const sym = item.substring(3);
            res[sym] = 1 / Number(data[item].rate) || 0;
        });
    } catch (e) {
        console.log('[Parsing error]', e);
    }
    await redisClient.set('Freeforexapi.com', JSON.stringify(res));
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
