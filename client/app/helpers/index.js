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