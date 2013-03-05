Titanium.include('../functions.js');

var win = Titanium.UI.currentWindow;

var left = Titanium.UI.createView({
	top : 0,
	left : 0,
	width : "50%"
});

var right = Titanium.UI.createView({
	top : 0,
	left : "50%",
	width : "50%"
});

var timestampLabel = Titanium.UI.createLabel({
		top : 0
});

var newLabel = Titanium.UI.createLabel({
	text : "new taken img",
	top : 30
});

var locationLabel = Titanium.UI.createLabel({
	text : "old taken img",
	top : 30
});

var img = Titanium.UI.createImageView({
	top : 50
});

var storedimg = Titanium.UI.createImageView({
	top : 50
});

// add photo contents
left.add(newLabel);
left.add(img);
right.add(storedimg);
right.add(timestampLabel);
right.add(locationLabel);

// add buttons
var btn = Titanium.UI.createButton({
	title : "Make a Photo",
	bottom : 75,
	zIndex : 2
});

var loadbtn = Titanium.UI.createButton({
	title : "Load Photo",
	bottom : 5,
	zIndex : 2
});

var latitude = 0;
var longitude = 0;
var timestamp = 0;

loadbtn.addEventListener("click", function(e) {
	// Loading last img and location
	var oldData = loadJSON();
	if (oldData) {
		storedimg.image = oldData['img'];
		timestampLabel.text = "taken: " + oldData['timestamp'];
		locationLabel.text = "lat: " + oldData['latitude'] + " long: " + oldData['longitude'];
	}
});

btn.addEventListener("click", function(e) {
	Titanium.Media.showCamera({
		saveToPhotoGallery : false,
		mediaTypes : [Titanium.Media.MEDIA_TYPE_PHOTO],
		allowEditing : false,
		success : function(e) {
			alert("Photo taken.");

			img.image = e.media;

			Titanium.Geolocation.getCurrentPosition(function(e) {
				if (e.error) {
					alert('HFL cannot get your current location');
					return;
				}
				longitude = e.coords.longitude;
				latitude = e.coords.latitude;
				timestamp = e.coords.timestamp;
			});

			if (latitude != 0 && longitude != 0)
			{				
				storeJSON(e.media, latitude, longitude, new Date().toDateString());
			}
			else
			{
				storeJSON(e.media);
			}

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

win.add(left);
win.add(right);
win.add(btn);
win.add(loadbtn);
