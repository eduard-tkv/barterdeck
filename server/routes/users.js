const router = require('express').Router();
const path = require('path');
const passport = require('passport');
const Account = require('../models/account');
const fs = require('fs');

const bodyParser = require('body-parser');
const Busboy = require('busboy');
const inspect = require('util').inspect;
const parserFalse = bodyParser.urlencoded({ extended: false });
const parserTrue = bodyParser.urlencoded({ extended: true });

const registerHelpers = require('../helpers/register');
const loginHelpers = require('../helpers/login');
const lists = require('./listings28');

const jwt = require('jsonwebtoken');
const config = require('../config');

const cors = require('cors');

router.post('/register', (req, res, next)=>{
  
  console.log(`inside post register, req.headers and req.body below`);
  console.log(req.headers);
  console.log(req.body);
  console.log(`inside post register, before busboy req.headers`);
  var busboy = new Busboy({ headers: req.headers });
  
  console.log(`inside post register, after busboy req.headers`);
  
  let nickname = '';
  let email = '';
  let password = '';
  
  /*
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    file.on('data', function(data) {
      console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
    });
    file.on('end', function() {
      console.log('File [' + fieldname + '] Finished');
    });
  });
  */
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    if(fieldname == 'nickname') { nickname = val; }
    if(fieldname == 'email') { email = val; }
    if(fieldname == 'password') { password = val; }

  });
  
  busboy.on('finish', function() {
    console.log('Done parsing form!');
    console.log('email: ' + email + 'password: ' + password + 'username: ' + nickname);
    Account.register(new Account({ nickname: nickname, email: email }), password, (err, user) => {
      if(err){
        registerHelpers.error(err, res);
      } else {
        registerHelpers.success(res);
      }
    });
  });
  
  req.pipe(busboy);
});

// Using body parser temporarily for login
// Will be switching to busboy later on
router.post('/login', parserFalse, (req, res, next) => {
  console.log('logging in user');
  
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  passport.authenticate('local', (err, user, info) => {
    console.log(`\ninside passport authenticate, req fields below\n`);
    console.log(req.body.email);
    console.log(req.body.passwordOne);
    
    console.log(`req headers authorization token below`);
    console.log(req.headers.Authorization);
    
    console.log(`req headers below`);
    console.log(req.headers);
    
    console.log(`\ninside passport authenticate, req.body below\n`);
    console.log(req.body);
    console.log(`\nend of req\n`);
    
    console.log(`user id below`);
    console.log(user._id);
    
    if(!user){
      console.log(`inside no user`);
      return res.json({ 
        error: true, 
        message: "Password or email are incorrect" 
      });
    }
    
    if(err){
      console.log('err:');
      console.log(err.message);
      loginHelpers.error(err, res);
    }
    
    req.logIn(user, function(err){
      console.log(`inside req.logIn`);
      if (err){
        loginHelpers.error(err, res);
      }
      
      console.log(`user id below`);
      console.log(user._id);
      
      const payload = {
        user: user._id 
      };
      
      console.log(`const payload below`);
      console.log(payload);
      
      console.log(`config below`);
      console.log(config);
      
      console.log(`config.jwtsecret below`);
      console.log(config.jwtSecret);
      
      var token = jwt.sign(payload, config.jwtSecret, {
        expiresIn: "2d" // expires in 2 days
      });
      
      console.log(`token below`);
      console.log(token);
      
      return res.json({
        error: false,
        message: "Login Success",
        username: user.nickname,
        token: token
      });
    });
  })(req, res, next);
});



