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
	//Check if the edit is a delete or edit
	//Perform the edit in the DB (New Thread/Add Users/Remove Users)
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
function GetWebNotifications(obj) 
{
	var details = JSON.parse(obj);
	//Find all WebNotifications associated with a specific user
	//Compile into a JSON array
	//Returns JSON ARRAY

}
//---------------------------------------------------------------------------------------------------------
/********************************************************************************************************/
function WebNotification(obj)
{
	var details = JSON.parse(obj);
	//Add the Notification to a DB to be displayed via the Web - Read -- Default ON
}
//--------------------------------------------------------------------------------------------------------