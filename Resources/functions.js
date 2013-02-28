function getPosition() {
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if (e.error) {
			alert('HFL cannot get your current location');
			return;
		}

		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var timestamp = e.coords.timestamp;
		
		var returnDict = {
			longitude : longitude,
			latitude : latitude,
			timestamp : timestamp
		}
		
		return returnDict;
	});
}

function storeJSON(image, latitude, longitude, timestamp) {
	// Gather data
	var encodedImg = Titanium.Utils.base64encode(image.toString());
	if (latitude && longitude && timestamp) {
		var dictData = {
			img : encodedImg,
			latitude : latitude,
			longitude : longitude,
			timestamp : timestamp
		}
	} else {
		var dictData = {
			img : encodedImg
		}
	}
	
	// Convert to JSON
	var jsonData = JSON.stringify(dictData);
	
	// Store JSON
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'lastpic.json');
	file.write(jsonData);
}

// For loading img and location
function loadJSON() {
	// Get JSON
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'lastpic.json');
	if (file.exists()) {
	    jsonData = file.read();
	}
	else {
		return;
	}
	
	// Convert to dict
	var data = JSON.parse(jsonData);
	
	// De-Serialize image
	var encodedImg = Titanium.Utils.base64decode(data['img']);
	
	// Collect and return data
	if (data['latitiude'] && data['longitude'] && data['timestamp']) {
		returnDict = {
			img : encodedImg,
			latitude : data['latitiude'],
			longitude : data['longitude'],
			timestamp : data['timestamp']
		}
	}
	else {
		returnDict = {
			img : encodedImg
		}
	}
	return returnDict;
}

function publishPhoto() {

}
