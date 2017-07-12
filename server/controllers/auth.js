const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const rootRequire = require.main.require;
const config = rootRequire('./config/config');

function promisifiedRegister(req, res, next) {
	return new Promise((resolve, reject) => {
		passport.authenticate('local-register', (err, user, info) => {
			if (err) return reject(err);

			resolve([user, info]);
		})(req, res, next);
	});
}

function promisifiedLogin(req, res, next) {
	return new Promise((resolve, reject) => {
		passport.authenticate('local-login', (err, user, info) => {
			if (err) return reject(err);

			resolve([user, info]);
		})(req, res, next);
	});
}

function promisifiedReqLogin(req, user) {
	return new Promise((resolve, reject) => {
		req.login(user, (err) => {
			if (err) return reject(err);

			resolve(user);
		});
	});
}

module.exports.register = async (req, res, next) => {
	const [user, info] = await promisifiedRegister(req, res, next);

	if (!user) {
		return res.json({
			errorMessage: info.message,
		});
	}

	await promisifiedReqLogin(req, user);

	const token = jwt.sign(user, config.superSecret);
	const response = Object.assign({}, user._doc, {
		token,
	})
	res.json(response);
};

module.exports.login = async (req, res, next) => {
	const [user, info] = await promisifiedLogin(req, res, next);

	if (!user) {
		return res.json({
			errorMessage: info.message,
		});
	}

	const token = jwt.sign(user, config.superSecret);
	const response = Object.assign({}, user._doc, {
		token,
	})
	res.json(response);
};

module.exports.logout = async (req, res, next) => {
	req.logout();
	res.json({});
};
