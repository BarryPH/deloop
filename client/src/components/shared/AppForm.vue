<script>
export default {
	name: 'App-Form',

	props: {
		submit: Function,
		buttonText: String,
		title: String,
		enctype: String,
	},

	data() {
		return {
			loading: false,
			status: {},
		};
	},

	methods: {
		async handleSubmit(event) {
			this.loading = true;

			const { success, message } = await this.submit(event);

			this.loading = false;
			this.status.success = success;
			this.status.message = message;
		},
	},
};
</script>

<template>
	<div class='root'>
		<div v-show='loading' class='loading'><span>&#9881;</span></div>

		<h3>{{title}}</h3>

		<form v-on:submit.prevent='handleSubmit' enctype={enctype}>
			<div v-show='this.status.message' v-bind:class='["formMessage", status.success ? "successMessage" : "errorMessage"]'>{{status.message}}</div>

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

form {
	margin-top: 2rem;
}

.formMessage {
	margin-bottom: 2rem;
}

button {
	width: 100%;
}
</style>
