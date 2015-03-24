var send = require('./Email.js');

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
        from: 'DiscussionThree@gmail.com',
        to : "u12207871@tuks.co.za",                        //Change this to the email addess you want to receive the email. This will eventually be the user's email.
        Subject: "New Buzz Appraisal Notification",
        plain: "New Buzz Appraisal Notification",
        html: "User has given your post this appraisal:  " + appraisal
    }

    var str = JSON.stringify(options);

    send(str);
});

app.post('/notify', function (req, res) {

    var options = {
        from: 'DiscussionThree@gmail.com',
        to : "u12207871@tuks.co.za",
        Subject: "New Notification",
        plain: "New Buzz Space Notification",
        html: '<b>New Buzz Space Notification ✔</b>'
    }

    var str = JSON.stringify(options);

    send(str);
});

//Gets the specific action and opens the html page
app.get('/', function (req, res) {
    res.sendfile('test.html');
});

//Listens to the port
app.listen(5000,'127.0.0.1',function(){
    console.log('Server is running.');
});