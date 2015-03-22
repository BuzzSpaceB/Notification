/**
 * RegisterForNotification core functionality
 * Author: Izak Blom
 * Group: NotificationB
 * Modified: 23/03/2015
 */

/*********************************************************************************
 *
 *      Only for testing purposes. Implementation specific to caller
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // conncect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
});

var UsersSchema = mongoose.Schema({
    User_id: String,
    PreferredEmail: String
});
//*******************************************************************************

/*
 var userModel = mongoose.model("Users", UsersSchema);

 var testUser = new userM({User_id: 'user1', PreferredEmail: 'testMail@gmail.com'});

 testUser.save(function (err, testUser) {
 if (err) return console.error(err)
 });*/

/*
 var ThreadsSchema = mongoose.Schema({
 Thread_id: String,
 user_id: String
 });

 var threadsModel = mongoose.model("Threads", ThreadsSchema);

 var testThread = new threadsM({Thread_id: 'testThread1', user_id: 'user1'});

 testThread.save(function (err, testThread) {
 if (err) return console.error(err)
 });
 */

/*
 var notificationSchema = mongoose.Schema ({
 Notification_id: String,
 Thread_id: String,
 User_id: String,
 TimeAndDate: Date,
 Type: String,
 Context: String,
 Read: Boolean
 });

 var notificationModel = mongoose.model("Notification", notificationSchema);

 var testNotification = new notificationModel({Notification_id: "notification1", Thread_id: "testThread1",
 User_id: "user1", TimeAndDate: new Date(), Type: "Appraisal", Context: "", Read: false});
 */


/*
 ********** Core functionality Schema **************
 * Required by registerForNotification() for inserting data into Subscription Model
 */
var subscriptionSchema = mongoose.Schema ({
    User_id: String,
    Thread_id: String,
    Deletion: Boolean,
    Appraisal: Boolean,
    InstantEmail: Boolean,
    DailyEmail: Boolean
});

// Create a new subscriptionModel
var subscriptionModel = mongoose.model("Subscription", subscriptionSchema);


/*  Use this code to insert a dummy document into subscriptionModel
 var testSubscription = new subscriptionModel({ User_id: 'user1', Thread_id: 'testThread1', Deletion: false, Appraisal: false,
 InstantEmail: false, DailyEmail: false});

 testSubscription.save(function (err, testSubscription) {
 if (err) return console.error(err)
 });
 */

// A model for an object to be converted to a JSON string and passed to registerForNotification()
var subscribeRequest = {
    UserID: 'testUser',
    ThreadID: 'Thread1',
    Deletion: false,
    Appraisal: false,
    InstantEmail: false,
    DailyEmail: false
};

// Convert object subscribeRequest to JSON string
var RequestString = JSON.stringify(subscribeRequest);

// Call registerForNotifcation with argument RequestString and log the response
console.log(registerForNotification(RequestString));



/*
 ****** Core functionality function *********
 * Receives a JSON string of the format subscribeRequest above
 * Parses string and inserts the subscription data into the database
 */
function registerForNotification(jsonRequest)
{
    var req = JSON.parse(jsonRequest);

    var newSubscription = new subscriptionModel({User_id: req.UserID, Thread_id: req.ThreadID, Deletion: req.Deletion, Appraisal: req.Appraisal,
        InstantEmail: req.InstantEmail, DailyEmail: req.DailyEmail});

    var success = true;
    // Save the new Document to the database
    newSubscription.save(function (err, newSubscription) {
        if (err) success = false;
        else success = true;

    });

    if (success)
    // Return the inserted subscription as JSON string
        return(JSON.stringify(newSubscription));
    else return "Error: Unable to create new subscription";

}

//  Show all documents in subscription Model, including the one added by registerForNotification()
subscriptionModel.find(function (err, subscriptions) {
    if (err) return console.error(err);
    console.log(subscriptions);
});

/*******************************************************************
 * Use this code snippet to clear all Documents from these Models
 * *****************************************************************
 userModel.remove().exec();
 subscriptionModel.remove().exec();
 notificationModel.remove().exec();
 threadsModel.remove().exec();
 */
