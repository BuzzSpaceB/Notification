var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.69.254:27017/db'); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
});


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

var userModel = mongoose.model("Users", UsersSchema);
var threadsModel = mongoose.model("Threads", ThreadsSchema);
var notificationModel = mongoose.model("Notification", notificationSchema);
var subscriptionModel = mongoose.model("Subscription", subscriptionSchema);
var UserSubscriptionSettingsModel = mongoose.model("SubscriptionSetting", UserSubscriptionSettingsSchema);

console.log(add());
function add()
{
	var success = true;
/****************************************************ADDING TEST USER DATA************************************************************************************/
	var newUser = new userModel(
	{
		User_id: "Matt",
		PreferredEmail: "matty.gouws@gmail.com"
	});
	newUser.save(function(err,newUser)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Matt User");
		}
		else 
		{
			success = true;
		}
	});
	newUser = new userModel(
	{
		User_id: "Liz",
		PreferredEmail: "lizjoseph@tuks.co.za"
	});
	newUser.save(function(err,newUser)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Liz User");
		}
		else 
		{
			success = true;
		}
	});
	newUser = new userModel(
	{
		User_id: "Andre",
		PreferredEmail: "andcalitz@gmail.com"
	});
	newUser.save(function(err,newUser)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Andre User");
		} 	
		else 
		{	
			success = true;
		}
	});
	newUser = new userModel(
	{
		User_id: "Izak",
		PreferredEmail: "u13126777@tuks.co.za"
	});
	newUser.save(function(err,newUser)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Izak User");
		}
		else 
		{
			success = true;
		}
	});
	newUser = new userModel(
	{
		User_id: "Xoliswa",
		PreferredEmail: "x.ntshingila@gmail.com"
	});
	newUser.save(function(err,newUser)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Xoliswa User");
		}
		else 
		{
			success = true;
		}
	});
/***************************************************************************************************************************************************************/
/****************************************************ADDING TEST THREAD DATA************************************************************************************/
	var newThread = new threadsModel(
	{
		Thread_id: "root",
		Parent_id: null,
		user_id: "Matt"
	});
	newThread.save(function(err,newThread)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Root Thread");
		}
		else 
		{
			success = true;
		}
	});
	newThread = new threadsModel(
	{
		Thread_id: "a1",
		Parent_id: "root",
		user_id: "Xoliswa"
	});
	newThread.save(function(err,newThread)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding a1 Thread");
		}
		else 
		{
			success = true;
		}
	});
	newThread = new threadsModel(
	{
		Thread_id: "a2",
		Parent_id: "a1",
		user_id: "Izak"
	});
	newThread.save(function(err,newThread)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding a2 Thread");
		}
		else 
		{
			success = true;
		}
	});
	newThread = new threadsModel(
	{
		Thread_id: "b1",
		Parent_id: "root",
		user_id: "Andre"
	});
	newThread.save(function(err,newThread)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding b1 Thread");
		}
		else 
		{
			success = true;
		}
	});
	newThread = new threadsModel(
	{
		Thread_id: "b2",
		Parent_id: "b1",
		user_id: "Matt"
	});
	newThread.save(function(err,newThread)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding b2 Thread");
		}
		else 
		{	
			success = true;
		}
	});
	newThread = new threadsModel(
	{
		Thread_id: "c2",
		Parent_id: "b1",
		user_id: "Liz"
	});
	newThread.save(function(err,newThread)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding c2 Thread");
		}
		else 
		{
			success = true;
		}
	});
	newThread = new threadsModel(
	{
		Thread_id: "b3",
		Parent_id: "b2",
		user_id: "Liz"
	});
	newThread.save(function(err,newThread)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding b3 Thread");
		}
		else 
		{
			success = true;
		}
	});
/********************************************************************************************************************************************************************/
/****************************************************ADDING TEST SUBSCRIPTION DATA************************************************************************************/
	var newSubscription = new subscriptionModel(
	{
		User_id: "Matt",
		registeredTo: ["All"],
		Thread_id: "root"
	});
	newSubscription.save(function (err, newSubscription) 
	{
		if (err) 
		{ 
			success = false;
			console.log("Error Adding Matt Subscription");
		}
		else 
		{
			success = true;
		}
	});
	newSubscription = new subscriptionModel(
	{
		User_id: "Izak",
		registeredTo: ["Liz"],
		Thread_id: "root"
	});
	newSubscription.save(function (err, newSubscription) 
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Izak Subscription");
		}
		else 
		{
			success = true;
		}
	});
	newSubscription = new subscriptionModel(
	{
		User_id: "Andre",
		registeredTo: ["Liz","Izak"],
		Thread_id: "b1"
	});
	newSubscription.save(function (err, newSubscription) 
	{
		if (err) 
		{	
			success = false;
			console.log("Error Adding Andre Subscription");
		}
		else 
		{
			success = true;
		}
	});
	newSubscription = new subscriptionModel(
	{
		User_id: "Liz",
		registeredTo: ["Andre","Izak"],
		Thread_id: "c2"
	});
	newSubscription.save(function (err, newSubscription) 
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Liz Subscription");
		}
		else 
		{
			success = true;
		}
	});
	newSubscription = new subscriptionModel(
	{
		User_id: "Xoliswa",
		registeredTo: ["Andre","Izak","Matt"],
		Thread_id: "root"
	});
	newSubscription.save(function (err, newSubscription) 
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Xoliswa Subscription");
		}
		else 
		{
			success = true;
		}
	});
