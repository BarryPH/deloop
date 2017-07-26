<script>
export default {
	name: 'projects',
	props: {
		clear: Boolean,
		addNew: Boolean,
		author: String,
	},
	data() {
		return {
			projects: [],
		};
	},
	created() {
		this.fetchData();
	},
	methods: {
		async fetchData() {
			const params = {};

			if (this.author) {
				params.author = this.author;
			}

			const { data: projects } = await this.$http.get('/projects', { params });
			this.projects = projects;
		},
	},
};
</script>

<template>
	<div class='projects' :class='[clear ? "clear" : null]'>
		<div v-if='addNew' class='project addNew'>
			<router-link to='/projects/new'>
				<img src='http://via.placeholder.com/350x200'>
			</router-link>

			<router-link to='/projects/new'>
				<header class='title'>Add new project</header>
			</router-link>
		</div>

		<div v-for='project in projects' class='project'>
			<router-link :to='`/projects/${project._id}`'>
				<img :src='project.images[0] && project.images[0].url'>
			</router-link>

			<router-link :to='`/projects/${project._id}`'>
				<header class='title'>{{project.title}}</header>
			</router-link>
		</div>
	</div>
</template>

<style scoped>
.projects {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	width: calc(100% + 1.5rem);
}

.project {
	flex-grow: 1;
	padding: 1.2rem;
	margin-bottom: 1.5rem;
	margin-right: 1.5rem;
	width: 250px;
	background-color: #fff;
	box-shadow: 0 0 3px #eaeaea;
}

.projects.clear {
	margin-bottom: -1.5rem;
}

.projects.clear .project {
	padding: 0;
	box-shadow: none;
}

.project.addNew a {
	color: var(--color-primary-blue);
}

img {
	display: block;
	margin-bottom: 1rem;
	width: 100%;
}
</style>
