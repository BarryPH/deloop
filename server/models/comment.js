const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	content: String,
	project: {
		type: Schema.Types.ObjectId,
		ref: 'Project',
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

mongoose.model('Comment', CommentSchema);

module.exports = CommentSchema;
