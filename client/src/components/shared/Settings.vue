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
			const { data: { token, user, info } } = await this.$http.post(`/users/${auth.user.id}`, JSONFormData);

			auth.setToken(token);

			// eslint-disable-next-line no-underscore-dangle
			this.$store.commit('SET_USER', { id: user._id, user });

			return info;
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
