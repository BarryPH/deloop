<script>
import AppForm from '@/components/shared/AppForm.vue';
import ImagesInput from '@/components/ProjectNew/ImagesInput.vue';

export default {
	name: 'project-new-page',

	components: {
		AppForm,
		ImagesInput,
	},

	methods: {
		async handleSubmit(event) {
			const form = event.target;
			const formData = new FormData(form);

			const { data: { info } } = await this.$http.post('/projects', formData);

			return info;
		},
	},
};
</script>

<template>
	<div class='container--md'>
		<div class='panel'>
			<AppForm
				enctype='multipart/form-data'
				title='New Project'
				:submit='handleSubmit'
				buttonText='Create'
			>
				<div class='form-group'>
					<input placeholder='Title' name='title'>
					<input placeholder='Tags, comma seperated (music, sports)' name='tags'>
					<textarea placeholder='What is your project about?' rows='4' name='description'></textarea>
				</div>

				<div class='form-group'>
					<h5>Project images:</h5>

					<ImagesInput name='projectImages' />
				</div>
			</AppForm>
		</div>
	</div>
</template>

<style scoped>
</style>
