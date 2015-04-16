var SMTPConnection = require('smtp-connection');
var email = require('mailer');
/*	
	var options = {
        from: 'Buzz No Reply <DiscussionThree@gmail.com>',
        to : "matty.gouws@gmail.com",
        subject: "New Notification",
        plain: "New Buzz Space Notification",
        html: "<b>New Buzz Space Notification </br> Please  <a href='http://www.cs.up.ac.za'>Click Here</a> To see the post</b>"
    }
*/
module.exports = function send(options)
{
	options = JSON.parse(options);
	console.log(options);
	var newOptions = {  
	  host : "mail.cs.up.ac.za",              // smtp server hostname
	  port : "25",                     // smtp server port
	  domain : "Buzz",            // domain used by client to identify itself to server
	  to : options.to,
	  from : "buzz@cs.up.ac.za",
	  subject : options.subject,
	  body: options.html
	};
	console.log(newOptions);
	email.send(newOptions,function(err, result){  
  if(err){ console.log(err);
  }
  console.log(result);
});
}


/*var connection = new SMTPConnection({
		port: 25,
		host: 'mail.cs.up.ac.za',
		name: "Buzz"
	});
console.log(connection);

module.exports.send = send;
function send(options)
{

	connection.connect(connection.send({
                from: 'test@cs.up.ac.za',
               to: 'matty.gouws@gmail.com'
            }, "message", function(err, info) {console.log(err);console.log(info);}));
}*/
/*
function doSend(options)
{
	console.log(connection);
	options = JSON.parse(options);
		console.log(options.to);
		envelope = {
			from: "NoReply-Buzz@cs.up.ac.za",
			to: options.to
		};
		console.log(envelope.to);
		connection.send(envelope,options.plain, function(err, info){
				   console.log(err);
					//done();
		});
}*/
