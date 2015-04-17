var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/db'); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
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
var UserSchema = mongoose.Schema({
	user_id             : String,           /* PK, this is the user_id as in LDAP i.e student number */
    username            : String,           /* The user's preferred username, like first name */
    roles               : [{role_name : [String], module: [String]}],      /* Array of Roles & modules of the user as from LDAP */
    modules      		: [String],          /* Array of Modules that is active for the user */
	post_count			: Number,
	status_value		: Number, 			 /* The status of the user as calculated by a status calculator */
	profile_pic		    : String,			 /* The status of the user as calculated by a status calculator */
	preffered_email		: String			 /* The email of the user, if they wish to change at a later date*/
});
var ThreadSchema = new mongoose.Schema({
    thread_id       : String, 					/*PK*/
    parent_thread_id: String,				    /*FK, Parent of the thread*/
    user_id         : String,				    /*FK, Each Thread has one author*/
    num_children    : Number,                   /* The number of children the Thread has */
    closed          : Boolean,                  /* Flag to show thread is closed */
    hidden          : Boolean,                  /* Flag to show thread is hidden */
    level           : Number,                   /* Shows on which level the thread is currently at */
    post_id         : String,                   /* The post that is connected to the thread */
    subject         : String                    /*The subject of the post that is connected to the thread*/
});
var SubscriptionSchema = mongoose.Schema({
    user_id: String,
	registeredTo: [String],
	thread_id: String
});
var UserSubscriptionSettingsSchema = mongoose.Schema (
{
	user_id: String,
	Deletion: Boolean,
	Appraisal: Boolean,
	InstantEmail: Boolean,
	DailyEmail: Boolean
});

