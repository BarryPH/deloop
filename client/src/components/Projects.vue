<script>
import Hero from '@/components/Home/Hero.vue';
import Projects from '@/components/shared/Projects.vue';

export default {
	name: 'projects-page',

	components: {
		Hero,
		Projects,
	},
};
</script>

<template>
	<div class='container'>
		<h3 class='section-header text-center'>Projects<hr></h3>

		<Projects />

		<div class='text-center'>
			<router-link to='/projects'>View more <span class='icon'>&rarr;</span></router-link>
		</div>
	</div>
</template>

<style scoped>
</style>
