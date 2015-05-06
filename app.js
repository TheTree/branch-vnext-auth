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
				if (browser.text("title").indexOf("protect your") > -1) {
					if (twoFactorCode != null) {
						browser.fill("input[name=otc]", twoFactorCode);
						browser.pressButton("Submit", function() {
							res.send(browser.text('html'));
//							console.log(browser.text("title"));
//							var index = browser.url.indexOf('token');
//							if (index != -1) {
//								var data = browser.url.substring(index);
//								res.json({ result: querystring.parse(data), error: null });
//								browser.close();
//							} else {
//								browser.close();
//								res.json({ result: null, error: { error_description: "Either the two factor authenication code is invalid/has expired, or unable to authenitcate with Halo Waypoint." } });
//							}
						});
					} else {
						browser.close();
						res.json({ result: null, error: { error_description: "This account has two factor authenication. Pass in the code from the authenticator app, and try again." } });
					}
				} else {
					res.send(browser.text('html'));
//					var index = browser.url.indexOf('token');
//					if (index != -1) {
//						var data = browser.url.substring(index);
//						res.json({ result: querystring.parse(data), error: null });
//						browser.close();
//					} else {
//						res.json({ result: null, error: { error_description: "Unable to authenticate with Halo Waypoint." } });
//						browser.close();
//						return;
//					}
				}
			});
	});
});

app.listen(process.env.PORT || 3001);
