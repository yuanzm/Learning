//node是阻塞的单线程

var start = new Date();

setTimeout(function() {
    console.log(Date.now() - start);
    var test = [];
    for (var i = 0;i < 10000000;i++) {
        test.push(i);
    }
    console.log(Date.now() - start);
}, 1000);

//按照预期的结果，结果应该是1100，但是之前有个大的循环，阻塞了操作
setTimeout(function() {
    console.log(Date.now() - start);
}, 1100);

console.log(~~100.100);