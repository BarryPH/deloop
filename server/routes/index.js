const express = require('express');
const multer = require('multer');
const ejwt = require('express-jwt');

const router = express.Router();
const storage = multer.diskStorage({});
const upload = multer({ storage });

const rootRequire = require.main.require;
const projects = rootRequire('./controllers/projects');
const auth = rootRequire('./controllers/auth');
const config = rootRequire('./config/config');

router.route('/projects')
	.get(projects.read)
	.post(ejwt({ secret: config.superSecret }))
	.post(upload.array('projectImages'), projects.create);

router.route('/register')
	.post(auth.register);

router.route('/login')
	.post(auth.login);

router.route('/logout')
	.post(auth.logout);

module.exports = router;
