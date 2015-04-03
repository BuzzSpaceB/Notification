var send = require('./Email.js');
var express = require('express'),
    app = express();
var schedule = require('node-schedule');
var unitTesting = require('nodeunit'); //for unit testing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
var http = require('http'), fs = require('fs');
var userWhoAppraised, typeOfAppraise, destinedEmail;
var postCreator,currentSessionUser,appraisedThread_id,myAppraisalType;
var request, response;

var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.21.137:27017/db'); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	
});


	
//xxxxxxxxxxxxxxxxxxxxxxxMongoose Schemas needed xxxxxxxxxxxxxxxxxxxxxxxxxx//
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
	User_id: String, //user who owns the post
	TimeAndDate: Date,
	Type: String,
	Context: String, // Add User who made the appraisail to the context (i.e. Matt has liked your post)
	Read: Boolean
});

var UserSubscriptionSettingsSchema = mongoose.Schema (
{
	User_id: String,
	Deletion: Boolean,
	Appraisal: Boolean,
	InstantEmail: Boolean,
	DailyEmail: Boolean
});

var subscriptionSchema = mongoose.Schema (
{
	User_id: String,
	registeredTo: [String],
	Thread_id: String
});
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//xxxxxxxxxxxxxxxxxx Variables needed to access the dataxxxxxxxxxxxxxxx//
var Users = mongoose.model("Users", UsersSchema);
var Threads = mongoose.model("Threads", ThreadsSchema);
var Notification = mongoose.model("Notification", notificationSchema);
var Subscription = mongoose.model("SubscriptionSetting", UserSubscriptionSettingsSchema);
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//Sample creation of the data needed for function to work
var obj = {
    current_user_id: 'Matt',
	post_user_id: 'Liz',
	appraisedThread_id: 'c2'
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//xxxxxxxxxxxxxxxxxx Global Variabls xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
//Pass through object that has both the id of the person that appraised the post
//the user_id of the person that that created the thread

 var a = JSON.stringify(obj.current_user_id);
 var b = JSON.stringify(obj.post_user_id);
 var c = JSON.stringify(obj.post_user_id);
 
 //currently the objects are hard coded
 currentSessionUser = 'Matt';
 postCreator = 'Liz';
 appraisedThread_id = 'c2';
 

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//


function addAppraisalToDB()
{


	var getUserSub = Subscription.find(
	{
		'User_id':postCreator
	
		
	},function(err,docs)
	{
		var instant = docs[0].InstantEmail;
		instant='true';
		if(instant == 'true')
		{
			addNewNotification(true);//sends true because email is sent immediately
			checkSubscription();
			
			
			
		}else
		{
			console.log("The email will be sent later");
			//add to database
				addNewNotification(false); //sends through false email is sent at specific time
		}
      
	});
}

//xxxxxxxxxxxxxxxxxxxxxx
function addNewNotification(readVariable)
{


	var newNotif = new Notification(
				{
					Notification_id: "new1",
					Thread_id: appraisedThread_id,
					User_id: postCreator,
					TimeAndDate: new Date(),
					Type: "Appraisal",
					Context: myAppraisalType,
					Read: readVariable
				});
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
				});

}

//This Function checks in the database to see if the user that created the post is subscribed to Appraisal Notifications
function checkSubscription()
{
	
	var getUserSub = Subscription.find(
	{
		'User_id':postCreator
		
			
		
	},function(err,docs)
	{
		var notificationOn = docs[0].Appraisal;
		var value = JSON.stringify(notificationOn);
		if(value == 'true')
		{
		
			getEmailToSendTo();
					
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
		sendEmail();  //this will call Matts Function email. So it can be taken out as a function
		
	});


}


//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function sendEmail()
{
			
				var options = {
					from: 'Buzz No Reply <DiscussionThree@gmail.com>',
					to : destinedEmail,                        //Change this to the email addess you want to receive the email. This will eventually be the user's email.
					Subject: "New Buzz Appraisal Notification",
					plain: "New Buzz Appraisal Notification",
					html: currentSessionUser +" has given your post this appraisal:  " + myAppraisalType
				}
				
				if(destinedEmail!='undefined')
				{
					var str = JSON.stringify(options); 
					response.sendfile('test.html');
					send(str);
				}
				
}


//Code needed to send the email. Im aware its duplicated but its just for testing purposes, otherwise it will be modularized.
//Gets the specific action and opens the html page

app.post('/appraisal', function (req, res) {

addAppraisalToDB();
request = req;
response = res;
myAppraisalType = request.body.appraisal;
	
res.sendfile('test.html');
});

app.get('/', function (req, res) {

    res.sendfile('test.html');
});


//Listens to the port
app.listen(5000,'127.0.0.1',function(){
 
    console.log('Server is running.');
});

