var Browser = require("zombie");
var express = require('express');
var bodyParser = require("body-parser");
var querystring = require("querystring");
var app = express();

app.use(bodyParser());
app.get('/', function (req, res) {
	res.json({ "urm...": "you're in the wrong part of the right place." });
});
app.post('/api/v1/halo4', function (req, res) {
	if (req.body == undefined) {
		res.json({ result: null, error: { error_description: "No account information" } });
		return;
	}

	var microsoftAccount = null;
	var microsoftAccountPassword = null;

	if (req.body.identity != undefined)
		microsoftAccount = req.body["MicrosoftAccount"];
	if (req.body.identity_password != undefined)
		microsoftAccountPassword = req.body["MicrosoftAccountPassword"];

	if (microsoftAccount == null || microsoftAccountPassword == null) {
		res.json({ result: null, error: { error_description: "No account information" } });
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

app.listen(process.env.PORT || 3001);
