# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import scrapy
import os.path
from scrapy.pipelines.images import ImagesPipeline
from scrapy_spider.items import PictureItem
from PIL import Image

class ScrapySpiderPipeline(object):

    def process_item(self, item, spider):
        return item

class PicturesPipeline(ImagesPipeline):

    def get_media_requests(self, item, info):
        yield scrapy.Request(item['original_url'])

    def item_completed(self, results, item, info):
        image_paths = [x['path'] for ok, x in results if ok]
        if not image_paths:
            raise PictureItem("Item contains no images")
        image_path = image_paths[0]
#        thumbwidth = 400
#        cropHeight = 300
#        img = Image.open('./resources/picture/'+image_path)
#        wpercent = (thumbwidth/float(img.size[0]))
#        hsize = int((float(img.size[1])*float(wpercent)))
#        img = img.resize((thumbwidth,hsize), Image.ANTIALIAS)
#        region = (0,0,thumbwidth,cropHeight)
#        cropImg = img.crop(region)
        item['file_name'] = os.path.basename(image_path)
#        cropImg.save('./resources/picture/thumbs/'+ item['file_name'])
        return item