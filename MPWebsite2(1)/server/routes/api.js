const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

// declare axios for making http requests
const axios = require('axios');
var db;

var jwt = require('jwt-simple');
var secret = 'harrypotter'; // Create custom secret for use in JWT

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({

    host: 'smtp.gmail.com',
    provider: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: 'otolithmp@gmail.com', // Enter here email address from which you want to send emails
      pass: 'Mpwebsite2020' // Enter here password for email account from which you want to send emails
    },
    tls: {
    rejectUnauthorized: false
    }
  });

MongoClient.connect('mongodb+srv://test1:testone1@cluster0-lwhgm.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser: true,
    useUnifiedTopology: true }, (err, database) => {
 if (err) return console.log(err);
 db = database.db('testone');
});

router.route('/stripePayment').post(function (req, res){
    let amount = req.body.amount;
    let email = req.body.email;
    amount *= 100
    console.log(amount);
    var stripe = require('stripe')('sk_test_1rDSmurlb4eqvy0eLJps8LEs00zuas2QXZ'); 

    stripe.charges.create(
        {
          amount: amount,
          currency: 'sgd',
          source: 'tok_visa',
          description: email + " Payment",
        },
        function(err, charge) {
          if (err && err.type === 'StripeCardError') {
              console.log(JSON.stringify(err, null, 2));
          }
          console.log("completed payment!");
      
        }
      );
  });

router.route('/sendEmailOrderConfirmation').post(function(req, res){
    let userID = req.body[1];
    let productName = req.body[4];
    let totalAmount = req.body[2];
    let orderDate = req.body[0];
    let fullname = req.body[3].fullname;
    let residentEmail = req.body[3].email;
    let phone = req.body[3].phone;
    let address = req.body[5];
    let unitNo = req.body[3].unitNo;
    let housingType = req.body[3].housingType;
    let cardType = req.body[3].card_type;
    let cardNo = req.body[3].card_no;
    let lastCardNo = cardNo.substr(-4);
    let staffEmail = ['otolithmp@gmail.com'];

    // sent to resident
    let mailOptions = {
        to: residentEmail, 
        from: fullname,
        subject: 'Order Confirmation',
        html: 'Hello ' + fullname +'<br><p>Thanks for shopping! You can find a summary of your order details below.'+
        'Please allow up to 4 business days(excluding weekends,holidays and sale days) to process your order.'+
        'You will receive another email to provide you with more details when your order has processed.</p><br><h2>ORDER INFORMATION</h2>'+ 
        '<br>User ID : ' + userID + '<br>Resident Name : ' + fullname +'<br>Order Date : ' + orderDate + 
        '<br>Paid with : Credit card - ' + cardType + ' ending in ' + lastCardNo + '<br>Product ordered/Program and Workshop registered  : '  + productName +  '<br>Total Amount : $' +
        totalAmount + '<br>Email : ' + residentEmail + '<br>Phone : ' + phone + '<br>Address : '  + address + '<br>Unit Number : ' + unitNo + '<br>Type of Housing : ' + housingType + 
        '<br><br><p>We hope you enjoyed your experience with us and that you will visit us again soon. Thank you!</p>' +
        'Otolith Enrichment<br><br><br><p>This is a computer generated reply. Please do not respond to this email.</p>'
    
    };

    // sent to staff
    let mailOptions2 = {
    to: staffEmail, 
    from: fullname,
    subject: 'Resident Order',
    html: 'Dear Staff<br><p>'+'Please noted that ' + fullname + ' had make an order on ' + orderDate + '. '+
    'You are require to process the resident order within 4 business days(excluding weekends,holidays and sale days)'+
    ' and sent an email to provide the resident with more details when the order has processed.You can find a summary of resident order details below.</p><br><h2>ORDER INFORMATION</h2>' + 
    '<br>User ID : ' + userID + '<br>Resident Name : ' + fullname + '<br>Order Date : ' + orderDate + '<br>Paid with : Credit card - ' +  cardType + ' ending in ' + lastCardNo + 
    '<br>Product ordered/Program and Workshop registered : ' + productName  + '<br>Total Amount : $' + totalAmount + '<br>Email : ' + residentEmail + '<br>Phone : ' + phone + 
    '<br>Address : '  + address + '<br>Unit Number : ' + unitNo + '<br>Type of Housing : ' + housingType + '<br><br><p>Please update the resident in the event of any changes.</p>' +
    '<br>Thank you<br><br><br><p>This is an automatically generated email.</p>'
    
    };


    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end('error');
        } else {
            console.log('Message sent: ', response);
            res.end('sent');
    }
    });

    transporter.sendMail(mailOptions2, function (error, response) {
        if (error) {
        console.log(error);
        res.end('error');
        } else {
        console.log('Message sent: ', response);
        res.end('sent');
        }
    });
});

