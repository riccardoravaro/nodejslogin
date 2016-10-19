var express = require('express');
var multer = require('multer');
//handle file uploads
var upload = multer({dest:'./uploads'});
var User = require('../models/user');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/register', function(req, res, next) {
  res.render('register');
});

 router.get('/login', function(req, res, next) {
   res.render('login');
 });

 router.post('/register', upload.single('profileimage'),function(req, res, next){

 	var name = req.body.name;
 	var email = req.body.email;
 	var username = req.body.username;
 	var password = req.body.password;
 	var password2 = req.body.password2;
 	console.log(req.file);
 	if(req.file){
 		console.log('uploading File...');
 		var profileimage = req.file.filename;

 	} else {
 		console.log('No File Uploaded');
 		var profileimage = 'noimage.jpg';
 	};

 	// Validation
 	
 	req.checkBody('name', 'Name field is required').notEmpty();
 	req.checkBody('email', 'Email field is required').notEmpty();
 	req.checkBody('email', 'Email field is not an email').isEmail();
 	req.checkBody('username', 'Useraname field is required').notEmpty();
 	req.checkBody('password', 'Password field is required').notEmpty();
 	req.checkBody('password2', 'Password do not match').equals(req.body.password);

 	// Check Errorrs
 	var errors = req.validationErrors();

 	if(errors) {
 		res.render('register', {
 			errors: errors
 		})
 	} else {
 		console.log('No errors');
 		console.log(User);
 		var newUser = new User ({
 			name: name,
 			email: email,
 			username: username,
 			passowrd: password,
 			profileimage: profileimage
 		});

 		User.createUser(newUser, function(err, user){
 			if(err) throw err;
 			console.log(user);
 		})

 		req.flash('success', 'You are now registered and can Login');
 		res.location('/');
 		res.redirect('/');
 	}

 })

module.exports = router;
