/***********************************************************DAILY EMAIL***************************************************/

var DailyEmail = require('./DailyNotif.js');

//Start Daily Email Functions - Default Midnight
DailyEmail();


/***********************************************************Delete Notification***************************************************/
var DeleteNotification = require('./DeleteNotif.js');
/*
	@param obj requires a sendRequest (Chosen by the deletor) and thread containing the thread_id in the DB
	@author Andre Calitz
*/
var obj =
{
	sendRequest = 'true',
	thread = 'b1'
};
DeleteNotification(obj);

/***********************************************************Edit Notification Settings***************************************************/
var EditNotifSettings = require('./EditNotificationSettings');

/*
	@param editDailyEmailRequest JSON Object containing editWhat which tells us which field in the DB to editDailyEmailRequest
														user_id to specify which user is being edited
														SetAs specifies if they are changing true to receive this notification type false to not receive this notification type
	@author Izak Blom													
*/
var editDailyEmailRequest = {
    editWhat: "DailyEmail",
    user_id: "u11008602",
    SetAs: true
};
EditNotifSettings(editDailyEmailRequest);
/***********************************************************Get Notification for Web***************************************************/
var WebNotifs = require('./GetWebNotification');

/*
	@param =TestObj containing the user_id of the person requesting the notification
	@author Matthew Gouws
*/
var TestObj ={
	user_id:'u11008602'
};
var returnResult = WebNotifs(TestObj);
/***********************************************************Register for Notification***************************************************/
var Register = require('./RegisterForNotification.js');

/*
	@param subscribeRequest containing the 	user_id of the user subscribing
											thread_id the id of the thread the user is subscribing to	
											registeredTo a String representation of who the user is subscribing to
	@author Izak Blom
*/
var subscribeRequest = {
    user_id: 'u13410378',
    thread_id: 'c2',
    registeredTo: ["u13126777", "u11008602", "u10075268"]
};
registerForNotification(subscribeRequest);
/***********************************************************Register User Notification Settings***************************************************/
var UserSettings = require('./registerUserNotificationSettings');
/*
	@param registerRequest	user_id The user_id of the person performing the request
							Deletion whether(true) or not(false) user wants to receive Delete notification
							Appraisal whether(true) or not(false) user wants to receive Appraisal notification
							InstantEmail whether(true) or not(false) user wants to receive InstantEmail notification
							DailyEmail whether(true) or not(false) user wants to receive DailyEmail notification
	@author Izak Blom
*/
var registerRequest = {
    user_id: 'registerTestUser',
    Deletion: false,
    Appraisal: false,
    InstantEmail: false,
    DailyEmail: false
};
registerUserNotificationSettings(registerRequest);

/***********************************************************Standard Notification***************************************************/
var StandardNotif = require('./StandardNotification');
/*
	@param StandardNotifReq	thread the id of the new Thread added to the BUZZ Space
	@author Xoliswa Ntshingila
*/
var StandardNotifReq ={
	thread: 'b1'
};
StandardNotif(StandardNotifReq);
/*********************************************************Appraisal Notificaiton ****************************************

var AppraisalNotif = require('./AppraisalNotifyMe.js');
/*
	@param obj is the user id of the post creator and the user id of the appraisal creator as well as the appraised thread id
	@author Liz Joseph
*/
var obj = {
    current_user_id: 'u11008602',
	post_user_id: 'u10075268',
	appraisedThread_id: 'c2',
	appraisalType: 'like'  //this is attained by "var myAppraisalType = req.body.appraisal;" when button is clicked
};

addAppraisalToDB(obj);
