/**
 * EditSubscription.js
 * Author: Izak Blom
 * Group: NotificationB
 * Modified: 03/04/2015
 */

var db;
var subscriptionModel;

//setup db connection and get a handle to subscriptionModel
connectNotificationBDatabase();

// dummy request variable
var deleteSubscriptionRequest = {
    Type: "Delete",
    User_id: "Liz",
    Thread_id: "c2"
};

// dummy request variable
var editThreadIDRequest = {
    Type: "Edit",
    EditAction: "EditThread_id",
    User_id: "Liz",
    oldThread_id: "c2",
    newThread_id: "c5"
};

// dummy request variable
var AddRegisteredToRequest = {
    Type: "Edit",
    EditAction: "AddRegTo",
    User_id: "Liz",
    newRegisteredTo: "Andre",
    Thread_id: 'c2'
};

// dummy request variable
var DeleteRegisteredToRequest = {
    Type: "Edit",
    EditAction: "DeleteRegTo",
    User_id: "Liz",
    delete: "Matt",
    Thread_id: 'c2'
};

// dummy request variable
var clearRegisteredToRequest = {
    Type: "Edit",
    EditAction: "ClearRegTo",
    User_id: "Liz",
    Thread_id: "c2"
};

// callback used to retrieve result of EditSubscription function
// example of how to call EditSubscription
EditSubscription(JSON.stringify(DeleteRegisteredToRequest), function callback(res){
    // do whatever with res which is the result of EditSubscription
    console.log(res);
    subscriptionModel.find(function (err, subscriptions) {
        if (err) return console.error(err);
        console.log(subscriptions);
    });
});



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
        if (details.Thread_id == null || details.User_id == null)   // Missing parameters in JSON obj
        {
            result = {resultText: "Incorrect JSON format for Delete. Match {'Type':'Delete','User_id':'uid','Thread_id':'thID'}"};
            doneFunction(result);
        }
        else
        {
            subscriptionModel.findOne({User_id: details.User_id, Thread_id: details.Thread_id}, function (err, doc){
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
        if (details.EditAction == null || (details.EditAction != "EditThread_id" && details.EditAction != "AddRegTo" && details.EditAction != "DeleteRegTo" && details.EditAction != "ClearRegTo"))
        {
            result = {resultText: "Incorrect JSON format for Edit. No EditAction specified. Choose 'EditThread_id/AddRegTo/DeleteRegTo/ClearRegTo'"};
            doneFunction(result);
        }
        else if (details.EditAction == "EditThread_id")
        {
            if (details.oldThread_id == null || details.newThread_id == null || details.User_id == null) // Missing parameters in JSON obj
            {
                result = {resultText: "Incorrect JSON format for 'EditThread_id'. Please specify oldThread_id, newThread_id and User_id"};
                doneFunction(result);
            }
            else
            {
                var conditions = {User_id: details.User_id, Thread_id: details.oldThread_id};
                var update = {Thread_id: details.newThread_id};

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
            if (details.User_id == null || details.newRegisteredTo == null || details.Thread_id == null) // Missing parameters in JSON obj
            {
                result = {resultText: "Incorrect JSON format for 'AddRegTo'. Please specify 'User_id', 'Thread_id' and 'newRegisteredTo'"};
                doneFunction(result);
            }
            else
            {
                subscriptionModel.findOne({User_id: details.User_id, Thread_id: details.Thread_id}, function (err, doc){
                    if (doc == null)
                    {
                        result =  {resultText:"No users matching Thread_id and User_id specified in " + obj};
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
            if (details.User_id == null || details.delete == null || details.Thread_id == null) // Missing parameters in JSON obj
            {
                result = {resultText: "Incorrect JSON format for 'DeleteRegTo'. Please specify 'User_id', 'Thread_id' and 'delete'"};
                doneFunction(result);
            }
            else
            {
                subscriptionModel.findOne({User_id: details.User_id, Thread_id: details.Thread_id}, function (err, doc){
                    if (doc == null)
                    {
                        result =  {resultText:"No users matching Thread_id and User_id specified in " + obj};
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
            if (details.User_id == null || details.Thread_id == null) // Missing parameters in JSON obj
            {
                result = {resultText: "Incorrect JSON format for 'AddRegTo'. Please specify 'User_id', 'Thread_id'"};
                doneFunction(result);
            }
            else
            {
                subscriptionModel.findOne({User_id: details.User_id, Thread_id: details.Thread_id}, function (err, doc){
                    if (doc == null)
                    {
                        result =  {resultText:"No users matching Thread_id and User_id specified in " + obj};
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