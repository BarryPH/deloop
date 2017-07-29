const passport = require('passport');
const jwt = require('jsonwebtoken');

const rootRequire = require.main.require;
const config = rootRequire('./config/config');
const utils = rootRequire('./controllers/utils.js');

function promisifiedRegister(req, res, next) {
	return new Promise((resolve, reject) => {
		passport.authenticate('local-register', (err, user, info) => {
			if (err) return reject(err);

			return resolve([user, info]);
		})(req, res, next);
	});
}

function promisifiedLogin(req, res, next) {
	return new Promise((resolve, reject) => {
		passport.authenticate('local-login', (err, user, info) => {
			if (err) return reject(err);

			return resolve([user, info]);
		})(req, res, next);
	});
}

function promisifiedReqLogin(req, user) {
	return new Promise((resolve, reject) => {
		req.login(user, (err) => {
			if (err) return reject(err);

			return resolve(user);
		});
	});
}

module.exports.register = async (req, res, next) => {
	const [user, info] = await promisifiedRegister(req, res, next);

	if (!user) {
		res.status(400)
			.json({
				message: info.message,
			});
		return;
	}

	await promisifiedReqLogin(req, user);

	const userJSON = user.toObject();
	const token = jwt.sign(userJSON, config.superSecret);

	const cleanUser = utils.cleanUser(userJSON);

	const response =
	res.json({
		token,
		id: userJSON._id,
		user: cleanUser,
	});
};

module.exports.login = async (req, res, next) => {
	const [user, info] = await promisifiedLogin(req, res, next);

	if (!user) {
		res.status(401)
			.json({
				message: info.message,
			});
		return;
	}

	const userJSON = user.toObject();
	const token = jwt.sign(userJSON, config.superSecret);
	const response = Object.assign({}, userJSON, {
		token,
		id: userJSON._id,
	});

	return res.json(response);
};

module.exports.logout = async (req, res) => {
	req.logout();
	res.json({});
};
