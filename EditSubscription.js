/**
 * EditSubscription.js
 * Author: Izak Blom
 * Group: NotificationB
 * Modified: 03/04/2015
 */

var mongoose = require('mongoose');/*
	, ds = require('DatabaseStuff');
*/
var subscriptionModel = require('./DatabaseStuff/models/subscription.js');


// dummy request variable
var deleteSubscriptionRequest = {
    Type: "Delete",
    user_id: "Matt",
    thread_id: "root"
};

// dummy request variable
var editThreadIDRequest = {
    Type: "Edit",
    EditAction: "Editthread_id",
    user_id: "Liz",
    oldthread_id: "c2",
    newthread_id: "c5"
};

// dummy request variable
var AddRegisteredToRequest = {
    Type: "Edit",
    EditAction: "AddRegTo",
    user_id: "u13126777",
    newRegisteredTo: "u11008602",
    thread_id: 'root'
};

// dummy request variable
var DeleteRegisteredToRequest = {
    Type: "Edit",
    EditAction: "DeleteRegTo",
    user_id: "Liz",
    delete: "Matt",
    thread_id: 'c2'
};

// dummy request variable
var clearRegisteredToRequest = {
    Type: "Edit",
    EditAction: "ClearRegTo",
    user_id: "Liz",
    thread_id: "c2"
};

// callback used to retrieve result of EditSubscription function
// example of how to call EditSubscription
function GlobalEditSubscription(jsonObject){
    EditSubscription(JSON.stringify(jsonObject), function callback(res){
        // do whatever with res which is the result of EditSubscription
        //console.log(res);
        //subscriptionModel.find(function (err, subscriptions) {
        //    if (err) return console.error(err);
        //    console.log(subscriptions);
        
        mongoose.disconnect();
        });
    });
}

module.exports.GlobalEditSubscription = GlobalEditSubscription;

