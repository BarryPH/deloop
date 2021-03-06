export default {
	user: {
		id: localStorage.getItem('user_id'),
	},

	async login(context, creds) {
		const response = await context.$http.post('/login', {
			email: creds.email,
			password: creds.password,
		});

		if (response.status !== 200) {
			return response;
		}

		const { token, id } = response.data;

		localStorage.setItem('id_token', token);
		localStorage.setItem('user_id', id);

		this.user = {
			id,
		};

		// eslint-disable-next-line no-param-reassign
		context.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
		context.$router.push({ name: 'Profile', params: { id }});

		return response;
	},

	async register(context, creds) {
		const response = await context.$http.post('/register', {
			email: creds.email,
			password: creds.password,
			password2: creds.password2,
		});

		if (response.status !== 200) {
			return response;
		};

		const { token, id } = response.data;

		localStorage.setItem('id_token', token);
		localStorage.setItem('user_id', id);

		this.user = {
			id,
		};

		// eslint-disable-next-line no-param-reassign
		context.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
		context.$router.push({ name: 'Profile', params: { id }});

		return response;
	},

	async logout(context) {
		context.$http.post('/logout');

		localStorage.removeItem('id_token');
		localStorage.removeItem('user_id');

		this.user = {};

		// eslint-disable-next-line no-param-reassign
		delete context.$http.defaults.headers.common.Authorization;
		context.$router.push('/');
	},

	setToken(token) {
		localStorage.setItem('id_token', token);
	},

	checkAuth() {
		const token = localStorage.getItem('id_token');
		return !!token;
	},
};
