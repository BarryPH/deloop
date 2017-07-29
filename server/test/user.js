const chai = require('chai');
const supertest = require('supertest');
const serverInstance = require('../server.js');
const utils = require('./utils.js');

const should = chai.should();
const server = supertest.agent(serverInstance);
let userId;
let authToken;

const mockUser = utils.mockUser;
const userUpdate = {
	email: 'updated@mail.com',
};

describe('Users', () => {
	it('should create a user', async () => {
		const res = await utils.createUser();
		const { token, user, info } = res.body;

		res.status.should.equal(200);
		token.should.be.a('string');

		user._id.should.be.a('string');
		user.email.should.equal(mockUser.email);
		should.equal(user.password, undefined);

		info.success.should.equal(true);
		info.message.should.be.a('string');

		authToken = token;
		userId = user._id;
	});

	it('should login user', async () => {
		const res = await server
			.post('/login')
			.query(mockUser);

		const { token, id, info } = res.body;

		res.status.should.equal(200);
		token.should.be.a('string');

		id.should.be.a('string');

		info.success.should.equal(true);
		info.message.should.be.a('string');
	});

	it('should fail to login user with invalid credentials', async () => {
		const invalidMockUser = {
			email: 'invalid@mail.com',
			password: 'invalid',
		};

		const res = await server
			.post('/login')
			.query(invalidMockUser);

		const { info } = res.body;

		res.status.should.equal(200);

		info.success.should.equal(false);
		info.message.should.be.a('string');
	});

	it('should update users settings', async() => {
		const res = await server
			.put(`/users/${userId}`)
			.set('authorization', `Bearer ${authToken}`)
			.send(userUpdate);

		const { user, info } = res.body;

		res.status.should.equal(200);

		user.email.should.equal(userUpdate.email);
		should.equal(user.password, undefined);

		info.success.should.equal(true);
		info.message.should.be.a('string');
	});

	it('should fail to update a user without auth', async () => {
		const res = await server
			.put(`/users/${userId}`)
			.send(userUpdate);

		res.status.should.equal(403);
	});

	/*
	it('should fail to create a user wihout being the user', async () => {
	});
	*/

	it('should delete a user', async () => {
		const res = await utils.deleteUser(userId, authToken);
		const { info } = res.body;

		res.status.should.equal(200);
		res.body.should.be.a('object');

		info.success.should.equal(true);
		info.message.should.be.a('string');
	});

	/*
	it('should fail to delete a user without being the user', async () => {
	});
	*/
});
