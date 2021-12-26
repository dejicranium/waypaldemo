function initialize() {
    var inputs = window.document.getElementsByClassName('destination-input');
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        new google.maps.places.Autocomplete(input);
    }
}
  
google.maps.event.addDomListener(window, 'load', initialize);