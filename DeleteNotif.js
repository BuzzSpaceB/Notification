var send = require('./Email.js');

var mongoose = require('mongoose');
// mongoose.connect('mongodb://197.88.21.137:27017/db'); // connect to database
mongoose.connect("mongodb://d3user:DdJXhhsd2@proximus.modulusmongo.net:27017/purYv9ib");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
});


//Models required
var user = require('./models/user.js');
var threadsModel = require('./models/thread.js');
var notificationModel = require('./models/notification.js');
var subscriptionModel = require('./models/subscription.js');
var UserSubscriptionSettingsModel = require('./models/user_subscription_settings_schema.js');

//global variable to store required info
var userList = [];
var parentThread;
var currentSessionUser = "13020006"; //Varibale for storing the current logged in user, can be passed in via the JSON string
var details; //Stores the data for the recieved obj after it has been parsed
var owner = 'Andre'; //Owner of the deleted thread, can be updated form the db
var reachedRoot = false; //Check to see if the root node has been reached 

//actual function
module.exports = function deleteNotification(obj) {
	//Reset variables for each call to the function
	details = obj;
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
}

//helper functions
function getUserList(thread, reachedRoot) {
	if (thread) {
		if (reachedRoot === true) {
			console.log('Reached root with user list:');
			console.log(userList);

			//Send email to each user in the user list
			for (var i in userList) {
				var user = userList[i];

				var options = {
					from: 'Buzz No Reply <DiscussionThree@gmail.com>',
					to : user + "@tuks.co.za",
					Subject: "New Deletion Notification",
					plain: "New Buzz Space Deletion Notification" + currentSessionUser + " has deleted a post by " + owner + " for the following reason: " + details.reason,
					html: "New Buzz Space Deletion Notification <br>" + currentSessionUser + " has deleted a post by " + owner + " for the following reason: " + details.reason
				}

				var str = JSON.stringify(options);
				// send(str);
				console.log(str);

				//Add the notification to the notification db for daily mail use
				addNewNotification(user);
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
					console.log(docs);

					for (var i in docs) {
						var doc = docs[i];

						if (userList.indexOf(doc.user_id) < 0) {
							UserSubscriptionSettingsModel.find({user_id: doc.user_id}, function(err, docs)
							{
								if (docs[0].Deletion === true) {
									userList.push(docs[0].user_id);
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
