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
	.post(upload.array('projectImages'), projects.create);

router.route('/comments')
	.get(comments.read)
	.post(middleware.serializeUser)
	.post(comments.create);

router.route('/register')
	.post(auth.register);

router.route('/login')
	.post(auth.login);

router.route('/logout')
	.post(auth.logout);

router.route('/users/:id')
	.all(middleware.serializeUser)
	.get(users.read)
	.post(middleware.ensureUserOfId)
	.post(users.update);

module.exports = router;
