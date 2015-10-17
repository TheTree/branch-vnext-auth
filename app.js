var Browser = require("zombie");
var express = require('express');
var bodyParser = require("body-parser");
var querystring = require("querystring");
var request = require('request');
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var router = express.Router();

router.route('/').get(function(req, res, next) {
	res.json({ "urm...": "you're in the wrong part of the right place." });
});

router.route('/halo4').post(function(req, res, next) {
	if (req.body == undefined) {
		res.json({ result: null, error: { error_description: "no_account_information" } });
		return;
	}

	var microsoftAccount = null;
	var microsoftAccountPassword = null;

	if (req.body["MicrosoftAccount"] != undefined)
		microsoftAccount = req.body["MicrosoftAccount"];
	if (req.body["MicrosoftAccountPassword"] != undefined)
		microsoftAccountPassword = req.body["MicrosoftAccountPassword"];

	if (microsoftAccount == null || microsoftAccountPassword == null) {
		res.json({ Result: null, Error: { Description: "no_account_information" } });
		return;
	}

	var browser = new Browser();
	Browser.userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36";
	browser.visit("https://app.halowaypoint.com/oauth/spartanToken", function() {
		browser.
			fill("input[type=email]", microsoftAccount).
			fill("input[type=password]", microsoftAccountPassword).
			pressButton("Sign in", function() {
				if (browser.text('body').indexOf('SpartanToken') != -1) {
					var data = browser.text('body');
					res.json({ Result: JSON.parse(data), Error: null });
					browser.close();
				} else {
					res.json({ Result: null, Error: { Description: "unable_to_authentication_with_halo_waypoint", details: browser.text('body') } });
					browser.close();
					return;
				}
			});
	});
});

router.route('/xboxlive').post(function(req, res, next) {
	if (req.body == undefined) {
		res.json({ result: null, error: { error_description: "no_account_information" } });
		return;
	}

	var microsoftAccount = null;
	var microsoftAccountPassword = null;

	if (req.body["MicrosoftAccount"] != undefined)
		microsoftAccount = req.body["MicrosoftAccount"];
	if (req.body["MicrosoftAccountPassword"] != undefined)
		microsoftAccountPassword = req.body["MicrosoftAccountPassword"];

	if (microsoftAccount == null || microsoftAccountPassword == null) {
		res.json({ Result: null, Error: { Description: "no_account_information" } });
		return;
	}
	
	var browser = new Browser();
	Browser.userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36";
	browser.visit("https://login.live.com/oauth20_authorize.srf?client_id=0000000048093EE3&redirect_uri=https://login.live.com/oauth20_desktop.srf&response_type=token&display=touch&scope=service::user.auth.xboxlive.com::MBI_SSL", function() {
		browser.
			fill("input[type=email]", microsoftAccount).
			fill("input[type=password]", microsoftAccountPassword).
			pressButton("Sign in", function() {
				var index = browser.url.indexOf('access_token');
				if (index != -1) {
					var data = browser.url.substring(index);
					res.json({ Result: querystring.parse(data), Error: null });
					browser.close();
				} else {
					res.json({ Result: null, Error: { Description: "unable_to_authentication_with_xbox_live" } });
					return;
				}
			});
	});
});

app.use('/api/v1', router);
app.listen(process.env.PORT || 3001);
