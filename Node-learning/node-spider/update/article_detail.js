var cheerio = require('cheerio');
var request = require('request');
var debug = require('debug')('blog:update');


debug("读取博文内容");

request('http://blog.sina.com.cn/s/blog_69e72a420101ha3e.html', function(err, res) {
    if (err) {
        return console.error(err);
    }

    //读取网页内容创建DOM对象
    var $ = cheerio.load(res.body.toString());

    var tags = []
    $('.blog_tag h3 a').each(function() {
        var tag = $(this).text().trim();
        if (tag) {
            tags.push(tag);
        }
    });

    var content = $('.articalContent').html().trim();

    console.log({tags: tags, content: content});
});