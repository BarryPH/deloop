<script>
export default {
	name: 'App-Form',

	props: {
		title: String,
		buttonText: String,
		enctype: String,
		submit: Function,
	},

	data() {
		return {
			loading: false,
			success: false,
			message: '',
		};
	},

	methods: {
		async handleSubmit(event) {
			this.loading = true;

			const response = await this.submit(event);

			this.loading = false;
			this.success = response.status === 200;
			this.message = response.data.message;
		},
	},
};
</script>

<template>
	<div class='root'>
		<div v-show='loading' class='loading'><span>&#9881;</span></div>

		<h3 v-if='title'>{{title}}</h3>

		<form v-on:submit.prevent='handleSubmit' enctype={enctype}>
			<div v-show='this.message' v-bind:class='["formMessage", success ? "successMessage" : "errorMessage"]'>{{message}}</div>

			<slot />

			<button class='fill fill-go' type='submit'>{{buttonText}}</button>
		</form>
	</div>
</template>

<style scoped>
.root {
	position: relative;
}

.loading {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	opacity: 0.4;
	font-size: 4rem;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.loading span {
	animation: spin 3s infinite linear;
}

.title {
	margin-bottom: 2rem;
}

.formMessage {
	margin-bottom: 2rem;
}

button {
	width: 100%;
}
</style>
