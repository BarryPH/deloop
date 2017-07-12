const express = require('express');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const pkg = require('./package.json');
const app = express();
const rootRequire = require.main.require;

process.on('unhandledRejection', (reason) => {
	console.log('Unhandled Rejection:', reason);
});

if (process.env.NODE_ENV !== 'prodution' && process.env.NODE_ENV !== 'test') {
	app.use(logger('dev'));
}

mongoose.connect('mongodb://localhost/deloop', { useMongoClient: true });
require('./models');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
rootRequire('./config/passport');

app.use(rootRequire('./routes'));

async function main() {
	const port = process.env.PORT || 3000;
	await app.listen(port);

	if (process.env.NODE_ENV !== 'test') {
		console.log(`Server is running on port: ${port}`);
	}
}

main();