router.post('/setlocation', (req, res, next)=>{
  
  let location;
  let query = '';
  let token = null;
  
  console.log(`inside post setlocation\n`);
  console.log(`inside post setlocation req.headers below`);
  console.log(req.headers);
  
  // Create a busboy instance
  console.log(`inside post setlocation, before new Busboy\n`);
  let busboy = new Busboy({ 
    headers: req.headers
  });
  
  console.log(`inside post setlocation before token slice\n`);
  
  // Extract the token from headers.authorization
  if(req.headers.authorization){
    token = req.headers.authorization.slice(7);
  }
  console.log(`inside post setlocation after token slice\n`);
 
  
  if (token) {
    console.log(`token below`);
    console.log(token);
    
    console.log(`token secret key below`);
    console.log(config.jwtSecret);
    
    // decode token, verifies secret and checks exp
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      if (err) {
        console.log(`inside verify token error, error below`);
        console.log(err);
        
        return res.send({
          error: true,
          status: 'tokenfail',
          message: 'Failed to authenticate token.' 
        });  
        next();
      } else {
                
        console.log(`inside verify token NO error, decoded token below`);
        console.log(decoded);
        query = { "_id": decoded.user };

        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
          console.log('Field [' + fieldname + ']: value: ' + inspect(val));
          if(fieldname == 'location') { location = JSON.parse(val); }
        });

        busboy.on('error', function(err){
          console.log('inside busboy error, error message below');
          console.log(err);
          res.send({ 
            error: true, 
            status: 'setlocationerror',
            message: 'Setting location failed. Please try again.' });
        });

        // Upon finishing form and image upload save the form and image name in db
        busboy.on('finish', function() {
          console.log('Done parsing form!, listing detals below');
          
          let setLocation = { $push: { location: location } };
        
            Account.findOneAndUpdate(query, setLocation, function(err, doc){
              console.log(`inside account update save listing details\n`);
              // Not checking for err for now as
              // it will set headers twice, maybe later
              if(err){
                console.log(`ERROR inside account update, error saving the listing`);
                res.send({ 
                  error: true,
                  status: 'setlocationerror',
                  message: 'Error setting the location!' });
              } else {
                res.send({
                  error: false,
                  status: 'setlocationsuccess',
                  message: 'Location saved'
                });
              }
          });


        });
        
        req.pipe(busboy);
      }
    });

  } else {
    return res.json({ 
      error: true, 
      status: 'notoken', 
      message: 'No token found.' }); 
    next();
  }
  
  // status codes:
  // 'notoken' - redirect to login page
  // 'tokenfail' - redirect to login page
  // in all other cases display the error
});






//  '/listitem'
router.post('/listitem', (req, res, next)=>{
  
  let itemOffered = '';
  let itemSought = '';
  let sellFor = null;
  let description = '';
  let postedOn = Date.now();
  let query = '';
  let limitReach = false;
  let dir = '';
  let imagePath = '';
  let fstream = null;
  let imageMimeTypes = ['image/png', 'image/jpeg'];
  let filenameDatestamp = '';
  let token = null;
  
  console.log(`inside post listitem\n`);
  console.log(`inside post listitem req.headers below`);
  console.log(req.headers);
  
  // Create a busboy instance limiting the number of files
  // to one and the file size to 500kb
  console.log(`inside post listitem, before new Busboy\n`);
  let busboy = new Busboy({ 
    headers: req.headers,  
    limits: { files: 1, fileSize: 510000 }  
  });
  
  console.log(`inside post listitem before token slice\n`);
  
  // Extract the token from headers.authorization
  if(req.headers.authorization){
    token = req.headers.authorization.slice(7);
  }
  console.log(`inside post listitem after token slice\n`);
 
  
  if (token) {
    console.log(`token below`);
    console.log(token);
    
    console.log(`token secret key below`);
    console.log(config.jwtSecret);
    
    // decode token, verifies secret and checks exp
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      if (err) {
        console.log(`inside verify token error, error below`);
        console.log(err);
        
        return res.send({ 
          error: true,
          status: 'tokenfail',
          message: 'Failed to authenticate token.' 
        });  
        next();
      } else {
                
        console.log(`inside verify token NO error, decoded token below`);
        console.log(decoded);
        
        console.log(`inside list item, just before busboy.on file\n`);

 
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
          console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
          
          console.log(`inside busboy on.file\n`);

          // directory where user's images will be stored
          dir = __dirname + "/../public/images/" + decoded.user;
          
          filenameDatestamp = Date.now() + '_' + filename;
          
          // path to the image
          imagePath = dir + "/" + filenameDatestamp;
          
          console.log(`imagepath: ${imagePath}`);

          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }

          query = { "_id": decoded.user };
          console.log(`query below`);
          console.log(query);

          // Checking if it's an image
          if(imageMimeTypes.indexOf(mimetype) == -1) {
            console.log(`inside busboy not an image\n`);
            res.send({
              error: true,
              message: "Please select an image in png or jpg format!" 
            });
            next();
          } 
        

            console.log(`inside account update, just before stream write\n`);
            // Creating a writestream using fs module
            fstream = fs.createWriteStream(imagePath);
            file.pipe(fstream);

            // If the image is larger than 510KB, limit_reach is set to true
            // just before res.status because res.status will trigger on.finish
            // so limit_reach will be seen as true within on.finish
            // the partially uploaded file is deleted
            file.on('limit', function(){
              console.log(`ERROR: inside file on limit`);
              fs.unlink(imagePath, function(){
                limitReach = true;
                // Unset img_ext

                
              });
            });

          file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
          });

          file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');

          });
        });

        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
          console.log('Field [' + fieldname + ']: value: ' + inspect(val));
          if(fieldname == 'itemOffered') { itemOffered = val; }
          if(fieldname == 'itemSought') { itemSought = val; }
          if(fieldname == 'sellFor') { sellFor = val; }
          if(fieldname == 'description') { description = val; }
          if(fieldname == 'postedDate') { postedDate = val; }

        });

        busboy.on('error', function(err){
          console.log('inside busboy error, error message below');
          console.log(err);
          res.send({ 
            error: true, 
            message: 'Form and image upload failed. Please try again.' });
        });

        // Upon finishing form and image upload save the form and image name in db
        busboy.on('finish', function() {
          console.log('Done parsing form!, listing detals below');
          console.log('itemOffered : ' + itemOffered + 
            ' itemSought: ' + itemSought + 
            ' sellFor: ' + sellFor + 
            ' description: ' + description);
          console.log(filenameDatestamp);
          //saveImage = { $push: { "listings.$.images": filename } };
          
          let saveListing = { $push: { listings: { 
              "itemOffered": itemOffered,
              "itemSought": itemSought,
              "sellFor": sellFor,
              "description": description,
              "postedDate": postedDate,
              "images": filenameDatestamp
            } } };

         // If the file is larger than 500kb the limitReach is true
         // and it will send the error message otherwise it will save
         // listing details and the file name in the db
         if(!limitReach){
            Account.findOneAndUpdate(query, saveListing, function(err, doc){
              console.log(`inside account update save listing details\n`);
              // Not checking for err for now as
              // it will set headers twice, maybe later
              if(err){
                console.log(`ERROR inside account update, error saving the listing`);
                res.status(455).send({ error: true, message: 'Error saving the listing!' });
              }
          });
           
         } else {
           res.send({ 
             error: true,
             status: 'largefile',
             message: 'The image must be less than 500kb' });
         }

        });
        
        req.pipe(busboy);
      }
    });

  } else {
    return res.json({ 
      error: true, 
      status: 'notoken', 
      message: 'No token found.' }); 
    next();
  }
  
  // status codes:
  // 'notoken' - redirect to login page
  // 'tokenfail' - redirect to login page
  // in all other cases display the error
});

