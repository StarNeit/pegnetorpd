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
            const ratesList = [];
            rates[asset] = {};

            await Promise.all(
                SUPPORT_PROVIDERS.map(async (data, index) => {
                    const provider = data[0];
                    const isCryptoProvider = data[1];
                    if (isCryptoAsset === isCryptoProvider) {
                        const price = await getRateWithProvider(asset, provider);
                        if (price !== 'N/A'){
                            rates[asset][provider] = price;
                            ratesList.push(price);
                        }
                    }
                })
            );

            const ds = ratesList.sort();
            const middle = ds[Math.floor(ds.length / 2)];

            let toleranceRate;
            if (middle >= 1000) toleranceRate = 0.01;
            else toleranceRate = 0.1;

            const toleranceBandHigh = middle * (1 + toleranceRate);
            const toleranceBandLow = middle * (1 - toleranceRate);

            rates[asset]['AVERAGE'] = middle; // Trimmed Mean (removed noisy from highest & lowest)
            rates[asset]['TOLERANCE_BAND_LOW'] = toleranceBandLow;
            rates[asset]['TOLERANCE_BAND_HIGH'] = toleranceBandHigh;
        })
    );
    res.json(rates);
});

module.exports = router;
