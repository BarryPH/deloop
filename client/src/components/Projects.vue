<script>
import Hero from '@/components/Home/Hero.vue'
import Projects from '@/components/shared/Projects.vue'

export default {
	name: 'projects-page',
	components: {
		Hero,
		Projects,
	},
}
</script>

<template>
	<div>
		<div class='container'>
			<h3 class='section-header text-center'>Projects<hr></h3>

			<Projects />

			<div class='text-center'>
				<a href='/projects'>View more <span class='icon'>&rarr;</span></a>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>
