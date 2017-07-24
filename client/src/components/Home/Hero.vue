<script>
export default {
	name: 'hero',
};
</script>

<template>
	<div class='container hero'>
		<h2 class='hero-headline'>A place for designers <br> to give and recieve feedback</h2>

		<nav>
			<router-link class='fill color-primary' to='/projects'>View Projects</router-link>
			<router-link to='/register'>Register <span class='icon'>&rarr;</span></router-link>
		</nav>
	</div>
</template>

<style scoped>
.hero {
	padding-top: 7rem;
	padding-bottom: 7rem;
	background-color: var(--color-primary);
	text-align: center;
}

.hero-headline {
	text-transform: capitalize;
	margin-bottom: 3rem;
}

nav {
	font-size: 1.2rem;
}

nav a:not(:last-child) {
	margin-right: 1.5rem;
}

@media (max-width: 500px) {
	.hero {
		padding-top: 3rem;
		padding-bottom: 3rem;
	}

	nav a {
		display: block;
		margin-top: 1rem;
	}

	nav a:not(:last-child) {
		margin: 0;
	}

	a .icon {
		display: none;
	}
}
</style>
