 var directionsDisplay;  
 var directionsService = new google.maps.DirectionsService();
 var map;
 var geocoder;

 function initialize() {
 	directionsDisplay = new google.maps.DirectionsRenderer();
 	geocoder = new google.maps.Geocoder();

 	var mapOptions = {
 		zoom:11
 	}
 	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

 	if(navigator.geolocation) {
 		navigator.geolocation.getCurrentPosition(function(position) {
 			var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
 			var infowindow = new google.maps.InfoWindow({
 				map: map,
 				position: pos,
 				content: "Thanks for using UltimateRoute, let's get started"
 			});
 			map.setCenter(pos);
 		}, function() {
 			handleNoGeolocation(true);
 		});
 	} 
 	else {
 		handleNoGeolocation(false);
 	}

 	directionsDisplay.setMap(map);
 }

 function handleNoGeolocation(errorFlag) {
 	if (errorFlag) {
 		var content = 'Error: The Geolocation service failed.';
 	} else {
 		var content = 'Error: Your browser doesn\'t support geolocation.';
 	}

 	var options = {
 		map: map,
 		position: new google.maps.LatLng(60, 105),
 		content: content
 	};

 	var infowindow = new google.maps.InfoWindow(options);
 	map.setCenter(options.position);
 }

 function calcRoute() {
 	var start = document.getElementById('start').value;
 	var end = document.getElementById('end').value;
 	var request = {
 		origin:start,
 		destination:end,
 		travelMode: google.maps.TravelMode.DRIVING
 	};
 	directionsService.route(request, function(response, status) {
 		if (status == google.maps.DirectionsStatus.OK) {
 			directionsDisplay.setDirections(response);
 		}
 		else{
 			var infowindow = new google.maps.InfoWindow({
 				map: map,
 				content: "These destinations cannot be reached by driving"
 			});
 		}
 	});
 }

 google.maps.event.addDomListener(window, 'load', initialize);