<script>
import Projects from '@/components/shared/Projects.vue'

export default {
	name: 'profile',
	components: {
		Projects,
	},
}
</script>

<template>
	<div class='container'>
		<div class='panel panel--bordered user-sidebar'>
			<div class='text-center'>
				<img class='headshot' src='http://creatingrealities.com/wp-content/uploads/2017/02/Loveleen-Kaur-Kang-Headshot-Square-300x300.jpg'>
				<header class='user-name'>Thomas Terry</header>
			</div>

			<div class='user-info'>
				<div>Projects: 24</div>
				<div>Joined: 12/05/17</div>
				<hr>
				<div>Code Completion</div>
				<div><a class='link' href='http://localhost:3000'>Website</a></div>
			</div>
		</div>

		<div class='panel content'>
			<div class='tabs'>
				<a href='#' class='tab active'>
					Projects
				</a>
			</div>

			<Projects clear />
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
}

.user-sidebar {
	padding: 2rem;
	margin-right: 0.3rem;
	width: 250px;
}

.user-sidebar .user-name {
	margin-top: 0.8rem;
	font-weight: bold;
}

.headshot {
	width: 125px;
	height: 125px;
	border-radius: 100%;
}

.user-info {
	margin-top: 1.5rem;
	font-size: 0.88rem;
}

.user-info hr {
	margin: 1rem 0;
}


.content {
	flex-grow: 1;
	flex-basis: 0;
}

.content.panel {
	padding: 0;
}

.tabs {
	border-bottom: 1px solid #eaeaea;
}

.tab {
	display: inline-block;
	padding: 1rem 1.5rem 1rem;
}

.tab.active {
	font-weight: bold;
}
</style>
