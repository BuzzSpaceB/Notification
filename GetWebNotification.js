var express = require('express'),
    app = express();
var schedule = require('node-schedule');
var mongoose = require('mongoose');/*, 
	ds = require('DatabaseStuff');*/

var Notification = require('./DatabaseStuff/models/notification.js');
//Expects a JSON String containing the User_id of user requesting Notifications
var TestObj ={
	user_id:'u11008602'
};
function GetWebNotifications(obj) 
{
	if(!obj)
	{
		throw "Undefined Object";
	}
	if(!obj.user_id)
	{
		throw "user_id not specified in the object";
	}
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