# pegnetorpd
Pegnet OPR Microservice that polls pAssets prices from Oracle(enabled data providers and top 10 exchanges).

![OPR Service](https://github.com/StarNeit/pegnetorpd/blob/master/docs/diagram.png)

### API Documentation
https://documenter.getpostman.com/view/478114/SzzefKqm?version=latest

### CCXT
- **[CCXT](https://github.com/ccxt/ccxt)**&nbsp;&mdash;&nbsp; CryptoCurrency eXchange Trading Library.

pegnetorpd uses CCXT for polling pAssets prices from top 10 external exchanges.

### Oracle Data
| No | Data Source | URL | TYPE |
| --- | --- | --- | --- |
| 1 | Coingecko | https://coingecko.com | Crypto Currency |
| 2 | Coincap.io | https://coincap.io | Crypto Currency |
| 3 | Coinmarketcap | https://coinmarketcap.com | Crypto Currency |
| 4 | Alternative.me | https://alternative.me | Crypto Currency |
| 5 | CryptoCompare | https://cryptocompare.com | Crypto Currency |
| 6 | Exchangeratesapi.io | https://exchangeratesapi.io | Fiat Currency |
| 7 | Factoshi.io | https://factoshi.io | Crypto Currency |
| 8 | Freeforexapi.com | https://www.freeforexapi.com | Fiat Currency |
| 9 | Fixer.io | https://fixer.io | Fiat Currency |
| 10 | Binance | https://www.binance.com | Crypto Currency |
| 11 | Huobi Global | https://www.huobi.com | Crypto Currency |
| 12 | Coinbase Pro | https://pro.coinbase.com | Crypto Currency |
| 13 | Kraken | https://www.kraken.com | Crypto Currency |
| 14 | Bitfinex | https://www.bitfinex.com | Crypto Currency |
| 15 | Bitstamp | https://www.bitstamp.net | Crypto Currency |
| 16 | bitFlyer | http://bitflyer.com | Crypto Currency |
| 17 | Bitbank | https://bitbank.com | Crypto Currency |
| 18 | Bittrex | https://bittrex.com | Crypto Currency |
| 19 | Coinone | https://coinone.co.kr | Crypto Currency |
| 20 | Vitex | https://x.vite.net | Crypto Currency |

### Supported PegAssets
| No | Symbol | Name |
| --- | --- | --- |
| 1 | PEG | PegNet |
| 2 | pUSD | US Dollar |
| 3 | pEUR | Euro |
| 4 | pJPY | Japanese Yen |
| 5 | pGBP | Pound Sterling |
| 6 | pCAD | Canadian Dollar |
| 7 | pCHF | Swiss Franc |
| 8 | pINR | Indian Rupee |
| 9 | pSGD | Singapore Dollar |
| 10 | pCNY | Chinese Yuan |
| 11 | pHKD | Hong Kong Dollar |
| 12 | pKRW | Korean Won |
| 13 | pBRL | Brazil Real |
| 14 | pPHP | Philippine Peso |
| 15 | pMXN | Mexican Peso |
| 16 | pXAU | Silver Troy Ounce |
| 17 | pXAG | Gold Troy Ounce |
| 18 | pXBT | Bitcoin |
| 19 | pETH | Ethereum |
| 20 | pLTC | Litecoin |
| 21 | pRVN | Ravencoin |
| 22 | pXBC | Bitcoin Cash |
| 23 | pFCT | Factom |
| 24 | pBNB | Binance Coin |
| 25 | pXLM | Stellar |
| 26 | pADA | Cardano |
| 27 | pXMR | Monero |
| 28 | pDASH | Dash |
| 29 | pZEC | Zcash |
| 30 | pDCR | Decred |
| 31 | pAUD | Austrailian Dollar |
| 32 | pNZD | New Zealand Dollar |
| 33 | pSEK | Swedish Krona |
| 34 | pNOK | Norwegian Krone |
| 35 | pRUB | Russian Ruble |
| 36 | pZAR | South African Rand |
| 37 | pTRY | Turkish Lira |
| 38 | pEOS | EOS |
| 39 | pLINK | Chainlink |
| 40 | pATOM | Cosmos |
| 41 | pBAT | Basic Attention Token |
| 42 | pXTZ | Tezos |

### Output
- Endpoint: [Server]/api/rates
- Output
```shell
{
  "PEG": {
    "Coingecko": 0.00112305,
    "Coinmarketcap": 0.00112273351945,
    "Factoshi.io": 0.0010901776,
    "AVERAGE": 0.00112273351945,
    "TOLERANCE_BAND_LOW": 0.001010460167505,
    "TOLERANCE_BAND_HIGH": 0.001235006871395
  },
  "USD": {
    "Exchangeratesapi.io": 1,
    "Freeforexapi.com": 1,
    "Fixer.io": 1,
    "AVERAGE": 1,
    "TOLERANCE_BAND_LOW": 0.9,
    "TOLERANCE_BAND_HIGH": 1.1
  },
  "XBT": {
    "Coingecko": 9653.16,
    "Coincap.io": 9681.746819911552,
    "Coinmarketcap": 9746.62527675,
    "Alternative.me": 9653.16,
    "CryptoCompare": 9679.56,
    "Binance": 9691.224999999999,
    "HuobiGlobal": 9691.665,
    "CoinbasePro": 9678.185000000001,
    "Kraken": 9681.75,
    "Bitfinex": 9673.3,
    "Bitstamp": 9678.645,
    "bitFlyer": 9683.7,
    "Bittrex": 9690.633619555,
    "AVERAGE": 9681.746819911552,
    "TOLERANCE_BAND_LOW": 9584.929351712437,
    "TOLERANCE_BAND_HIGH": 9778.564288110667
  },
  "ETH": {
    "Coingecko": 241.17,
    "Coincap.io": 241.392768166977,
    "Coinmarketcap": 243.569830544,
    "Alternative.me": 241.17,
    "CryptoCompare": 241.61,
    "Binance": 241.875,
    "HuobiGlobal": 241.785,
    "CoinbasePro": 241.575,
    "Kraken": 241.575,
    "Bitfinex": 241.14,
    "Bitstamp": 241.585,
    "Bittrex": 241.76695972,
    "AVERAGE": 241.585,
    "TOLERANCE_BAND_LOW": 217.4265,
    "TOLERANCE_BAND_HIGH": 265.74350000000004
  },
  "JPY": {
    "Exchangeratesapi.io": 0.009311558611657415,
    "Freeforexapi.com": 0.00935099406958086,
    "Fixer.io": 0.00935199789143369,
    "AVERAGE": 0.00935099406958086,
    "TOLERANCE_BAND_LOW": 0.008415894662622775,
    "TOLERANCE_BAND_HIGH": 0.010286093476538947
  },
  "GBP": {
    "Exchangeratesapi.io": 1.2786214493540147,
    "Freeforexapi.com": 1.265886880348372,
    "Fixer.io": 1.2652135960380517,
    "AVERAGE": 1.265886880348372,
    "TOLERANCE_BAND_LOW": 1.1392981923135348,
    "TOLERANCE_BAND_HIGH": 1.3924755683832093
  },
  "CAD": {
    "Exchangeratesapi.io": 0.7469792487664011,
    "Freeforexapi.com": 0.7413992130788752,
    "Fixer.io": 0.7408998295011849,
    "AVERAGE": 0.7413992130788752,
    "TOLERANCE_BAND_LOW": 0.6672592917709878,
    "TOLERANCE_BAND_HIGH": 0.8155391343867628
  },
  "CHF": {
    "Exchangeratesapi.io": 1.0569596729342974,
    "Freeforexapi.com": 1.0620841276837538,
    "Fixer.io": 1.0615989417119454,
    "AVERAGE": 1.0615989417119454,
    "TOLERANCE_BAND_LOW": 0.9554390475407508,
    "TOLERANCE_BAND_HIGH": 1.16775883588314
  },
  ...
}
```
