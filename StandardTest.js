var StandardNotification = require('./StandardNotification.js');
var thread = "root";
StandardNotification(thread);
/*module.exports = function StandardNotification(obj) {

	sender = JSON.parse(obj);
	Threads.find({ thread_id: sender.thread}, function(err, docs) 
	{
		if (err) 
		{
			throw err;			
		}
		else
		{	if(docs.length == 0)
			{
				console.log("Thread doesn't exist..")
			}
			else
			{	
				callingThread = docs[0].thread_id;
				callingUser = docs[0].user_id;
				GetSubscribers(docs[0].thread_id);
			}
		}
	});
}*/