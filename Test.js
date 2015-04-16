var send = require('./Email.js');
var DeleteNotification = require('./DeleteNotif.js');
var DailyNotification = require('./DailyNotif.js');

var express = require('express'),
    app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
var http = require('http'), fs = require('fs');

// as only one page can use res.sendfile to render the page which will contain the drop   downs
app.post('/', function (req, res) {
    res.sendfile('test.html');
});

//Builds the content used to send the email using the appraisal type
app.post('/appraisal', function (req, res) {
    var appraisal = req.body.appraisal;

    var options = {
        from: 'Buzz No Reply <DiscussionThree@gmail.com>',
        to : "DiscussionThree@gmail.com",                        //Change this to the email addess you want to receive the email. This will eventually be the user's email.
        Subject: "New Buzz Appraisal Notification",
        plain: "New Buzz Appraisal Notification",
        html: "User has given your post this appraisal:  " + appraisal
    }

    var str = JSON.stringify(options);
	res.sendfile('test.html');
    send(str);
});

app.post('/DailyNotif', function (req, res) {
    res.sendfile('test.html');
	DailyNotification();
});

app.post('/notify', function (req, res) {

    var options = {
        from: 'Buzz No Reply <DiscussionThree@gmail.com>',
        to : "DiscussionThree@gmail.com",
        Subject: "New Notification",
        plain: "New Buzz Space Notification",
        html: "<b>New Buzz Space Notification </br> Please  <a href='http://www.cs.up.ac.za'>Click Here</a> To see the post</b>"
    }

    var str = JSON.stringify(options);
	res.sendfile('test.html');
    send(str);
});

app.post('/delete', function (req, res) {
    var sendNotification = req.body.sendNotification;
    var threadName = req.body.thread;
    var msg = req.body.message;

    var options = {
    	sendRequest: sendNotification,
    	thread: threadName,
    	reason: msg
    }

    var str = JSON.stringify(options);
        res.sendfile('test.html');
    DeleteNotification.deleteNotification(options);
    // console.log(str);
    // send(str);
});

//Gets the specific action and opens the html page
app.get('/', function (req, res) {
    res.sendfile('test.html');
});

//Listens to the port
app.listen(5000,'127.0.0.1',function(){
    console.log('Server is running.');
});