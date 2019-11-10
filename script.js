var map; // Map Object
var input; // Input Box 
var marker = 'undf'; //Marker for the destination; Set to 'undf' to check if a marker has been set.
var interval; // The interval for checking location

function load() {
    input = document.getElementById('Dest');
    map = L.map('mainmap').setView([0, 0], 5);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a       href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibHlubmxvIiwiYSI6ImNrMnMxcGJoNDB2dTMzbm1ieG53dHBrd3QifQ.Rd6I5PvAtpo_ni7AfRNH1w'
    }).addTo(map);
    map.locate({
        setView: true,
        maxZoom: 16
    })
    L.control.locate().addTo(map);
    interval = setInterval(Track,1000)
    map.on('click',function(e){
        console.log(e)
        loc = e.latlng.lat + " , " + e.latlng.lng;
        input.value = loc;
    })
}

function pop(location) {
    if (marker != 'undf') {
        map.removeLayer(marker);
    }
    marker = L.marker(location).addTo(map).bindPopup('Selected location').openPopup();
}

function send() {
    if (input.value.replace(' ', '') != '') {
        loc = input.value.split(','); // Location infomation from input box
        pop(loc);
    }
    document.getElementById('startButton').disabled=true;
    document.getElementById('stopButton').disabled=false;
}

function stop() {
    if (marker != 'undf') {
        map.removeLayer(marker);
    }
    document.getElementById('startButton').disabled=false;
    document.getElementById('stopButton').disabled=true;
}

//Distance Formula
function getDistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    var d = d / 1000 //Distance in meters
    return d;
  }
  
function deg2rad(deg) {
    return deg * (Math.PI/180)
  }


function Track(){
    if (navigator.geolocation){
        current = navigator.geolocation.getCurrentPosition()
    }
    lat1 = current.coords.latitude // Lat of Current Position
    lng1 = current.coords.longitude // Lng of Current Position
    lat2 = marker.latlng.lat // Lat of Marker
    lng2 = marker.latlng.lng // Lng of Marker
    console.log(getDistance(lat1,lng1,lat2,lng2))
}
