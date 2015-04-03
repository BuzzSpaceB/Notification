// FROM HERE Not Required, used for testing purposes only
var send = require('./Email.js');
var express = require('express'),
    app = express();
var schedule = require('node-schedule');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://197.88.21.137:27017/ServerCopy');
mongoose.connect("mongodb://d3user:DdJXhhsd2@proximus.modulusmongo.net:27017/purYv9ib");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
});

var NotificationSchema = mongoose.Schema({
    notification_id             : String,            /* PK */
    thread_id                   : String,           /* Notifications relate to a specific thread */
    user_id                     : String,           /* A notification will be sent to a specific user */
    date_time                   : Date,             /* A notification will show its date and time */
    type                        : String,           /* Each notification has a type, like Delete, New Post etc. */
    content                     : String,           /* The actual notification text */
    read                        : Boolean           /* Flag to show notification has been read */
});


var UserSchema = mongoose.Schema({
	user_id             : String,           /* PK, this is the user_id as in LDAP i.e student number */
    username            : String,           /* The user's preferred username, like first name */
    roles               : [{role_name : [String], module: [String]}],      /* Array of Roles & modules of the user as from LDAP */
    modules      		: [String],          /* Array of Modules that is active for the user */
	post_count			: Number
});

var UserSubscriptionSettingsSchema = mongoose.Schema (
{
	User_id: String,
	Deletion: Boolean,
	Appraisal: Boolean,
	InstantEmail: Boolean,
	DailyEmail: Boolean
});

var userModel = mongoose.model("Users", UserSchema);
var Notification = mongoose.model('Notification', NotificationSchema);
var UserSubscriptionSettingsModel = mongoose.model("SubscriptionSetting", UserSubscriptionSettingsSchema);
//CheckDB(); //USED for testing purposes (Send the email now rather than wait for midnight)
//*******************************************************************************************TO HERE
var options = new Array();
var emailCount = 0;
function CheckDB()
{
	
	var notifs = Notification.find({read: false},function(err,docs)
	{
		
		for(var i=0;i<docs.length;i++)
		{

			var subs = UserSubscriptionSettingsModel.find({User_id:docs[i].user_id, DailyEmail:true},function(err,docs1)
			{
				options[emailCount] = 
				{
					from: 'Buzz No Reply <DiscussionThree@gmail.com>',
					to : docs[emailCount].user_id+"@tuks.co.za",               //Change this to the LDAP Email if possible
					subject: "New Daily Notification",
					plain: docs[emailCount].date_time + " " + docs[emailCount].type + " "  + docs[emailCount].content,
					html: docs[emailCount].date_time + " <b>" + docs[emailCount].type + "</b> "  + docs[emailCount].content
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
