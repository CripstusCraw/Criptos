import scrapy
import json
from urllib.parse import urlencode
from scrapy.crawler import CrawlerProcess


class CoinmarketcapSpider(scrapy.Spider):
    name = 'coinmarketcap'
    allowed_domains = ['coinmarketcap.com']

    api_link = 'https://web-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?'
    index = 1

    def start_requests(self):
        yield scrapy.Request(url=self.get_next_endpoint(self.index), callback=self.parse)

    def get_next_endpoint(self, start=1):
        parameters = {
            'convert': 'USD,BRL',
            'cryptocurrency_type': 'all',
            'limit': '200',
            'sort': 'market_cap',
            'sort_dir': 'desc',
            'start': start
        }

        return self.api_link + urlencode(parameters)

    def parse(self, response, **kwargs):
        data = json.loads(response.body)
        check_index = self.index

        for coin in data.get('data'):
            self.index += 1

            quote = coin.get("quote")

            yield {
                "coin_id": coin.get("id"),
                "name": coin.get("name"),
                "symbol": coin.get("symbol"),
                "slug": coin.get("slug"),
                "market_cap": quote['USD']['market_cap'],
                "market_cap_BRL": quote['BRL']['market_cap'],
                "price": quote['USD']['price'],
                "price_BRL": quote['BRL']['price'],
                "circulating_supply": coin.get("circulating_supply"),
                "volume_24h": quote['USD']['volume_24h']
            }

        if check_index != self.index:
             yield scrapy.Request(url=self.get_next_endpoint(self.index), callback=self.parse)


process = CrawlerProcess(settings={
    "FEEDS": {
        "output/coinmarketcap.json": {"format": "json"},
    },
    "FEED_EXPORT_ENCODING": 'utf-8'
})

process.crawl(CoinmarketcapSpider)
process.start()