// FROM HERE Not Required, used for testing purposes only
var send = require('./Email.js');
var schedule = require('node-schedule');
/*var mongoose = require('mongoose');
	, ds = require('DatabaseStuff');

ds.init(mongoose);//this line is very important;
/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.21.137:27017/db'); // connect to database
mongoose.connect("mongodb://d3user:DdJXhhsd2@proximus.modulusmongo.net:27017/purYv9ib");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
});*/

//Models required (old requirements)
/*var user = require('./models/user.js');
var threadsModel = require('./models/thread.js');
var notificationModel = require('./models/notification.js');
var subscriptionModel = require('./models/subscription.js');
var UserSubscriptionSettingsModel = require('./models/user_subscription_settings_schema.js');

*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db'); // connect to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
});

var Notification = require('./DatabaseStuff/models/notification.js');
var UserSubscriptionSettingsModel = require('./DatabaseStuff/models/user_subscription_settings_schema.js');
var userModel = require('./DatabaseStuff/models/user.js');
//CheckDB(); //USED for testing purposes (Send the email now rather than wait for midnight)
//*******************************************************************************************TO HERE
//****DEMO ONLY****************/
module.exports = function DoAction()
{
	CheckDB();
	console.log("Done");
}
//************************************TO HERE
var options = new Array();
var emailCount = 0;
function CheckDB()
{
	
	var notifs = Notification.find({read: false},function(err,docs)
	{
		
		for(var i=0;i<docs.length;i++)
		{
			var users = userModel.find({user_id:docs[i].user_id},function(err,docs2)
			{
				var subs = UserSubscriptionSettingsModel.find({user_id:docs[i].user_id, DailyEmail:true},function(err,docs1)
				{
					options[emailCount] = 
					{
						from: 'Buzz No Reply <DiscussionThree@gmail.com>',
						to : docs2[0].preffered_email,//docs[emailCount].user_id+"@tuks.co.za",               //Change this to the LDAP Email if possible
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
			});
		}
		for(var i = 0;i<options.length;i++)
		{
			
		}
		
	});
	//mongoose.disconnect();
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
	mongoose.connect('mongodb://localhost:27017/db');
    console.log('I Logged at Midnight' + new Date());
	CheckDB();
});
