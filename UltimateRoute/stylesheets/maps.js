 var directionsDisplay;  
 var directionsService = new google.maps.DirectionsService();
 var map;
 var geocoder;

 function initialize() {
 	directionsDisplay = new google.maps.DirectionsRenderer();
 	geocoder = new google.maps.Geocoder();
 	// Establish map object
 	var mapOptions = {
 		zoom:11
 	}
 	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
 	directionsDisplay.setMap(map);
 	
 	// autocomplete for address
 	var defaultBounds = new google.maps.LatLngBounds(
 		new google.maps.LatLng(-33.8902, 151.1759),
 		new google.maps.LatLng(-33.8474, 151.2631));
 	var options = {
 		bounds:defaultBounds
 	};

 	var input = document.getElementById("address");
 	var autocomplete = new google.maps.places.Autocomplete(input, options);
 	
 	// Use geolocation to: 
 	// 1) set centre of the map to user's current location
 	// 2) make autocomplete function biases to user's current location
 	if(navigator.geolocation) {
 		navigator.geolocation.getCurrentPosition(function(position) {
 			var geolocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
 			var infowindow = new google.maps.InfoWindow({
 				map: map,
 				position: geolocation,
 				content: "Thanks for using UltimateRoute, let's get started"
 			});
 			autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,geolocation));
 			map.setCenter(geolocation);
 		}, function() {
 			handleNoGeolocation(true);
 		});
 	} 
 	else {
 		handleNoGeolocation(false);
 	}

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

 /*function calcRoute() {
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
}*/
function calcRoute() {
	var start = document.getElementById('start').value;
	var end = document.getElementById('end').value;
	var waypts = [];
	var checkboxArray = document.getElementById('waypoints');
	for (var i = 0; i < checkboxArray.length; i++) {
		if (checkboxArray.options[i].selected == true) {
			waypts.push({
				location:checkboxArray[i].value,
				stopover:true});
		}
	}

	var request = {
		origin: start,
		destination: end,
		waypoints: waypts,
		optimizeWaypoints: true,
		travelMode: google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
			var route = response.routes[0];
			var summaryPanel = document.getElementById('directions_panel');
			summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
      	var routeSegment = i + 1;
      	summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
      	summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
      	summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
      	summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
  }
});
}

google.maps.event.addDomListener(window, 'load', initialize);