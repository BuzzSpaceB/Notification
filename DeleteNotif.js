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

//variable to store required info
var userList = [];
var parentThread;

//actual function
module.exports = function deleteNotification(obj) {
	var details = JSON.parse(obj);

	userList = [];

	console.log(details);

	if (details.sendRequest === 'true') {
		console.log('Start of delete notificaiotn creation');

		getUserList(details.thread);	

		// console.log(userList);
	} else {
		console.log('Delete Notification not requested');
	}
}

//helper functions
function getUserList(thread) {
	console.log('Getting user list for ' + thread);

	var getSubList = subscriptionModel.find(
	{
		'Thread_id':{ $in:[
			thread
		]}
	}, function(err, docs)
	{
		// console.log(docs);

		for (var i in docs) {
			var doc = docs[i];
			// console.log(doc);

			userList.push(doc.User_id);
		}

		console.log(userList);

		if (thread !== 'root') {
			// getParentThread(thread);
			// getUserList(parentThread);
		}
	});
}

function getParentThread(thread) {
	console.log('Getting parent for ' + thread);

	var getParentThreadID = threadsModel.find(
	{
		'Thread_id':{ $in:[
			thread
		]}
	}, function(err, docs)
	{
		// console.log(docs);

		parentThread = docs[0].Parent_id;

		console.log(parentThread);
	});
}