var send = require('./Email.js');

//Initialize database stuff (old requirements)
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db'); // connect to database
// mongoose.connect("mongodb://d3user:DdJXhhsd2@proximus.modulusmongo.net:27017/purYv9ib");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
});

//Models required (old requirements)
var user = require('./DatabaseStuff/models/user.js');
var threadsModel = require('./DatabaseStuff/models/thread.js');
var notificationModel = require('./DatabaseStuff/models/notification.js');
var subscriptionModel = require('./DatabaseStuff/models/subscription.js');
var UserSubscriptionSettingsModel = require('./DatabaseStuff/models/user_subscription_settings_schema.js');

//Initialize database stuff (latest requirements)
/*var mongoose = require('mongoose');
var ds = require('DatabaseStuff');

ds.init(mongoose);*/

//Models required (latest requirements)
/*var user = ds.models.user;
var threadsModel = ds.models.thread;
var notificationModel = ds.models.notification;
var subscriptionModel = ds.models.subscription;
var UserSubscriptionSettingsModel = ds.models.user_subscription_settings_schema;*/

//global variable to store required info
var userList = [];
var parentThread;
var currentSessionUser = "13020006"; //Varibale for storing the current logged in user, can be passed in via the JSON string
var details; //Stores the data for the recieved obj after it has been parsed
var owner = 'Andre'; //Owner of the deleted thread, can be updated form the db
var reachedRoot = false; //Check to see if the root node has been reached 

//actual function
function deleteNotification(obj) {
	//Reset variables for each call to the function
	// details = obj;
	details = JSON.parse(obj)
	userList = [];
	reachedRoot = false;

	// console.log(details);

	if (details.sendRequest === 'true') {
		console.log('Start of Delete Notification creation');

		threadsModel.find({thread_id: details.thread}, function(err, docs)
		{
			owner = docs[0].user_id;
		});

		getUserList(details.thread);
	} else {
		console.log('Delete Notification not requested');
	}
};

module.exports.deleteNotification = deleteNotification;

//helper functions
function getUserList(thread, reachedRoot) {
	if (thread) {
		if (reachedRoot === true) {
			console.log('Done traversing with final user list:');
			console.log(userList);

			//Send email to each user in the user list
			for (var i in userList) {
				var user = userList[i];

				UserSubscriptionSettingsModel.find({user_id: user}, function(err, docs)
				{
					//Check to see if user is suscribed to instant emails and if so send an email
					if (docs[0].InstantEmail === true) {
						console.log(user + " has requested instant email");

						var options = {
							from: 'Buzz No Reply <DiscussionThree@gmail.com>',
							// to : user + "@tuks.co.za", //Hack incase of lack of get email function
							to : docs[0].preffered_email, //Send the email using the preffered email from the database
							Subject: "New Deletion Notification",
							plain: "New Buzz Space Deletion Notification" + currentSessionUser + " has deleted a post by " + owner + " for the following reason: " + details.reason,
							html: "New Buzz Space Deletion Notification <br>" + currentSessionUser + " has deleted a post by " + owner + " for the following reason: " + details.reason
						}

						var str = JSON.stringify(options);
						// send(str);
						console.log(str);
					}
				});

				//Adds the notification to the notifcation database so that it can used by DailyNotif.js
				// addNewNotification(user);
				console.log("Adding notification to db");
			}
		}
		else {
			subscriptionModel.find({thread_id: thread}, function(err, docs)
			{
				if (err) {
					console.log(err);
					throw err;
				}
				else 
				{
					// console.log(docs);

					for (var i in docs) {
						var doc = docs[i];

						// console.log(userList.indexOf(doc.user_id));
						if (userList.indexOf(doc.user_id) === -1) {
							UserSubscriptionSettingsModel.find({user_id: doc.user_id}, function(err, docs)
							{
								if (docs[0].Deletion === true) {
									if (userList.indexOf(doc.user_id) === -1) {
										userList.push(docs[0].user_id);
									}
								}
							});
						}
					}

					threadsModel.find({thread_id: thread}, function(err, docs)
					{
						parentThread = docs[0].parent_thread_id;

						if (parentThread !== null) {
							getUserList(parentThread, false);
						}
						else {
							getUserList(thread, true);
						}
					});
				}
			});
		}
	}
}

function addNewNotification(user)
{
	var newNotif = new notificationModel(
	{
		notification_id: "deletionNotification", //Needs to be made auto incremented
		thread_id: details.thread,
		user_id: user,
		date_time: new Date(),
		type: "Deletion",
		content: currentSessionUser + " has deleted a post by " + owner + " for the following reason: " + details.reason,
		read: false
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