// Homepage. Retrieve listings for homepage for either guests or
// registered users
router.get('/homepage', parserTrue, (req, res)=>{
  
  console.log(`inside get listings28`);
  
  let listings28 = lists.listings28();
  let listings28user = lists.listings28user();

  console.log(`inside get listings28 before token slice, req.headers below`);
  console.log(req.headers);
  var token = req.headers.authorization.slice(7);
  console.log(`inside get listings28 after token slice`);
 
  // decode token
  if (token) {
    console.log(`token below`);
    console.log(token);
    // verifies secret and checks exp
    
    console.log(`token secret key below`);
    console.log(config.jwtSecret);
    
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      if (err) {
        console.log(`inside verify token error, error below`);
        console.log(err);
        res.json(listings28);
        //return res.json({ error: true, message: 'Failed to authenticate token.' });  
      } else {
        console.log(`inside verify token NO error, decoded token below`);
        console.log(decoded);
        res.json(listings28user);
        // if everything is good, save to request for use in other routes
        //req.decoded = decoded;    
        //next();
      }
    });

  } else {
    console.log(`inside if no token, serve listings28`);
    res.json(listings28);

  }

});

/* GET users listing. */
router.get('/react/listings28', parserTrue, (req, res)=>{
  
  console.log(`inside get listings28`);
  
  let listings28 = lists.listings28();
  let listings28user = lists.listings28user();

  console.log(`inside get listings28 before token slice, req.headers below`);
  console.log(req.headers);
  var token = req.headers.authorization.slice(7);
  console.log(`inside get listings28 after token slice`);
 
  // decode token
  if (token) {
    console.log(`token below`);
    console.log(token);
    // verifies secret and checks exp
    
    console.log(`token secret key below`);
    console.log(config.jwtSecret);
    
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      if (err) {
        console.log(`inside verify token error, error below`);
        console.log(err);
        res.json(listings28);
        //return res.json({ error: true, message: 'Failed to authenticate token.' });  
      } else {
        console.log(`inside verify token NO error, decoded token below`);
        console.log(decoded);
        res.json(listings28user);
        // if everything is good, save to request for use in other routes
        //req.decoded = decoded;    
        //next();
      }
    });

  } else {
    console.log(`inside if no token, serve listings28`);
    res.json(listings28);

  }

});

router.get('*', function(req, res, next) {
  res.sendFile(path.resolve('public/index.html'));
});


module.exports = router;