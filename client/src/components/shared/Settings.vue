<script>
import auth from '@/auth.js';
import utils from '@/utils.js';
import AppForm from '@/components/shared/AppForm.vue';

export default {
	name: 'settings-page',

	components: {
		AppForm,
	},

	data() {
		return {
			user: {},
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
			const response = await this.$http.post(`/users/${auth.user.id}`, JSONFormData);

			if (response.status !== 200) {
				return response;
			}

			const { token, user } = response.data;

			auth.setToken(token);
			this.$store.commit('SET_USER', { id: user._id, user });

			return response;
		},
	},
};
</script>

<template>
	<AppForm
		title='Settings'
		:submit='handleSubmit'
		buttonText='Save'
	>
		<div class='form-group'>
			<input placeholder='Full Name' name='name' v-model='user.name'>
			<input placeholder='Email' name='email' v-model='user.email'>
			<router-link to='/reset-password' class='password-reset'>Reset password &rarr;</router-link>
		</div>
	</AppForm>
</template>

<style scoped>
.password-reset {
	color: var(--color-primary-shade);
}
</style>
