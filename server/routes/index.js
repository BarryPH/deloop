const express = require('express');
const multer = require('multer');

const router = express.Router();
const storage = multer.diskStorage({});
const upload = multer({ storage });

const rootRequire = require.main.require;
const middleware = rootRequire('./routes/middleware.js');
const projects = rootRequire('./controllers/projects');
const user = rootRequire('./controllers/user');
const auth = rootRequire('./controllers/auth');

router.route('/projects')
	.all(middleware.ensureValidJwt)
	.get(projects.read)
	.post(upload.array('projectImages'), projects.create);

router.route('/register')
	.post(auth.register);

router.route('/login')
	.post(auth.login);

router.route('/logout')
	.post(auth.logout);

router.route('/user')
	.all(middleware.ensureValidJwt)
	.all(middleware.ensureSignedIn)
	.get(user.read)
	.post(user.update)
	.post(middleware.ensureValidJwt);

module.exports = router;
