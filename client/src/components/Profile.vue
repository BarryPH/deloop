<script>
import Profile from '@/components/shared/Profile.vue';
import auth from '@/auth';

export default {
	name: 'profile-page',
	components: {
		Profile,
	},
	data() {
		return {
			auth,
		};
	},
};
</script>

<template>
	<div class='container'>
		<div v-if='auth.user.id' class='settings-link'>
			<router-link to='/settings'>Edit settings &rarr;</router-link>
		</div>

		<Profile />
	</div>
</template>

<style scoped>
.settings-link {
	margin-bottom: 1rem;
	opacity: 0.8;
	text-align: right;
}
</style>