//Authenticate user
router.route('/authuser').post(function(req, res2) 
{  
    var username = req.body.username;     
    var password = req.body.password;
    
    db.collection('users').findOne({"name": username}, { password: 1, role: 1, _id: 1, email:1, mobile:1, address:1, housingType:1, unitNo:1 }, function(err, result) 
    {   
        if (result == null) 
        res2.send([{"auth": false}]);
        else {   
        bcrypt.compare(password, result.password, function(err, res) 
        {
            console.log(res);
            console.log(result.verified);
            if(err || res == false) 
            {       
                res2.send([{"auth": false}]);    
            }
            else if(result.verified == false){
                res2.send([{"auth": false}]);    
            }

            else 
            {      
                res2.send([{"auth": true, "role": result.role, "userID":result._id, "mobile":result.mobile, "email":result.email, "address":result.address, "housingType": result.housingType, "unitNo": result.unitNo}]);   
            }    
        });
    }   
    }); 
});

// Send contact form
router.route('/sendContact').post(function (req, res) {
    let senderEmail = req.body.contactFormEmail
    let senderName = req.body.contactFormFullname;
    let messageSubject = req.body.contactFormSubject;
    let messageText = req.body.contactFormMessage;
    let staffEmailAddress = ['otolithmp@gmail.com'];
  
    let mailOptions3 = {
      to: staffEmailAddress,
      subject: messageSubject,
      text: " from " + senderEmail + " : " + messageText
    };
  
   if (senderEmail === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }
    
  if (senderName === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }
  
  
  if (messageSubject === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }
  
  if (messageText === '') {
    res.status(400);
    res.send({
    message: 'Bad request'
    });
    return;
  }
  
  
  transporter.sendMail(mailOptions3, function (error, response) {
    if (error) {
      console.log(error);
      res.end('error');
    } else {
      console.log('Message sent: ', response);
      res.end('sent');
    }
  });
  });
 
//Register User
router.route('/reguser').post(function(req, res) 
{  

    var rand = function() {
        return Math.random().toString(36).substr(2);
    };
    
    var token = function() {
        return rand() + rand();
    };
    
    token();

   

    var username = req.body.username;     
    var password = req.body.password;  
    var role = req.body.role;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var address = req.body.address;
    var unitNo = req.body.unitNo;
    var housingType = req.body.housingType
    var temporaryToken = token();

    let mailOptions = {
        to: email, // Enter here the email address on which you want to send emails from your customers
        from: 'otolithmp@gmail.com',
        subject: 'Otolith Account Authenticate',
        html:
        '<h2>Please Verify Your Account</h2>' + 
        'Hi ' + username + ',' + '<br><p>Please confrim your whether the details provided are correct</p>' +
        '<p>Mobile Number: ' + mobile + '</p>' +
        '<p>Address: ' + address + ' Unit Number: '+ unitNo +' Type of housing: '+ housingType +'</p>' +
        '<p>Please click on the "Verify Me" link bellow to verify your account. <br>'+
        'If you did not sign up with Otolith, please ignore this email or contact us at otolithmp@gmail.com</p><br>' + 
        '<a href="https://warm-forest-40312.herokuapp.com/accountValidation/' + temporaryToken + '">Verify Me</a>'
      
    };

    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end('error');
        } else {
            console.log('Message sent: ', response);
            res.end('sent');
    }
    });

    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash) 
    {    
        db.collection('users').insertOne({"name" : username, "password" : hash, "role" : role, "email" : email, "mobile": mobile, "address": address, "unitNo": unitNo, "housingType": housingType,"greenCurrency": 0, "collected": false, "verified": false, "temporaryToken":temporaryToken, "passwordToken":null},
        (err, result) => {   
        if (err) return console.log(err)   
        console.log('user registered')   
        res.send(result);    
    });
    
    
}); 
})

