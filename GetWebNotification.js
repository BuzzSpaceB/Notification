var express = require('express'),
    app = express();
var schedule = require('node-schedule');
var mongoose = require('mongoose');
mongoose.connect('mongodb://197.88.69.254:27017/db'); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) 
{
	;
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

var Notification = mongoose.model('Notification', notificationSchema);
//Expects a JSON String containing the User_id of user requesting Notifications
function GetWebNotifications(obj) 
{
	var details = JSON.parse(obj);
	var notifs = Notification.find({User_id: details.User_id},function(err,docs)
	{
		var Notifications = new Array();
		Notifications[0] = {NumberOfNotifications: docs.length};
		var count = 0;
		for(var i=1;i<=docs.length;i++)
		{
			Notifications[i] = {
				NotificationType : docs[count].Type,
				Date : docs[count].TimeAndDate,
				TextValue : docs[count].Context,
				Thread_id : docs[count].Thread_id
			};
			count++;
		}
		console.log(Notifications);
		return Notifications;
	});
}