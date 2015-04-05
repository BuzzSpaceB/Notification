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

var mongoose = require('mongoose');
mongoose.connect('mongodb://d3user:DdJXhhsd2@proximus.modulusmongo.net:27017/purYv9ib'); // connect to database

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback)
{

});


var subscriptionModel = require('./models/subscription.js');


/*
//Dummy Request
var subscribeRequest = {
    user_id: 'registerTestUser',
    thread_id: 'c2',
    registeredTo: ["Izak", "Matt", "Liz"]
};

// Convert object subscribeRequest to JSON string
var RequestString = JSON.stringify(subscribeRequest);

*/


function GlobalRegisterForNotification(jsonObject) {
    var RequestString = JSON.stringify(jsonObject);

    registerForNotification(RequestString, function callback(res) {
        console.log(res);
        subscriptionModel.find(function (err, subscriptions) {
            if (err) return console.error(err);
            console.log(subscriptions);
        });
    });
}

module.exports.GlobalRegisterForNotification = GlobalRegisterForNotification;

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

    if (req.user_id == null || req.thread_id == null || req.registeredTo == null)
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). Specify 'user_id', 'thread_id', 'registeredTo'"};
        callbackFunction(result);
    }
    else if (typeof req.user_id != 'string')
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). 'user_id' must be String format"};
        callbackFunction(result);
    }
    else if (typeof req.thread_id != 'string')
    {
        result =  {resultText:"Incorrect JSON format for registerForNotification(). 'thread_id' must be String format"};
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
                user_id: req.user_id,
                thread_id: req.thread_id,
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
