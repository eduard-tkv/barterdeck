const router = require('express').Router();
const path = require('path');
const passport = require('passport');
const Account = require('../models/account');
const fs = require('fs');


const ObjectId = require('mongodb').ObjectId; 

const bodyParser = require('body-parser');
const Busboy = require('busboy');
const inspect = require('util').inspect;
const parserFalse = bodyParser.urlencoded({ extended: false });
const parserTrue = bodyParser.urlencoded({ extended: true });

const helpers = require('../helpers');
const lists = require('./listings28');

//const formidable = require('formidable');
const jwt = require('jsonwebtoken');
const config = require('../config');

const cors = require('cors');

/*
router.post('/register', parserTrue, (req, res, next) => {
  
  /*
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  */
  
  /*
  if (req.isAuthenticated()) {
    return res.json({
      error: true,
      message: "You are already logged in"
    });
  }
  */
 
  /*
  console.log(`inside register, req.body below`);
  console.log(req.body);

    Account.register(new Account({ nickname: req.body.username, email: req.body.email }), req.body.passwordOne, (err, user) => {
      if(err){
        helpers.errors(err, res);
      } else {
        helpers.registerSuccess(res);
      }
    });
});
*/


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
  
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    file.on('data', function(data) {
      console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
    });
    file.on('end', function() {
      console.log('File [' + fieldname + '] Finished');
    });
  });

  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    if(fieldname == 'username') { nickname = val; }
    if(fieldname == 'email') { email = val; }
    if(fieldname == 'password') { password = val; }

  });
  
  busboy.on('finish', function() {
    console.log('Done parsing form!');
    console.log('email: ' + email + 'password: ' + password + 'username: ' + nickname);
    Account.register(new Account({ nickname: nickname, email: email }), password, (err, user) => {
      if(err){
        helpers.errors(err, res);
      } else {
        helpers.registerSuccess(res);
      }
    });
    //res.writeHead(303, { Connection: 'close', Location: '/' });
    //res.end();
  });
  
  req.pipe(busboy);
});


router.post('/login', parserFalse, (req, res, next) => {
  console.log('logging in user');
  
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  console.log(`after setting headers`);
  
  console.log(`\nreq.body below\n`);
  console.log(req.body);
  console.log(`\nreq.account below\n`);
  console.log(req.account);
  console.log(`\n`);
  
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
    
    var options = "";
    if(err){
      console.log('err:');
      console.log(err.message);
      return next(err);
    }
    
    if(!user){
      console.log(`inside no user`);
      return res.json({ 
        error: true, 
        message: "Password or email are incorrect" 
      });
    }
    
    req.logIn(user, function(err){
      console.log(`inside req.logIn`);
      if (err){
        return next(err); 
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
        expiresIn: "1d" // expires in 1 day
      });
      
      console.log(`token below`);
      console.log(token);
      
      return res.json({
        error: false,
        message: "Login Success",
        token: token
      });
    });
  })(req, res, next);
});













