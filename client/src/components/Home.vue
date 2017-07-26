<script>
import Hero from '@/components/Home/Hero.vue';
import Projects from '@/components/shared/Projects.vue';

export default {
	name: 'home-page',

	components: {
		Hero,
		Projects,
	},
};
</script>

<template>
	<div>
		<Hero />

		<div class='container'>
			<h4 class='section-header text-center'>Recent Projects</h4>

			<Projects />

			<div class='text-center'>
				<router-link to='/projects'>View more <span class='icon'>&rarr;</span></router-link>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>
