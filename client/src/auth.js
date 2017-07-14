export default {
	user: {
		authenticated: !!localStorage.getItem('id_token'),
	},
	async login(context, creds) {
		const { data: { token, info } } = await context.$http.post('/login', {
			email: creds.email,
			password: creds.password,
		});

		if (!info.success) return info;

		context.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		localStorage.setItem('id_token', token);
		this.user.authenticated = true;

		context.$router.push('/');

		return info;
	},
	async register(context, creds) {
		const { data: { token, info } } = await context.$http.post('/register', {
			email: creds.email,
			password: creds.password,
			password2: creds.password2,
		});

		if (!info.success) return info;

		context.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		localStorage.setItem('id_token', token);
		this.user.authenticated = true;

		context.$router.push('/');

		return info;
	},
	async logout(context) {
		context.$http.post('/logout');
		localStorage.removeItem('id_token');
		this.user.authenticated = false;

		context.$router.push('/');
	},
	checkAuth() {
		const token = localStorage.getItem('id_token');
		return !!token;
	},
};