// reset password
router.route('/resetPassword').post(function(req, res) 
{  
  
    let username = req.body[0];     
    let email = req.body[1];
    

    console.log(username);
    console.log(email);
    
   
    var payload = {
        name: username,        
        email: email
    };
    let token =  jwt.encode(payload,secret);

    let mailOptions = {
        to: email,
        from: 'otolithmp@gmail.com',
        subject: 'Reset Password Request',
        html:    
        'Dear Resident ' +'<br>'+ 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or click on the reset password button to complete the process:<br>' +
        'https://warm-forest-40312.herokuapp.com/resetPassword/'   + token + '\n\n' + '<br>' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        
    };

    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end('error');
        } else {
            console.log('Message sent: ', response);
            res.end('sent');
    }
    });


    

        db.collection('users').updateOne({"name" : username}, {$set:{ "passwordToken": token}},
        (err, result) => {   
        if (err) return console.log(err)   
        console.log('updated')   
        res.send(result);    
    });
    

})


//Reset password based on email
router.route('/resetPasswordByEmail/:email').put(function(req, res) 
{   
    var password = req.body.password;  
    var email = req.body.email;
    

    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash)
    {
        db.collection('users').updateMany( {"email": email}, {$set:{ "password": hash}}, (err, result) => {
            if (err){
                return console.log(err);
            } 
            else{
                console.log('User updated');
                res.send(result)
            }
            
       });
    }); 
}) 


//Reset password based on name
router.route('/resetPasswordByName/:name').put(function(req, res) 
{   
  
    var username = req.body.username; 
    var password = req.body.password;  

    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash)
    {
        db.collection('users').updateMany( {"name": username}, {$set:{ "password": hash}}, (err, result) => {
            if (err){
                return console.log(err);
            } 
            else{
                console.log('User updated');
                res.send(result)
            }
            
       });
    }); 
}) 

//Verify Account
router.route('/verifyAccount/:name').put(function(req, res) 
{   
  
    var username = req.body.username; 
    var password = req.body.password;  

    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash)
    {
        db.collection('users').updateMany( {"name": username}, {$set:{ "password": hash, "verified":true}}, (err, result) => {
            if (err){
                return console.log(err);
            } 
            else{
                console.log('Account verified');
                res.send(result)
            }
            
       });
    }); 
}) 

// get all Resident
router.route('/getAllResident').get(function(req, res) {
    db.collection('users').find({"role": "user"} , { _id: 1, name: 1, password:1, email:1, mobile:1, role:1, address:1, greenCurrency:1, collected:1, verified:1 }).sort({'_id':-1}).toArray( (err, results) =>
    {res.send(results)});
});

// get all user
router.route('/getAllUser').get(function(req, res) {
    db.collection('users').find({} , { _id: 1, name: 1, password:1, email:1, mobile:1, role:1, address:1, greenCurrency:1, collected:1 }).sort({'_id':-1}).toArray( (err, results) =>
    {res.send(results)});
});

// get user by ID
router.route('/getUser/:_id').get(function(req, res) {
    db.collection('users').find({"_id": ObjectId(req.params._id)}).toArray( (err, results) =>
   {res.send(results)});
   });

// Scan UserQRCode to credit green currency
router.route('/box/:_id').put(function (req, res) {
    var boolean = req.body.boolean
    var greenCurrency = req.body.greenCurrency
    db.collection('users').updateOne({"_id" : ObjectId(req.params._id) }, {$set: { "collected": boolean, "greenCurrency": greenCurrency } }, (err, results) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.send(results);
    });
});

// Scan UserQRCode to credit green currency
router.route('/useGC/:_id').put(function (req, res) {
    var greenCurrency = req.body.greenCurrency
    db.collection('users').updateOne({"_id" : ObjectId(req.params._id) }, {$set: { "greenCurrency": greenCurrency } }, (err, results) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.send(results);
    });
});

