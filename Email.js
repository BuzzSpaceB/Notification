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
			var options = {
				from: 'DiscussionThree@gmail.com',
				to : "DiscussionThree@gmail.com",
				Subject: "New Notification",
				plain: "New Buzz Space Notification",
				html: '<b>New Buzz Space Notification ✔</b>',
			}
			var str = JSON.stringify(options);
			console.log(str);
			send(str);
		console.log("DONE VIA BUTTON CLICK")
		}
		
		if(request.method === 'GET')
		{
			console.log('GET');
		}
        response.end();  
    }).listen(80);
});

//This function Sends the email, Takes in a JSON string in the format FROM, TO, SUBJECT, PLAIN, HTML
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
