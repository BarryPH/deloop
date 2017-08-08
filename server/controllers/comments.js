const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');

module.exports.create = async (req, res) => {
	const comment = new Comment({
		author: req.user._id,
		project: req.body.project,
		content: req.body.comment.trim(),
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
	const comments = await Comment.find({
		project: req.query.project,
	})
	.populate('author')
	.exec();

	res.json(comments);
};

module.exports.update = async (req, res) => {
};

module.exports.delete = async (req, res) => {
};
