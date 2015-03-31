var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.59.172:27017/db'); // connect to database

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
	User_id: String,
	TimeAndDate: Date,
	Type: String,
	Context: String,
	Read: Boolean
});

var subscriptionSchema = mongoose.Schema (
{
	User_id: String,
	registeredTo: [String],
	Thread_id: String,
	Deletion: Boolean,
	Appraisal: Boolean,
	InstantEmail: Boolean,
	DailyEmail: Boolean
});

var userModel = mongoose.model("Users", UsersSchema);
var threadsModel = mongoose.model("Threads", ThreadsSchema);
var notificationModel = mongoose.model("Notification", notificationSchema);
var subscriptionModel = mongoose.model("Subscription", subscriptionSchema);

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
		Thread_id: "root",
		Deletion: "false",
		Appraisal: "true",
		InstantEmail: "true",
		DailyEmail: "false"
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
		Thread_id: "root",
		Deletion: "true",
		Appraisal: "false",
		InstantEmail: "true",
		DailyEmail: "false"
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
		Thread_id: "b1",
		Deletion: "false",
		Appraisal: "true",
		InstantEmail: "true",
		DailyEmail: "false"
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
		Thread_id: "c2",
		Deletion: "false",
		Appraisal: "true",
		InstantEmail: "true",
		DailyEmail: "false"
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
		Thread_id: "root",
		Deletion: "false",
		Appraisal: "true",
		InstantEmail: "true",
		DailyEmail: "false"
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
//Test Data for Notification is left out as Notifications will be added to the table as events occur.
	if (success) 
	{
		return "Test data added successfully";
	}
	else 
	{
		return "Error: Could not add test data";
	}
}