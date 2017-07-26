const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
	title: String,
	tags: Array,
	description: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	images: Array,
});

mongoose.model('Project', ProjectSchema);

module.exports = ProjectSchema;
