/**
 * EditNotificationSettings.js
 * Author: Izak Blom
 * Group: NotificationB
 * Modified: 03/04/2015
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://d3user:DdJXhhsd2@proximus.modulusmongo.net:27017/purYv9ib'); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback)
{

});
var subSettingsModel = require('./models/user_subscription_settings_schema.js');;

// dummy request variable
var editDeletionRequest = {
    editWhat: "Deletion",
    user_id: "Izak",
    SetAs: false
};

// dummy request variable
var editAppraisalRequest = {
    editWhat: "Appraisal",
    user_id: "Izak",
    SetAs: true
};

// dummy request variable
var editInstantEmailRequest = {
    editWhat: "InstantEmail",
    user_id: "Izak",
    SetAs: false
};

// dummy request variable
var editDailyEmailRequest = {
    editWhat: "DailyEmail",
    user_id: "u11008602",
    SetAs: true
};



// callback used to retrieve result of EditNotificationSettings function
// example of how to call EditSubscription
EditNotificationSettings(JSON.stringify(editDailyEmailRequest), function callback(res){
    // do whatever with res which is the result of EditSubscription
    console.log(res);
    subSettingsModel.find(function (err, settings) {
        if (err) return console.error(err);
        console.log(settings);
    });
});



function EditNotificationSettings(obj, doneFunction) // doneFunction is called when asynchronous calls withing EditNotificationSettings have completed. Used instead of return statement
{
    var result; // JSON string containing the result of operation performed by EditSubscription or any errors.
    var details = JSON.parse(obj);

    if (details.editWhat == null || details.SetAs == null || details.user_id == null)
    {
        result =  {resultText:"Incorrect JSON format for EditNotificationSettings(). Specify 'editWhat', 'SetAs', 'user_id'"};
        doneFunction(result);
    }
    else if (details.editWhat != "Deletion" && details.editWhat != "Appraisal" && details.editWhat != "InstantEmail" && details.editWhat != "DailyEmail")
    {
        result =  {resultText:"Incorrect JSON format for EditNotificationSettings(). Specify 'editWhat' as 'Deletion', 'Appraisal', 'InstantEmail' or 'DailyEmail'"};
        doneFunction(result);
    }
    else if (typeof details.SetAs != 'boolean')
    {
        result =  {resultText:"Incorrect JSON format for EditNotificationSettings(). 'SetAs' must be boolean"};
        doneFunction(result);
    }
    else if (details.editWhat == "Deletion")
    {
       subSettingsModel.findOne({user_id: details.user_id}, function (err, doc){
           if (doc == null)
           {
               result =  {resultText:"No users matching thread_id and user_id specified in " + obj};
               doneFunction(result);
           }
           else
           {
               doc.Deletion = details.SetAs;
               doc.save(function callback() { result =  {resultText:"Successful modification of Deletion parameter. Result: " + JSON.stringify(doc)};
                   doneFunction(result);});
           }
       });
    }
    else if (details.editWhat == "Appraisal")
    {
        subSettingsModel.findOne({user_id: details.user_id}, function (err, doc){
            if (doc == null)
            {
                result =  {resultText:"No users matching thread_id and user_id specified in " + obj};
                doneFunction(result);
            }
            else
            {
                doc.Appraisal = details.SetAs;
                doc.save(function callback() { result =  {resultText:"Successful modification of Appraisal parameter. Result: " + JSON.stringify(doc)};
                        doneFunction(result);});
            }
        });
    }
    else if (details.editWhat == "InstantEmail")
    {
        subSettingsModel.findOne({user_id: details.user_id}, function (err, doc){
            if (doc == null)
            {
                result =  {resultText:"No users matching thread_id and user_id specified in " + obj};
                doneFunction(result);
            }
            else
            {
                doc.InstantEmail = details.SetAs;
                doc.save(function callback() { result =  {resultText:"Successful modification of InstantEmail parameter. Result: " + JSON.stringify(doc)};
                    doneFunction(result);});
            }
        });
    }
    else if (details.editWhat == "DailyEmail")
    {
        subSettingsModel.findOne({user_id: details.user_id}, function (err, doc){
            if (doc == null)
            {
                result =  {resultText:"No users matching thread_id and user_id specified in " + obj};
                doneFunction(result);
            }
            else
            {
                doc.DailyEmail = details.SetAs;
                doc.save(function callback() { result =  {resultText:"Successful modification of DailyEmail parameter. Result: " + JSON.stringify(doc)};
                    doneFunction(result);});
            }
        });
    }
}