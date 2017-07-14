<script>
import auth from '@/auth';

export default {
	name: 'header',
	data() {
		return {
			auth,
		}
	},
	methods: {
		async logout() {
			auth.logout(this);
		}
	},
}
</script>

<template>
	<div class='container site-header'>
		<div class='logo'>Deloop</div>
		<nav>
			<router-link to='/'>Home</router-link>
			<router-link to='/projects'>Projects</router-link>
			<router-link to='/why'>Why Deloop?</router-link>

			<span v-if='auth.user.authenticated'>
				<a v-on:click='logout()'>Logout</a>
			</span>
			<span v-else>
				<router-link to='/login'>Login</router-link>
				<router-link to='/register' class='bordered'>Register</router-link>
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
}

nav a:not {
	min-width: 500px;
	max-width: 100%;
}

nav a:not(:last-child) {
	margin-right: 1.5rem;
}
</style>
