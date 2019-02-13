exports.init = function(logger, config, cli, appc) {
	var path = require('path'),
		fs = require('fs');

	var appDir = path.join(cli.argv['project-dir'], 'app');
	var dir_asset_i18n = appDir + '/assets/i18n';

	cli.on("build.pre.construct", function() {
		//copy i18n in assets

		logger.info(' --- Start copy i18n');



		if (!fs.existsSync(dir_asset_i18n)) {
			fs.mkdirSync(dir_asset_i18n);
		}

		var file_src = appDir + "/i18n/__lang__/strings.xml";
		var file_dst = dir_asset_i18n + "/__lang__/strings.xml";

		var langs = ["ar", "en", "fr"];

		for (var i = 0; i < langs.length; i++) {
			var tmp = dir_asset_i18n + "/" + langs[i];
			if (!fs.existsSync(tmp)) {
				fs.mkdirSync(tmp);
			}

			var src = file_src.replace("__lang__", langs[i]);
			var dst = file_dst.replace("__lang__", langs[i]);
			try {
				fs.copyFileSync(src, dst);
				logger.info(' --- Success copy ' + dst);
			} catch (e) {
				logger.error(' --- Faild copy ' + dst + e.message);
				process.exit(0);
			}
		}
	});

	cli.addHook('clean.post', function(build, finished) {
		deleteFolderRecursive(dir_asset_i18n);
	});

	function deleteFolderRecursive(path) {
		if (fs.existsSync(path)) {
			fs.readdirSync(path).forEach(function(file, index) {
				var curPath = path + "/" + file;
				if (fs.lstatSync(curPath).isDirectory()) { // recurse
					deleteFolderRecursive(curPath);
				} else { // delete file
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdirSync(path);
		}
	};
};
