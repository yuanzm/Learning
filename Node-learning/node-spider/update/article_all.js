var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var debug = require('debug')('blog:update');

/**
 * 获取分类页面博文列表
 *
 * @param {String} url
 * @param {Function} callback
 */
function readArticleList (url, callback) {
    request(url, function (err, res) {
        if (err) {
            callback(err);
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

        //检查是否有下一页
        var nextUrl = $('.SG_pgnext a').attr('href');
        if (nextUrl) {
            readArticleList(nextUrl, function (err, articleList2) {
            if (err) {
                return callback(err);
            }
                callback(null, articleList.concat(articleList2));
            })
        } else {
            callback(null, articleList);
        }
    })
}

/**
 * 获取博文页面内容
 *
 * @param {String} url
 * @param {Function} callback
 */
function readArticleDetail (url, callback) {
    debug('读取博文内容：%s', url);

    request(url, function(err, res) {
        if (err) {
            callback(err);
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
        callback(null, {tags: tags, content: content});
    })
}

//读取分类下的所有文章
readArticleList('http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html', function (err, articleList) {
    if (err) {
        return console.error(err.stack);
    }

    // 依次取出articleList数组的每个元素，调用第二个参数中传入的函数
    //函数的第一个参数即是articleList中的元素
    // 函数的第二个参数即是回调函数
    async.eachSeries(articleList, function (article, next) {
        readArticleDetail(article.url, function (err, detail) {
            if (err) {
                console.error(err.stack);
            }
            console.log(detail);
            next();
        })
    }, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('完成');
        }
    })
})
