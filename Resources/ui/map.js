/**
 * MAP  CONTENT
 */
Titanium.include('functions.js');

var win = Titanium.UI.currentWindow;

Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

//
//  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
//  THIS VALUE IS IN METERS
//
Titanium.Geolocation.distanceFilter = 10;

//
//CREATE MAP VIEW
//
var defaultLatMoliets = 43.855233;
var defaultLongMoliets = -1.39261;
var mapview = Titanium.Map.createView({
	mapType : Titanium.Map.STANDARD_TYPE,
	region : {
		latitude : defaultLatMoliets,
		longitude : defaultLongMoliets,
		latitudeDelta : 0.01,
		longitudeDelta : 0.01
	},
	animate : true,
	regionFit : true,
	userLocation : true
});

win.add(mapview);

//
// GET CURRENT POSITION - THIS FIRES ONCE
//
Titanium.Geolocation.getCurrentPosition(function(e) {
	if (e.error) {
		alert('HFL cannot get your current location');
		return;
	}

	var longitude = e.coords.longitude;
	var latitude = e.coords.latitude;
	var altitude = e.coords.altitude;
	var heading = e.coords.heading;
	var accuracy = e.coords.accuracy;
	var speed = e.coords.speed;
	var timestamp = e.coords.timestamp;
	var altitudeAccuracy = e.coords.altitudeAccuracy;

	// CREATE ANNOTATION

	/*	var annotation = Titanium.Map.createAnnotation({
	latitude : latitude,
	longitude : longiude,
	title : "Your current location",
	animate : true
	})
	*/
	
	region = {
		latitude : latitude,
		longitude : longitude,
		latitudeDelta : 0.01,
		longitudeDelta : 0.01
	}
	
	mapview.hide();
	mapview.setLocation(region);
	mapview.show();
});
