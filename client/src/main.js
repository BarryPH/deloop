// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store';
import './assets/css/global.css';

const jwtToken = localStorage.getItem('id_token');
if (jwtToken) axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
axios.defaults.baseURL = 'http://localhost:3000';

const customAxios = axios.create({
	validateStatus: status => status < 500,
});

Vue.prototype.$http = customAxios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App },
	store,
});
