/*

 //************* Register new user notification settings *****************

var UserSettings = require('./registerUserNotificationSettings');


var registerRequest = {
    user_id: 'u12204359',
    Deletion: false,
    Appraisal: false,
    InstantEmail: true,
    DailyEmail: false
};
UserSettings.GlobalRegisterUserNotificationSettings(registerRequest);

*/

/*

//************* Edit user notification settings *****************

var EditNotifSettings = require('./EditNotificationSettings');

var editDailyEmailRequest = {
    editWhat: "Deletion",
    user_id: "u12207871",
    SetAs: false
};
EditNotifSettings.GlobalEditNotificationSettings(editDailyEmailRequest);

*/

/*


 //************* Appraisal Notify ***************

  var AppraisalNotif = require('./AppraisalNotifyMe.js');

 var obj = {
     current_user_id: 'u12204359',
     post_user_id: 'u12207871',
     appraisedThread_id: 'c2',
     appraisalType: 'Like'  //this is attained by "var myAppraisalType = req.body.appraisal;" when button is clicked
 };

AppraisalNotif.addAppraisal(obj);


*/


/*


//********************** Register for Notification ********************

 var Register = require('./RegisterForNotification.js');

var subscribeRequest = {
    user_id: 'u12207871',
    thread_id: 'c2',
    registeredTo: ["All"]
};
Register.GlobalRegisterForNotification(subscribeRequest);


*/



/*


//********************* Standard Notification ******************

var StandardNotif = require('./StandardNotification');

var StandardNotifReq ={
    thread: 'c2'
};
StandardNotif.PostNotification(StandardNotifReq);



*/


/*

//**************** Delete Notification ***************************

var DeleteNotification = require('./DeleteNotif.js');

var obj =
    {
        sendRequest: 'true',
        thread: 'b2'
        };
DeleteNotification.deleteNotification(obj);


*/
