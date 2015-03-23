var express = require('express'),
    app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
var http = require('http'), fs = require('fs');
var nodemailer = require('nodemailer');

// as only one page can use res.sendfile to render the page which will contain the drop   downs
app.post('/', function (req, res) {
    res.sendfile('Appraisal.html');
});

//Builds the content used to send the email using the appraisal type
app.post('/target', function (req, res) {
	var appraisal = req.body.appraisal;
	var econtent = "New Buzz Space Notification";
	var bod = "User has given your post this appraisal:  " + appraisal ;
	send("DiscussionThree@gmail.com", 'DiscussionThree@gmail.com', "New Appraisal Notification",econtent,bod);
		
});

//Gets the specific action and opens the html page
app.get('/', function (req, res) {
    res.sendfile('Appraisal.html');
});

//Listens to the port 
app.listen(81,'127.0.0.1',function(){
	console.log('Server is running.');
});

//This is the important Function - From can be changed to be global at a later stage
function send(_to, _From, _Subject, _text, _htmlText){
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
