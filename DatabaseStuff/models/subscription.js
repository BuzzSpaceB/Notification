var mongoose = require('mongoose');

var SubscriptionShcema = mongoose.Schema({
    user_id: String,
	registeredTo: [String],
	thread_id: String
});

module.exports = mongoose.model("subscriptions", SubscriptionShcema);
