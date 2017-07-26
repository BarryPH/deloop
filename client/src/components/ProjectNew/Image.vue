<script>
export default {
	name: 'images',

	props: {
		name: String,
	},

	data() {
		return {
			images: [],
		};
	},

	methods: {
		handleFilesChange(event) {
			this.images = [];
			const files = event.target.files;
			const keys = Object.keys(files);

			keys.forEach(key => {
				const fileReader = new FileReader();

				fileReader.onload = (e) => {
					// Array.push is not detectable by Vue so splice instead
					this.images.splice(-1, 0, e.target.result);
				}

				fileReader.readAsDataURL(files[key]);
			});
		}
	},
}
</script>

<template>
	<div>
		<img v-for='image in images' :src='image'>

		<input @change='handleFilesChange' type='file' :name='name' multiple>
	</div>
</template>

<style scoped>
img {
	margin-bottom: 1rem;
	box-shadow: 0 0 3px #ccc;
}
</style>
