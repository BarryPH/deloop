const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

/**
 * Return user with provided email (case-insensitive)
 * @param {string} email Email to search by
 * @returns {object}
 */
async function findUserByEmail(email) {
	const caseInsensitiveEmail = new RegExp(`^${email}$`, 'i');
	const user = await User.findOne({ email: caseInsensitiveEmail });

	return user;
}

/**
 * Create a new user with provided user object
 * @param {object} user
 * @param {string} user.email
 * @param {string} user.password
 * @returns {object}
 */
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

	if (!user) return done(null, false, { message: invalidCrednentialsMessage });

	const doPasswordsMatch = await bcrypt.compare(password, user.password);

	if (!doPasswordsMatch) return done(null, false, { message: invalidCrednentialsMessage });

	return done(null, user);
}));

passport.use('local-register', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
}, async (req, email, password, done) => {
	const existingUser = await findUserByEmail(email);
	if (existingUser) return done(null, false, { message: 'Email is already in use by another account' });

	req.checkBody('email', 'A valid email is required.').isEmail();
	req.checkBody('password', 'Password must be at least 8 characters long.').isLength({ min: 8 });
	req.checkBody('password', 'Passwords do not match').equals(req.body.password2);

	const validationErrors = req.validationErrors();
	if (validationErrors) return done(null, false, { message: validationErrors[0].msg });

	const user = await createUser({
		email,
		password,
	});

	return done(null, user);
}));
