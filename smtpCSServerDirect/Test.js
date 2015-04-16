var Send = require('./Email.js');
var express = require('express'),
    app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
var http = require('http'), fs = require('fs');

// as only one page can use res.sendfile to render the page which will contain the drop   downs
app.post('/', function (req, res) {
    res.sendfile('test.html');
});



app.post('/notify', function (req, res) {

    var options = {
        from: 'Buzz No Reply <DiscussionThree@gmail.com>',
        to : "matty.gouws@gmail.com",
        subject: "New Notification",
        plain: "New Buzz Space Notification",
        html: "<b>New Buzz Space Notification </br> Please  <a href='http://www.cs.up.ac.za'>Click Here</a> To see the post</b>"
    }
    var str = JSON.stringify(options);
	res.sendfile('test.html');
    Send(str);
});

//Gets the specific action and opens the html page
app.get('/', function (req, res) {
    res.sendfile('test.html');
});

//Listens to the port
app.listen(5000,'127.0.0.1',function(){
    console.log('Server is running.');
});