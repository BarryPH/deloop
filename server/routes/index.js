const express = require('express');
const multer = require('multer');

const router = express.Router();
const storage = multer.diskStorage({});
const upload = multer({ storage });

const rootRequire = require.main.require;
const middleware = rootRequire('./routes/middleware.js');
const projects = rootRequire('./controllers/projects');
const comments = rootRequire('./controllers/comments');
const users = rootRequire('./controllers/users');
const auth = rootRequire('./controllers/auth');

router.route('/projects')
	.all(middleware.serializeUser)
	.get(projects.read)
	.post(middleware.ensureSignedIn)
	.post(upload.array('projectImages'), projects.create);

router.route('/projects/:id')
	.put(middleware.serializeUser)
	.put(middleware.ensureProjectOwner)
	.put(projects.update)
	.delete(middleware.serializeUser)
	.delete(middleware.ensureProjectOwner)
	.delete(projects.delete)

router.route('/comments')
	.get(comments.read)
	.post(middleware.serializeUser)
	.post(middleware.ensureSignedIn)
	.post(comments.create);

router.route('/comments/:id')
	.put(middleware.serializeUser)
	.put(middleware.ensureCommentOwner)
	.put(comments.update)
	.delete(middleware.serializeUser)
	.delete(middleware.ensureCommentOwner)
	.delete(comments.delete);

router.route('/register')
	.post(auth.register);

router.route('/login')
	.post(auth.login);

router.route('/logout')
	.post(auth.logout);

router.route('/users/:id')
	.all(middleware.serializeUser)
	.get(users.read)
	.put(middleware.ensureUserOfId)
	.put(users.update);

module.exports = router;
