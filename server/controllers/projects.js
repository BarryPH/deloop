const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const { promisify } = require('util');

const Project = mongoose.model('Project');
const ObjectId = mongoose.Types.ObjectId;

/**
 * Returns a list of optionally filtered projects
 * If the id query is passed returns a single project object instead of an array
 *
 * @param {Object} req
 * @param {String} req.id
 * @param {String} req.author
 * @returns {(Array|Object)}
 */
module.exports.read = async (req, res) => {
	const projectsQuery = Project.find();

	if (req.query.id) {
		projectsQuery.where({ _id: req.query.id });
	}

	if (req.query.author) {
		projectsQuery.where({ author: ObjectId(req.query.author) });
	}

	const projects = await projectsQuery.exec();

	return req.query.id
		? res.json(projects[0])
		: res.json(projects);
};

module.exports.create = async (req, res) => {
	const files = req.files || [];

	const uploadPromises = files.map(file => promisify(cloudinary.v2.uploader.upload)(file.path));
	const uploadedFiles = await Promise.all(uploadPromises);

	const tags = req.body.tags.split(',')
		.map(tag => tag.trim())
		.filter(tag => tag !== '');

	const project = new Project({
		title: req.body.title,
		tags,
		description: req.body.description,
		author: req.user._id,
		images: uploadedFiles,
	});

	project.save();

	const response = {
		project,
	};

	res.json(response);
};
