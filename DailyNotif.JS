var send = require('./Email.js');
var express = require('express'),
    app = express();
var schedule = require('node-schedule');
var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.59.90:27017/db'); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
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

var UsersSchema = mongoose.Schema(
{
	User_id: String,
	PreferredEmail: String
});

var userModel = mongoose.model("Users", UsersSchema);
var Notification = mongoose.model('Notification', notificationSchema);
CheckDB();
var options = new Array();
function CheckDB()
{
	
	var notifs = Notification.find({Read: false},function(err,docs)
	{
		
		for(var i=0;i<docs.length;i++)
		{
			console.log(i+": "+docs[i].User_id);
			var curr = docs[i].User_id;
			var inList = false;
			for(var j = 0; j < options.length;j++)
			{
				if(curr == options[j].to)
				{
					options[j].plain+="\n" + docs[i].TimeAndDate + " " + docs[i].Type + " "  + docs[i].Context;
					options[j].html+="<br>" + docs[i].TimeAndDate + " <b>" + docs[i].Type + "</b> "  + docs[i].Context
					inList = true;
				}
			}
			if(!inList)
			{
				options[i] = 
				{
					from: 'Buzz No Reply <DiscussionThree@gmail.com>',
					to : docs[i].User_id,                        //Change this to the email addess you want to receive the email. This will eventually be the user's email.
					Subject: "New Daily Notification",
					plain: "You have the following unread Notifications: \n" + docs[i].TimeAndDate + " " + docs[i].Type + " "  + docs[i].Context,
					html: "You have the following <b>unread</b> Notifications: <br>" + docs[i].TimeAndDate + " <b>" + docs[i].Type + "</b> "  + docs[i].Context
				}
			}
		}
		for(var i = 0;i<options.length;i++ )
		{
			var users = userModel.find({User_id:options[i].to},function(err,docs)
				{
					console.log("User: " + docs[0].User_id + " EMAIL: " + docs[0].PreferredEmail);
					console.log(JSON.stringify(options[i])); //********************************************************HERE the problem lies
					options[i].to = docs[0].PreferredEmail;
				});
		}
		
	});
}


var rule = new schedule.RecurrenceRule();
rule.hour = 00;
rule.minute = 00;
console.log(new Date());
var j = schedule.scheduleJob(rule, function()
{
    console.log('I Logger at Midnight' + new Date());
});
