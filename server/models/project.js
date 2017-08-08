const mongoose = require('mongoose');

const Types = mongoose.Schema.Types;

const ProjectSchema = new mongoose.Schema({
	title: String,
	tags: Array,
	description: String,
	author: {
		type: Types.ObjectId,
		ref: 'User',
	},
	images: Array,
});

mongoose.model('Project', ProjectSchema);

module.exports = ProjectSchema;
