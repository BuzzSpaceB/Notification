var send = require('./Email.js');
var express = require('express'),
app = express();
var schedule = require('node-schedule');


/* Database connection */

//var mongoose = require('mongoose');/*
//	, ds = require('DatabaseStuff');*/

//ds.init(mongoose);//this line is very important
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/db"); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
});

/*Database access*/
var Threads = require('./DatabaseStuff/models/thread.js');
var Subscription = require('./DatabaseStuff/models/subscription.js');
var Notification = require('./DatabaseStuff/models/notification.js');
var Users = require('./DatabaseStuff/models/user.js');


/*Global variables*/
var callingThread;
var callingUser;
var callingUsername;
var userEmail;
var parent;
var list = [];

/*Function to be called, expects a thread id*/
/*
	var test= {
		thread = 'b1';
	}
*/

module.exports.standardNotification =standardNotification;
function standardNotification(obj) {
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
				AssignUsername(callingUser);
				GetSubscribers(docs[0].thread_id);
			}
		}
	});
}
/*Find the user's username...*/
function AssignUsername(user)
{
	Users.find({ user_id: user}, function(err, docs) 
	{
		if (err) 
		{
			throw err;			
		}
		else
		{	if(docs.length == 0)
			{
			//	console.log("User doesn't exist..")
			}
			else
			{	
				callingUsername = docs[0].username;
			}
		}
	});
}
function AssignUserEmail(user)
{
	Users.find({ user_id: user}, function(err, docs) 
	{
		if (err) 
		{
			throw err;			
		}
		else
		{	if(docs.length == 0)
			{
			//	console.log("User doesn't exist..")
			}
			else
			{	
				userEmail = docs[0].preffered_email;
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
			AssignUserEmail(list[i]);
			var options = {
					from: 'Buzz No Reply <DiscussionThree@gmail.com>',
					//to : list[i] + "@tuks.co.za",
					to : userEmail,
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
		content: callingUsername + " has commented on post." + "You are subscribed to " + callingUsername ,
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
