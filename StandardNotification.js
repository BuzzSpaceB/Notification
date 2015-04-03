var send = require('./Email.js');
var express = require('express'),
app = express();
var schedule = require('node-schedule');


/* Database connection */
var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.21.137:27017/db'); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
});

/*Get relevant schemas*/
var ThreadsSchema = mongoose.Schema
({
	Thread_id: String,
	Parent_id: String,
	User_id: String
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

/*Database access*/
var Threads = mongoose.model("Threads",ThreadsSchema);
var Subscription = mongoose.model("Subscription", subscriptionSchema);
var Notification = mongoose.model("Notification", notificationSchema);

/*NEW THREAD - Add a new thread and use it as the calling thread , for testing must be in Unit test.. I think*/
	newThread = new Threads
	({
		Thread_id: "c3",
		Parent_id: "c2",
		user_id: "Xoliswa"
	});
	newThread.save(function(err,newThread)
	{
		if (err) 
		{
			console.log("Error Adding c3 Thread");
		}
		else 
		{
		}
	});
var thread = "root";
//var notNull = true;
/*TEST*/
//var user = Threads.find({ Thread_id: thread }, function(err, user) {
//  if (err) throw err;	
//  console.log(user[0].Thread_id);
//});

var user = Threads.find({ Thread_id: thread }, function(err, user) {
  if (err) throw err;	
});


/*Global variables*/
var sessionUser_id = newThread.user_id;
//var sessionUser_id = thread;
standardNotification(newThread);
//standardNotification(user[0]);

function standardNotification(thread)
{
	var currentThread = thread;
	var notify = false;
	var notNull = true;
	
	while(notNull)
	{
		console.log("Current thread: "+ currentThread.Thread_id);
		var parent_id = currentThread.Parent_id;
		if(parent_id == null) 
		{
		//	console.log("Null parent");
			notNull = false;
		}
		else
		{
			// console.log("Not null parent");
			 var ParentThread;
			 var parent = Threads.find({ Thread_id: parent_id }, function(err, parent) 
			 {
				if (err) 
				{
					throw err;
				}
				else
				{
				  //console.log("Parent: " + parent[0].Thread_id );
				  ParentThread = parent[0];
				//  console.log("Parent: " + ParentThread.Thread_id );
				}
			 });
			 //Parent subscription
			 var arrayLength ;
			 var subscription = Subscription.find({Thread_id: parent_id }, function(err, subscription) 
			 {
				if (err) 
				{
					throw err;
				}
				else
				{
				// console.log("Parent Array Length: " + subscription[0].registeredTo.length );
				 arrayLength = subscription[0].registeredTo.length;
				}
			 });
			 // Check if you subscribed to "ALL"
			 if( arrayLength ==1 &&  subscription[0].registeredTo[0] == "All")
			 {
			//	console.log("Subscribed to ALL" );
				notify = true;
			 }
			 //Check if you are subscribed to the parent thread
			 for (var i = 0; i < arrayLength ; i++)
			 {
				if( subscription[0].registeredTo[i] == sessionUser_id)
				{
					notify = true;
					break;
				}
			 }
			 //Check if you should add a new notification document
			 if(notify)
			 {
			   // console.log("Calling notify for" + sessionUser_id );
				//Add a new notification object
			 }
			 //Make parent the new currentCounter -- Traverse the tree till you reach the root
			  currentThread = ParentThread;
			 //console.log("Current Current" + currentThread.Thread_id);
		}
	}
}


/*Listen to port*/
app.listen(5000,'127.0.0.1',function(){
    console.log('Server is running here.'); //CHANGE WHEN DONE
});