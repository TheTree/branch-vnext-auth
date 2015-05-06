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

	var identity = null;
	var password = null;
	var twoFactorCode = null;

	if (req.body.identity != undefined)
		identity = req.body["identity"];
	if (req.body.identity_password != undefined)
		password = req.body["identity_password"];
	if (req.body.identity_two_factor_code != undefined)
		twoFactorCode = req.body["identity_two_factor_code"];

	if (identity == null || password == null) {
		res.json({ result: null, error: { error_description: "No account information" } });
		return;
	}

	var browser = new Browser();
	Browser.userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.104 Safari/537.36";
	browser.visit("https://app.halowaypoint.com/oauth/spartanToken", function() {
		browser.
			fill("input[type=email]", identity).
			fill("input[type=password]", password).
			pressButton("Sign in", function() {
				if (browser.text('body').indexOf('SpartanToken') != -1) {
					var data = browser.text('body');
					res.json({ result: JSON.parse(data), error: null });
					browser.close();
				} else {
					res.json({ result: null, error: { description: "unable_to_authentication_with_halo_waypoint", details: browser.text('body') } });
					browser.close();
					return;
				}
			});
	});
});

app.listen(process.env.PORT || 3001);
