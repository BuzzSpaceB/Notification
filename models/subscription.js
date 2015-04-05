var mongoose = require('mongoose');

var subscriptionSchema = mongoose.Schema({
    	user_id: String,
	registeredTo: [String],
	thread_id: String
});

module.exports = mongoose.model("subscriptions", subscriptionSchema);