var user = mongoose.model('users', UserSchema);
var threadsModel = mongoose.model("threads", ThreadSchema);
var notificationModel = mongoose.model("notifications", NotificationSchema);
var subscriptionModel = mongoose.model("subscriptions", SubscriptionSchema);
var UserSubscriptionSettingsModel = mongoose.model("usersubscriptionsettings", UserSubscriptionSettingsSchema);

	var success = true;
	/****************************************************ADDING TEST USER DATA************************************************************************************/

	var newUser = new user(
		{
			user_id				: "u11008602",
			username            : "Matthew",           
			roles               : [{role_name : ["Student"], module: ["COS301"]}],      
			modules      		: ["COS301"],          
			post_count			: 2,
			status_value		: 2, 			
			profile_pic		    : "Hello.jpg",			
			preffered_email		: "u11008602@tuks.co.za"
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
			post_count			: 1,
			status_value		: 2, 			
			profile_pic		    : "Hello.jpg",			
			preffered_email		: "u10075268@tuks.co.za"
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
			post_count			: 1,
			status_value		: 2, 			
			profile_pic		    : "Hello.jpg",			
			preffered_email		: "u13020006@tuks.co.za"
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
			post_count			: 1,
			status_value		: 2, 			
			profile_pic		    : "Hello.jpg",			
			preffered_email		: "u13126777@tuks.co.za"
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
			post_count			: 1,
			status_value		: 2, 			
			profile_pic		    : "Hello.jpg",			
			preffered_email		: "u13410378@tuks.co.za"
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
		newUser = new user(
		{
			user_id				: "fsolms",
			username            : "Fritz",           
			roles               : [{role_name : ["Student"], module: ["COS301"]}],      
			modules      		: ["COS301"],          
			post_count			: 1,
			status_value		: 2, 			
			profile_pic		    : "Hello.jpg",			
			preffered_email		: "fsolms@cs.up.ac.za"
		});
		newUser.save(function(err,newUser)
		{
			if (err) 
			{
				success = false;
				console.log("Error Adding Fritz User");
			}
			else 
			{
				success = true;
			}
		});
		newUser = new user(
		{
			user_id				: "vpieterse",
			username            : "Vrede",           
			roles               : [{role_name : ["Student"], module: ["COS301"]}],      
			modules      		: ["COS301"],          
			post_count			: 1,
			status_value		: 2, 			
			profile_pic		    : "Hello.jpg",			
			preffered_email		: "vpieterse@cs.up.ac.za"
		});
		newUser.save(function(err,newUser)
		{
			if (err) 
			{
				success = false;
				console.log("Error Adding Vrede User");
			}
			else 
			{
				success = true;
			}
		});
		newUser = new user(
		{
			user_id				: "someleze",
			username            : "Stacy",           
			roles               : [{role_name : ["Assistant Lecturer"], module: ["COS301"]}],      
			modules      		: ["COS301"],          
			post_count			: 1,
			status_value		: 2, 			
			profile_pic		    : "Hello.jpg",			
			preffered_email		: "someleze@cs.up.ac.za"
		});
		newUser.save(function(err,newUser)
		{
			if (err) 
			{
				success = false;
				console.log("Error Adding Stacy User");
			}
			else 
			{
				success = true;
			}
		});
		newUser = new user(
		{
			user_id				: "lramasila",
			username            : "Lecton",           
			roles               : [{role_name : ["Assistant Lecturer"], module: ["COS301"]}],      
			modules      		: ["COS301"],          
			post_count			: 1,
			status_value		: 2, 			
			profile_pic		    : "Hello.jpg",			
			preffered_email		: "lectonlm@gmail.com"
		});
		newUser.save(function(err,newUser)
		{
			if (err) 
			{
				success = false;
				console.log("Error Adding Lecton User");
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
			post_id         : "root",
			subject         : "Demo" 
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
			post_id         : "a1",
			subject         : "Demo" 			
			
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
			post_id         : "a2",
			subject         : "Demo"     
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
			post_id         : "b1",
			subject         : "Demo"     
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
			post_id         : "b2",
			subject         : "Demo"     
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
			post_id         : "c2",
			subject         : "Demo"     
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
			post_id         : "b3",
			subject         : "Demo"     
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
			InstantEmail: true,
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
			InstantEmail: true,
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
			InstantEmail: true,
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
			InstantEmail: true,
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
			InstantEmail: true,
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
		newSubscriptionSetting = new UserSubscriptionSettingsModel(
		{
			user_id: "fsolms",
			Deletion: false,
			Appraisal: true,
			InstantEmail: true,
			DailyEmail: true
		});
		newSubscriptionSetting.save(function (err, newSubscriptionSetting) 
		{
			if (err) 
			{
				success = false;
				console.log("Error Adding fsolms Subscription Setting");
			}
			else 
			{
				success = true;
			}
		});
		newSubscriptionSetting = new UserSubscriptionSettingsModel(
		{
			user_id: "vpieterse",
			Deletion: false,
			Appraisal: true,
			InstantEmail: true,
			DailyEmail: true
		});
		newSubscriptionSetting.save(function (err, newSubscriptionSetting) 
		{
			if (err) 
			{
				success = false;
				console.log("Error Adding vpieterse Subscription Setting");
			}
			else 
			{
				success = true;
			}
		});
		newSubscriptionSetting = new UserSubscriptionSettingsModel(
		{
			user_id: "someleze",
			Deletion: false,
			Appraisal: true,
			InstantEmail: true,
			DailyEmail: true
		});
		newSubscriptionSetting.save(function (err, newSubscriptionSetting) 
		{
			if (err) 
			{
				success = false;
				console.log("Error Adding someleze Subscription Setting");
			}
			else 
			{
				success = true;
			}
		});
		newSubscriptionSetting = new UserSubscriptionSettingsModel(
		{
			user_id: "lramasila",
			Deletion: false,
			Appraisal: true,
			InstantEmail: true,
			DailyEmail: true
		});
		newSubscriptionSetting.save(function (err, newSubscriptionSetting) 
		{
			if (err) 
			{
				success = false;
				console.log("Error Adding someleze Subscription Setting");
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
		
	//Might Break
	var newNotif = new notificationModel(
		{
			notification_id: "Notif6",
			thread_id: "A2",
			user_id: "someleze",
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
				console.log("Error Adding Notification 5");
			}
			else 
			{
				success = true;
			}
		});
		var newNotif = new notificationModel(
		{
			notification_id: "Notif7",
			thread_id: "b2",
			user_id: "someleze",
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
				console.log("Error Adding Notification 5");
			}
			else 
			{
				success = true;
			}
		});
		var newNotif = new notificationModel(
		{
			notification_id: "Notif8",
			thread_id: "b3",
			user_id: "someleze",
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
		var newNotif = new notificationModel(
		{
			notification_id: "Notif9",
			thread_id: "root",
			user_id: "vpieterse",
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
				console.log("Error Adding Notification 5");
			}
			else 
			{
				success = true;
			}
		});
		var newNotif = new notificationModel(
		{
			notification_id: "Notif10",
			thread_id: "b3",
			user_id: "vpieterse",
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
		var newNotif = new notificationModel(
		{
			notification_id: "Notif11",
			thread_id: "root",
			user_id: "fsolms",
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
				console.log("Error Adding Notification 5");
			}
			else 
			{
				success = true;
			}
		});
		var newNotif = new notificationModel(
		{
			notification_id: "Notif12",
			thread_id: "A1",
			user_id: "fsolms",
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
		var newNotif = new notificationModel(
		{
			notification_id: "Notif13",
			thread_id: "c2",
			user_id: "fsolms",
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
				console.log("Error Adding Notification 5");
			}
			else 
			{
				success = true;
			}
		});
		var newNotif = new notificationModel(
		{
			notification_id: "Notif14",
			thread_id: "root",
			user_id: "fsolms",
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

	//////////////////////////////////////////////////////////////////////////////
	/********************************************************************************************************************************************************************/
		if (success)
		{
			return "Test data added successfully";
		}
		else 
		{
			return "Error: Could not add test data";
		}