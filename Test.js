var send = require('./Email.js');
var DeleteNotification = require('./DeleteNotif.js');
var DailyNotification = require('./DailyNotif.js');
var AddAppraisalToDB = require('./AppraisalNotifyMe.js');
var StandardNotification = require('./StandardNotification.js');

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
 var user = req.body.User_id;
 var post = req.body.Post_User_id;
 var thread = req.body.Thread_id;

console.log(appraisal+user+thread+post);
    var options = {
    	current_user_id: user,
    	post_user_id: post,
    	appraisedThread_id: thread,
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
        to : "matty.gouws@gmail.com",
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

    // var str = JSON.stringify(options);
        res.sendfile('test.html');
    DeleteNotification.deleteNotification(options);
    // console.log(str);
    // send(str);
});

app.post('/standard', function (req, res) {
    var threadID = req.body.newThreadID;
    var options = {
    	thread: threadID
    }
 
    res.sendfile('test.html');
    StandardNotification.standardNotification(options);
    // console.log(str);
    // send(str);
});

app.post('/register', function (req, res) {

    var registerForNotification = require('./registerForNotification');
    var userID = req.body.user_id;
    var threadName = req.body.threadRegister;
    var regTo = req.body.regTo;
    var regToArr = regTo.split(",");
    console.log(regTo);

    var options = {
        user_id: userID,
        thread_id: threadName,
        registeredTo: regToArr
    };

    var str = JSON.stringify(options);
    //res.sendfile('test.html');
    editSubscription.GlobalEditSubscription(options, function(result){res.send(result);});

});

app.post('/edit', function (req, res) {
    var EditSubscription = require('./EditSubscription');
    var userID = req.body.Edit_user_id;
    var threadName = req.body.threadRegisterEdit;
    var editType = req.body.EditType;
    var editAction = req.body.EditAction;
    var deleteRegTo = req.body.DeleteRegTo;
    var newRegTo = req.body.NewRegTo;
    var newThreadID = req.body.newThreadID;


    var options = {
        user_id: userID,
        thread_id: threadName,
        EditAction: editAction,
        Type: editType,
        delete: deleteRegTo,
        newRegisteredTo: newRegTo,
        oldthread_id: threadName,
        newthread_id: newThreadID
    };

    var str = JSON.stringify(options);
   // res.sendfile('test.html');
    EditSubscription.GlobalEditSubscription(options, function(result){res.send(result);});

});

app.post('/registersettings', function (req, res) {
    var RegisterSettings = require('./registerUserNotificationSettings');
    var userID = req.body.UserIDSettings;

    var deletion = req.body.Deletion == true;
    var appraisal = req.body.Appraisal == true;
    var instantemail = req.body.InstantEmail == true;
    var dailyemail = req.body.DailyEmail == true;



    var options = {
        user_id: userID,
        Deletion: deletion,
        Appraisal: appraisal,
        InstantEmail: instantemail,
        DailyEmail: dailyemail
    };

    var str = JSON.stringify(options);
    // res.sendfile('test.html');
    RegisterSettings.GlobalRegisterUserNotificationSettings(options, function(result){res.send(result);});

});

app.post('/editsettings', function (req, res) {
    var EditSettings = require('./EditNotificationSettings');
    var userID = req.body.UserIDEditSettings;

    var editwhat = req.body.Editwhat;

    var setas = req.body.SetAs == true;



    var options = {
        user_id: userID,
        editWhat: editwhat,
        SetAs: setas
    };

    var str = JSON.stringify(options);
    // res.sendfile('test.html');
    EditSettings.GlobalEditNotificationSettings(options, function(result){res.send(result);});

});

//Gets the specific action and opens the html page
app.get('/', function (req, res) {
    res.sendfile('test.html');
});

//Listens to the port
app.listen(5000,'127.0.0.1',function(){
    console.log('Server is running.');
});
