import scrapy
from scrapy_spider.items import CartoonItem

class CartoonSpider(scrapy.Spider):
    number = 0
    name = "cartoon"
    allowed_domains = ["xiaojiulou.moli8.com"]
    start_urls = [
        "http://xiaojiulou.moli8.com/sexi/430.html"
    ]

    def parse(self, response):
        item = CartoonItem()
        item['number'] = CartoonSpider.number
        item['title'] = response.xpath('//h1/text()').extract_first()
        item['link'] = response.xpath("//div[@id='imgshowdiv']//img/@src").extract_first()
        item['category'] = response.xpath("//div[@id='imgshowdiv']/b/a/text()").extract_first()
        CartoonSpider.number += 1
        yield item
        previousPageUrl = 'http://' + CartoonSpider.allowed_domains[0] + response.xpath("//div[@class='zw_page1']/a/@href").extract_first()
        yield scrapy.Request(previousPageUrl, callback=self.parse)