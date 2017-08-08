const mongoose = require('mongoose');

const Types = mongoose.Schema.Types;

const CommentSchema = new mongoose.Schema({
	author: {
		type: Types.ObjectId,
		ref: 'User',
	},
	content: String,
	project: {
		type: Types.ObjectId,
		ref: 'Project',
	}
});

mongoose.model('Comment', CommentSchema);

module.exports = CommentSchema;
