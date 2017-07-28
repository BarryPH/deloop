const ejwt = require('express-jwt');
const mongoose = require('mongoose');

const rootRequire = require.main.require;
const config = rootRequire('./config/config');

const Comment = mongoose.model('Comment');

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

module.exports.ensureCommentOwner = async (req, res, next) => {
	if (!req.user) return res.status(403).end();

	const comment = await Comment.findOne({
		_id: req.params.id,
		author: req.user._id,
	})
		.exec();

	if (!comment) return res.status(403).end();

	return next();
};
