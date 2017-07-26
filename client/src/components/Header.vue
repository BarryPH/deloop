<script>
import auth from '@/auth';

export default {
	name: 'header',

	data() {
		return {
			auth,
		};
	},

	methods: {
		async logout() {
			auth.logout(this);
		},
	},
};
</script>

<template>
	<div class='container site-header'>
		<router-link to='/' class='logo color-primary'>Deloop</router-link>
		<nav>
			<router-link to='/'>Home</router-link>
			<router-link to='/projects'>Projects</router-link>
			<router-link to='/why'>Why Deloop?</router-link>

			<span v-if='auth.user.id'>
			<router-link :to='`/profile/${auth.user.id}`'>Profile</router-link>
				<a v-on:click='logout()'>Logout</a>
			</span>
			<span v-else>
				<router-link to='/login'>Login</router-link>
				<router-link to='/register' class='color-primary'><span class='icon icon-left'>&#10148;</span>Register</router-link>
			</span>
		</nav>
	</div>
</template>

<style scoped>
.site-header {
	display: flex;
	justify-content: space-between;
	padding-top: 1.2rem;
	padding-bottom: 1.2rem;
	background-color: #333;
	color: #fff;
}

.logo {
	font-weight: bold;
	font-size: 1.2rem;
	text-transform: uppercase;
}

nav a:not(:last-child) {
	margin-right: 1.5rem;
}
</style>
