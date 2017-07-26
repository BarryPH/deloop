<script>
import Projects from '@/components/shared/Projects.vue';
import Settings from '@/components/shared/Settings.vue';
import auth from '@/auth';

export default {
	name: 'profile-page',
	components: {
		Projects,
		Settings,
	},
	data() {
		return {
			auth,
			section: 'projects',
		};
	},
	computed: {
		user() {
			return this.$store.state.users[auth.user.id];
		},
	},
	async created() {
		this.$store.dispatch('FETCH_USER', { id: auth.user.id });
	},
};
</script>

<template>
	<div class='container'>
		<div v-if='auth.user.id' class='section-links'>
			<div v-if='section === "projects"' class='links-follow'>
				<a @click='section = "settings"'>Edit settings <span class='icon'>&#10148;</span></a>
			</div>

			<div v-if='section === "settings"'>
				<a @click='section = "projects"'><span class='icon-left flip'>&#10148;</span> Return to profile</a>
			</div>
		</div>

		<div v-if='user' class='panels-wrapper'>
			<div class='panel panel--bordered user-sidebar'>
				<div class='text-center'>
					<img class='headshot' src='http://creatingrealities.com/wp-content/uploads/2017/02/Loveleen-Kaur-Kang-Headshot-Square-300x300.jpg'>
					<header class='user-name'>{{user.name}}</header>
				</div>

				<div class='user-info'>
					<div>Projects: {{user.projectCount}}</div>
					<div>Joined: {{user.joined}}</div>
					<hr>
					<div>{{user.business}}</div>
					<div><a class='link' href='http://localhost:3000'>{{user.website}}</a></div>
				</div>
			</div>

			<div class='panel content'>
				<div v-if='section === "projects"'>
					<Projects :author='$route.params.id' clear />
				</div>

				<Settings v-else-if='section === "settings"' />
			</div>
		</div>
	</div>
</template>

<style scoped>
.section-links {
	margin-left: calc(250px + 1rem);
	margin-bottom: 1rem;
	opacity: 0.8;
}

.links-follow {
	text-align: right;
}

.panels-wrapper {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
}

.user-sidebar {
	padding: 2rem;
	margin-right: 1rem;
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
</style>
