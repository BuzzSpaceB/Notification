var express = require('express'),
    app = express();
var schedule = require('node-schedule');
var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.21.137:27017/ServerCopy'); // connect to database

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

var Notification = mongoose.model('Notification', NotificationSchema);
//Expects a JSON String containing the User_id of user requesting Notifications
var TestObj ={
	user_id:'u11008602'
};
//console.log(GetWebNotifications(JSON.stringify(TestObj)));
function GetWebNotifications(obj) 
{
	var details = JSON.parse(obj);
	var notifs = Notification.find({user_id: details.user_id},function(err,docs)
	{
		var Notifications = new Array();
		Notifications[0] = {NumberOfNotifications: docs.length};
		var count = 0;
		for(var i=1;i<=docs.length;i++)
		{
			id = docs[count]._id;
			Notification.findByIdAndUpdate(id, {read:true});
			Notifications[i] = {
				NotificationType : docs[count].type,
				Date : docs[count].date_time,
				TextValue : docs[count].content,
				Thread_id : docs[count].thread_id
			};
			count++;
		}
		return Notifications;
	});
}