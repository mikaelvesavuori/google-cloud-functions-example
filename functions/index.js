const firebase = require('firebase');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

const config = {
	{API_KEY}: 'AIzaSyDdTcpvpTIIAgDhSMiy2LBUNZWHbaYTG2A',
	authDomain: '{PROJECT}.firebaseapp.com',
	databaseURL: 'https://{PROJECT}.firebaseio.com',
	projectId: '{PROJECT}',
	storageBucket: '{PROJECT}.appspot.com',
	{MESSAGING_SENDER_ID}: '608289176034'
};
let db = firebase.initializeApp(config);

exports.sendEmail = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		function sendEmail() {
			const body = JSON.parse(req.body);
			const text = body.text;
			const email = body.email;

			nodemailer.createTestAccount((err, account) => {
				if (err) {
					console.warn(`Error in Nodemailer: ${err}`);
					return res.status(500).send();
				} else {
					// We are using Ethereal which gives a fake account, but it won't send an actual email to you
					// You can of course hook the transporter up to your Hotmail, Gmail or whatever other account you want
					const transporter = nodemailer.createTransport({
						host: 'smtp.ethereal.email',
						port: 587,
						secure: false, // true for 465, false for other ports
						auth: {
							user: account.user, // Generated Ethereal user
							pass: account.pass // Generated Ethereal password
						}
					});

					const mailOptions = {
						from: "'Demo Sender' <example@ethereal.email>",
						to: [`${email}`],
						subject: 'Email sent via Google Cloud Functions Example',
						text: `${text}`,
						html: `${text}`
					};

					transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							console.log(error);
							return false;
						}
						// This URL is where you can see what was in the email
						console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
						return true;
					});
				}
				return true;
			});
		}

		function writeToDatabase() {
			const data = JSON.parse(req.body);
			const formattedData = `'${data.text}' from: ${data.email}`;

			const orderDB = db
				.database()
				.ref()
				//.child('/anyKindOfSubpath') // Use this if you want to write something to a subpath
				.push(formattedData);
		}

		sendEmail();
		writeToDatabase();
	});

	return res.status(200).send();
});
