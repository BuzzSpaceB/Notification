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

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/db'); // connect to database




var UserSubscriptionSettingsSchema = mongoose.Schema (
    {
        user_id: String,
        Deletion: Boolean,
        Appraisal: Boolean,
        InstantEmail: Boolean,
        DailyEmail: Boolean
    });
var subSettingsModel = mongoose.model("subscriptionsettings", UserSubscriptionSettingsSchema);


// dummy request
var registerRequest = {
    user_id: 'registerTestUser',
    Deletion: false,
    Appraisal: false,
    InstantEmail: false,
    DailyEmail: false
};

// Convert object subscribeRequest to JSON string
function GlobalRegisterUserNotificationSettings(registerUserNotifSetings, callback) {

    var RequestString = JSON.stringify(registerUserNotifSetings);

    registerUserNotificationSettings(RequestString, callback);//function callback(res) {
        /*
        console.log(res);
        subSettingsModel.find(function (err, settings) {
            if (err) return console.error(err);
            console.log(settings);
        });
        */

    //});
}

//This is to make it globally accessable
module.exports.GlobalRegisterUserNotificationSettings = GlobalRegisterUserNotificationSettings;

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
    if (req.user_id == null || req.Deletion == null || req.Appraisal == null || req.InstantEmail == null  || req.DailyEmail == null)
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). Specify 'user_id', 'InstantEmail', 'Appraisal', 'Deletion', 'DailyEmail'"};
        callbackFunction(result);
    }
    else if (typeof req.user_id != 'string')
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). 'user_id' must be String format"};
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
        subSettingsModel.findOne({user_id: req.user_id}, function (err, doc){
            if (doc != null)
            {
                result = {resultString: "A document for user " + req.user_id + " already exists. User function EditNotificationSettings to edit"};
                callbackFunction(result);
            }
            else
                finalRegister();
        });

        function finalRegister()
        {
            newSetting = new subSettingsModel(
                {
                    user_id: req.user_id,
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
                    result ={resultText: "Successful registration of settings for " + req.user_id};
                    callbackFunction(result);
                }
            });
        }

    }
}
