<script>
import auth from '@/auth';
import axios from 'axios';

export default {
	name: 'register',
	data() {
		return {
			email: '',
			password: '',
			password2: '',
		};
	},
	methods: {
		async handleSubmit() {
			const formData = {
				email: this.email,
				password: this.password,
				password2: this.password2,
			};

			auth.register(this, formData);
		},
	},
}
</script>

<template>
	<div class='container'>
		<div class='wrapper'>
			<h3>Join Deloop</h3>

			<form v-on:submit.prevent='handleSubmit'>
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
.container {
	text-align: center;
}

.wrapper {
	border-top: 15px solid #333;
	padding: 2.5rem;
	max-width: 400px;
	margin: auto;
	background-color: #fff;
	box-shadow: 0 0 3px #dadada;
}

form {
	margin: 2rem 0 0;
}

input {
	display: block;
	width: 100%;
	margin-bottom: 1rem;
	background-color: #eaeaea;
}
</style>
