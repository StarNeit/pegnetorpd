const request = require('request');
const Redis = require('ioredis');

const start = async () => {
    const options = {
        'method': 'GET',
        'url': 'http://api.coincap.io/v2/assets?ids=bitcoin,ethereum,bitcoin-cash,litecoin,eos,binance-coin,cosmos,monero,stellar,cardano,tezos,chainlink,dash,zcash,basic-attention-token,decred,ravencoin,factom,neo,ethereum-classic,ontology,dogecoin,vechain,huobi-token,algorand',
        'headers': {
            'Content-Type': 'application/json'
        }
    };
    request(options, async (error, response) => {
        if (error) throw new Error(error);

        const redisClient = new Redis();
        await redisClient.set('coincap', response.body);

        setTimeout(start, 10000);
    });
};

module.exports = start;
