# pegnetorpd
Pegnet OPR Microservice that polls pAssets prices from Oracle(enabled data providers and top 10 exchanges).

![OPR Service](https://github.com/StarNeit/pegnetorpd/blob/master/docs/diagram.png)

### API Documentation
https://documenter.getpostman.com/view/478114/SzzefKqm?version=latest

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

### CCXT
- **[CCXT](https://github.com/ccxt/ccxt)**&nbsp;&mdash;&nbsp; CryptoCurrency eXchange Trading Library.

pegnetorpd uses CCXT for polling pAssets prices from top 10 external exchanges.
