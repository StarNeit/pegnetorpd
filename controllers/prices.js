const express = require('express');
const router = express.Router();

const { SUPPORT_PROVIDERS, SUPPORT_ASSETS } = require('../config/assets');
const Redis = require('ioredis');
const redisClient = new Redis();

const getRateWithProvider = async (asset, provider) => {
    let data;
    try {
        data = await redisClient.get(provider);
        data = JSON.parse(data);
        return data[asset] || 'N/A';
    } catch (e) {
        return 'N/A';
    }
};

router.get('/', async (req, res) => {
    const rates = {};
    await Promise.all(
        SUPPORT_ASSETS.map(async (item, index) => {
            const asset = item[0];
            const isCryptoAsset = item[1];
            rates[asset] = {};

            await Promise.all(
                SUPPORT_PROVIDERS.map(async (data, index) => {
                    const provider = data[0];
                    const isCryptoProvider = data[1];
                    if (isCryptoAsset === isCryptoProvider) {
                        const price = await getRateWithProvider(asset, provider);
                        if (price !== 'N/A'){
                            rates[asset][provider] = price;
                        }
                    }
                })
            );
        })
    );
    res.json(rates);
});

module.exports = router;
