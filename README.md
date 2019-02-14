This is a demo app with a workaround to fix bug `Ti.Locale.setLanguage()` in TiSDK 7.5.x [TIMOB-13966](https://jira.appcelerator.org/browse/TIMOB-13966)

# How it work
before build app copy the i18n files in app assets folder and parse to parse it in on run


# Config

1. copy plugin extract_i18n
2. copy CommonJS module language_manager.js
3. Add in Alloy.js `require("language_manager").init();`


## USE

	require("language_manager").setLanguage("en");
