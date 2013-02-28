/**
 * @author Julian
 */

function getPosition() {
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
	})
}

function storeJSON(image) {
	var encodedImg = Titanium.Utils.base64encode(image.toString);
	if (latitude != 0 && longitude != 0) {
		var dictData = {
			img : encodedImg,
			latitude : latitude,
			longitude : longitude
		}
	} else {
		var dictData = {
			img : encodedImg
		}
	}
	var jsonData = JSON.stringify();
}

// For loading img and location
function loadJSON() {
	// TODO: write last img to class var 'img'
}

function publishPhoto() {

}

