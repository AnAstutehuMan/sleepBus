var map; // Map Object
var input; // Input Box 

function load() {
    input = document.getElementById('Dest');
    map = L.map('mainmap').setView([0, 0], 5);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a       href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibHlubmxvIiwiYSI6ImNrMnMxcGJoNDB2dTMzbm1ieG53dHBrd3QifQ.Rd6I5PvAtpo_ni7AfRNH1w'
    }).addTo(map);
    L.control.locate().addTo(map);
    map.on('click',function(e){
        console.log(e)
        loc = e.latlng.lat + " , " + e.latlng.lng;
        input.value = loc;
    })
}

function pop(location) {
    L.marker(location).addTo(map).bindPopup('Selected location').openPopup();
}

function send() {
    if (input.value.replace(' ','') != ''){
    loc = input.value.split(','); // Location infomation from input box
    pop(loc);   
    }
}
