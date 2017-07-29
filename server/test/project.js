const chai = require('chai');
const supertest = require('supertest');
const serverInstance = require('../server.js');
const utils = require('./utils.js');

const should = chai.should();
const server = supertest.agent(serverInstance);
let authToken;
let userId;
let projectId;

const mockProject = {
	title: 'Lorem omnis voluptas at excepturi',
	tags: 'Sit, quod, , dolorum, ,,',
	description: 'Sit harum culpa ab commodi numquam? Fuga voluptatum pariatur cupiditate minima reiciendis. Ab quibusdam consequatur maiores officiis quos? Corporis quis architecto eos quia aliquid nisi nemo? Adipisci nulla tenetur laborum?',
	images: [],
};

const projectUpdate = {
	title: 'Consectetur iusto consectetur reprehenderit deleniti',
	description: 'Dolor ratione impedit repudiandae voluptas nostrum. Et facere aut ipsum eum et minima dolore Sequi possimus facere autem atque magnam',
};

describe('Projects', () => {
	before(async () => {
		const res = await utils.createUser();

		const { token, user } = res.body;

		authToken = token;
		userId = user._id;
	});

	after(async() => {
		const res = await utils.deleteUser(userId, authToken);

		res.status.should.equal(200);
	});

	it('should create a project', async () => {
		const res = await server
			.post('/projects')
			.set('authorization', `Bearer ${authToken}`)
			.send(mockProject);

		const { project, info } = res.body;

		res.status.should.equal(200);

		project.title.should.equal(mockProject.title);
		project.tags.should.have.same.members(['Sit', 'quod', 'dolorum']);
		project.description.should.equal(mockProject.description);
		project.author.should.be.a('string');
		project.images.should.be.a('array');

		info.success.should.equal(true);
		info.message.should.be.a('string');

		projectId = project._id;
	});

	it('should fail to create a project without auth', async () => {
		const res = await server
			.post('/projects')
			.send(mockProject);

		res.status.should.equal(403);
	});

	it('should fetch project', async () => {
		const res = await server
			.get('/projects')
			.query({
				id: projectId
			});

		const project = res.body;

		res.status.should.equal(200);

		project.title.should.equal(mockProject.title);
		project.tags.should.have.same.members(['Sit', 'quod', 'dolorum']);
		project.description.should.equal(mockProject.description);
		project.author.should.be.a('string');
		project.images.should.be.a('array');
	});

	it('should update project content', async() => {
		const res = await server
			.put(`/projects/${projectId}`)
			.set('authorization', `Bearer ${authToken}`)
			.send(projectUpdate);

		const { project, info } = res.body;

		res.status.should.equal(200);

		project.title.should.equal(projectUpdate.title);
		project.tags.should.have.same.members(['Sit', 'quod', 'dolorum']);
		project.description.should.equal(projectUpdate.description);
		project.author.should.be.a('string');
		project.images.should.be.a('array');

		info.success.should.equal(true);
		info.message.should.be.a('string');
	});

	it('should fail to update a project without auth', async () => {
		const res = await server
			.put(`/projects/${projectId}`)
			.send(projectUpdate);

		res.status.should.equal(403);
	});

	/*
	it('should fail to create a comment wihout being the creator', async () => {
	});
	*/

	it('should delete a project', async () => {
		const res = await server
			.delete(`/projects/${projectId}`)
			.set('authorization', `Bearer ${authToken}`);

		const { info } = res.body;

		res.status.should.equal(200);

		info.success.should.equal(true);
		info.message.should.be.a('string');
	});
});
