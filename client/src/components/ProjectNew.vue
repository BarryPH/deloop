<script>
export default {
	name: 'project-new-page',
	data() {
		return {
			fieldImages: {
				fieldName: '',
				fileList: [],
			},
			submitted: false,
			info: {
				success: false,
				message: 'Please submit the form',
			},
		};
	},
	methods: {
		async handleSubmit(event) {
			const form = event.target;
			const formData = new FormData(form);

			const { data: { info } } = await this.$http.post('/projects', formData);

			this.info = info;
			this.submitted = true;
		},
	},
};
</script>

<template>
	<div class='container--md'>
		<div class='panel panel--bordered'>
			<h3>New Project</h3>

			<form enctype='multipart/form-data' v-on:submit.prevent='handleSubmit'>
				<div v-show='submitted' v-bind:class='["formMessage", info.success ? "successMessage" : "errorMessage"]'>{{info.message}}</div>

				<div class='form-group'>
					<input placeholder='Title' name='title'>
					<input placeholder='Tags, comma seperated (music, sports)' name='tags'>
				</div>

				<div class='form-group'>
					<h5>Project images</h5>
					<input type='file' multiple name='projectImages'>
				</div>

				<button class='fill' type='submit'>Create</button>
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
