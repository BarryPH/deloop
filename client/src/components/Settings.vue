<script>
import auth from '@/auth.js';
import utils from '@/utils.js';

export default {
	name: 'settings-page',
	data() {
		return {
			user: {},
			info: {
				success: false,
				message: '',
			},
		};
	},
	created() {
		this.fetchUserData();
	},
	methods: {
		async fetchUserData() {
			const user = await this.$store.dispatch('FETCH_USER', { id: auth.user.id });
			this.user = JSON.parse(JSON.stringify(user));
		},
		async handleSubmit(event) {
			const JSONFormData = utils.formToJSON(event.target);
			const { data: { token, user, info } } = await this.$http.post(`/users/${auth.user.id}`, JSONFormData);

			this.info = info;
			auth.setToken(token);

			// eslint-disable-next-line no-underscore-dangle
			this.$store.commit('SET_USER', { id: user._id, user });
		},
	},
};
</script>

<template>
	<div class='container--md'>
		<div class='panel panel--bordered'>
			<h3>Settings</h3>

			<form @submit.prevent='handleSubmit'>
				<div v-show='info' v-bind:class='["formMessage", info.success ? "successMessage" : "errorMessage"]'>{{info.message}}</div>

				<div class='form-group'>
					<input placeholder='Full Name' name='name' v-model='user.name'>
					<input placeholder='Email' name='email' v-model='user.email'>
					<router-link to='/reset-password' class='password-reset'>Reset password &rarr;</router-link>
				</div>

				<button class='fill fill-go' type='submit'>Save</button>
			</form>
		</div>
	</div>
</template>

<style scoped>
form {
	margin-top: 2rem;
}

.formMessage {
	margin-bottom: 2rem;
}

.password-reset {
	color: var(--color-primary-shade);
}
</style>
