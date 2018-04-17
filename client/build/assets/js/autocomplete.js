console.log(`inside assets.autocomplete`);

/*
  $('#autocomplete').removeClass('displayNone').addClass('displayInitial');
  $('#saveLoc').removeClass('displayNone').addClass('displayInitial');
  $('#editLoc').removeClass('displayNone').addClass('displayInitial');
*/
  //var alerts_div = document.getElementById('profile_alerts');    
  
  // Start :: Autocomplete
  var input = document.getElementById('autocomplete');
  
  // User location object
  var locationObject = { 
    locality: false,
    administrative_area_level_1: false,
    country: false
  };
  
  
  // Create an autocomplete object
  var autocomplete = new google.maps.places.Autocomplete(input);
  
  autocomplete.addListener('place_changed', function(){
    
    // Clear alerts div of any class names or text
    //alerts_div.className = ""; 
    //alerts_div.innerHTML = "";    
    
    // Get place details from the autocomplete object
    var place = autocomplete.getPlace();

    console.log("place obj below\n");
    console.log(place);
    //console.log('address types 0 locality:');
    //console.log(place.address_components[0].long_name);
    
    var componentForm = {
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      country: 'long_name'
    };
    
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        locationObject[addressType] = place.address_components[i][componentForm[addressType]];
      }
    }

    document.getElementById('locality').value = locationObject.locality;
    document.getElementById('administrative_area_level_1').value = locationObject.administrative_area_level_1;
    document.getElementById('country').value = locationObject.country;

    console.log(document.getElementById('locality').value);
    console.log(document.getElementById('administrative_area_level_1').value);
    console.log(document.getElementById('country').value);
   
  });
// End :: Autocomplete  