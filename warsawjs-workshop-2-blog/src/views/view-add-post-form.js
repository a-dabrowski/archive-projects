/**
 * Created by Adam on 15.01.2017.
 */
(function (app) {
    class ViewAddPostForm {
        constructor() {
            let addPostForm = document.forms['add-post-form'];
            let btnAddPost = addPostForm.querySelector('button');

            btnAddPost.addEventListener('click', (evt) => {
                let title = addPostForm.title.value;
                let description = addPostForm.description.value;
                let post = {
                    title: title,

                    description
                };
                this.sendPost(post); // dispatchuje tym sposobem event i tak się odpala
                console.log(title, description);
            });

        }

        sendPost(post) {
            document.dispatchEvent(new CustomEvent('add-post', {detail: post}));
        }
    }
    app.views.ViewAddPostForm = ViewAddPostForm;
})(App);