const express = require('express');
const router = express.Router();

const rootRequire = require.main.require;
const projects = rootRequire('./controllers/projects');

router.route('/projects')
	.get(projects.read);

module.exports = router;
