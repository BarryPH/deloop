const ejwt = require('express-jwt');

const rootRequire = require.main.require;
const config = rootRequire('./config/config');

module.exports.ensureValidJwt = (req, res, next) => {
	ejwt({ secret: config.superSecret })(req, res, next);
}
