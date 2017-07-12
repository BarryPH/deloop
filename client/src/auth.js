export default {
	user: {
		authenticated: false,
	},
	async login(context, creds) {
		const { data: { token } } = await context.$http.post('/login', {
			email: creds.email,
			password: creds.password,
		});

		context.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		localStorage.setItem('id_token', token);
		this.user.authenticated = true;
		//location.reload();
	},
	async register(context, creds) {
		const { data: { token } } = await context.$http.post('/register', {
			email: creds.email,
			password: creds.password,
			password2: creds.password2,
		});

		context.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		localStorage.setItem('id_token', token);
		this.user.authenticated = true;
		//location.reload();
	},
	async logout(context) {
		await context.$http.post('/logout');
		localStorage.removeItem('id_token');
		this.user.authenticated = false;
		//context.$router.push('/logout');
	},
	checkAuth() {
		const jwt = localStorage.getItem('id_token');
		return jwt && this.user.authenticated;
	},
};
