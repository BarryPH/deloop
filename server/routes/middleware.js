const ejwt = require('express-jwt');

const rootRequire = require.main.require;
const config = rootRequire('./config/config');

module.exports.serializeUser = (req, res, next) => {
	ejwt({ secret: config.superSecret, credentialsRequired: false })(req, res, next);
};

module.exports.ensureSignedIn = (req, res, next) => {
	if (!req.user) return res.status(403).end();

	return next();
};

module.exports.ensureUserOfId = (req, res, next) => {
	if (!req.user || req.user._id !== req.params.id) return res.status(403).end();

	return next();
};
