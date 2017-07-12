const faker = require('faker');

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