// Change existing user role
router.route('/changeUserRole/:_id').put(function (req, res) {
    var role = req.body.role
    db.collection('users').updateOne({"_id" : ObjectId(req.params._id) }, {$set: { "role": role } }, (err, results) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.send(results);
    });
});

// delete user based on id
router.route('/deleteUser/:_id').delete(function(req, res) {
    db.collection('users').deleteOne( {"_id": ObjectId(req.params._id)}, (err,
    results) => {
    res.send(results);
    });
});

//Update user based on name
router.route('/updateusers/:name').put(function(req, res) 
{   

    var username = req.body.username; 
    var password = req.body.password;  
    var email = req.body.email;
    var mobile = req.body.mobile;
    var address = req.body.address;
    var unitNo = req.body.unitNo;
    var housingType = req.body.housingType

    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash)
    {
        db.collection('users').updateMany( {"name": username}, {$set:{ "password": hash, "email": email, "mobile": mobile, "address":address, "unitNo": unitNo, "housingType": housingType }}, (err, result) => {
            if (err){
                return console.log(err);
            } 
            else{
                console.log('User updated');
                res.send(result)
            }
            
        });
    }); 
})  


// get all news
router.route('/news').get(function(req, res) {
    db.collection('news').find().sort({'_id':-1}).toArray( (err, results) =>
   {res.send(results)});
   });

// get news based on date (newest to oldest) 
router.route('/newsByNewDate').get(function(req, res) {
    db.collection('news').find().sort({'publish':-1}).toArray( (err, results) =>
   {res.send(results)});
   });

// get news based on date (oldest to newest) 
router.route('/newsByOldDate').get(function(req, res) {
    db.collection('news').find().sort({'publish':1}).toArray( (err, results) =>
   {res.send(results)});
   });



// get news Info
router.route('/newsInfo/:_id').get(function(req, res) {
    db.collection('news').find({"_id": ObjectId(req.params._id)}).toArray( (err, results) =>
   {res.send(results)});
   });


// post news
router.route('/postNews').post(function (req, res) {
    db.collection('news').insertOne(req.body, (err, results) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.send(results);
    });
   });

// delete news based on id
router.route('/deleteNews/:_id').delete(function(req, res) {
   db.collection('news').deleteOne( {"_id": ObjectId(req.params._id)}, (err,
   results) => {
   res.send(results);
   });
   });
   
   
// update news based on id
router.route('/editNews/:_id').put(function(req, res) {
   db.collection('news').updateOne( {"_id": ObjectId(req.params._id)}, {
   $set: req.body }, (err, results) => {
   res.send(results);
   });
   });
   
// get all projects
router.route('/programs').get(function(req, res) {
    db.collection('projects').find().sort({'_id':-1}).toArray( (err, results) =>
   {res.send(results)});
   });

// get projects based on date (newest to oldest) 
router.route('/programsByNewDate').get(function(req, res) {
    db.collection('projects').find().sort({'publish':-1}).toArray( (err, results) =>
   {res.send(results)});
   });

// get projects based on date (oldest to newest) 
router.route('/programsByOldDate').get(function(req, res) {
    db.collection('projects').find().sort({'publish':1}).toArray( (err, results) =>
   {res.send(results)});
   });


// get project info by ID
router.route('/programInfo/:_id').get(function(req, res) {
    db.collection('projects').find({"_id": ObjectId(req.params._id)}).toArray( (err, results) =>
   {res.send(results)});
   });   

// add attendee to project
router.route('/postAttendee/:_id').put(function (req, res) {
    var userName = req.body.test
    db.collection('projects').updateOne({"_id" : ObjectId(req.params._id) }, {$push: { "attendees": userName}}, (err, results) => {
    if (err) return console.log(err);
    res.send(results);
    });
});

// post project
router.route('/postProgram').post(function (req, res) {
    db.collection('projects').insertOne(req.body, (err, results) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.send(results);
    });
   });

// delete project based on id
router.route('/deleteProgram/:_id').delete(function(req, res) {
   db.collection('projects').deleteOne( {"_id": ObjectId(req.params._id)}, (err,
   results) => {
   res.send(results);
   });
   });
   
