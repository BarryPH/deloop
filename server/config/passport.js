const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Project = mongoose.model('Project');

const returnErrorMessage = (done, message) => done(null, false, { message });

async function findUserByEmail(email) {
	const caseInsensitiveEmail = new RegExp('^' + email + '$', 'i');
	const user = await User.findOne({ email: caseInsensitiveEmail });

	return user;
}

async function comparePasswords(passwordOne, passwordTwo) {
	const doPasswordsMatch = await bcrypt.compare(passwordOne, passwordTwo);

	return doPasswordsMatch;
}

async function createUser({ email, password }) {
	const hash = await bcrypt.hash(password, 10);
	const user = new User({
		email,
		password: hash,
	});

	user.save();

	return user;
}

passport.serializeUser((user, done) => done(null, user.email));
passport.deserializeUser(async (email, done) => done(null, await findUserByEmail(email)));

passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
}, async (req, email, password, done) => {
	const invalidCrednentialsMessage = 'Invalid email or password';
	const user = await findUserByEmail(email);
	const doPasswordsMatch = await comparePasswords(password, user.password);

	if (!user || !doPasswordsMatch) {
		return done(null, false, { message: invalidCrednentialsMessage });
	}

	done(null, user);
}));

passport.use('local-register', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
}, async (req, email, password, done) => {
	const existingUser = await findUserByEmail(email);
	if (existingUser) return done(null, false, { message: 'Email is already in use by another account'});

	req.checkBody('email', 'A valid email is required.').isEmail();
	req.checkBody('password', 'Password must be at least 8 characters long.').isLength({ min: 8 });
	req.checkBody('password', 'Passwords do not match').equals(req.body.password2);

	const validationErrors = req.validationErrors();
	if (validationErrors) return done(null, false, { message: validationErrors[0].msg});

	const user = await createUser({
		email,
		password,
	});

	done(null, user);
}));
