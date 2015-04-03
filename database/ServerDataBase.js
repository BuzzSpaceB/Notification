var mongoose = require('mongoose');


mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
});

mongoose.connection.on('error', function (err) {
    console.log('Could not connect to mongo server!');
    console.log(err);
});
/************************************ SCHEMA's*****************************/
var subscriptionSchema = mongoose.Schema({
    user_id: String,
	registeredTo: [String],
	thread_id: String
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
	user_id: String,
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


//mongoose.connect('mongodb://197.88.21.137:27017/ServerCopy');
mongoose.connect("mongodb://d3user:DdJXhhsd2@proximus.modulusmongo.net:27017/purYv9ib");

var user = mongoose.model("Users", UserSchema);
var threadsModel = mongoose.model("Threads",ThreadSchema);
var notificationModel = mongoose.model("Notification", NotificationSchema);
var subscriptionModel = mongoose.model("Subscription", subscriptionSchema);
var UserSubscriptionSettingsModel = mongoose.model("SubscriptionSetting", UserSubscriptionSettingsSchema);
//UserSubscriptionSettingsModel.remove().exec();

	var success = true;
/****************************************************ADDING TEST USER DATA************************************************************************************/

var newUser = new user(
	{
		user_id				: "u11008602",
		username            : "Matthew",           
		roles               : [{role_name : ["Student"], module: ["COS301"]}],      
		modules      		: ["COS301"],          
		post_count			: 2
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
	newUser = new user(
	{
		user_id				: "u10075268",
		username            : "Liz",           
		roles               : [{role_name : ["Student"], module: ["COS301"]}],      
		modules      		: ["COS301"],          
		post_count			: 1
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
	newUser = new user(
	{
		user_id				: "u13020006",
		username            : "Andre",           
		roles               : [{role_name : ["Student"], module: ["COS301"]}],      
		modules      		: ["COS301"],          
		post_count			: 1
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
	newUser = new user(
	{
		user_id				: "u13126777",
		username            : "Izak",           
		roles               : [{role_name : ["Student"], module: ["COS301"]}],      
		modules      		: ["COS301"],          
		post_count			: 1
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
	newUser = new user(
	{
		user_id				: "u13410378",
		username            : "Xoliswa",           
		roles               : [{role_name : ["Student"], module: ["COS301"]}],      
		modules      		: ["COS301"],          
		post_count			: 1
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
		thread_id		: "root",
		parent_thread_id: null,
		user_id			: "u11008602",
		num_children    : 2,                   
		closed          : false,                  
		hidden          : false,                  
		level           : 0,                    
		post_id         : "root"     
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
		thread_id		: "a1",
		parent_thread_id: "root",
		user_id			: "u13410378",
		num_children    : 1,                   
		closed          : false,                  
		hidden          : false,                  
		level           : 1,                    
		post_id         : "a1"     
		
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
		thread_id		: "a2",
		parent_thread_id: "a1",
		user_id			: "u13126777",
		num_children    : 0,                   
		closed          : false,                  
		hidden          : false,                  
		level           : 2,                    
		post_id         : "a2"     
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
		thread_id		: "b1",
		parent_thread_id: "root",
		user_id			: "u13020006",
		num_children    : 2,                   
		closed          : false,                  
		hidden          : false,                  
		level           : 1,                    
		post_id         : "b1"     
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
		thread_id		: "b2",
		parent_thread_id: "b1",
		user_id			: "u11008602",
		num_children    : 1,                   
		closed          : false,                  
		hidden          : false,                  
		level           : 2,                    
		post_id         : "b2"     
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
		thread_id		: "c2",
		parent_thread_id: "b1",
		user_id			: "u10075268",
		num_children    : 0,                   
		closed          : false,                  
		hidden          : false,                  
		level           : 2,                    
		post_id         : "c2"     
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
		thread_id		: "b3",
		parent_thread_id: "b2",
		user_id			: "u10075268",
		num_children    : 0,                   
		closed          : false,                  
		hidden          : false,                  
		level           : 3,                    
		post_id         : "b3"     
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
		user_id: "Matt",
		registeredTo: ["All"],
		thread_id: "root"
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
		user_id: "u13126777",
		registeredTo: ["u10075268"],
		thread_id: "root"
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
		user_id: "u13020006",
		registeredTo: ["u10075268","u13126777"],
		thread_id: "b1"
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
		user_id: "u10075268",
		registeredTo: ["u13020006","u13126777"],
		thread_id: "c2"
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
		user_id: "u13410378",
		registeredTo: ["u13020006","u13126777","u11008602"],
		thread_id: "root"
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
		user_id: "u11008602",
		Deletion: true,
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
		user_id: "u13126777",
		Deletion: true,
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
		user_id: "u13020006",
		Deletion: true,
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
		user_id: "u10075268",
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
		user_id: "u13410378",
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
		notification_id: "Notif1",
		thread_id: "a2",
		user_id: "u11008602",
		date_time: new Date(),
		type: "Appraisal",
		content: "Like",
		read: false
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
		notification_id: "Notif2",
		thread_id: "a2",
		user_id: "u10075268",
		date_time: new Date(),
		type: "New Post",
		content: "",
		read: false
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
		notification_id: "Notif3",
		thread_id: "c1",
		user_id: "u13020006",
		date_time: new Date(),
		type: "Delete",
		content: "",
		read: false
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
		notification_id: "Notif4",
		thread_id: "a1",
		user_id: "u13126777",
		date_time: new Date(),
		type: "Appraisal",
		content: "Funny",
		read: false
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
		notification_id: "Notif5",
		thread_id: "root",
		user_id: "u13126777",
		date_time: new Date(),
		type: "new Post",
		content: "",
		read: false
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


//finds all the threads in the db
/*Thread.find(function (err, aThread) {
    if (err)
        console.log("ERR: " + err);
    else
        console.log("Found: " + JSON.stringify(aThread));
});
