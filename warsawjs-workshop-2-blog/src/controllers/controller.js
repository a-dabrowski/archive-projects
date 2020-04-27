/**
 * Created by Adam on 15.01.2017.
 */
(function (app) {
    let ViewAddPostForm = app.views.ViewAddPostForm;
    let viewPostList = new app.views.ViewPostList();

    let viewPostDetail = new app.views.ViewPostDetail();
    let Post = app.models.Post;
    let Comment = app.models.Comment;
    let postsService = new app.services.PostsService();
    let Helpers = app.Helpers;

    class PostController {
        constructor() {
            new ViewAddPostForm();

            this.fetchPosts();


            document.addEventListener('add-post', (data) => {
                let id = Helpers.getRandomId();
                let post = new Post(Object.assign(data.detail, {id}));
                postsService.addPost(post, this.fetchPosts);

            });

            document.addEventListener('remove-post', (evt) => {
                console.log(evt.detail);
                postsService.removePost(evt.detail, this.fetchPosts);
            });

            document.addEventListener('add-comment', (evt) => {
               let post = evt.detail;
               post.addComment(new Comment({
                   msg: 'hi'
               }));
               postsService.save(viewPostDetail.preRender(post));


            });


            window.addEventListener('hashchange', (evt) => {

                let id = Helpers.getHash(evt.newURL);
                if (id) {
                    this.getPostById(id);
                }
            });
        }

        getPostById(id) {
            let post = new Post(postsService.getById(id));
            viewPostDetail.preRender(post);

        }

        fetchPosts() {
            postsService.fetch(viewPostList.preRender.bind(viewPostList));
        }
    }

    app.controllers.PostController = PostController;
})(App);