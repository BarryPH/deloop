import axios from 'axios';

export default {
	async FETCH_USER({ commit, state }, { id }) {
		if (!state.users[id]) {
			const { data: user } = await axios.get(`/users/${id}`);
			commit('SET_USER', { id, user });
		}

		return state.users[id];
	},
};