// update project based on id
router.route('/editProgram/:_id').put(function(req, res) {
   db.collection('projects').updateOne( {"_id": ObjectId(req.params._id)}, {
   $set: req.body }, (err, results) => {
   res.send(results);
   });
   });

   // Remove user from project based on id
router.route('/removeResident/:_id').put(function(req, res) {
    var userName = req.body.test
    db.collection('projects').updateOne( {"_id": ObjectId(req.params._id)}, {$pull: {"attendees" : userName}}, (err, results) => {
    res.send(results);
    });
    });
  
// get all products
router.route('/products').get(function(req, res) {
    db.collection('products').find().sort({'_id':-1}).toArray( (err, results) =>
   {res.send(results)});
   });

//get products based on category
   router.route('/productsByCategory/:category').get(function(req, res) 
   {  
    var category = req.params.category;
    
    db.collection('products').find({"category": category}).sort({'_id':-1}).toArray( (err, results) =>
    {res.send(results)});
    
});


//get all products based on date (newest to oldest)

router.route('/allProductsNewDate').get(function(req, res) 
{  
    db.collection('products').find().sort({'last_update': -1}).toArray( (err, results) => 
    {res.send(results)});
    
});


//get products based on date (newest to oldest)

router.route('/productsByNewDate/:category').get(function(req, res) 
{  
    
    var category = req.params.category;

    db.collection('products').find({"category": category}).sort({'last_update':-1}).toArray( (err, results) =>
    {res.send(results)});
    
    
});


//get all products based on date (oldest to newest)

router.route('/allProductsOldDate').get(function(req, res) 
{  
    db.collection('products').find().sort({'last_update': 1}).toArray( (err, results) => 
    {res.send(results)});
    
});

//get products based on date (oldest to newest)

router.route('/productsByOldDate/:category').get(function(req, res) 
{  
    
    var category = req.params.category;
    
    db.collection('products').find({"category": category}).sort({'last_update':1}).toArray( (err, results) =>
    {res.send(results)});
    
    
});

// get all products Info
router.route('/productsInfo/:_id').get(function(req, res) {
    db.collection('products').find({"_id": ObjectId(req.params._id)}).toArray( (err, results) =>
   {res.send(results)});
   });

 // insert new products
 router.route('/addProducts').post(function(req, res) {
    db.collection('products').insertOne(req.body, (err, results) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.send(results);
    });
    });

// delete products based on id
router.route('/deleteProducts/:_id').delete(function(req, res) {
    db.collection('products').deleteOne( {"_id": ObjectId(req.params._id)}, (err,
    results) => {
    res.send(results);
    });
    });
   
   
// update products based on id
router.route('/editProducts/:_id').put(function(req, res) {
    db.collection('products').updateOne( {"_id": ObjectId(req.params._id)}, {
    $set: req.body }, (err, results) => {
    res.send(results);
    });
    });

// get products from cart
router.route('/cart/:uID').get(function(req, res) {

    var uID = req.params.uID;

    db.collection('carts').find({"userID": uID}).sort({'_id':-1}).toArray((err, results) =>
   {
       if(err){
        console.log(err);
       }
       else{
        res.send(results)
       }
    });
   });
   
// add products to cart
router.route('/addToCart').post(function(req, res) {
    db.collection('carts').insertOne(req.body, (err, results) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.send(results);
    });
    });

// delete products from cart
router.route('/deleteCart/:_id').delete(function(req, res) {
    db.collection('carts').deleteOne( {"_id": ObjectId(req.params._id)}, (err,
    results) => {
    res.send(results);
    });
    });


// delete all products in cart
router.route('/clearCart/:userID').delete(function(req, res) {
   
    db.collection('carts').deleteMany({"userID": req.params.userID}, (err,
    results) => {
    res.send(results);
    });
    });

// update cart based on id
router.route('/cart/:_id').put(function(req, res) {
    db.collection('carts').updateOne( {"_id": ObjectId(req.params._id)}, { 
    $set: req.body }, (err, results) => {
    res.send(results);
    });
    });

// get all orders
router.route('/order').get(function(req, res) {
    db.collection('orders').find().sort({'_id':-1}).toArray( (err, results) =>
   {res.send(results)});
   });

