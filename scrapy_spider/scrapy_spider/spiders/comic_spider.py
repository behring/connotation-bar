import scrapy
from scrapy_spider.items import ComicItem

class ComicSpider(scrapy.Spider):
    number = 0
    name = "comic"
    allowed_domains = ["2nunu.com"]

    #fengqiuhuang
    #first page url http://www.2nunu.com/look-%E9%B3%B3%E5%9B%9A%E5%87%B0-19686-200776-1.html

    #淫荡的妻子们
    #first page url http://www.2nunu.com/look-%E6%B7%AB%E8%95%A9%E7%9A%84%E5%A6%BB%E5%AD%90%E5%80%91-23986-250733-1.html

    start_urls = [
        "http://www.2nunu.com/look-%E9%B3%B3%E5%9B%9A%E5%87%B0-19686-200776-1.html"
    ]

    def parse(self, response):
        item = ComicItem()
        item['number'] = ComicSpider.number
        item['name'] = response.xpath('//div[@class="path"]/div[1]/a[3]/text()').extract_first()
        item['title'] = response.xpath('//img[@id="cpimg"]/@alt').extract_first()
        item['original_url'] = response.xpath('//img[@id="cpimg"]/@src').extract_first()
        ComicSpider.number += 1
        yield item
        partNextPageUrl =  response.xpath('//div[@class="page"]/span[@class="current"]/following-sibling::*[1]/@href').extract_first()
        if partNextPageUrl is not None:
            nextPageUrl = 'http://' + ComicSpider.allowed_domains[0] + '/' + partNextPageUrl
        else:
            nextPageUrl = response.xpath('//body/div[@class="page"]/a[last()]/@href').extract_first()
        yield scrapy.Request(nextPageUrl, callback=self.parse)

