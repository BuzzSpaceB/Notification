var send = require('./Email.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.21.137:27017/db'); // connect to database

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
var details;
var user;

//actual function
module.exports = function deleteNotification(obj) {
	details = JSON.parse(obj);
	userList = [];

	console.log(details);

	if (details.sendRequest === 'true') {
		console.log('Start of Delete Notification creation');

		// subscriptionModel.find({Thread_id: details.thread}, function(err, docs)
		// {
		// 	parentThread = docs[0].Parent_id;

		// 	getUserList(parentThread);
		// });

		getUserList(details.thread);
	} else {
		console.log('Delete Notification not requested');
	}
}

//helper functions
function getUserList(thread) {
	if (thread) {
		console.log('Getting user list for ' + thread);

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

					if (userList.indexOf(doc.User_id) < 0) {
						userList.push(doc.User_id);
					}
				}

				if (thread !== 'root') {
					threadsModel.find({Thread_id: thread}, function(err, docs)
					{
						parentThread = docs[0].Parent_id;

						getUserList(parentThread);
					});
				} else {
					console.log('Reached root');

					for (var i in userList) {
						var user = userList[i];

						console.log(user);

						var options = {
							from: 'Buzz No Reply <DiscussionThree@gmail.com>',
							to : "u13020006@tuks.co.za",
							Subject: "New Deletion Notification",
							plain: "New Buzz Space Deletion Notification" + currentSessionUser + " has delete the post by " + user + " for the following reason: " + details.reason,
							html: "New Buzz Space Deletion Notification <br>" + currentSessionUser + " has delete the post by " + user + " for the following reason: " + details.reason
						}

						var str = JSON.stringify(options);
						send(str);
					}
				}
			}
		});
	}
}