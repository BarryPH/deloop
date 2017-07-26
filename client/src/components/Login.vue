<script>
import auth from '@/auth';
import utils from '@/utils.js';
import AppForm from '@/components/shared/AppForm.vue';

export default {
	name: 'login-page',
	components: {
		AppForm,
	},
	methods: {
		async handleSubmit(event) {
			const JSONFormData = utils.formToJSON(event.target);
			return auth.login(this, JSONFormData);
		},
	},
};
</script>

<template>
	<div class='container--sm text-center'>
		<div class='panel'>
			<AppForm
				title='Login'
				:submit='handleSubmit'
				buttonText='Login'
			>
				<div class='form-group'>
					<input placeholder='Email' name='email'>
					<input placeholder='Password' name='password' type='password'>
				</div>
			</AppForm>
		</div>
	</div>
</template>

<style scoped>
</style>
