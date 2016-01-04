/**
 * Created by Artiom on 30/12/2015.
 */

myapp.controller('mainSearchCtrl', ['$scope', 'uiGmapGoogleMapApi', '$geolocation', function($scope, uiGmapGoogleMapApi, $geolocation){

	$geolocation.getCurrentPosition({ timeout: 60000}).then(function(position){
		console.log(position);

		$scope.map = {
			center: {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			},
			zoom: 12
		};

		$scope.myPositionMarker = {
			position: {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			},
			options: {
				title: 'Mi posición'
			}
		};
	});

	// To be set by previous step
	$scope.chosenTown = "Roma";

	// geocode the given address
	var geocodeAddress = function(address, callback) {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				callback(results[0].geometry.location);
			} else {
				console.log("Geocode was not successful for the following reason: " + status);
			}
		});
	};

	// google maps is ready
	uiGmapGoogleMapApi.then(function(maps) {
		// geocode chosen town
		geocodeAddress($scope.chosenTown, function(latLng){
			console.log("1  " + latLng.lat());
			console.log("2  " + latLng.lng());
			//$scope.map = { center: { latitude: latLng.lat(), longitude: latLng.lng() }, zoom: 12, bounds: {}};
		});

	});

	uiGmapGoogleMapApi.then(function(maps) {

	});

}]);