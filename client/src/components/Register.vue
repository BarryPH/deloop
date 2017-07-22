<script>
import auth from '@/auth';

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
			const formData = {
				email: this.email,
				password: this.password,
				password2: this.password2,
			};

			const info = await auth.register(this, formData);

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
					<input placeholder='Email' name='email' v-model='email'>
					<input placeholder='Password' name='password' type='password' v-model='password'>
					<input placeholder='Repeat Password' name='password2' type='password' v-model='password2'>
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
