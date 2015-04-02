/********************************************************************************************************/
function AprraisalNotification(obj) //-- Liz
{
	var details = JSON.parse(obj);
	//Query the MongoDB to find all users with the UserID contained in OBJ
	//if the user has accepted Appraisal Notification --Default ON
	//Then
		//Send
	//else	
		//ignore
	//webNotification(newObj)
}
//--------------------------------------------------------------------------------------------------------
/********************************************************************************************************/
function DeleteNotification(obj) //-- Andre
{
	var details = JSON.parse(obj);
	//check the obj if the user who issued the delete wishes to send a notification
	//Query the MongoDB to find all users with the UserID contained in OBJ
	//if the user has accepted Delete Notification -- Default ON
	//Then
		//Send
	//else	
		//ignore
	//webNotification(newObj)
}
//--------------------------------------------------------------------------------------------------------
/********************************************************************************************************/
function StandardNotification(obj)//--Xoliswa
{
	var details = JSON.parse(obj);
	//traverse up the Thread Tree to the root node
	//for each node check if any users are listed to receive a notification for that specific thread
	//Send emails for those users who wish to recieve Notifications
	//webNotification(newObj)
}
//--------------------------------------------------------------------------------------------------------
/********************************************************************************************************/
function EditSubscription(obj) //--Izak
{
	var details = JSON.parse(obj);
	//this will Remove or edit subscriptionSchema
	//Check if the edit is a delete or edit
	//Perform the edit in the DB (New Thread/Add Users/Remove Users)
}
function EditNotificationSettings(obj) //--Izak
{
	var details = JSON.parse(obj);
	//This will change the UserSubscriptionSettings Schema
}
//--------------------------------------------------------------------------------------------------------
/********************************************************************************************************/
function DailyNotification() //--Matt
//--Extra User can specify the frequency of "daily" emails - Daily-2nd Day- Weekly - Monthly
{
	//Use Node Schedule -- https://github.com/node-schedule (CRON Style)
	//Go Through the Notification Database and compile Email's per user to be sent about Current Day's Happenings
}
//--------------------------------------------------------------------------------------------------------

//NICE TO HAVE
/********************************************************************************************************/
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
//---------------------------------------------------------------------------------------------------------
