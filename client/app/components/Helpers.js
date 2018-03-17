import React from 'react';

export function longs(){
  console.log(`inside long`);
}

export function checkLength(input){
  //console.log(`inside validate fields`);
  //let areFieldsTooLong = {};
  //areFieldsTooLong.loginEmailTooLong = email.length < 101;
  //areFieldsTooLong.loginPasswordTooLong = password.length < 101;
  //return areFieldsValid;
  //longs();
  return input.length < 100;
}

export function validateRegisterFields(email, passwordOne, passwordTwo, nickname){
  console.log(`inside validate fields`);
  let areFieldsValid = {};

  areFieldsValid.registerEmailValid = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(email);
  areFieldsValid.registerPasswordOneValid = passwordOne.length >= 6 && passwordOne.length < 51;
  //areFieldsValid.registerNicknameValid = nickname.length >= 6 && nickname.length < 51;
  areFieldsValid.registerNicknameValid = (/^([a-zA-Z0-9_-]){6,51}$/).test(nickname);
  areFieldsValid.registerPasswordsMatch = passwordOne.localCompare(passwordTwo);
  
  return areFieldsValid;  
}

export function convertToCamelcase(str){
  //var rr = 'login-email'; var rr2= "register-password-one";
  let camelCase = [];
  let splitString = str.split("-");
  
  for(var i=1; i<splitString.length; i++){
    camelCase.push(splitString[i][0].toUpperCase() + splitString[i].substr(1));
  }
  
  camelCase = splitString[0].concat(camelCase);
  camelCase = camelCase.replace(/,/g, "");
  return camelCase;
  
}