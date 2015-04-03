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

//Schemas required
var subscriptionSchema = mongoose.Schema (
{
	User_id: String,
	registeredTo: [String],
	Thread_id: String
});

var subscriptionSchema = mongoose.Schema({
	User_id: String,
	registeredTo: [String],
	Thread_id: String
});

var ThreadSchema = new mongoose.Schema({
	thread_id       : String, 					/*PK*/
	parent_thread_id: String,				    /*FK, Parent of the thread*/
	user_id         : String,				    /*FK, Each Thread has one author*/
	num_children    : Number,                   /* The number of children the Thread has */
	closed          : Boolean,                  /* Flag to show thread is closed */
	hidden          : Boolean,                  /* Flag to show thread is hidden */
	level           : Number,                    /* Shows on which level the thread is currently at */
	post_id         : String                    /* The post that is connected to the thread */
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

var NotificationSchema = mongoose.Schema({
	notification_id             : String,            /* PK */
	thread_id                   : String,           /* Notifications relate to a specific thread */
	user_id                     : String,           /* A notification will be sent to a specific user */
	date_time                   : Date,             /* A notification will show its date and time */
	type                        : String,           /* Each notification has a type, like Delete, New Post etc. */
	content                     : String,           /* The actual notification text */
	read                        : Boolean           /* Flag to show notification has been read */
});

//Models required
var user = mongoose.model("Users", UserSchema);
var threadsModel = mongoose.model("Threads",ThreadSchema);
var notificationModel = mongoose.model("Notification", NotificationSchema);
var subscriptionModel = mongoose.model("Subscription", subscriptionSchema);
var UserSubscriptionSettingsModel = mongoose.model("SubscriptionSetting", UserSubscriptionSettingsSchema);

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
	details = JSON.parse(obj);
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
				// addNewNotification(user);
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
					console.log(docs);

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