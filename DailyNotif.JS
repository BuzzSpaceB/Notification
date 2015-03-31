var send = require('./Email.js');
var express = require('express'),
    app = express();
var schedule = require('node-schedule');
var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.59.172:27017/db'); // connect to database

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

var Notification = mongoose.model('Notification', notificationSchema);
CheckDB();
function CheckDB()
{
	var notifs = Notification.find(
	{
		'Read':{ $in:[
			false
		]
			
		}
	},function(err,docs)
	{
		console.log(docs);
	});
	console.log(notifs);
	var options = {
        from: 'Buzz No Reply <DiscussionThree@gmail.com>',
        to : "matty.gouws@gmail.com",                        //Change this to the email addess you want to receive the email. This will eventually be the user's email.
        Subject: "New Daily Notification",
        plain: "You have the following Notifications: ",
        html: "You have the following Notifications: "
    }
	var str = JSON.stringify(options);
   // send(str);
}


var rule = new schedule.RecurrenceRule();
rule.hour = 00;
rule.minute = 00;
console.log(new Date());
var j = schedule.scheduleJob(rule, function()
{
    console.log('I Logger at Midnight' + new Date());
});