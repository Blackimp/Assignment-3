/**
 * FACEBOOK  CONTENT
 */

var win = Titanium.UI.currentWindow;

Ti.Facebook.appid = '442274525852593';
Ti.Facebook.permissions = ['publish_stream'];
Ti.Facebook.addEventListener('login', function(e) {
    if (e.success) {
        alert('Logged in');
    }
});
Ti.Facebook.addEventListener('logout', function(e) {
    alert('Logged out');
});
    
// Add the button.  Note that it doesn't need a click event listener.
win.add(Ti.Facebook.createLoginButton({
    top : 50,
    style : Ti.Facebook.BUTTON_STYLE_WIDE
}));


/*
 * 
 * Post a Photo
/// First make sure this permission exists
Ti.Facebook.permissions = ['publish_stream'];
Ti.Facebook.authorize();

// ...
// ...

// Now post the photo after you've confirmed that authorize() succeeded
var f = Ti.Filesystem.getFile('pumpkin.jpg');
var blob = f.read();
var data = {
    message: 'This is a pumpkin',
    picture: blob
};
Ti.Facebook.requestWithGraphPath('me/photos', data, 'POST', function(e){
    if (e.success) {
        alert("Success!  From FB: " + e.result);
    } else {
        if (e.error) {
            alert(e.error);
        } else {
            alert("Unkown result");
        }
    }
});*/