Titanium.include('../functions.js');

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
var mapview = Titanium.Map.createView({
	mapType : Titanium.Map.STANDARD_TYPE,
	animate : true,
	regionFit : true,
	userLocation : true
});

win.add(mapview);

var returnDict = getPosition();
if (returnDict)
{
	region = {
		latitude : returnDict['latitiude'],
		longitude : returnDict['longitude'],
		latitudeDelta : 0.01,
		longitudeDelta : 0.01
	}
	
	mapview.hide();
	mapview.setLocation(region);
	mapview.show();
}
