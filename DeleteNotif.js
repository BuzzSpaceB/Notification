var send = require('./Email.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.21.137:27017/db'); // connect to database
// mongoose.connect("mongodb://d3user:DdJXhhsd2@proximus.modulusmongo.net:27017/purYv9ib");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
});

//Schemas required
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

//Models required
var userModel = mongoose.model("Users", UsersSchema);
var threadsModel = mongoose.model("Threads", ThreadsSchema);
var notificationModel = mongoose.model("Notification", notificationSchema);
var subscriptionModel = mongoose.model("Subscription", subscriptionSchema);
var UserSubscriptionSettingsModel = mongoose.model("SubscriptionSetting", UserSubscriptionSettingsSchema);

//global variable to store required info
var userList = [];
var parentThread;
var currentSessionUser = "Andre"; //Varibale for storing the current logged in user
var details; //Stores the data for the recieved obj after it has been parsed
var owner = 'Andre'; //Owner of the deleted thread
var reachedRoot = false; //Check to see if the root node has been reached 

//actual function
module.exports = function deleteNotification(obj) {
	//Reset variables for each call to the function
	details = JSON.parse(obj);
	userList = [];
	reachedRoot = false;

	// console.log(details);

	if (details.sendRequest === 'true') {
		console.log('Start of Delete Notification creation');

		// threadsModel.find({thread_id: details.thread}, function(err, docs)
		// {
		// 	owner = docs[0].user_id;
		// });

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

				//Add the notification to the notification db for daily mail use
				addNewNotification(user);
			}
		}
		else {
			subscriptionModel.find({Thread_id: thread}, function(err, docs)
			{
				if (err) {
					console.log(err);
					throw err;
				}
				else 
				{
					for (var i in docs) {
						var doc = docs[i];

						if (userList.indexOf(doc.user_id) < 0) {
							UserSubscriptionSettingsModel.find({User_id: doc.User_id}, function(err, docs)
							{
								if (docs[0].Deletion === true) {
									userList.push(docs[0].User_id);
								}
							});
						}
					}

					threadsModel.find({Thread_id: thread}, function(err, docs)
					{
						parentThread = docs[0].Parent_id;

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
		Notification_id: "deletionNotification", //Needs to be made auto incremented
		Thread_id: details.thread,
		User_id: user,
		TimeAndDate: new Date(),
		Type: "Deletion",
		Context: currentSessionUser + " has deleted a post by " + owner + " for the following reason: " + details.reason,
		Read: false
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