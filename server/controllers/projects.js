const faker = require('faker');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const { promisify } = require('util');

module.exports.read = async (req, res) => {
	const projects = Array(6).fill({
		_id: faker.random.uuid(),
		title: faker.lorem.words(),
		author: {
			name: faker.name.findName(),
		},
		featureImage: {
			url: 'https://images.pexels.com/photos/251225/pexels-photo-251225.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
		}
	});

	res.json(projects);
};

module.exports.create = async (req, res) => {
	const uploadPromises = req.files.map((file, i) => {
		return promisify(cloudinary.v2.uploader.upload)(file.path);
	});

	const uploadedFiles = await Promise.all(uploadPromises);

	const project = new Project({
		title: req.body.title,
		tags: req.body.tags,
		author: req.user._id,
		images: uploadedFiles,
	});

	project.save();

	const response = {
		project,
		info: {
			success: true,
			message: 'Success!',
		}
	};

	res.json(response);
}
