var send = require('./Email.js');
var express = require('express'),
app = express();
var schedule = require('node-schedule');


/* Database connection */
var mongoose = require('mongoose');
mongoose.connect("mongodb://d3user:DdJXhhsd2@proximus.modulusmongo.net:27017/purYv9ib");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
});


/*Database access*/
var Threads = require('./models/thread');
var Subscription = require('./models/subscription');
var Notification = require('./models/notification');

/*Global variables*/
var callingThread;
var callingUser;
var parent;
var list = [];

/*Function to be called, expects a thread id*/
/*
	var test= {
		thread = 'b1';
	}
*/
module.exports = function StandardNotification(obj) {
	//sender = JSON.parse(obj);
	sender = obj;
	Threads.find({ thread_id: sender.thread}, function(err, docs) 
	{
		if (err) 
		{
			throw err;			
		}
		else
		{	if(docs.length == 0)
			{
			//	console.log("Thread doesn't exist..")
			}
			else
			{	
				callingThread = docs[0].thread_id;
				callingUser = docs[0].user_id;
				GetSubscribers(docs[0].thread_id);
			}
		}
	});
}
function GetSubscribers(thread)
{
	Threads.find({ thread_id: thread}, function(err, docs) 
	{
		if (err) 
		{
			throw err;			
		}
		else
		{
			parent = docs[0].parent_thread_id;
			
		}
		
	if(parent == null)
	{
		notify();
	}
	else
	{

		Subscription.find({ thread_id: parent}, function(err, docs) 
		{
			if (err) 
			{
				throw err;
			}
			else
			{		 
				if(docs.length == 0)
				{
				 // console.log("No subscriptions..")
				}
				else
				{
					
					for (var i in docs)
					{
						var doc = docs[i];
						
						for(var k =0; k < doc.registeredTo.length; k++)
						{
							if(doc.registeredTo[k] == 'All')
							{
							
								if (list.indexOf(doc.user_id) < 0)
								list.push(doc.user_id)
							}
							if(doc.registeredTo[k] == callingUser)
							{
							
								if (list.indexOf(doc.user_id) < 0)
								list.push(doc.user_id);
							}
						}
					}
				}
			}	
		});
		GetSubscribers(parent);
	}
	});
}

function notify()
{
	
	if( list.length != 0)
	{
		for (var i in list) 
		{
			newNotification(list[i]);
			var options = {
					from: 'Buzz No Reply <DiscussionThree@gmail.com>',
					to : list[i] + "@tuks.co.za",
					Subject: "New Comment Notification",
					plain: "New Buzz Space Comment Notification " + callingUser + " has commented on a post. " + " You are subscribed to " + callingUser,
					html: "New Buzz Space Comment Notification <br> " +  callingUser + " has commented on a post. " + " You are subscribed to " + callingUser,
				}
			var message = JSON.stringify(options);
		//	console.log(message);
			send(message);
		}
	}
}

function newNotification(user)
{
	var notification = new Notification(
	{
		notification_id: "Comment Notification",
		thread_id: callingThread,
		user_id: user,
		date_time: new Date(),
		type: "Comment on thread.",
		content: callingUser + " has commented on post." + "You are subscribed to " + callingUser ,
		read: false
	});
	notification.save(function(err,notification)
	{
		if (err) 
		{
			success = false;
		//	console.log("Error Adding Notification ");
		}
		else 
		{
			success = true;
		}
	});
	//console.log(notification);
}
