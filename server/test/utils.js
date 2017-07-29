const chai = require('chai');
const supertest = require('supertest');
const serverInstance = require('../server.js');

const server = supertest.agent(serverInstance);

const mockUser = {
	email: 'test@mail.com',
	password: 'asdfasdf',
	password2: 'asdfasdf',
};

module.exports.createUser = async () => {
	const res = await server
		.post('/register')
		.send(mockUser);

	return res;
};

module.exports.deleteUser = async (id, token) => {
	const res = await server
		.delete(`/users/${id}`)
		.set('authorization', `Bearer ${token}`);

	return res;
};

module.exports.mockUser = mockUser;
