$ = module.exports = {
	init: init,
	setLanguage: setLanguage
};

const SELECTED_LANGUAGE = "APP_SELECTED_LANGUAGE";

var appStrings = {};
var selectedLanguage;

// PRIVATE FUNCTIONS

function init() {
	// overide functions
	L = __L;
	Ti.Locale.getCurrentLanguage = __getCurrentLanguage;

	selectedLanguage = Ti.App.Properties.getString(SELECTED_LANGUAGE, Ti.Locale.currentLanguage);
	setLanguage(selectedLanguage);

}

function __L(key, lang) {
	return appStrings[selectedLanguage][key] || ("_" + key);
}


function __getCurrentLanguage() {
	return selectedLanguage;
}


function setLanguage(langaugeId) {
	loadStringsValue(langaugeId);
	if (Ti.Locale.getCurrentLanguage() == langaugeId) {
		return;
	}

	selectedLanguage = langaugeId;
	Ti.Locale.setLanguage(langaugeId);
	Ti.App.Properties.setString(SELECTED_LANGUAGE, langaugeId);

	if (langaugeId == "ar") {
		//Force to algeria
		require('alloy/moment').locale("ar-dz");
	} else {
		require('alloy/moment').locale(langaugeId);
	}

}

function loadStringsValue(lang) {
	if (appStrings[lang]) {
		return;
	}
	var fileName = ("i18n/__LANG__/strings.xml").replace("__LANG__", lang);
	var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, fileName);
	appStrings[lang] = xmlToJson(f.read().text);
}

function xmlToJson(xml) {
	var json = {};
	try {
		regex = /<string.*?<\/string>/g
		xml = xml.match(regex);
		for (var i = 0; i < xml.length; i++) {
			var line = xml[i];
			var key = line.match(/name=\".*?\"/)[0];
			var value = line.match(/>.*<\//)[0];

			key = key.substring(6, key.length - 1);
			value = value.substring(1, value.length - 2);
			json[key] = value;
		}
	} catch (e) {
		log.e(e.message, "catch");
	}
	return json;

}
