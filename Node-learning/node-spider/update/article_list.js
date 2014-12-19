var cheerio = require('cheerio');
var request = require('request');
var debug = require('debug')('blog:update');

debug("读取博文列表");
request('http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html', function(err, res) {
    if (err) {
        return console.error(err);
    }
    //读取网页内容创建DOM对象
    var $ = cheerio.load(res.body.toString());

    //读取博文列表
    var articleList = []
    $('.articleList .articleCell').each(function() {
        var $me = $(this);
        var $title = $me.find('.atc_title a');
        var $time = $me.find('.atc_tm');

        var item = {
            title: $title.text().trim(),
            url: $title.attr('href'),
            time: $time.text().trim()
        }
        var s = item.url.match(/blog_([a-zA-Z0-9]+)\.html/);
        if (Array.isArray(s)) {
            item.id = s[1];
            articleList.push(item);
        }
    });
    console.log(articleList);
});