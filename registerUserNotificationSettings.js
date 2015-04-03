/**
 * RegisterNotificationSettings core functionality
 * Author: Izak Blom
 * Group: NotificationB
 * Modified: 03/04/2015
 */

/********************************************************
 * Function intended to add the subscriptionSettings for a particular user to the database (i.e. create a new document)
 * Checks data validity, AND CHECKS FOR DUPLICATES AND THEN ABORTS REGISTRATION
 * Inserts a new UserSubscriptionsSettings document
 */


var subscriptionModel;
var subSettingsModel;

connectNotificationBDatabase();

// dummy request
var registerRequest = {
    User_id: 'registerTestUser',
    Deletion: false,
    Appraisal: false,
    InstantEmail: false,
    DailyEmail: false
};

// Convert object subscribeRequest to JSON string
var RequestString = JSON.stringify(registerRequest);

registerUserNotificationSettings(RequestString, function callback(res){
    console.log(res);
    subSettingsModel.find(function (err, settings) {
        if (err) return console.error(err);
        console.log(settings);
    });
});



/*
 ****** Core functionality function *********
 * Receives a JSON string of the format subscribeRequest above
 * Parses string and inserts the UserSettings data into the database
 * callbackFunction called when async calls within this function have completed. Used instead of return statement which only works synchronously
 * returns a result JSON describing the result of the action performed by the function
 */
function registerUserNotificationSettings(jsonRequest, callbackFunction)
{
    var req = JSON.parse(jsonRequest);
    var result; // JSON string containing the result of operation performed by EditSubscription or any errors.

    // Series of if statements for data validation before insertion into database occurs
    if (req.User_id == null || req.Deletion == null || req.Appraisal == null || req.InstantEmail == null  || req.DailyEmail == null)
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). Specify 'User_id', 'InstantEmail', 'Appraisal', 'Deletion', 'DailyEmail'"};
        callbackFunction(result);
    }
    else if (typeof req.User_id != 'string')
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). 'User_id' must be String format"};
        callbackFunction(result);
    }
    else if (typeof req.Deletion != 'boolean')
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). 'Deletion' must be boolean format"};
        callbackFunction(result);
    }
    else if (typeof req.Appraisal != 'boolean')
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). 'Appraisal' must be boolean format"};
        callbackFunction(result);
    }
    else if (typeof req.InstantEmail != 'boolean')
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). 'InstantEmail' must be boolean format"};
        callbackFunction(result);
    }
    else if (typeof req.DailyEmail != 'boolean')
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). 'DailyEmail' must be boolean format"};
        callbackFunction(result);
    }
    else
    {
        subSettingsModel.findOne({User_id: req.User_id}, function (err, doc){
            if (doc != null)
            {
                result = {resultString: "A document for user " + req.User_id + "already exists. User function EditNotificationSettings to edit"};
                callbackFunction(result);
            }
            else
                finalRegister();
        });

        function finalRegister()
        {
            newSetting = new subSettingsModel(
                {
                    User_id: req.User_id,
                    Deletion: req.Deletion,
                    Appraisal: req.Appraisal,
                    InstantEmail: req.InstantEmail,
                    DailyEmail: req.DailyEmail
                }
            );
            newSetting.save(function(err,newSetting)
            {
                if (err)
                {
                    result ={resultText: "Failed to register to database. DB error"};
                    callbackFunction(result);
                }
                else
                {
                    result ={resultText: "Successful registration of settings for " + req.User_id};
                    callbackFunction(result);
                }
            });
        }

    }
}


function connectNotificationBDatabase() // Custom function to set up db connection
{
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://197.88.21.137:27017/db'); // connect to database

    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback)
    {

    });

    var subSettingsSchema = mongoose.Schema (
        {
            User_id: String,
            Deletion: Boolean,
            Appraisal: Boolean,
            InstantEmail: Boolean,
            DailyEmail: Boolean
        });


    subSettingsModel = mongoose.model("SubscriptionSetting", subSettingsSchema);
}
