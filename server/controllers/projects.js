const faker = require('faker');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const { promisify } = require('util');

const Project = mongoose.model('Project');

module.exports.read = async (req, res) => {
	const projects = await Project.find({ author: req.user })
	.exec();

	res.json(projects);
};

module.exports.create = async (req, res) => {
	const uploadPromises = req.files.map(file => promisify(cloudinary.v2.uploader.upload)(file.path));

	const uploadedFiles = await Promise.all(uploadPromises);

	const tags = req.body.tags.split(',').map(tag => tag.trim());

	const project = new Project({
		title: req.body.title,
		tags,
		author: req.user._id,
		images: uploadedFiles,
	});

	project.save();

	const response = {
		project,
		info: {
			success: true,
			message: 'Success!',
		},
	};

	res.json(response);
};
