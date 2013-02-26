/**
 * PHOTO  CONTENT
 */

var win = Titanium.UI.currentWindow;

var btn = Titanium.UI.createButton({
	title: "Make a Photo",
	bottom: 20
});

btn.addEventListener("click", function(e){
	Titanium.Media.showCamera({
		saveToPhotoGallery: false,
		mediaTypes: [Titanium.Media.MEDIA_TYPE_PHOTO],
		success:function(e){
			var img = Titanium.UI.createImageView({
				image:e.media,
				top: 20
			})
			
			win.add(img);
		},
		error:function(e){
			alert("Something went terrible wrong.");
		},
		cancel:function(e){
			alert("Make up your damn mind.");
		},
	})
})

win.add(btn);