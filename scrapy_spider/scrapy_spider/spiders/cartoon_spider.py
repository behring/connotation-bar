import scrapy
from scrapy_spider.items import CartoonItem

class CartoonSpider(scrapy.Spider):
    number = 0
    name = "cartoon"
    allowed_domains = ["xiaojiulou.moli8.com"]

    #sexi 1948 sheet
    #first page url http://xiaojiulou.moli8.com/sexi/6806.html
    #last page url http://xiaojiulou.moli8.com/sexi/430.html

    #ant and bee(myymf) 46 sheet
    #first page url http://xiaojiulou.moli8.com/myyfm/1790.html
    #last page url http://xiaojiulou.moli8.com/myyfm/1745.html

    #gfsd 26 sheet
    #first page url http://xiaojiulou.moli8.com/gfsd/14-09/13/1700.html
    #last page url http://xiaojiulou.moli8.com/gfsd/14-09/13/1675.html

    #mlyz
    #first page url http://xiaojiulou.moli8.com/mlyz/14-09/13/1714.html
    #last page url http://xiaojiulou.moli8.com/mlyz/14-09/13/1701.html

    start_urls = [
        "http://xiaojiulou.moli8.com/mlyz/14-09/13/1714.html"
    ]

    def parse(self, response):
        item = CartoonItem()
        item['number'] = CartoonSpider.number
        item['title'] = response.xpath('//h1/text()').extract_first()
        item['original_url'] = response.xpath("//div[@id='imgshowdiv']//img/@src").extract_first()
        item['category'] = response.xpath("//div[@id='imgshowdiv']/b/a/text()").extract_first()
        CartoonSpider.number += 1
        yield item
        #previousPageUrl = 'http://' + CartoonSpider.allowed_domains[0] + response.xpath("//div[@class='zw_page1']/a/@href").extract_first()
        #yield scrapy.Request(previousPageUrl, callback=self.parse)
        nextPageUrl = 'http://' + CartoonSpider.allowed_domains[0] + response.xpath("//div[@class='zw_page3']/a/@href").extract_first()
        yield scrapy.Request(nextPageUrl, callback=self.parse)