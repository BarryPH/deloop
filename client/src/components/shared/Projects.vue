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
		<div v-if='addNew' class='project'>
			<router-link to='/projects/new'>
				<div class='add-new-body'>
					<div>&plus;</div>
				</div>
			</router-link>

			<router-link to='/projects/new'>
				<header class='title add-new-link'>Add new project</header>
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

.add-new-body {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 175px;
	width: 100%;
	background-color: var(--color-primary-grey);
	font-size: 2.8rem;
}

.add-new-link {
	color: var(--color-primary-shade);
}

img {
	display: block;
	width: 100%;
}

.title {
	margin-top: 1rem;
}

@media (max-width: 400px) {
	.projects {
		width: 100%;
	}

	.project {
		margin-right: 0;
	}
}
</style>
