<script>
import Hero from '@/components/Home/Hero.vue'
import Projects from '@/components/shared/Projects.vue'

export default {
	name: 'home',
	components: {
		Hero,
		Projects,
	}
}
</script>

<template>
	<div>
		<Hero />

		<div class='container recent'>
			<h4 class='section-header recent-headline'>Recent Projects</h4>

			<Projects />

			<div class='text-center'>
				<a href='/projects'>View more <span class='icon'>&rarr;</span></a>
			</div>
		</div>
	</div>
</template>

<style scoped>
.recent-headline {
	text-align: center;
	margin-top: 0;
}
</style>
