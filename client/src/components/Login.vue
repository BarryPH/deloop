<script>
import auth from '@/auth';
import utils from '@/utils.js';

export default {
	name: 'login-page',
	data() {
		return {
			submitted: false,
			info: {
				success: false,
				message: 'Please submit the form',
			},
		};
	},
	methods: {
		async handleSubmit(event) {
			const JSONFormData = utils.formToJSON(event.target);
			const info = await auth.login(this, JSONFormData);

			this.info = info;
			this.submitted = true;
		},
	},
};
</script>

<template>
	<div class='container--sm'>
		<div class='panel panel--bordered text-center'>
			<h3>Login</h3>


			<form v-on:submit.prevent='handleSubmit'>
				<div v-show='submitted' v-bind:class='["formMessage", info.success ? "successMessage" : "errorMessage"]'>{{info.message}}</div>

				<div class='form-group'>
					<input placeholder='Email' name='email'>
					<input placeholder='Password' name='password' type='password'>
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

.formMessage {
	margin-bottom: 2rem;
}
</style>
