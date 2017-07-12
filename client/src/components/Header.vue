<script>
export default {
	name: 'header',
}
</script>

<template>
	<div class='container site-header'>
		<div class='logo'>Deloop</div>
		<nav>
			<a href='/'>Home</a>
			<a href='/projects'>Projects</a>
			<a href='/why'>Why Deloop?</a>
			<a href='/login'>Login</a>
			<a class='bordered' href='/register'>Register</a>
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
