var arr28 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];

var arr = [0, 1, 2, 3, 4, 5, 6];
var interArr = [];
var newArr = [];
var finalArr = [];

var i, j, k;
  for(j=5; j<arr28.length; j+=4){

    for(i=(j-5); i<j; i++){
      newArr.push(arr28[i])

      if(i==(j-1)){
        console.log(newArr);


        interArr = ["N"].concat(newArr);
        interArr.push("N");
        console.log(interArr);

        finalArr.push(interArr);
        newArr = [];
        interArr = [];
      }
    }

  }

console.log(finalArr);
