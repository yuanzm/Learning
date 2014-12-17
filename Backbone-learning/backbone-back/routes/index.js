var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/questions', function(request, response) {
    console.log('Inside /questions');
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });
    var obj = { test : 1 };
    response.write(JSON.stringify(obj))
    response.end();
})

module.exports = router;