function EditSubscription(obj, doneFunction) // doneFunction is called when asynchronous calls withing EditSubscription have completed. Used instead of return statement
{
    var result; // JSON string containing the result of operation performed by EditSubscription or any errors.
    var details = JSON.parse(obj);

    if (details.Type == null)
    {
        result = {resultText: "Incorrect JSON format. Please Specify 'Type' as Edit or Delete"};
        doneFunction(result);
    }
    else if (details.Type == 'Delete') // Handle Deletion Request
    {
        if (details.thread_id == null || details.user_id == null)   // Missing parameters in JSON obj
        {
            result = {resultText: "Incorrect JSON format for Delete. Match {'Type':'Delete','user_id':'uid','thread_id':'thID'}"};
            doneFunction(result);
        }
        else
        {
            subscriptionModel.findOne({user_id: details.user_id, thread_id: details.thread_id}, function (err, doc){
                if (doc == null)
                {
                    result =  {resultText:"Error removing " + obj};
                    doneFunction(result);
                }
                else
                {
                    doc.remove();
                    result =  {resultText:"Successful deletion of " + obj};
                    doneFunction(result);
                }

            });
        }
    }
    else if (details.Type == 'Edit')    // Handle Edit Request
    {
        // Missing parameters in JSON obj
        if (details.EditAction == null || (details.EditAction != "Editthread_id" && details.EditAction != "AddRegTo" && details.EditAction != "DeleteRegTo" && details.EditAction != "ClearRegTo"))
        {
            result = {resultText: "Incorrect JSON format for Edit. No EditAction specified. Choose 'Editthread_id/AddRegTo/DeleteRegTo/ClearRegTo'"};
            doneFunction(result);
        }
        else if (details.EditAction == "Editthread_id")
        {
            if (details.oldthread_id == null || details.newthread_id == null || details.user_id == null) // Missing parameters in JSON obj
            {
                result = {resultText: "Incorrect JSON format for 'Editthread_id'. Please specify oldthread_id, newthread_id and user_id"};
                doneFunction(result);
            }
            else
            {
                var conditions = {user_id: details.user_id, thread_id: details.oldthread_id};
                var update = {thread_id: details.newthread_id};

                subscriptionModel.update(conditions, update, {multi: false}, callback);

                function callback (err, num)
                {
                    if (err)
                        result = {resultText: "No modifications made to database with " + obj + " request"};
                    else
                        result = {resutText: num + " modifications made to database with " + obj + " request"};
                    doneFunction(result);
                }
            }
        }
        else if (details.EditAction == "AddRegTo")
        {
            if (details.user_id == null || details.newRegisteredTo == null || details.thread_id == null) // Missing parameters in JSON obj
            {
                result = {resultText: "Incorrect JSON format for 'AddRegTo'. Please specify 'user_id', 'thread_id' and 'newRegisteredTo'"};
                doneFunction(result);
            }
            else
            {
                subscriptionModel.findOne({user_id: details.user_id, thread_id: details.thread_id}, function (err, doc){
                    if (doc == null)
                    {
                        result =  {resultText:"No users matching thread_id and user_id specified in " + obj};
                        doneFunction(result);
                    }
                    else
                    {
                        var regTo = doc.registeredTo;
                        var duplicate = false;
                        for (var k = 0; k < regTo.length; ++k)
                        {
                            if (regTo[k] == details.newRegisteredTo)
                            {
                                duplicate = true;
                                result =  {resultText:"Duplicate insertion aborted. " };
                                doneFunction(result);
                            }
                        }
                        if (!duplicate)
                        {
                            regTo.push(details.newRegisteredTo);
                            doc.registeredTo = regTo;
                            doc.save(function callback() {result =  {resultText:"Successful modification of registeredTo. Result: " + doc};
                                doneFunction(result);});
                        }


                    }
                    
                });
            }
        }
        else if (details.EditAction == "DeleteRegTo")
        {
            if (details.user_id == null || details.delete == null || details.thread_id == null) // Missing parameters in JSON obj
            {
                result = {resultText: "Incorrect JSON format for 'DeleteRegTo'. Please specify 'user_id', 'thread_id' and 'delete'"};
                doneFunction(result);
            }
            else
            {
                subscriptionModel.findOne({user_id: details.user_id, thread_id: details.thread_id}, function (err, doc){
                    if (doc == null)
                    {
                        result =  {resultText:"No users matching thread_id and user_id specified in " + obj};
                        doneFunction(result);
                    }
                    else
                    {
                        var regTo = doc.registeredTo;
                        var index = regTo.indexOf(details.delete);
                        if (index == -1)
                        {
                            result =  {resultText:"Error: value of 'delete' does not match any in the existent registeredTo array for " + doc};
                            doneFunction(result);
                        }
                        else
                        {
                            regTo.splice(index, 1);
                            doc.registeredTo = regTo;
                            doc.save(function callback() {result =  {resultText:"Successful modification of registeredTo. Result: " + doc};
                                doneFunction(result);});

                        }

                    }
                    
                });
            }
        }
        else if (details.EditAction == "ClearRegTo")
        {
            if (details.user_id == null || details.thread_id == null) // Missing parameters in JSON obj
            {
                result = {resultText: "Incorrect JSON format for 'AddRegTo'. Please specify 'user_id', 'thread_id'"};
                doneFunction(result);
            }
            else
            {
                subscriptionModel.findOne({user_id: details.user_id, thread_id: details.thread_id}, function (err, doc){
                    if (doc == null)
                    {
                        result =  {resultText:"No users matching thread_id and user_id specified in " + obj};
                        doneFunction(result);
                    }
                    else
                    {
                        var regTo = [];
                        doc.registeredTo = regTo;

                        doc.save(function callback() { result =  {resultText:"Successful clearing of registeredTo. Result: " + doc};
                            doneFunction(result);});

                    }
                    
                });
            }
        }

    }   // end Handle Edit Request
    //console.log(result);

}
