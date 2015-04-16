var send = require('./Email.js');
var DeleteNotification = require('./DeleteNotif.js');
var DailyNotification = require('./DailyNotif.js');
var AddAppraisalToDB = require('./AppraisalNotifyMe.js');

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
    	current_user_id: 'u11008602',
    	post_user_id: 'u10075268',
    	appraisedThread_id: 'c2',
		appraisalType: appraisal
    }

        res.sendfile('test.html');
    AddAppraisalToDB.addAppraisalToDB(options);
	
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