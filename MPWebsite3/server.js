// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({

//     host: 'smtp.gmail.com',
//     provider: 'gmail',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'otolithmp@gmail.com', // Enter here email address from which you want to send emails
//       pass: 'Mpwebsite2020' // Enter here password for email account from which you want to send emails
//     },
//     tls: {
//     rejectUnauthorized: false
//     }
//   });

// Get our API routes
const api = require('./server/routes/api');
const app = express();


// Parsers for POST data
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our API routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {res.sendFile(path.join(__dirname,
'dist/index.html'));});

// Get port from environment and store in Express
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));



// //Sending email

// app.use(bodyParser.json());

// app.use(function (req, res, next) {

//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.post('/send', function (req, res) {

  
//   let userID = req.body[1];
//   let productName = req.body[4];
//   let totalAmount = req.body[2];
//   let orderDate = req.body[0];
//   let fullname = req.body[3].fullname;
//   let residentEmail = req.body[3].email;
//   let phone = req.body[3].phone;
//   let address = req.body[3].address;
//   let cardType = req.body[3].card_type;
//   let cardNo = req.body[3].card_no;
//   let lastCardNo = cardNo.substr(-4);
//   let staffEmail = ['otolithmp@gmail.com'];
  

//   // sent to resident
//   let mailOptions = {
//     to: residentEmail, 
//     from: fullname,
//     subject: 'Order Confirmation',
//     html: 'Hello ' + fullname +'<br><p>Thanks for shopping! You can find a summary of your order details below.'+
//     'Please allow up to 4 business days(excluding weekends,holidays and sale days) to process and ship your order.'+
//     'You will receive another email when your order has shipped.</p><br><h2>ORDER INFORMATION</h2>'+ 
//     '<br>User ID : ' + userID + '<br>Resident Name : ' + fullname +'<br>Order Date : ' + orderDate + 
//     '<br>Paid with : Credit card - ' + cardType + ' ending in ' + lastCardNo + '<br>Product ordered : '  + productName +  '<br>Total Amount : $' +
//      totalAmount + '<br>Phone : ' + phone + '<br>Shipping Address : '  + address + '<br><br><p>We hope you enjoyed your shopping experience with us and that you will visit us again soon. Thank you!</p>' +
//     'Otolith Enrichment<br><br><br><p>This is a computer generated reply. Please do not respond to this email.</p>'
  
//   };

//   // sent to staff
// let mailOptions2 = {
//   to: staffEmail, 
//   from: fullname,
//   subject: 'Resident Order',
//   html: 'Dear Staff<br><p>'+'Please noted that ' + fullname + ' had make an order on ' + orderDate + '. '+
//   'You are require to process and ship the resident order within 4 business days(excluding weekends,holidays and sale days)'+
//   ' and sent an email to inform the resident when the order has shipped.You can find a summary of resident order details below.</p><br><h2>ORDER INFORMATION</h2>' + 
//   '<br>User ID : ' + userID + '<br>Resident Name : ' + fullname + '<br>Order Date : ' + orderDate + '<br>Paid with : Credit card - ' +  cardType + ' ending in ' + lastCardNo + 
//   '<br>Product ordered : ' + productName  + '<br>Total Amount : $' + totalAmount + '<br>Phone : ' + phone + '<br>Shipping Address : '  + address +
//   '<br><br><p>Please update the resident in the event of any changes.</p>' +'<br>Thank you<br><br><br><p>This is an automatically generated email.</p>'
  
// };



 
  

// if (userID === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }


// if (productName === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }



// if (totalAmount === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }

// if (orderDate === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }

// if (fullname === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }

// if (residentEmail === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }

// if (phone === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }

// if (address === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }

// if (cardType === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }

// if (cardNo === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }





// transporter.sendMail(mailOptions, function (error, response) {
//   if (error) {
//     console.log(error);
//     res.end('error');
//   } else {
//     console.log('Message sent: ', response);
//     res.end('sent');
//   }
// });

// transporter.sendMail(mailOptions2, function (error, response) {
//   if (error) {
//     console.log(error);
//     res.end('error');
//   } else {
//     console.log('Message sent: ', response);
//     res.end('sent');
//   }
// });
// });




// app.post('/sendContact', function (req, res) {
//   let senderName = req.body.contactFormFullname;
//   let messageSubject = req.body.contactFormSubject;
//   let messageText = req.body.contactFormMessage;
//   let staffEmailAddress = ['otolithmp@gmail.com'];

//   let mailOptions3 = {
//     to: staffEmailAddress, 
//     from: senderName,
//     subject: messageSubject,
//     text: messageText
//   };


  
// if (senderName === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }


// if (messageSubject === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }

// if (messageText === '') {
//   res.status(400);
//   res.send({
//   message: 'Bad request'
//   });
//   return;
// }


// transporter.sendMail(mailOptions3, function (error, response) {
//   if (error) {
//     console.log(error);
//     res.end('error');
//   } else {
//     console.log('Message sent: ', response);
//     res.end('sent');
//   }
// });
// });
//app.listen(port, function () {
 // console.log('Express started on port: ', port);
//});





 
 
