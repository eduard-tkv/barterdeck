const passport = require('passport');
const Account = require('../models/account');

module.exports = Account.register(username, password, function(err, user){
      console.log(`inside account.register`);
      
      if(err){
        console.log('\nError while registering user! err below');
        console.log(err.code);
        
        if(err.code === 11000){
          return res.json({
            error: true,
            message: "Email is in use!"
          });
        }
        
        if(err.name === 'NoSaltValueStoredError'){
          return res.json({
            error: true,
            message: 'Registraion failed'
          });
        } else {
          return res.json({
            error: true,
            message: err.message
          });
        }
      } else {
        
        console.log(`\ninside register, after username registration newly stored user below`);
        console.log(user);
        
        let query = { username: user.username };
        let update = { $set: { email: fields.email } };
        
        /*
        if(user.email){
          console.log(`inside account register, below user.email`);
          console.log(user.email);
          update = { $set: { email: fields.email } };
        } else {
          return res.json({
            error: true,
            message: "Email is in use!"
          });
        }
        */
        
        
        Account.findOneAndUpdate(query, update, (err, user) => {
          console.log(`inside account update`);
          
          if(user.email === fields.email){
            return res.json({
              error: true,
              message: "Email is in use!"
            });
          }
          
          if(err || user === null){
            console.log(`error while trying to update at registration, err below`);
            if(err){ console.log(`\n${err}`); }
            return res.json({
              error: true, 
              message: "Error while registering"
            });
          } else {
            
            console.log(`below user from findoneandupdate`);
            console.log(user);
            console.log('user registered!');
            
            return res.json({
              error: false,
              message: "Registration was successful. You can log in now." 
            });
          }
          
        });
        // save username to db
      }
    });

/*
Account.register(new Account({ username: fields.username }), fields.passwordOne, function(err, user){
      console.log(`inside account.register`);
      
      if(err){
        console.log('\nError while registering user! err below');
        console.log(err.code);
        
        if(err.code === 11000){
          return res.json({
            error: true,
            message: "Email is in use!"
          });
        }
        
        if(err.name === 'NoSaltValueStoredError'){
          return res.json({
            error: true,
            message: 'Registraion failed'
          });
        } else {
          return res.json({
            error: true,
            message: err.message
          });
        }
      } else {
        
        console.log(`\ninside register, after username registration newly stored user below`);
        console.log(user);
        
        let query = { username: user.username };
        let update = { $set: { email: fields.email } };
        
        
        Account.findOneAndUpdate(query, update, (err, user) => {
          console.log(`inside account update`);
          
          if(user.email === fields.email){
            return res.json({
              error: true,
              message: "Email is in use!"
            });
          }
          
          if(err || user === null){
            console.log(`error while trying to update at registration, err below`);
            if(err){ console.log(`\n${err}`); }
            return res.json({
              error: true, 
              message: "Error while registering"
            });
          } else {
            
            console.log(`below user from findoneandupdate`);
            console.log(user);
            console.log('user registered!');
            
            return res.json({
              error: false, 
              registered: true,
              message: "Registration was successful. You can log in now." 
            });
          }
          
        });
        // save username to db
      }
    });
    */