// get orders based on userID
router.route('/order/:userID').get(function(req, res) {
    var userID = req.params.userID;

    db.collection('orders').find({"userID": userID}).sort({'_id':-1}).toArray((err, results) =>
   {res.send(results)});
   });

// insert new order
router.route('/order').post(function(req, res) {
    db.collection('orders').insertOne(req.body, (err, results) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.send(results);
    });
    });

// delete order
router.route('/deleteOrder/:_id').delete(function(req, res) {
    db.collection('orders').deleteOne( {"_id": ObjectId(req.params._id)}, (err,
    results) => {
    res.send(results);
    });
    });

// get all order Info
router.route('/orderInfo/:_id').get(function(req, res) {
    db.collection('orders').find({"_id": ObjectId(req.params._id)}).toArray( (err, results) =>
   {res.send(results)});
   });
    

// add products to wishlist
router.route('/addToWishlist').post(function(req, res) {
    db.collection('wishlist').insertOne(req.body, (err, results) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.send(results);
    });
    });

// get products from wishlist
router.route('/wishlist/:uID').get(function(req, res) {

    var uID = req.params.uID;

    db.collection('wishlist').find({"userID": uID}).sort({'_id':-1}).toArray((err, results) =>
   {
       if(err){
        console.log(err);
       }
       else{
        res.send(results)
       }
    });
   });


   // update wishlist based on id
router.route('/wishlist/:_id').put(function(req, res) {
    db.collection('wishlist').updateOne( {"_id": ObjectId(req.params._id)}, { 
    $set: req.body }, (err, results) => {
    res.send(results);
    });
    });

// delete products from wishlist
router.route('/deleteWishlist/:_id').delete(function(req, res) {
    db.collection('wishlist').deleteOne( {"_id": ObjectId(req.params._id)}, (err,
    results) => {
    res.send(results);
    });
    });

// remove products from wishlist by itemID
router.route('/removeWishlist/:itemID').delete(function(req, res) {
    db.collection('wishlist').deleteOne( {"itemID": req.params.itemID}, (err,
    results) => {
    res.send(results);
    });
    });

// get all programs
router.route('/programmes').get(function(req, res) {
    db.collection('programs').find().sort({'_id':-1}).toArray( (err, results) =>
   {res.send(results)});
   });

// get programs based on date (newest to oldest) 
router.route('/programmesByNewDate').get(function(req, res) {
    db.collection('programs').find().sort({'last_update':-1}).toArray( (err, results) =>
   {res.send(results)});
   });

// get programs based on date (oldest to newest) 
router.route('/programmesByOldDate').get(function(req, res) {
    db.collection('programs').find().sort({'last_update': 1}).toArray( (err, results) =>
   {res.send(results)});
   });



// get programs Info
router.route('/programmesInfo/:_id').get(function(req, res) {
    db.collection('programs').find({"_id": ObjectId(req.params._id)}).toArray( (err, results) =>
   {res.send(results)});
   });


// add programs
router.route('/addProgrammes').post(function (req, res) {
    db.collection('programs').insertOne(req.body, (err, results) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.send(results);
    });
   });

// Add user to program 
router.route('/addToPrograms/:_id').put(function (req, res) {
    var userName = req.body.test
    
    db.collection('programs').updateOne({"_id" : ObjectId(req.params._id) }, {$push: { "slot":  userName}}, (err, results) => {
    if (err) return console.log(err);
    res.send(results);
    });
});

// Remove user from program based on id
router.route('/removeFromPrograms/:_id').put(function(req, res) {
    var userName = req.body.test
    db.collection('programs').updateOne( {"_id": ObjectId(req.params._id)}, {$pull: {"slot" : userName}}, (err, results) => {
    res.send(results);
    });
    });

// delete program based on id
router.route('/deleteProgrammes/:_id').delete(function(req, res) {
   db.collection('programs').deleteOne( {"_id": ObjectId(req.params._id)}, (err,
   results) => {
   res.send(results);
   });
   });
   
   
// update program based on id
router.route('/editProgrammes/:_id').put(function(req, res) {
   db.collection('programs').updateOne( {"_id": ObjectId(req.params._id)}, {
   $set: req.body }, (err, results) => {
   res.send(results);
   });
   });


module.exports = router;
