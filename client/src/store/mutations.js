import Vue from 'vue';

export default {
	SET_USER(state, { id, user }) {
		Vue.set(state.users, id, user);
	},
};
