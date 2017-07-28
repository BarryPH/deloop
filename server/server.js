const express = require('express');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const pkg = require('./package.json');

const app = express();
const rootRequire = require.main.require;
const config = rootRequire('./config/config');

process.env.CLOUDINARY_URL = config.cloudinaryUrl;

process.on('unhandledRejection', (reason) => {
	// eslint-disable-next-line no-console
	console.log('Unhandled Rejection:', reason);
});

if (process.env.NODE_ENV !== 'prodution' && process.env.NODE_ENV !== 'test') {
	app.use(logger('dev'));
}

// Use native promises as mongoose promise library
mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri || `mongodb://localhost/${pkg.name}`, {
	useMongoClient: true,
});
require('./models');

app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
rootRequire('./config/passport');

app.use(rootRequire('./routes'));

app.use((err, req, res) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({ errorMessage: 'Invalid authorization token.' });
	}
});

async function main() {
	const port = process.env.PORT || 3000;
	await app.listen(port);

	// eslint-disable-next-line no-console
	console.log(`Server is running on port: ${port}`);
}

if (process.env.NODE_ENV !== 'test') {
	main();
}

module.exports = app;
