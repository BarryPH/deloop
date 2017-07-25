<script>
import auth from '@/auth';
import utils from '@/utils.js';
import AppForm from '@/components/shared/AppForm.vue';

export default {
	name: 'register-page',
	components: {
		AppForm,
	},
	methods: {
		async handleSubmit(event) {
			const JSONFormData = utils.formToJSON(event.target);
			return auth.register(this, JSONFormData);
		},
	},
};
</script>

<template>
	<div class='container--sm text-center'>
		<AppForm
			title='Join Deloop'
			:submit='handleSubmit'
			buttonText='Register'
		>
			<div class='form-group'>
				<input placeholder='Email' name='email'>
				<input placeholder='Password' name='password' type='password'>
				<input placeholder='Repeat Password' name='password2' type='password'>
			</div>
		</AppForm>
	</div>
</template>

<style scoped>
</style>
