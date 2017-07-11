<script>
const projects = Array(6).fill({
	_id: 0,
	title: 'Employify Homepage',
})

export default {
	name: 'projects',
	data: function() {
		return {
			projects,
		}
	},
}
</script>

<template>
	<div class='projects'>
		<div v-for='project in projects' class='project'>
			<div class='image'>
			</div>

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
	background-color: #fff;
	padding: 1.2rem;
	margin-bottom: 2rem;
	box-shadow: 0 0 3px #eaeaea;
}

.image {
	margin-bottom: 1rem;
	width: 250px;
	height: 150px;
	background-color: #f2f2f2;
}
</style>
