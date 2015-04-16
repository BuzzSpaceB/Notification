var mongoose = require('mongoose')
    , ds = require('DatabaseStuff');

ds.init(mongoose);

var Post = ds.models.post;
var Thread = ds.models.thread;
 
var newPost = Post();
	newPost.title = "I need help";
	newPost.post_type = "Question";
	newPost.content = "Lorem Ipsum - test data words much sentence";
	newPost.date	 = new Date();
	newPost. mime_type = "text/html";
	newPost. appraisal_id = "0";

newPost.save(function (err, thePost) {
	if (err) 
		console.log("ERR: " + err);
	else
	{
		var newThread = Thread();
		newThread.parent_thread_id = "5527c698faa3e73c0f15b7fc"; 
		newThread.user_id = "u12345678"; 
		newThread.num_children = "0"; 
		newThread.closed = false; 
		newThread.hidden = false; 
		newThread.level = 0; 
		newThread.post_id = thePost._id; 
		newThread.subject = "Question"; 
		newThread.save(function (err, theThread) {
			if (err) 
				console.log("ERR: " + err);
			else
			{
				console.log("Saving thread to the db:\n " + theThread._id );
			}
		});
	}
});

Post.find(function (err, a) {
	if (err)
		console.log("ERR: " + err);
	else
		console.log("Found " + a.length + " posts in the database.");
});

Thread.find(function (err, a) {
	if (err)
		console.log("ERR: " + err);
	else
		console.log("Found " + a.length + " threads in the database.");
});
