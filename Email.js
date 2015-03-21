var http = require('http'),
    fs = require('fs');
var nodemailer = require('nodemailer');
fs.readFile('index.html', function (err, html) 
{
    if (err) 
	{
        throw err; 
    }       
    http.createServer(function(request, response) 
	{  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
		if(request.method === 'POST') // This is to allow the button to click, Can add functionality later which allows for fields to be entered etc
		{
			
			send("DiscussionThree@gmail.com", 'DiscussionThree@gmail.com', "New Notification", "New Buzz Space Notification",'<b>New Buzz Space Notification ✔</b>')
		console.log("DONE VIA BUTTON CLICK")
		}
		
		if(request.method === 'GET')
		{
			console.log('GET');
		}
        response.end();  
    }).listen(80);
});

//This is the important Function - From can be changed to be global at a later stage
function send(_to, _From, _Subject, _text, _htmlText)
{
	// create reusable transporter object using SMTP transport
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'DiscussionThree@gmail.com',
			pass: 'qetuoadgjl'
		}
	});

	var mailOptions = {
			from: 'noReply@Buzz.cs.up.ac.za ✔<'+_From+'>', // sender address
			to: _to, // list of receivers
			subject: _Subject, // Subject line
			text: _text, // plaintext body
			html: _htmlText // html body
	};
	// NB! No need to recreate the transporter object. You can use
	// the same transporter object for all e-mails

	// setup e-mail data with unicode symbols


	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log("****" + error);
		}else{
			console.log('Message sent: ' + info.response);
		}
	});
}
