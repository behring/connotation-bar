const fengqiuhuangJson = require('../scrapy_spider/comic-jsons/fengqiuhuang.json')
const fs = require('fs')
const resultJson = require('../data/Comic.json')

let number = 0
const result = fengqiuhuangJson.reduce((sum, c) => {
    const title = c.title
    let obj = sum[title] || {title: title, name: c.name, number: number++, original_urls: [], file_names: []}
    obj.original_urls.push(c.original_url)
    obj.file_names.push(c.file_name)
    return Object.assign({}, sum, {[title]: obj})
}, {})
let newComicJson = resultJson.concat(Object.values(result))
console.log('------start write json...--------');
fs.writeFileSync('./data/Comic.json', JSON.stringify(newComicJson) , 'utf-8');
console.log('------finish write json!--------');