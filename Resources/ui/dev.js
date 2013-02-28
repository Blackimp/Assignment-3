var win = Titanium.UI.currentWindow;

//
// FUNCTIONS
//
function devStoreJSON(testString) {
	// Convert to JSON
	var jsonData = JSON.stringify(testString);
	
	// Store JSON
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'dev.json');
	file.write(jsonData);

}

// For loading img and location
function devLoadJSON() {
	// Get JSON
	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'dev.json');
	if (file.exists()) {
	    jsonData = file.read();
	}
	else {
		return;
	}
	
	// Convert to dict
	var data = JSON.parse(jsonData);
	
	// Collect and return data
	return jsonData;
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

devGetBtn.addEventListener("click", function(e){
	if (devLoadJSON())
	{
		devLabel.text = "JSON: " + devLoadJSON();
	}
});

devBtn.addEventListener("click", function(e){
	devStoreJSON(devInput.value);
});

win.add(devInput);
win.add(devLabel);
win.add(devBtn);
win.add(devGetBtn);
