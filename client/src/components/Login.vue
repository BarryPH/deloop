<script>
import auth from '@/auth';
import axios from 'axios';

export default {
	name: 'login',
	data() {
		return {
			email: '',
			password: '',
		};
	},
	methods: {
		async handleSubmit() {
			const formData = {
				email: this.email,
				password: this.password,
			};

			auth.login(this, formData);
		},
	},
}
</script>

<template>
	<div class='container--sm'>
		<div class='panel text-center'>
			<h3>Login</h3>

			<form v-on:submit.prevent='handleSubmit'>
				<div class='form-group'>
					<input placeholder='Email' name='email' v-model='email'>
					<input placeholder='Password' name='password' type='password' v-model='password'>
				</div>

				<button class='fill' type='submit'>Login</button>
			</form>
		</div>
	</div>
</template>

<style scoped>
form {
	margin-top: 2rem;
}
</style>