router.post('/listitem', (req, res, next)=>{
  
  let listitem = {};
  
  let itemOffered = '';
  let itemSought = '';
  let sellFor = null;
  let description = '';
  let query = '';
  let limitReach = false;
  let dir = '';
  let path = '';
  let fstream = null;
  let imageMimeTypes = ['image/png', 'image/jpeg'];
  let file_name = '';
  let token = null;
  
  console.log(`inside post listitem\n`);
  console.log(`inside post listitem req.headers below`);
  console.log(req.headers);
  
  console.log(`inside post listitem, before new Busboy\n`);
  let busboy = new Busboy({ headers: req.headers,  limits: { files: 1, fileSize: 510000 }  });
  

  
  console.log(`inside post listitem before token slice\n`);
  
  if(req.headers.authorization){
    token = req.headers.authorization.slice(7);
  }
  console.log(`inside post listitem after token slice\n`);
 
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
        //res.json(listings28);
        
        // SEND TOKEN INVALID ERROR
        return res.send({ error: true, message: 'Failed to authenticate token.' });  
        next();
      } else {
                
        console.log(`inside verify token NO error, decoded token below`);
        console.log(decoded);
        
        console.log(`inside list item, just before busboy.on file\n`);

 
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
          console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
          
          console.log(`inside busboy on.file\n`);

          dir = __dirname + "/../public/images/" + decoded.user;
          path = dir + "/" + filename;

          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }

          query = { "_id": decoded.user };
          console.log(`query below`);
          console.log(listitem.query);

          file_name = filename;

          // Checking if it's an image
          if(imageMimeTypes.indexOf(mimetype) == -1) {
            console.log(`inside busboy not an image\n`);
            res.status(415).send({ error: true, message: "Please select an image in png or jpg format!" });
            next();
          } 
        

            console.log(`inside account update, just before stream write\n`);
            // Creating a writestream using fs module
            fstream = fs.createWriteStream(path);
            file.pipe(fstream);

            // If the image is larger than 510KB, limit_reach is set to true
            // just before res.status because res.status will trigger on.finish
            // so limit_reach will be seen as true within on.finish
            // the partially uploaded file is deleted
            file.on('limit', function(){
              console.log(`ERROR: inside file on limit`);
              fs.unlink(path, function(){
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

        });

        busboy.on('error', function(err){
          console.log('inside busboy error, error message below');
          console.log(err);
          res.send({ error: true, message: 'Form and image upload failed. Please try again.' });
        });

        
        busboy.on('finish', function() {
          console.log('Done parsing form!, listing detals below');
          console.log('itemOffered : ' + itemOffered + 
            ' itemSought: ' + itemSought + 
            ' sellFor: ' + sellFor + 
            ' description: ' + description);
          console.log(file_name);
          //saveImage = { $push: { "listings.$.images": filename } };
          
          let saveListing = { $push: { listings: { 
              "itemOffered": itemOffered,
              "itemSought": itemSought,
              "sellFor": sellFor,
              "description": description,
              "images": file_name
            } } };

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
    return res.json({ error: true, status: 'notoken', message: 'No token found.' }); 
    next();
  }
});
















/* VERSION 3
router.post('/listitem', (req, res, next)=>{
  
  let itemOffered = '';
  let itemSought = '';
  let sellFor = null;
  let description = '';
  let query = '';
  let saveImage = '';
  let unsaveImage = '';
  
  console.log(`inside post listitem\n`);
  console.log(`inside post listitem req.headers below`);
  console.log(req.headers);
  
  console.log(`inside post listitem, before new Busboy\n`);
  //let busboy = new Busboy({ headers: req.headers });
  let busboy = new Busboy({ headers: req.headers,  limits: { files: 1, fileSize: 110000 }  });
  
  let fstream = null;
  let imageMimeTypes = ['image/png', 'image/jpeg'];
  let file_name = '';
  
  console.log(`inside post listitem before token slice\n`);
  var token = null;
  if(req.headers.authorization){
    token = req.headers.authorization.slice(7);
  }
  console.log(`inside post listitem after token slice\n`);
  
  //console.log(`inside post listitem before req.pipe`);
  //req.pipe(req.busboy);

  //PARSE THE TOKEN, EXTRACT USER ID AND THATS HOW YOU FIND THE USER
 
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
        //res.json(listings28);
        
        // SEND TOKEN INVALID ERROR
        return res.send({ error: true, message: 'Failed to authenticate token.' });  
        next();
      } else {
                
        console.log(`inside verify token NO error, decoded token below`);
        console.log(decoded);
        
        console.log(`inside list item, just before busboy.on file\n`);

 
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
          console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
          
          console.log(`inside busboy on.file\n`);

          let dir = __dirname + "/../public/images/" + decoded.user;
          let path = dir + filename;

          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }

          let userId = `ObjectId(${decoded.user})`;
          query = { "_id": userId };
          query = { "_id": decoded.user };
          console.log(`query below`);
          console.log(query);

          file_name = filename;

          saveImage = { $push: { "listings.$.images": filename } };
          unsaveImage = { $pull: { "listings.$.images": filename } };

          // Checking if it's an image
          if(imageMimeTypes.indexOf(mimetype) == -1) {
            console.log(`inside busboy not an image\n`);
            res.status(415).send({ error: true, message: "Not an image!" });
            next();
          } 
        
          //Storing the img extension in db
          Account.update(query, saveImage, function(err, account){
            console.log(`inside account findandupdate, account below`);
            console.log(account);

            if(err || account == null) {
              console.log(`inside account update, error no user found\n`);
              console.log(err);
              res.status(453).send({ error: true, message: 'No user found.' });
            } 
            
            var limit_reach = false;
            var limit_reach_err = "Image is too large! Partially uploaded image deleted";

            console.log(`inside account update, just before stream write\n`);
            // Creating a writestream using fs module
            fstream = fs.createWriteStream(path);
            file.pipe(fstream);

            // If the image is larger than 110KB, limit_reach is set to true
            // just before res.status because res.status will trigger on.finish
            // so limit_reach will be seen as true within on.finish
            // the partially uploaded file is deleted
            file.on('limit', function(){
              fs.unlink(path, function(){
                limit_reach = true;
                // Unset img_ext
                Account.findOneAndUpdate(query, unsaveImage, function(err, doc){
                  console.log(`inside account update unsave image\n`);
                  // Not checking for err for now as
                  // it will set headers twice, maybe later
                  if(!err){
                    res.status(455).send({ error: true, message: 'File is too large!' });
                  }
                });
                
              });
            });
              
              
              //busboy.on('finish', function() {
              //  console.log(`inside busboy on finish`);
              //  if(!limit_reach){
              //    res.send("Image saved successfully!");
              //  }
              //});
              
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

        });

        busboy.on('error', function(err){
          console.log('inside busboy error, error message below');
          console.log(err);
          res.send({ error: true, message: 'Form and image upload failed. Please try again.' });
        });

        
        busboy.on('finish', function() {
          console.log('Done parsing form!');
          console.log('itemOffered : ' + itemOffered + 
            ' itemSought: ' + itemSought + 
            ' sellFor: ' + sellFor + 
            ' description: ' + description);
          
          //saveImage = { $push: { "listings.$.images": filename } };
          
          let saveListingForm = { $push: { 
              "listings.$.itemOffered": itemOffered,
              "listings.$.itemSought": itemSought,
              "listings.$.sellFor": sellFor,
              "listings.$.description": description,
            } };
          
          Account.findOneAndUpdate(query, saveListingForm, function(err, doc){
            console.log(`inside account update unsave image\n`);
            // Not checking for err for now as
            // it will set headers twice, maybe later
            if(!err){
              res.status(455).send({ error: true, message: 'File is too large!' });
            }
          });

          //res.writeHead(303, { Connection: 'close', Location: '/' });
          //res.end();
        });
        
        req.pipe(busboy);
      }
    });

  } else {
    return res.json({ error: true, message: 'No token found.' }); 
    next();
  }
});
*/



/* VERSION 2
router.post('/listitem', (req, res, next)=>{
  
  let itemOffered = '';
  let itemSought = '';
  let sellFor = null;
  let description = '';
  
  console.log(`inside post listitem\n`);
  console.log(`inside post listitem req.headers below`);
  console.log(req.headers);
  
  console.log(`inside post listitem, before new Busboy\n`);
  //let busboy = new Busboy({ headers: req.headers });
  let busboy = new Busboy({ headers: req.headers,  limits: { files: 1, fileSize: 110000 }  });
  
  let fstream = null;
  let imageMimeTypes = ['image/png', 'image/jpeg'];
  let file_name = '';
  
  console.log(`inside post listitem before token slice\n`);
  var token = null;
  if(req.headers.authorization){
    token = req.headers.authorization.slice(7);
  }
  console.log(`inside post listitem after token slice\n`);
  
  //console.log(`inside post listitem before req.pipe`);
  //req.pipe(req.busboy);

  //PARSE THE TOKEN, EXTRACT USER ID AND THATS HOW YOU FIND THE USER
 
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
        //res.json(listings28);
        
        // SEND TOKEN INVALID ERROR
        return res.send({ error: true, message: 'Failed to authenticate token.' });  
        next();
      } else {
                
        console.log(`inside verify token NO error, decoded token below`);
        console.log(decoded);
        
        console.log(`inside list item, just before busboy.on file\n`);

 
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
          console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
          
          console.log(`inside busboy on.file\n`);

          let dir = __dirname + "/../public/images/" + decoded.user;
          let path = dir + filename;

          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }

          //var query = { username: req.user.username };
          let query = { "_id": ObjectId(decoded.user) };
          console.log(`query below`);
          console.log(query);

          file_name = filename;

          let saveImage = { $push: { "listings.$.images": filename } };
          let unsaveImage = { $pull: { "listings.$.images": filename } };

          // Checking if it's an image
          if(imageMimeTypes.indexOf(mimetype) == -1) {
            console.log(`inside busboy not an image\n`);
            res.status(415).send({ error: true, message: "Not an image!" });
            next();
          } 
        
          //Storing the img extension in db
          Account.update(query, saveImage, function(err, account){
            console.log(`inside account findandupdate, account below`);
            console.log(account);

            if(err || account == null) {
              console.log(`inside account update, error no user found\n`);
              res.status(453);
            } else {
              var limit_reach = false;
              var limit_reach_err = "Image is too large! Partially uploaded image deleted";

              console.log(`inside account update, just before stream write\n`);
              // Creating a writestream using fs module
              fstream = fs.createWriteStream(path);
              file.pipe(fstream);

              // If the image is larger than 110KB, limit_reach is set to true
              // just before res.status because res.status will trigger on.finish
              // so limit_reach will be seen as true within on.finish
              // the partially uploaded file is deleted
              file.on('limit', function(){
                fs.unlink(path, function(){
                  limit_reach = true;
                  // Unset img_ext
                  Account.findOneAndUpdate(query, unsaveImage, function(err, doc){
                    console.log(`inside account update unsave image\n`);
                    // Not checking for err for now as
                    // it will set headers twice, maybe later
                  });
                  res.status(455).send(limit_reach_err);
                });
              });

              busboy.on('finish', function() {
                console.log(`inside busboy on finish`);
                if(!limit_reach){
                  res.send("Image saved successfully!");
                }
              });
            }
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

        });

        busboy.on('error', function(err){
          console.log('inside busboy error, error message below');
          console.log(err);
          res.send({ error: true, message: 'Form and image upload failed. Please try again.' });
        });

        
        busboy.on('finish', function() {
          console.log('Done parsing form!');
          console.log('itemOffered : ' + itemOffered + 
            ' itemSought: ' + itemSought + 
            ' sellFor: ' + sellFor + 
            ' description: ' + description);

          //res.writeHead(303, { Connection: 'close', Location: '/' });
          //res.end();
        });
        
        req.pipe(busboy);
      }
    });

  } else {
    return res.json({ error: true, message: 'No token found.' }); 
    next();
  }
});
*/


/*
router.post('/listitem', function(req, res, next){
  
  console.log(`inside post listitem\n`);
  console.log(`inside post listitem req.headers below`);
  console.log(req.headers);
  
  console.log(`inside post listitem, before new Busboy\n`);
  //let busboy = new Busboy({ headers: req.headers });
  let busboy = new Busboy({ headers: req.headers,  limits: { files: 1, fileSize: 110000 }  });
  
  let fstream = null;
  let imageMimeTypes = ['image/png', 'image/jpeg'];
  let file_name = '';
  
  console.log(`inside post listitem before token slice\n`);
  var token = req.headers.authorization.slice(7);
  console.log(`inside post listitem after token slice\n`);
  
  //console.log(`inside post listitem before req.pipe`);
  //req.pipe(req.busboy);

  //PARSE THE TOKEN, EXTRACT USER ID AND THATS HOW YOU FIND THE USER
 
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
        //res.json(listings28);
        return res.json({ error: true, message: 'Failed to authenticate token.' });  
        next();
      } else {
        console.log(`inside verify token NO error, decoded token below`);
        console.log(decoded);
        
      console.log(`inside list item, just before busboy.on file\n`);
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      
      console.log(`inside busboy on.file\n`);
      
      let img_ext = filename.substr(filename.indexOf('.') + 1);

      let dir = __dirname + "/../public/images/" + decoded.user;
        
      let path = dir + filename;

      
      
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      
      //var query = { username: req.user.username };
      let query = { "_id": ObjectId(decoded.user) };
      console.log(`query below`);
      console.log(query);
      
      file_name = filename;
      
      let saveImage = { $push: { listings: filename } };
      let unsaveImage = { $pull: { listings: filename } };

      // Checking if it's an image
      if(imageMimeTypes.indexOf(mimetype) == -1) {
        console.log(`inside busboy not an image\n`);
        res.status(415).send("Not an image!");
        next();
      } 
      //Storing the img extension in db
      Account.update(query, saveImage, function(err, account){
        console.log(`inside account findandupdate, account below`);
        console.log(account);
        
        if(err || account == null) {
          console.log(`inside account update, error no user found\n`);
          res.status(453);
        } else {
          var limit_reach = false;
          var limit_reach_err = "Image is too large! Partially uploaded image deleted";

          console.log(`inside account update, just before stream write\n`);
          // Creating a writestream using fs module
          fstream = fs.createWriteStream(path);
          file.pipe(fstream);

          // If the image is larger than 110KB, limit_reach is set to true
          // just before res.status because res.status will trigger on.finish
          // so limit_reach will be seen as true within on.finish
          // the partially uploaded file is deleted
          file.on('limit', function(){
            fs.unlink(path, function(){
              limit_reach = true;
              // Unset img_ext
              Account.findOneAndUpdate(query, unsaveImage, function(err, doc){
                console.log(`inside account update unsave image\n`);
                // Not checking for err for now as
                // it will set headers twice, maybe later
              });
              res.status(455).send(limit_reach_err);
            });
          });

          busboy.on('finish', function() {
            console.log(`inside busboy on finish`);
            if(!limit_reach){
              res.send("Image saved successfully!");
            }
          });
        }
      });      

    });
    console.log(`inside list item just before req.pipe`);
    req.pipe(busboy);
      }
    });

  } else {
    return res.json({ error: true, message: 'Failed to authenticate token.' }); 
    next();
  }
    
});
*/


/* GET users listing. */
router.get('/react/listings28', parserTrue, (req, res)=>{
  
  console.log(`inside get listings28`);
  
  let listings28 = lists.listings28();
  let listings28user = lists.listings28user();
  
  /*
  res.header("Access-Control-Allow-Origin", "http://localhost:3333");
  res.header("Access-Control-Allow-Headers", 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true); 
 	res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Expose-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
  */
 
  
  
  //next();
  console.log(`inside get listings28 before token slice, req.headers below`);
  console.log(req.headers);
  var token = req.headers.authorization.slice(7);
  console.log(`inside get listings28 after token slice`);
  
  /*
  console.log(`req body below`);
  console.log(req.body);
  
  console.log(`req headers below`);
  console.log(req.headers);
  
  console.log(`req user below`);
  console.log(req.user);
  */
 
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
    // if there is no token
    // return an error
    
    /*
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    */
  }

});

router.get('*', function(req, res, next) {
  res.sendFile(path.resolve('public/index.html'));
});


module.exports = router;