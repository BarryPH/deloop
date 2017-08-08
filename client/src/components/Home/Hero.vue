<script>
export default {
	name: 'hero',
};
</script>

<template>
	<div class='container hero'>
		<h1 class='hero-headline'>Deloop</h1>

		<nav>
			<router-link class='fill color-primary' to='/projects'>View Projects</router-link>
			<router-link to='/register'>Register <span class='icon'>&#10148;</span></router-link>
		</nav>
	</div>
</template>

<style scoped>
.hero {
	background-color: var(--color-primary);
	text-align: center;
	min-height: 50vh;
	display: flex;
	justify-content: center;
	flex-direction: column;
}

.hero-headline {
	text-transform: uppercase;
	letter-spacing: 0.9rem;
	margin-bottom: 2rem;
}

.hero-subheadline {
	margin-bottom: 3.5rem;
	font-weight: 200;
	font-family: var(--font);
}

nav {
	font-size: 1.2rem;
}

nav a {
	display: inline-block;
	width: 200px;
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
