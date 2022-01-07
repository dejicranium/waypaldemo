const places_script = document.createElement("script");

places_script.type = "text/javascript";

document.head.appendChild(places_script);
places_script.onload = function() {
/*
function initialize() {
    
        var inputs = window.document.getElementsByClassName('destination-input');
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            let autocomplete = new google.maps.places.Autocomplete(input);
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                let place = autocomplete.getPlace();
                var event = new Event('change');

                // Dispatch it.
                input.value = place.address_components[0].long_name;
                input.dispatchEvent(event);

                //console.log(place.address_components)
            })
        }

    }
    google.maps.event.addDomListener(window, 'load', initialize);
}*/
places_script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDLZ4NFeub25kppPsgPItK0RWKdZ-Ecy8c&libraries=places";


        {/*<Autocomplete
          apiKey="AIzaSyDLZ4NFeub25kppPsgPItK0RWKdZ-Ecy8c"
          style={{ width: "100%" }}
          onPlaceSelected={(place) => {
            let destination = place.formatted_address;
            onChange(destination);
          }}
          
        />
        */}







