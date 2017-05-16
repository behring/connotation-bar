# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy

class CartoonItem(scrapy.Item):
    # define the fields for your item here like:
    number = scrapy.Field()
    title = scrapy.Field()
    link = scrapy.Field()
    category = scrapy.Field()
    path = scrapy.Field()
