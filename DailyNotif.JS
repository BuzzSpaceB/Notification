// FROM HERE Not Required, used for testing purposes only
var send = require('./Email.js');
var express = require('express'),
    app = express();
var schedule = require('node-schedule');
var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.69.254:27017/db'); // connect to database

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

var UserSubscriptionSettingsSchema = mongoose.Schema (
{
	User_id: String,
	Deletion: Boolean,
	Appraisal: Boolean,
	InstantEmail: Boolean,
	DailyEmail: Boolean
});

var userModel = mongoose.model("Users", UsersSchema);
var Notification = mongoose.model('Notification', notificationSchema);
var UserSubscriptionSettingsModel = mongoose.model("SubscriptionSetting", UserSubscriptionSettingsSchema);
//CheckDB(); //USED for testing purposes (Send the email now rather than wait for midnight)
//*******************************************************************************************TO HERE
var options = new Array();
var emailCount = 0;
function CheckDB()
{
	
	var notifs = Notification.find({Read: false},function(err,docs)
	{
		
		for(var i=0;i<docs.length;i++)
		{

			var subs = UserSubscriptionSettingsModel.find({User_id:docs[i].User_id, DailyEmail:true},function(err,docs1)
			{
				options[emailCount] = 
				{
					from: 'Buzz No Reply <DiscussionThree@gmail.com>',
					to : docs[emailCount].User_id+"@tuks.co.za",               //Change this to the LDAP Email if possible
					subject: "New Daily Notification",
					plain: docs[emailCount].TimeAndDate + " " + docs[emailCount].Type + " "  + docs[emailCount].Context,
					html: docs[emailCount].TimeAndDate + " <b>" + docs[emailCount].Type + "</b> "  + docs[emailCount].Context
				};
				addEmail(JSON.stringify(options[emailCount]));
				emailCount++;
				if(emailCount == (docs.length))
				{
					addEmail("DONE");
				}
			});
			
		}
		
		for(var i = 0;i<options.length;i++)
		{
			
		}
		
	});
}
var toSend = new Array();
var count = 0;
function addEmail(mess)
{
	if(mess == "DONE")
	{
		for(var i = 0; i < count;i++)
		{
			for(var j = i+1;j<count;j++)
			{
				if(toSend[i].to == toSend[j].to)
				{
					toSend[i].plain += "\n" + toSend[j].plain;
					toSend[i].html += "<br>" + toSend[j].html;
					toSend[j].to = "";
					toSend[j].from = "";
					toSend[j].subject = "";
					toSend[j].plain = "";
					toSend[j].html = ""; // Remove the Duplicate
				}
				else
				{
					
				}
			}
		}
		for(var i=0; i < count;i++)
		{
			if(toSend[i].to != "")
			{
				console.log(i);
				toSend[i].plain = "You have the following unread Notifications: \n" + toSend[i].plain;
				toSend[i].html = "You have the following <b>unread</b> Notifications: <br>" + toSend[i].html;
				var str = JSON.stringify(toSend[i]);
				send(str);
			}	
		}
	}
	else
	{
		toSend[count] = JSON.parse(mess);
		count++;
	}
}
var rule = new schedule.RecurrenceRule();
rule.hour = 00;
rule.minute = 00;
console.log(new Date());
var j = schedule.scheduleJob(rule, function()
{
    console.log('I Logged at Midnight' + new Date());
	CheckDB();
});
