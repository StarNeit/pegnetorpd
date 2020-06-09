const request = require('request');
const Redis = require('ioredis');

const start = async () => {
    const options = {
        'method': 'GET',
        'url': 'https://www.freeforexapi.com/api/live?pairs=USDUSD,USDEUR,USDJPY,USDGBP,USDCAD,USDCHF,USDINR,USDSGD,USDCNY,USDHKD,USDKRW,USDBRL,USDPHP,USDMXN,USDXAU,USDXAG,USDAUD,USDNZD,USDSEK,USDNOK,USDRUB,USDZAR,USDTRY,USDAED,USDARS,USDTWD',
        'headers': {
            'Content-Type': 'application/json'
        }
    };
    request(options, async (error, response) => {
        if (error) throw new Error(error);

        const redisClient = new Redis();
        await redisClient.set('freeforexapi', response.body);

        setTimeout(start, 10000);
    });
};

module.exports = start;
