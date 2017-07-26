<script>
export default {
	name: 'project-page',

	data() {
		return {
			project: {},
		}
	},

	created() {
		this.fetchProject();
	},

	methods: {
		async fetchProject() {
			const params = {
				id: this.$route.params.id,
			};
			const { data: project } = await this.$http.get('/projects', { params });
			this.project = project;
		}
	},
}
</script>

<template>
	<div class='container'>
		<div class='panel'>
			<h2>{{project.title}}</h2>
			<p>{{project.description}}</p>
		</div>

		<div v-for='image in project.images' class='panel'>
			<img :src='image.secure_url' />
		</div>
	</div>
</template>

<style scoped>
.panel {
	margin-bottom: 2rem;
}
</style>
