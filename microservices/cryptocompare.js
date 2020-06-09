const request = require('request');
const Redis = require('ioredis');

const start = async () => {
    const options = {
        'method': 'GET',
        'url': 'https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&fsyms=BTC,ETH,BCH,LTC,EOS,BNB,ATOM,XMR,XLM,ADA,XTZ,LINK,DASH,ZEC,BAT,DCR,RVN,FCT,NEO,ETC,ONT,DOGE,VET,HT,ALGO',
        'headers': {
            'Content-Type': 'application/json'
        }
    };
    request(options, async (error, response) => {
        if (error) throw new Error(error);

        const redisClient = new Redis();
        await redisClient.set('cryptocompare', response.body);

        setTimeout(start, 10000);
    });
};

module.exports = start;
