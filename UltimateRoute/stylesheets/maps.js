var rendererOptions = {
	draggable: true,
	preserveViewport: false
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;

function initialize() {
	geocoder = new google.maps.Geocoder();
 	// Establish map object
 	var mapOptions = {
 		zoom:11
 	}
 	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
 	directionsDisplay.setMap(map);
 	directionsDisplay.setPanel(document.getElementById('directions_panel'));
 	
 	// autocomplete for address
 	var defaultBounds = new google.maps.LatLngBounds(
 		new google.maps.LatLng(-33.8902, 151.1759),
 		new google.maps.LatLng(-33.8474, 151.2631));
 	var options = {
 		bounds:defaultBounds
 	};

 	var input = document.getElementById("address");
 	var autocomplete = new google.maps.places.Autocomplete(input, options);
 	

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
 	} else {
 		handleNoGeolocation(false);
 	}
 	google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
 		computeTotalDistance(directionsDisplay.getDirections());
 	});

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
		}
	});

	/*directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
			var route = response.routes[0];
			var summaryPanel = document.getElementById('directions_panel');
			summaryPanel.innerHTML = '';
      // For each route, display summary information.
      var total_dist=0;
      for (var i = 0; i < route.legs.length; i++) {
      	var routeSegment = i + 1;
      	summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
      	summaryPanel.innerHTML += '<i><u>From:</u></i>' + route.legs[i].start_address + '<br>';
      	summaryPanel.innerHTML += '<i><u>To:</u></i>' + route.legs[i].end_address + '<br>';
      	summaryPanel.innerHTML += '<i><u>Distance:</u></i>'+ route.legs[i].distance.text + '<br><br>';
      	console.log(route.legs[i].len);
      	total_dist+= route.legs[i].distance;
      }
      console.log(route.distance);
      summaryPanel.innerHTML += '<b>Distance: </b>' + total_dist.text;
  }
});*/
}
function computeTotalDistance(result) {
	var total = 0;
	var myroute = result.routes[0];
	for (var i = 0; i < myroute.legs.length; i++) {
		total += myroute.legs[i].distance.value;
	}
	total = total / 1000.0;
	document.getElementById('total').innerHTML = total + ' km';
}


google.maps.event.addDomListener(window, 'load', initialize);