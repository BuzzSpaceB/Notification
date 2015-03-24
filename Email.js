var nodemailer = require('nodemailer');

//This function Sends the email, Takes in a JSON string in the format FROM, TO, SUBJECT, PLAIN, HTML
module.exports = function send(options)
{
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'DiscussionThree@gmail.com',
			pass: 'qetuoadgjl'
		}
	});
	var mailOptions = JSON.parse(options);
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log("****" + error);
		}else{
			console.log('Message sent: ' + info.response);
		}
	});
}