/********************************************************************************************************************************************************************/
/****************************************************ADDING TEST SUBSCRIPTION Settings************************************************************************************/
	var newSubscriptionSetting = new UserSubscriptionSettingsModel(
	{
		User_id: "Matt",
		Deletion: false,
		Appraisal: true,
		InstantEmail: false,
		DailyEmail: true
	});
	newSubscriptionSetting.save(function (err, newSubscriptionSetting) 
	{
		if (err) 
		{ 
			success = false;
			console.log("Error Adding Matt Subscription Setting");
		}
		else 
		{
			success = true;
		}
	});
	newSubscriptionSetting = new UserSubscriptionSettingsModel(
	{
		User_id: "Izak",
		Deletion: false,
		Appraisal: true,
		InstantEmail: false,
		DailyEmail: true
	});
	newSubscriptionSetting.save(function (err, newSubscriptionSetting) 
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Izak Subscription Setting");
		}
		else 
		{
			success = true;
		}
	});
	newSubscriptionSetting = new UserSubscriptionSettingsModel(
	{
		User_id: "Andre",
		Deletion: false,
		Appraisal: true,
		InstantEmail: false,
		DailyEmail: true
	});
	newSubscriptionSetting.save(function (err, newSubscriptionSetting) 
	{
		if (err) 
		{	
			success = false;
			console.log("Error Adding Andre Subscription Setting");
		}
		else 
		{
			success = true;
		}
	});
	newSubscriptionSetting = new UserSubscriptionSettingsModel(
	{
		User_id: "Liz",
		Deletion: false,
		Appraisal: true,
		InstantEmail: false,
		DailyEmail: true
	});
	newSubscriptionSetting.save(function (err, newSubscriptionSetting) 
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Liz Subscription Setting");
		}
		else 
		{
			success = true;
		}
	});
	newSubscriptionSetting = new UserSubscriptionSettingsModel(
	{
		User_id: "Xoliswa",
		Deletion: false,
		Appraisal: true,
		InstantEmail: false,
		DailyEmail: true
	});
	newSubscriptionSetting.save(function (err, newSubscriptionSetting) 
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Xoliswa Subscription Setting");
		}
		else 
		{
			success = true;
		}
	});
/********************************************************************************************************************************************************************/
/****************************************************ADDING TEST NOTIFICATION DATA************************************************************************************/
	var newNotif = new notificationModel(
	{
		Notification_id: "Notif1",
		Thread_id: "a2",
		User_id: "Matt",
		TimeAndDate: new Date(),
		Type: "Appraisal",
		Context: "Like",
		Read: false
	});
	newNotif.save(function(err,newNotif)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Notification 1");
		}
		else 
		{
			success = true;
		}
	});
	var newNotif = new notificationModel(
	{
		Notification_id: "Notif2",
		Thread_id: "a2",
		User_id: "Liz",
		TimeAndDate: new Date(),
		Type: "New Post",
		Context: "",
		Read: false
	});
	newNotif.save(function(err,newNotif)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Notification 2");
		}
		else 
		{
			success = true;
		}
	});
	var newNotif = new notificationModel(
	{
		Notification_id: "Notif3",
		Thread_id: "c1",
		User_id: "Andre",
		TimeAndDate: new Date(),
		Type: "Delete",
		Context: "",
		Read: false
	});
	newNotif.save(function(err,newNotif)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Notification 3");
		}
		else 
		{
			success = true;
		}
	});
	var newNotif = new notificationModel(
	{
		Notification_id: "Notif4",
		Thread_id: "a1",
		User_id: "Izak",
		TimeAndDate: new Date(),
		Type: "Appraisal",
		Context: "Funny",
		Read: false
	});
	newNotif.save(function(err,newNotif)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Notification 4");
		}
		else 
		{
			success = true;
		}
	});
	var newNotif = new notificationModel(
	{
		Notification_id: "Notif5",
		Thread_id: "root",
		User_id: "Izak",
		TimeAndDate: new Date(),
		Type: "new Post",
		Context: "",
		Read: false
	});
	newNotif.save(function(err,newNotif)
	{
		if (err) 
		{
			success = false;
			console.log("Error Adding Notification 5");
		}
		else 
		{
			success = true;
		}
	});
/********************************************************************************************************************************************************************/
	if (success) 
	{
		return "Test data added successfully";
	}
	else 
	{
		return "Error: Could not add test data";
	}
}