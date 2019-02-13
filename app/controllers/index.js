// refreshText();

$.index.open();

function refreshText(){
	$.lbHelloWorld.text = L("helloWorld")
}
function setEN(e) {
	require("language_manager").setLanguage("en");
	refreshText()
}

function setFR(e) {
	require("language_manager").setLanguage("fr");
	refreshText()
}

function setAR(e) {
	require("language_manager").setLanguage("ar");
	refreshText()
}
