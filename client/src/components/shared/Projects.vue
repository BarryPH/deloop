<script>
export default {
	name: 'projects',
	props: {
		clear: Boolean,
		addNew: Boolean,
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
			const { data: projects } = await this.$http.get('/projects');
			this.projects = projects;
		},
	},
};
</script>

<template>
	<div class='projects' :class='[clear ? "clear" : null]'>
		<div v-for='project in projects' class='project'>
			<a :href='"/projects/" + project._id'>
				<img :src='project.featureImage.url'>
			</a>

			<a :href='"/projects/" + project._id'>
				<header class='title'>{{project.title}}</header>
			</a>
		</div>

		<div class='project addNew'>
			<a href='/projects/new'>
				<img src='http://via.placeholder.com/350x200'>
			</a>

			<a href='/projects/new'>
				<header class='title'>Add new project</header>
			</a>
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
	justify-content: space-evenly;
	padding: 1rem;
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
