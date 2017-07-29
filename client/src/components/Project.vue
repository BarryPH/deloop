<script>
import auth from '@/auth.js';
import utils from '@/utils.js';
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
			comments: [],
			comment: '',
		};
	},

	created() {
		this.fetchProject();
		this.fetchComments();
	},

	methods: {
		async fetchProject() {
			const params = {
				id: this.$route.params.id,
			};
			const { data: project } = await this.$http.get('/projects', { params });

			this.project = project;
		},

		async fetchComments() {
			const params = {
				project: this.$route.params.id,
			};
			const { data: comments } = await this.$http.get('/comments', { params });
			this.comments = comments;
		},

		async handleSubmit(event) {
			const JSONFormData = {
				project: this.$route.params.id,
				content: this.comment,
			};
			const JSONFormData = utils.formToJSON(event.target);
			JSONFormData.project = this.$route.params.id;

			const { data: { comment, info } } = await this.$http.post('/comments', JSONFormData);
			this.comments.push(comment);
			this.comment = '';

			return info;
		}
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

			<div v-for='comment in comments' class='comment'>
				<div class='commenter'>
					<img src='/static/img/headshot.png' />
					<div class='commenter-name'>{{comment.author.email}}</div>
				</div>

				<div>
					<div class='comment-content'>{{comment.content}}</div>
				</div>
			</div>

			<AppForm
				v-if='auth.user.id'
				class='comment-form'
				:submit='handleSubmit'
				buttonText='Comment'
			>
				<div class='form-group'>
					<textarea placeholder='Give some feedback' rows='4' name='content' v-model='comment'></textarea>
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
	min-width: 200px;
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

.comment-content {
	white-space: pre-line;
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
