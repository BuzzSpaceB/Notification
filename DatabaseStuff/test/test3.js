var mongoose = require('mongoose')
    , ds = require('DatabaseStuff');

ds.init(mongoose);

var User = ds.models.user;

var newUser = User();
    newUser.user_id = "u00000001";
    newUser.username = "Homer";
    newUser.roles =  [{role_name : "Student", module: "COS301"}, {role_name : "Student", module: "COS332"}, {role_name : "Student", module: "COS314"}];
    newUser.modules = ["COS301", "COS332", "COS314"];
    newUser.post_count = 0;
    newUser.status_value = 0;

    newUser.save(function (err, theUser) {
        if (err)
            console.log("ERR: " + err);
        else
            console.log("Saved user the db:\n " + theUser.user_id );
    });

var newUser2 = User();
    newUser2.user_id = "u00000002";
    newUser2.username = "Bart";
    newUser2.roles =  [{role_name : "Student", module: "COS301"}, {role_name : "Student", module: "COS332"}, {role_name : "Student", module: "COS314"}];
    newUser2.modules = ["COS301", "COS332", "COS314"];
    newUser2.post_count = 0;
    newUser2.status_value = 0;

    newUser2.save(function (err, theUser) {
        if (err)
            console.log("ERR: " + err);
        else
            console.log("Saved user the db:\n " + theUser.user_id );
    });

var newUser3 = User();
    newUser3.user_id = "u00000003";
    newUser3.username = "Lisa";
    newUser3.roles =  [{role_name : "Lecturer", module: "COS301"}, {role_name : "TA", module: "COS332"}, {role_name : "TA", module: "COS314"}];
    newUser3.modules = ["COS301", "COS332", "COS314"];
    newUser3.post_count = 0;
    newUser3.status_value = 0;

    newUser3.save(function (err, theUser) {
        if (err)
            console.log("ERR: " + err);
        else
            console.log("Saved user the db:\n " + theUser.user_id );
    });

var newUser4 = User();
    newUser4.user_id = "u00000004";
    newUser4.username = "Marge";
    newUser4.roles =  [{role_name : "Student", module: "COS301"}, {role_name : "Student", module: "COS332"}, {role_name : "Student", module: "COS314"}];
    newUser4.modules = ["COS301", "COS332", "COS314"];
    newUser4.post_count = 0;
    newUser4.status_value = 0;

    newUser4.save(function (err, theUser) {
        if (err)
            console.log("ERR: " + err);
        else
            console.log("Saved user the db:\n " + theUser.user_id );
    });

var newUser5 = User();
    newUser5.user_id = "u00000005";
    newUser5.username = "Maggy";
    newUser5.roles =  [{role_name : "Student", module: "COS301"}, {role_name : "Student", module: "COS332"}, {role_name : "Student", module: "COS314"}];
    newUser5.modules = ["COS301", "COS332", "COS314"];
    newUser5.post_count = 0;
    newUser5.status_value = 0;

    newUser5.save(function (err, theUser) {
        if (err)
            console.log("ERR: " + err);
        else
            console.log("Saved user the db:\n " + theUser.user_id );
    });
var newUser6 = User();
    newUser6.user_id = "u00000006";
    newUser6.username = "Mr. Burns";
    newUser6.roles =  [{role_name : "AL", module: "COS301"}, {role_name : "Lecturer", module: "COS332"}, {role_name : "Lecturer", module: "COS314"}];
    newUser6.modules = ["COS301", "COS332", "COS314"];
    newUser6.post_count = 0;
    newUser6.status_value = 0;

    newUser6.save(function (err, theUser) {
        if (err)
            console.log("ERR: " + err);
        else
            console.log("Saved user the db:\n " + theUser.user_id );
    });