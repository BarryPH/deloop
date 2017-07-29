const chai = require('chai');
const supertest = require('supertest');
const serverInstance = require('../server.js');
const utils = require('./utils.js');

const should = chai.should();
const server = supertest.agent(serverInstance);
let token;
let userId;
let commentId;

const mockComment = {
	project: '597834311ce2625d6a740f43',
	content: 'Amet temporibus eveniet impedit enim necessitatibus recusandae! Nostrum magni accusamus ab possimus doloribus quidem Officia veniam labore excepturi architecto dolor',
};

const commentUpdate = {
	content: 'Ipsum placeat quo adipisci harum mollitia amet Mollitia nostrum vero minima ipsa aspernatur Possimus odio praesentium quas asperiores accusantium. Cumque.',
};

describe('Comments', () => {
	before(async () => {
		const res = await utils.createUser();

		token = res.body.token;
		userId = res.body.user._id;
	});

	after(async() => {
		const res = await utils.deleteUser(userId, token);

		res.status.should.equal(200);
		res.body.should.be.a('object');
	});

	it('should create a comment', async () => {
		const res = await server
			.post('/comments')
			.set('authorization', `Bearer ${token}`)
			.send(mockComment);

		const { comment, info } = res.body;

		res.status.should.equal(200);
		res.body.should.be.a('object');

		comment._id.should.be.a('string');
		comment.project.should.be.a('string');
		comment.author.should.be.a('object');
		comment.content.should.be.a('string');
		comment.content.should.equal(mockComment.content);
		comment.createdAt.should.be.a('string');
		info.success.should.be.a('boolean');
		info.success.should.equal(true);
		info.message.should.be.a('string');

		commentId = comment._id;
	});

	it('should fail to create a comment without auth', async () => {
		const res = await server
			.post('/comments')
			.send(mockComment);

		res.status.should.equal(403);
	});

	it('should fetch project comments', async() => {
		const res = await server
			.get('/comments')
			.query({
				project: mockComment.project,
			});

		const comments = res.body;

		res.status.should.equal(200);
		res.body.should.be.a('array');

		comments.should.be.a('array');
		comments.should.have.length.of.at.least(1);
		comments[0]._id.should.be.a('string');
		comments[0].project.should.be.a('string');
		comments[0].author.should.be.a('object');
		comments[0].project.should.be.a('string');
		comments[0].content.should.be.a('string');
		comments[0].content.should.equal(mockComment.content);
		comments[0].createdAt.should.be.a('string');
	});

	it('should update comment content', async() => {
		const res = await server
			.put(`/comments/${commentId}`)
			.set('authorization', `Bearer ${token}`)
			.send(commentUpdate);

		const { comment, info } = res.body;

		res.status.should.equal(200);
		res.body.should.be.a('object');

		comment._id.should.be.a('string');
		comment.project.should.be.a('string');
		comment.author.should.be.a('string');
		comment.project.should.be.a('string');
		comment.content.should.be.a('string');
		comment.content.should.equal(commentUpdate.content);
		comment.createdAt.should.be.a('string');
		info.success.should.be.a('boolean');
		info.success.should.equal(true);
		info.message.should.be.a('string');
	});

	it('should fail to update a comment without auth', async () => {
		const res = await server
			.put(`/comments/${commentId}`)
			.send(commentUpdate);

		res.status.should.equal(403);
	});

	/*
	it('should fail to create a comment wihout being the creator', async () => {
	});
	*/

	it('should delete a comment', async () => {
		const res = await server
			.delete(`/comments/${commentId}`)
			.set('authorization', `Bearer ${token}`);

		const { info } = res.body;

		res.status.should.equal(200);
		res.body.should.be.a('object');

		info.success.should.be.a('boolean');
		info.success.should.equal(true);
		info.message.should.be.a('string');
	});
});
