const request = require('request');
const Redis = require('ioredis');

const start = async () => {
    const options = {
        'method': 'GET',
        'url': 'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&include_last_updated_at=true&ids=monero,binancecoin,ethereum,cosmos,litecoin,tezos,eos,cardano,bitcoin,chainlink,dash,stellar,attention-token,cash,pegnet,zcash,factom,decred,ravencoin,hashgraph,neo,crypto-com-chain,classic,ontology,dogecoin,vechain,token,algorand',
        'headers': {
            'Content-Type': 'application/json'
        }
    };
    request(options, async (error, response) => {
        if (error) throw new Error(error);

        const redisClient = new Redis();
        await redisClient.set('coingecko', response.body);

        setTimeout(start, 100000);
    });
};

module.exports = start;
