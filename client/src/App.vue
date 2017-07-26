<script>
import Header from '@/components/Header.vue';

export default {
	name: 'app',

	components: { Header },
};
</script>

<template>
	<div id="app">
		<Header />
		<router-view></router-view>
	</div>
</template>

<style>
</style>
