// Bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}


// Setup structure
var tabGroup = Titanium.UI.createTabGroup();

var fbWin = Titanium.UI.createWindow({
	title: "Facebook Screen",
	url: "ui/fb.js"
});

var fbTab = Titanium.UI.createTab({
	title: "Facebook",
	window: fbWin
});

var mapWin = Titanium.UI.createWindow({
	title: "Map Screen",
	url: "ui/map.js"
});

var mapTab = Titanium.UI.createTab({
	title: "Map",
	window: mapWin
});

var photoWin = Titanium.UI.createWindow({
	title: "Photo Screen",
	url: "ui/photo.js"
});

var photoTab = Titanium.UI.createTab({
	title: "Photo",
	window: photoWin
});

var devWin = Titanium.UI.createWindow({
	title: "Dev Screen",
	url: "ui/dev.js"
});

var devTab = Titanium.UI.createTab({
	title: "Dev",
	window: devWin
});

tabGroup.addTab(fbTab);
tabGroup.addTab(mapTab);
tabGroup.addTab(photoTab);
tabGroup.addTab(devTab);

tabGroup.open();