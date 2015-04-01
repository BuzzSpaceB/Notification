var send = require('./Email.js');
var express = require('express'),
    app = express();
var schedule = require('node-schedule');
var unitTesting = require('nodeunit'); //for unit testing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
var http = require('http'), fs = require('fs');
var userWhoAppraised, typeOfAppraise, destinedEmail;

var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.59.90:27017/db'); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	
});

//xxxxxxxxxxxxxxxxxx Schemas needed  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
var UsersSchema = mongoose.Schema(
{
	User_id: String,
	PreferredEmail: String
});

var ThreadsSchema = mongoose.Schema(
{
	Thread_id: String,
	Parent_id: String,
	User_id: String
});

var notificationSchema = mongoose.Schema (
{
	Notification_id: String,
	Thread_id: String,
	User_id: String,
	TimeAndDate: Date,
	Type: String,
	Context: String,
	Read: Boolean
});

var subscriptionSchema = mongoose.Schema (
{
	User_id: String,
	registeredTo: [String],
	Thread_id: String,
	Deletion: Boolean,
	Appraisal: Boolean,
	InstantEmail: Boolean,
	DailyEmail: Boolean
});

//xxxxxxxxxxxxxxxxxx Variables needed to access the database xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
var Users = mongoose.model("Users", UsersSchema);
var Threads = mongoose.model("Threads", ThreadsSchema);
var Notification = mongoose.model("Notification", notificationSchema);
var Subscription = mongoose.model("Subscription", subscriptionSchema);


//xxxxxxxxxxxxxxxxxx Global Variabls xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
/*
//These values are depended on who is currently logged into the session and who
// created the post. Currently they are static variables but that will change soon depending on 
//implementation decisions.
*/
var currentSessionUser = "Matt";
var postCreator = "Liz";
var currentThreadId = "";

//checks the userid and threadid for post

checkSubscription();

//This Function checks in the database to see if the user that created the post is subscribed to Appraisal Notifications
function checkSubscription()
{
    
	var getUserSub = Subscription.find(
	{
		 'User_id':{ $in:[
			postCreator
		]
			
		}
			
		
	},function(err,docs)
	{
		
		var notificationOn = docs[0].Appraisal;
		var value = JSON.stringify(notificationOn);
		if(value == 'true')
		{
			Queries();
					
		}else
		{
			console.log("Not subscribed for appraisal notifications");
		}
      
	
	});


}


//This Function checks in the database for the email address of the post creator to send them an email
function getEmailToSendTo()
{
    
	var getEmail = Users.find(
	{
		 'User_id':{ $in:[
			postCreator
		]
			
		}
			
		
	},function(err,docs)
	{
		
		 destinedEmail = JSON.stringify(docs[0].PreferredEmail);
		 
		
	});


}


//This Function checks in the database for Notifications saved and emailes them to the intended receipient
function Queries()
{				
   
     var getNotification = Notification.find(
	{
		'User_id':{ $in:[
			currentSessionUser
		]
			
		}, 'Read':{ $in:[
			false
		]
			
		}, 'Type':{ $in:[
			'Appraisal'
		]
			
		}
	},function(err,docs)
	{
		 userWhoAppraised = JSON.stringify(docs[0].User_id);
		 typeOfAppraise = JSON.stringify(docs[0].Context);
		 getEmailToSendTo();
		
	});
						
}



//Code needed to send the email. Im aware its duplicated but its just for testing purposes, otherwise it will be modularized.
app.post('/', function (req, res) {
    res.sendfile('test.html');
});

app.post('/appraisal', function (req, res) {
    var appraisal = req.body.appraisal;
   
    var options = {
        from: 'Buzz No Reply <DiscussionThree@gmail.com>',
        to : destinedEmail,                        //Change this to the email addess you want to receive the email. This will eventually be the user's email.
        Subject: "New Buzz Appraisal Notification",
        plain: "New Buzz Appraisal Notification",
        html: userWhoAppraised +" has given your post this appraisal:  " + typeOfAppraise
    }

    var str = JSON.stringify(options); 
	res.sendfile('test.html');
    send(str);
});

app.post('/notify', function (req, res) {

    var options = {
        from: 'Buzz No Reply <DiscussionThree@gmail.com>',
        to : "u12207871@tuks.co.za",
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

    var options = {
    	sendRequest: sendNotification,
    	thread: threadName
    }

    var str = JSON.stringify(options);
        res.sendfile('test.html');
    console.log(str);
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

