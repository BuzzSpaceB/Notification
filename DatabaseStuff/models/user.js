var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	user_id             : String,           /* PK, this is the user_id as in LDAP i.e student number */
    username            : String,           /* The user's preferred username, like first name */
    roles               : [{role_name : [String], module: [String]}],      /* Array of Roles & modules of the user as from LDAP */
    modules      		: [String],          /* Array of Modules that is active for the user */
	post_count			: Number,
	status_value		: Number, 			 /* The status of the user as calculated by a status calculator */
	profile_pic		    : String,			 /* The status of the user as calculated by a status calculator */
	preffered_email		: String			 /* The email of the user, if they wish to change at a later date*/
});

UserSchema.methods.validPassword = function(password) {
    console.log("Validating password : " + password);
	//Todo: Get password from LDAP and compare with passed variable.
	// e.g var ldapPWD = ldap.getPassword(this.user_id);
    return password == "password";
};

module.exports = mongoose.model('users', UserSchema);
