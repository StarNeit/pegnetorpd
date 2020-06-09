// Init env
require('dotenv').config();

// Modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./utils/logger');

// Constants
const { PORT } = require('./config');

// Controllers
const PricesController = require('./controllers/prices');

// Services
const coingeckoService = require('./microservices/coingecko');
const coincapService = require('./microservices/coincap');
const coinmarketcapService = require('./microservices/coinmarketcap');
const alternativemeService = require('./microservices/alternativeme');
const cryptocompareService = require('./microservices/cryptocompare');
const exchangeratesapiService = require('./microservices/exchangeratesapi');
const factoshiService = require('./microservices/factoshi');
const freeforexapiService = require('./microservices/freeforexapi');
const fixerService = require('./microservices/fixer');

// Initialize Express
const app = express();
app.disable('x-powered-by');
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('origin'));
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Main
(async function main () {
  app.use('/api/prices', PricesController);

  // Start services after 1 sec
  // setTimeout(coingeckoService, 1000);
  // setTimeout(coincapService, 1000);
  // setTimeout(coinmarketcapService, 1000);
  // setTimeout(alternativemeService, 1000);
  // setTimeout(cryptocompareService, 1000);
  // setTimeout(exchangeratesapiService, 1000);
  // setTimeout(factoshiService, 1000);
  // setTimeout(freeforexapiService, 1000);
  // setTimeout(fixerService, 1000);

  // Start express server
  app.listen(PORT, (err) => {
    logger.log(`Express server started on ${PORT}`);

    if (err) {
      logger.error(`Can not start express server`);
      console.error(err);
    }
  });
})();
