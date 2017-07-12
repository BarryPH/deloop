<script>
import axios from 'axios';

export default {
	name: 'projects',
	data: function() {
		return {
			projects: [],
		}
	},
	created() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			const { data: projects } = await axios.get('http://localhost:3000/projects');
			this.projects = projects;
		},
	},
}
</script>

<template>
	<div class='projects'>
		<div v-for='project in projects' class='project'>
			<img :src='project.featureImage.url'>

			<a :href='"/projects/" + project._id'>
				<header class='title'>{{project.title}}</header>
			</a>
		</div>
	</div>
</template>

<style scoped>
.projects {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.project {
	padding: 1.2rem;
	margin-bottom: 2rem;
	max-width: 300px;
	background-color: #fff;
	box-shadow: 0 0 3px #eaeaea;
}

img {
	display: block;
	margin-bottom: 1rem;
	width: 100%;
	height: 150px;
	background-color: #f2f2f2;
}
</style>
