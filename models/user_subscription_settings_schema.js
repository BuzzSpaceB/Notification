var mongoose = require('mongoose');

var UserSubscriptionSettingsSchema = mongoose.Schema (
{
	user_id: String,
	Deletion: Boolean,
	Appraisal: Boolean,
	InstantEmail: Boolean,
	DailyEmail: Boolean
});
module.exports = mongoose.model("subscriptionsettings", UserSubscriptionSettingsSchema);

