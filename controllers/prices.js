const express = require('express');
const router = express.Router();
const Redis = require('ioredis');

router.get('/', async (req, res) => {
  let data;
  try {
    const redisClient = new Redis();
    data = await redisClient.get('coingecko');
  } catch (e) {
    data = [];
  }
  res.json(JSON.parse(data));
});

module.exports = router;
