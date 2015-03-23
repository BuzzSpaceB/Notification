/*********************************************************CORE EMAIL******************************************************************************************************/
//This function Sends the email, Takes in a JSON string in the format FROM, TO, SUBJECT, PLAIN, HTML
/*
 *	@author Matthew	
 *  @param options is a JSON string which is parsed to the function containing the from, to, subject, plain and html before sending the data off to the user
*/
function send(options)
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
/*****************************************************************************************************************************************************************************/