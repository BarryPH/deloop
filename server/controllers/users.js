const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const rootRequire = require.main.require;
const config = rootRequire('./config/config');
const utils = rootRequire('./controllers/utils.js');

const User = mongoose.model('User');

module.exports.read = async (req, res) => {
	const user = await User.findOne({ _id: req.params.id })
		.exec();

	const userJSON = user.toObject();
	const cleanUser = utils.cleanUser(userJSON);

	res.json(cleanUser);
};

module.exports.update = async (req, res) => {
	const cleanUpdates = utils.cleanUser(req.body);

	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		cleanUpdates,
		{ new: true },
	);

	const userJSON = user.toObject();
	const token = jwt.sign(userJSON, config.superSecret);
	const cleanUser = utils.cleanUser(userJSON);


	res.json({
		token,
		user: cleanUser,
		info: {
			success: true,
			message: 'Your settings have been updated',
		},
	});
};

module.exports.delete = async (req, res) => {
	const user = await User.findOneAndRemove({
		_id: req.params.id,
	})
		.exec();

	res.json({
		info: {
			success: true,
			message: 'Account deleted',
		}
	});
};
