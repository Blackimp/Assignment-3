/**
 * MAP  CONTENT
 */

var win = Titanium.UI.currentWindow;

var map = Titanium.Map.createView({
	mapType: Titanium.Map.SATELLITE_TYPE,
	animate: true,
	regionFit: true,
	userLocation: true,
	// Titanium.Map.STANDARD_TYPE
	// Titanium.Map.HYBRID_TYPE
	region:{
		latitude:43.85514,
		longitude:-1.385032,
		latitudeDelta:1,
		longitudeDelta:1
	}
});

win.add(map);