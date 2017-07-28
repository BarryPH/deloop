const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');

/**
 * Create an new comment
 * @param {Object} req
 * @param {string} req.project
 * @param {string} req.comment
 * @returns {object}
 */
module.exports.create = async (req, res) => {
	const { project, content } = req.body;

	const comment = new Comment({
		author: req.user._id,
		project,
		content,
	});

	comment.save();

	const response = {
		comment,
		info: {
			success: true,
			message: 'Thank you for your comment',
		},
	};

	res.json(response);
};

module.exports.read = async (req, res) => {
	const { project } = req.query;

	const comments = await Comment.find({
			project,
		})
		.exec();

	res.json(comments);
};

module.exports.update = async (req, res) => {
	const comment = await Comment.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{ new: true },
	);

	res.json({
		comment,
		info: {
			success: true,
			message: 'Comment updated',
		},
	});
};

module.exports.delete = async (req, res) => {
	const response = await Comment.findOneAndRemove({
		_id: req.params.id,
	})
		.exec();

	res.json({
		info: {
			success: true,
			message: 'Comment deleted',
		},
	});
};
