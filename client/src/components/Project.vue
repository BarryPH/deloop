<script>
import auth from '@/auth.js';
import AppForm from '@/components/shared/AppForm.vue';

export default {
	name: 'project-page',

	components: {
		AppForm,
	},

	data() {
		return {
			auth,
			project: {},
		};
	},

	created() {
		this.fetchProject();
	},

	methods: {
		async fetchProject() {
			const params = {
				id: this.$route.params.id,
			};
			const { data: project } = await this.$http.get('/projects', { params });
			this.project = project;
		},
	},
};
</script>

<template>
	<div class='container'>
		<div class='panel'>
			<h2>{{project.title}}</h2>
			<p>{{project.description}}</p>
			<div class='tags'>
				<a v-for='tag in project.tags' :href='`/projects?tag=${tag}`'>{{tag}}</a>
			</div>
		</div>

		<div v-for='image in project.images'>
			<div class='panel project-images'>
				<img :src='image.secure_url' />
			</div>
		</div>

		<div class='panel'>
			<h4>Feedback</h4>

			<div class='comment'>
				<div class='commenter'>
					<img src='/static/img/headshot.png' />
					<a href='#' class='commenter-name'>Dave Hayes</a>
				</div>

				<div>
					<p>
						Lorem iure harum eveniet voluptatum sapiente eaque Tempore porro sit dolores labore id eos! At beatae temporibus omnis laborum dolor, in nulla Nam facere expedita totam culpa rerum Saepe deserunt adipisci rem tempora omnis! Doloremque earum voluptatem pariatur rerum doloremque natus?
						<br>
						<br>
						Rem blanditiis suscipit error provident saepe? Alias animi error assumenda atque explicabo. Natus ipsum officiis optio veritatis quasi Ad corrupti maxime voluptate
					</p>
				</div>
			</div>

			<div class='comment'>
				<div class='commenter'>
					<img src='/static/img/headshot.png' />
					<a href='#' class='commenter-name'>Dave Hayes</a>
				</div>

				<div>
					<p>
						Lorem iure harum eveniet voluptatum sapiente eaque Tempore porro sit dolores labore id eos! At beatae temporibus omnis laborum dolor, in nulla Nam facere expedita totam culpa rerum Saepe deserunt adipisci rem tempora omnis! Doloremque earum voluptatem pariatur rerum doloremque natus?
						<br>
						<br>
						Rem blanditiis suscipit error provident saepe? Alias animi error assumenda atque explicabo. Natus ipsum officiis optio veritatis quasi Ad corrupti maxime voluptate
					</p>
				</div>
			</div>

			<AppForm
				v-if='auth.user.id'
				class='comment-form'
				:submit='handleSubmit'
				buttonText='Comment'
			>
				<div class='form-group'>
					<textarea placeholder='Give some feedback' rows='4' name='comment'></textarea>
				</div>
			</AppForm>
		</div>
	</div>
</template>

<style scoped>
.panel {
	margin-bottom: 2rem;
}

.tags {
	margin-top: 1rem;
	opacity: 0.8;
	color: var(--color-primary-blue);
}

.tags a:not(:last-child) {
	margin-right: 1rem;
}

.project-images img {
	display: block;
	margin: auto;
}

.comment {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 2rem 0;
}

.comment:not(:last-child) {
	border-bottom: 1px solid #f5f5f5;
}

.commenter {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 200px;
	margin-top: 0.5rem;
	margin-right: 1rem;
}

.commenter img {
	border-radius: 100%;
	width: 70px;
	height: 70px;
	margin-bottom: 1rem;
}

.commenter-name {
	color: var(--color-primary-blue);
}

.comment-form {
	margin-top: 2rem;
}

@media (max-width: 750px) {
	.comment {
		flex-direction: column;
	}

	.commenter {
		width: 100%;
		margin: 0 0 1rem;
	}
}
</style>
