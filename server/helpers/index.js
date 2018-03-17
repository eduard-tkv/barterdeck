function errors(err, res, query, Account){
  console.log(`inside errors helpers`);
  if(err.name === 'NoSaltValueStoredError'){
    respond(res);
  } else if(err.code === 11000){
    respond(res, "This email already registered");
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

function registerSuccess(res){
  return res.json({
    error: false,
    message: "Registration successful. You can log in now!"
  });
}

function passwordMismatch(res){
  return res.json({
    error: true,
    message: "Passwords don't match!"
  });
}

function loginSuccess(res){
  return res.json({
    error: false,
    message: "Login successful"
  });
}

module.exports = {
  errors,
  registerSuccess,
  passwordMismatch,
  loginSuccess
};
