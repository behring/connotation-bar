# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import scrapy
from scrapy.pipelines.images import ImagesPipeline
from scrapy_spider.items import CartoonItem

class ScrapySpiderPipeline(object):

    def process_item(self, item, spider):
        return item

class CartoonImagePipeline(ImagesPipeline):

    def get_media_requests(self, item, info):
        yield scrapy.Request(item['link'])

    def item_completed(self, results, item, info):
        image_paths = [x['path'] for ok, x in results if ok]
        if not image_paths:
            raise CartoonItem("Item contains no images")
        item['path'] = image_paths[0]
        return item