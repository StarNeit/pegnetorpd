const request = require('request');
const Redis = require('ioredis');
const redisClient = new Redis();

const SYNC_INTERVAL = 3600;
const ApiUrl = 'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&include_last_updated_at=true&ids=monero,binancecoin,ethereum,cosmos,litecoin,tezos,eos,cardano,bitcoin,chainlink,dash,stellar,attention-token,cash,pegnet,zcash,factom,decred,ravencoin,hashgraph,neo,crypto-com-chain,classic,ontology,dogecoin,vechain,algorand';

const setRedisWith = async (data) => {
    const res = {};
    try {
        res['LTC'] = data['litecoin'].usd || 0;
        res['ETH'] = data['ethereum'].usd || 0;
        res['XBT'] = data['bitcoin'].usd || 0;
        res['ADA'] = data['cardano'].usd || 0;
        res['XLM'] = data['stellar'].usd || 0;
        res['DASH'] = data['dash'].usd || 0;
        res['NEO'] = data['neo'].usd || 0;
        res['DCR'] = data['decred'].usd || 0;
        res['EOS'] = data['eos'].usd || 0;
        res['DOGE'] = data['dogecoin'].usd || 0;
        res['FCT'] = data['factom'].usd || 0;
        res['ONT'] = data['ontology'].usd || 0;
        res['BNB'] = data['binancecoin'].usd || 0;
        res['XMR'] = data['monero'].usd || 0;
        res['VET'] = data['vechain'].usd || 0;
        res['ATOM'] = data['cosmos'].usd || 0;
        res['ZEC'] = data['zcash'].usd || 0;
        res['LINK'] = data['chainlink'].usd || 0;
        res['ALGO'] = data['algorand'].usd || 0;
        res['PEG'] = data['pegnet'].usd || 0;
        res['XTZ'] = data['tezos'].usd || 0;
        res['CRO'] = data['crypto-com-chain'].usd || 0;
        res['RVN'] = data['ravencoin'].usd || 0;
    } catch (e) {
        console.log('[Parsing error]', e);
    }
    await redisClient.set('Coingecko', JSON.stringify(res));
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
