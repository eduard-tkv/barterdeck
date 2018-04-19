function error(err, res){
  console.log(`inside errors helpers`);
  console.log(err.name);
  console.log(err);
  
  respond(res, err.message);
}

function respond(res, msg){
  return res.json({
    error: true,
    message: msg ? msg : "Sorry, there was an error"
  });
}

function success(res){
  return res.json({
    error: false,
    message: "Login successful"
  });
}

module.exports = {
  error,
  success
};
