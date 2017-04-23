var casper = require('casper').create();
var fs = require('fs');

var data;

casper.on('remote.message', function(msg) {
    console.log('remote message is: ' + msg);
});

casper.start('http://www.google.ca/', function() {
    // var title = this.evaluate(function() {
        // var title = this.getTitle();
        // console.log(title);
    // });
    this.fill('form', {q: 'hello world!'}, true)
});

casper.wait(1000, function() {
    data = this.evaluate(function() {
        var targetElements = document.querySelectorAll('.g h3 a');
        var data = [];
        // console.log(window.navigator.userAgent);
        for (var index = 0; index < targetElements.length; index++) {
            var currentEl = targetElements[index];
            var currentLink = currentEl.getAttribute('href');
            var currentTitle = currentEl.text;
            var currentItem = {
                'link': currentLink,
                'title': currentTitle
            };
            data.push(currentItem);
        }
        return data;
    });
});

casper.run(function() {
    fs.write('./output.json', JSON.stringify(data, null, '\t'));
    this.exit();
});
// casper.exit();