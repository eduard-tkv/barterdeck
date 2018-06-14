function error(err, res, mode){
  if(mode == 'register'){
    if(err.name === 'NoSaltValueStoredError'){
      return res.json({
        error: true,
        message: err.message ? err.message : 'Sorry, an error occurred'
      });
    } else if(err.code === 11000){
      // 11000 is duplicate username error. In Mongoose schema
      // email is used as the usernameField hence the following
      // error message
      return res.json({
        error: true,
        message: 'This username already registered'
      });
    } else if (err.name === 'UserExistsError'){
      // Because in Mongoose schema email is the usernamefield
      // duplicate usernames means duplicate emails.
      return res.json({
        error: true,
        message: 'This email already registered'
      });      
    } else {
      respond(res, err.message);
    }    
  }
}

/*
function errors(err, res, query, Account){
  console.log(`inside errors helpers`);
  console.log(err.name);
  console.log(err);
  if(err.name === 'NoSaltValueStoredError'){
    respond(res);
  } else if(err.code === 11000){
    // 11000 is duplicate username error. In Mongoose schema
    // email is used as the usernameField hence the following
    // error message
    respond(res, "This username already registered");
  } else if (err.name === 'UserExistsError'){
    // Because in Mongoose schema email is the usernamefield
    // duplicate usernames means duplicate emails.
    respond(res, 'This email already registered');
  } else {
    respond(res, err.message);
  }
}

function respond(res, msg){
  return res.json({
    error: true,
    message: msg ? msg : "Sorry, there was an error"
  });
}
*/

/*
function success(res){
  return res.json({
    error: false,
    message: "Registration successful. Please update your profile!"
  });
}
*/
/*
function passwordMismatch(res){
  return res.json({
    error: true,
    message: "Passwords don't match!"
  });
}
*/
module.exports = {
  error
};
