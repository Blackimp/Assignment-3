/**
 * MAP  CONTENT
 */

var win = Titanium.UI.currentWindow;

var mapView = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	animate: true,
	regionFit: true,
	userLocation: true,
	// Titanium.Map.STANDARD_TYPE
	// Titanium.Map.HYBRID_TYPE
	region:{
		latitude:56.879945,
		longitude:14.799449,
		latitudeDelta:1,
		longitudeDelta:1
	}
});

win.add(mapView);