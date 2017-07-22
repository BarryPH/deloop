<script>
import auth from '@/auth';
import utils from '@/utils.js';

export default {
	name: 'register-page',
	data() {
		return {
			email: '',
			password: '',
			password2: '',
			submitted: false,
			info: {
				success: false,
				message: 'Please submit the form',
			},
		};
	},
	methods: {
		async handleSubmit() {
			const JSONFormData = utils.formToJSON(event.target);
			const info = await auth.register(this, JSONFormData);

			this.info = info;
			this.submitted = true;
		},
	},
};
</script>

<template>
	<div class='container--sm'>
		<div class='panel panel--bordered text-center'>
			<h3>Join Deloop</h3>

			<form v-on:submit.prevent='handleSubmit'>
				<div v-show='submitted' :class='["formMessage", info.success ? "successMessage" : "errorMessage"]'>{{info.message}}</div>

				<div class='form-group'>
					<input placeholder='Email' name='email'>
					<input placeholder='Password' name='password' type='password'>
					<input placeholder='Repeat Password' name='password2' type='password'>
				</div>

				<button class='fill' type='submit'>Register</button>
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
</style>
