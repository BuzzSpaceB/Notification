var SMTPConnection = require('smtp-connection');
Connect={
	port: 25,
	host: 'mail.cs.up.ac.za',
	secure: false,
	ignoreTLS: true,
	name: "Buzz"
};
var connection = new SMTPConnection(Connect);

function send(options)
{
	envelope = {
		from: "NoReply-Buzz@cs.up.ac.za",
		to: options.to
	};
	connection.send(envelope,"Subject:"+options.subject + "\n\n"+ options.plain, function(error, info){
		if(error)
		{
			console.log("Error Sending Message" + error);
		}
		else
		{
			console.log('Message sent: ' + info.response);
		}
}
