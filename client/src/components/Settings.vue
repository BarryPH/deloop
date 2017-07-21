<script>
import axios from 'axios';

export default {
	name: 'settings-page',
	data() {
		return {
			name: '',
			email: '',
			submtited: false,
			info: {
				success: false,
				message: '',
			},
		}
	},
	methods: {
		async handleSubmit() {
			console.log('submitted');
		}
	}
}
</script>

<template>
	<div class='container--md'>
		<div class='panel panel--bordered'>
			<h3>Settings</h3>

			<form v-on:submit.prevent='handleSubmit'>
				<div v-show='submitted' v-bind:class='["formMessage", info.success ? "successMessage" : "errorMessage"]'>{{info.message}}</div>

				<div class='form-group'>
					<input placeholder='Full Name' name='name' v-model='name'>
					<input placeholder='Email' name='email' v-model='email'>
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
