var win = Titanium.UI.currentWindow;

//
// FUNCTIONS
//
function devStoreJSON(testString) {
	// Gather data
	/*
	var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'tempdevimg.png');
        f.write(devGetImg.toImage());
        alert(f.nativePath); // it will return the native path of image
                blob = f.read();
	*/
	
	var imgData = devGetImg.toBlob();
	
	var encodedImg = Titanium.Utils.base64encode(imgData);
	var data = {
		img : encodedImg['text'],
		text : testString
	}
	
	// Convert to JSON
	var jsonData = JSON.stringify(data);
	
	// Store JSON
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, 'dev.json');
	file.write(jsonData);

}

// For loading img and location
function devLoadJSON() {
	// Get JSON
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, 'dev.json');
	if (file.exists()) {
	    jsonData = file.read();
	}
	else {
		return;
	}
	
	// Convert to dict
	var data = JSON.parse(jsonData);
	
	// Collect and return data
	return data;
}

//
// CONTENT
//
var devLabel = Titanium.UI.createLabel({
	bottom : 20
});

var devInput = Titanium.UI.createTextField({
	top : 30,
	width : "100%"
});

var devBtn = Titanium.UI.createButton({
	title : "store JSON",
	top : 100
});

var devGetBtn = Titanium.UI.createButton({
	title : "get JSON",
	top : 200
});

var devGetImg = Titanium.UI.createImageView({
	image : "/images/test.jpg",
	bottom : 40,
	height : 30,
	width : 80
});

var devPutImg = Titanium.UI.createImageView({
	top : 300
});

devGetBtn.addEventListener("click", function(e){
	var dict = devLoadJSON();
	if (dict)
	{
		devLabel.text = "JSON: " + dict['text'];
		devPutImg.image = Titanium.Utils.base64decode(dict['img']);
	}
});

devBtn.addEventListener("click", function(e){
	devStoreJSON(devInput.value);
});

win.add(devInput);
win.add(devLabel);
win.add(devBtn);
win.add(devGetBtn);
win.add(devPutImg);
win.add(devGetImg);
