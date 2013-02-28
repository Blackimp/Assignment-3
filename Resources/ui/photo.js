Titanium.include('../functions.js');

var win = Titanium.UI.currentWindow;


var timestampLabel = Titanium.UI.createLabel({
	top : 20
});

var locationLabel = Titanium.UI.createLabel({
	text : "no image taken before",
	top : 50
});

var img = Titanium.UI.createImageView({
	top : 80
});

var btn = Titanium.UI.createButton({
	title : "Make a Photo",
	bottom : 20
});

var latitude = 0;
var longitude = 0;

// For storing img and location locally
function storeJSON(image) {
	var encodedImg = Titanium.Utils.base64encode(image.toString);
	if (latitude != 0 && longitude != 0)
	{
		var dictData = {
			img : encodedImg,
			latitude : latitude,
			longitude : longitude
		}
	}
	else
	{
		var dictData = {
			img : encodedImg
		}
	}
	var jsonData = JSON.stringify();
}

// Loading last img and location
var oldData = loadJSON();
if (oldData) {
	img.image = oldData['img'];
	timestampLabel = "taken: " + oldData['timestamp'];
	locationLabel = "lat: " + oldData['latitude'] + " long: " + oldData['longitude'];
}

btn.addEventListener("click", function(e) {
	Titanium.Media.showCamera({
		saveToPhotoGallery : false,
		mediaTypes : [Titanium.Media.MEDIA_TYPE_PHOTO],
		allowEditing : false,
		success : function(e) {
			alert("Photo taken.");
			
			img.image = e.media;
			
			// store local JSON
			var returnDict = getPosition();
			if (returnDict)
			{
				storeJSON(e.media, returnDict['latitiude'], returnDict['longitiude'], returnDict['timestamp']);
			}
			else
			{
				storeJSON(e.media);
			}
			
			Titanium.Geolocation.getCurrentPosition(function(e) {
				if (e.error) {
					alert('HFL cannot get your current location');
					return;
				}
				longitude = e.coords.longitude;
				latitude = e.coords.latitude;
			});

			var image = e.media;
			var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'camera_photo.png');
			f.write(image);
			//win.backgroundImage = f.nativePath;

			Ti.Facebook.permissions = ['publish_stream'];
			Ti.Facebook.authorize();

			// Now post the photo after you've confirmed that authorize() succeeded
			// var f = Ti.Filesystem.getFile(img);

			var blob = f.read();

			if (latitude != 0 && longitude != 0) {
				var data = {
					message : "Latitude: " + latitude + " " + "Longitude: " + longitude,
					picture : blob
				}
			} else {
				var data = {
					message : "Couldn't get the current location",
					picture : blob
				}
			};

			Ti.Facebook.requestWithGraphPath('me/photos', data, 'POST', function(e) {
				if (e.success) {
					alert("Success!  From FB: " + e.result);
				} else {
					if (e.error) {
						alert(e.error);
					} else {
						alert("Unkown result");
					}
				}
			});
		},
		error : function(e) {
			alert("Something went terrible wrong.");
		},
		cancel : function(e) {
			alert("Make up your damn mind.");
		}
	})
})

win.add(btn);
win.add(img);
win.add(timestampLabel);
win.add(locationLabel);
