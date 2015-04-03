/**
 * RegisterForNotification core functionality
 * Author: Izak Blom
 * Group: NotificationB
 * Modified: 03/04/2015
 */

/********************************************************
 * Function intended to add a subscription to a thread or users to the database using a JSON as parameter
 * Checks data validity, BUT DOES NOT CROSS REFERENCE WITH OTHER SCHEMAS
 * Inserts a new subscriptionModel document
 */


var subscriptionModel;
var subSettingsModel;

connectNotificationBDatabase();


var subscribeRequest = {
    User_id: 'registerTestUser',
    Thread_id: 'c2',
    registeredTo: ["Izak", "Matt", "Liz"]
};

// Convert object subscribeRequest to JSON string
var RequestString = JSON.stringify(subscribeRequest);

registerForNotification(RequestString, function callback(res){
    console.log(res);
    subscriptionModel.find(function (err, subscriptions) {
        if (err) return console.error(err);
        console.log(subscriptions);
    });
});



/*
 ****** Core functionality function *********
 * Receives a JSON string of the format subscribeRequest above
 * Parses string and inserts the subscription data into the database
 * * callbackFunction called when async calls within this function have completed. Used instead of return statement which only works synchronously
 * * returns a result JSON describing the result of the action performed by the function
 */
function registerForNotification(jsonRequest, callbackFunction)
{
    var req = JSON.parse(jsonRequest);
    var result; // JSON string containing the result of operation performed by EditSubscription or any errors.

    if (req.User_id == null || req.Thread_id == null || req.registeredTo == null)
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). Specify 'User_id', 'Thread_id', 'registeredTo'"};
        callbackFunction(result);
    }
    else if (typeof req.User_id != 'string')
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). 'User_id' must be String format"};
        callbackFunction(result);
    }
    else if (typeof req.Thread_id != 'string')
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). 'Thread_id' must be String format"};
        callbackFunction(result);
    }
    else if (!Array.isArray(req.registeredTo))
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). 'registeredTo' must be an array"};
        callbackFunction(result);
    }
    else
    {
        newSub = new subscriptionModel(
            {
                User_id: req.User_id,
                Thread_id: req.Thread_id,
                registeredTo: req.registeredTo
            }
        );
        newSub.save(function(err,newSub)
        {
            if (err)
            {
               result ={resultText: "Failed to register to database. DB error"};
                callbackFunction(result);
            }
            else
            {
                result ={resultText: "Successful registration of " + jsonRequest};
                callbackFunction(result);
            }
        });
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


    var subscriptionSchema = mongoose.Schema (
        {
            User_id: String,
            registeredTo: [String],
            Thread_id: String
        });


    subscriptionModel = mongoose.model("Subscription", subscriptionSchema);


}
