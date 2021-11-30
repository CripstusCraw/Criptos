import unicodedata
import scrapy
from scrapy.crawler import CrawlerProcess


class GoogleNewsSpider(scrapy.Spider):
    name = 'google-news-crawler'

    start_urls = ['https://news.google.com/search?q=Crypto+moedas+when:7d&hl=pt-BR']

    @staticmethod
    def clear_string(string):
        return unicodedata.normalize("NFKD", string)

    def parse(self, response, **kwargs):
        for article in response.xpath('//article'):
            article_parsed = {
                'title': article.xpath('h3/a/text()').get(),
                'image': article.xpath('../../a/figure/img/@src').get(),
                'source': article.xpath('div//time/../a/text()').get(),
                'time': article.xpath('div//time/text()').get(),
                'url': article.xpath('a/@href').get().replace('./', 'https://news.google.com/')
            }
            if None in list(article_parsed.values()):
                continue

            yield article_parsed




process = CrawlerProcess(settings={
    "FEEDS": {
        "output/google-news.json": {"format": "json"},
    },
    "FEED_EXPORT_ENCODING": 'utf-8'
})

process.crawl(GoogleNewsSpider)
process.start()

"""
python -m venv venv
source venv/bin/active
pip install scrapy
"""