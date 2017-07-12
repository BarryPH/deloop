const express = require('express');
const router = express.Router();

const rootRequire = require.main.require;
const projects = rootRequire('./controllers/projects');
const auth = rootRequire('./controllers/auth');
const middleware = rootRequire('./routes/middleware');

router.route('/projects')
	.get(projects.read);

router.route('/register')
	.post(auth.register);

router.route('/login')
	.post(auth.login);

router.route('/logout')
	.post(auth.logout);

module.exports = router;
