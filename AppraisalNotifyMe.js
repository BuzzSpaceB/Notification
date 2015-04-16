/**
 * Appraisal core functionality
 * Author: Liz Joseph
 * Group: NotificationB
 */

/********************************************************
 * Function intended to add the AppraisalNotifyMe for a particular user to the database (i.e. create a new notification for appraisal)
 * Checks whether a user is subscribed to receive an appraisal and adds the new notification to the database and sends the email.
 */

var send = require('./Email.js');
/*
var express = require('express'),
    app = express();
var schedule = require('node-schedule');
var unitTesting = require('nodeunit'); //for unit testing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
var http = require('http'), fs = require('fs');
*/
var userWhoAppraised, typeOfAppraise, destinedEmail;
var postCreator,currentSessionUser,appraisedThread_id,myAppraisalType;
var request, response;
var details;

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/db"); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
});

var Users = require('./DatabaseStuff/models/user.js');
var Threads = require('./DatabaseStuff/models/thread.js');
var Notification = require('./DatabaseStuff/models/notification.js');
var Subscription = require('./DatabaseStuff/models/user_subscription_settings_schema.js');

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

function addAppraisalToDB(details)
{
	Subscription.findOne(
	{
		'user_id':details.post_user_id

	},function(err,docs)
	{
		var instant = docs.InstantEmail;
		instant = true;
		if(instant == true)
		{
            console.log("instant");
            checkSubscription(details);
			addNewNotification(true,details);
		}else
		{
			console.log("daily notifications");
			addNewNotification(false, details);
		}
      
	});
}

//This is so that the method is globally accessable.
module.exports.addAppraisalToDB = addAppraisalToDB;

//xxxxxxxxxxxxxxxxxxxxxx
function addNewNotification(readVariable,details)
{
	//details = obj;

	newNotif = new Notification(
				{notification_id: "appraiseNotif",
				thread_id: details.appraisedThread_id,
				user_id: details.post_user_id,
				date_time: new Date(),
				type: "Appraisal",
                content: details.current_user_id+" has given your post this appraisal: " + details.appraisalType,
				read: false});

				newNotif.save(function(err,newNotif)
				{
					if (err) 
					{
						success = false;
						console.log("Error Adding Notification ");
					}
					else 
					{
						success = true;
					}
                    //mongoose.disconnect();
				});
}

//This Function checks in the database to see if the user that created the post is subscribed to Appraisal Notifications
function checkSubscription(obj)
{

	var getUserSub = Subscription.find(
	{
		user_id:obj.post_user_id
		
	},function(err,docs)
	{
		
		var notificationOn = docs[0].Appraisal;
		
		var value = JSON.stringify(notificationOn);
		if(value == 'true')
		{
		
			getEmailToSendTo(obj);
					
		}else
		{
			console.log("Not subscribed for appraisal notifications");
		}
      });
}


//This Function checks in the database for the email address of the post creator to send them an email

function getEmailToSendTo(user)
{  
	var getEmail = Users.find(
	{
		 'user_id':{ $in:[
			user.post_user_id
		]}		
	},function(err,docs)
	{
		
		destinedEmail = docs[0].preffered_email;
		console.log(destinedEmail);
		sendEmail(destinedEmail, user);  
		
	});
}


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function sendEmail(destinedEmail, obj)
{
				details =obj;
				var user = JSON.stringify(details.post_user_id);
				var type = JSON.stringify(details.appraisalType);
	
	
				var options = {
					from: 'Buzz No Reply <DiscussionThree@gmail.com>',
					to : destinedEmail,                        
					subject: "New Buzz Appraisal Notification",
					plain: "New Buzz Appraisal Notification",
					html: user +" has given your post this appraisal:  " + type
				}
				
				if(destinedEmail!='undefined')
				{
					var str = JSON.stringify(options); 
					send(str);
					
				}
				
}

/*

//Code needed to send the email. Im aware its duplicated but its just for testing purposes, otherwise it will be modularized.
//Gets the specific action and opens the html page

app.post('/appraisal', function (req, res) {

	myAppraisalType = req.body.appraisal; //this needs to be sent as an object
	
	var obj = {
    current_user_id: 'u11008602', //currentSessionUser
	post_user_id: 'u10075268', //postCreator
	appraisedThread_id: 'c2', //appraisedThread_id
	appraisalType: myAppraisalType};

	addAppraisalToDB(obj);
	res.sendfile('test.html');
});

app.get('/', function (req, res) {

    res.sendfile('test.html');
});


//Listens to the port
app.listen(5000,'127.0.0.1',function(){
 
    console.log('Server is running.');
});

*/
