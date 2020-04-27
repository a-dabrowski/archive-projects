/**
 * Created by Adam on 15.01.2017.
 */
(function (app) {
    class PostsService {


        constructor() {
            this.posts = [];
        }

        fetch(callback) {
            this.posts = JSON.parse(localStorage.getItem('posts')) || [];
            callback({posts: this.posts});
        }

        addPost(post, callback) {
            this.posts.push(post);
            this.save();
            callback();
        }
        save(){
            localStorage.setItem('posts', JSON.stringify(this.posts));
        }
        getById(id) {
            return this.posts.find((post) => {
                return post.id == id;
            })
        }


        removePost(id, callback) {
            let wantedPost = this.posts.find((post) => {
                return post.id == id;
            });
            let wantedIndex = this.posts.indexOf(wantedPost);
            console.log(wantedIndex);
            this.posts.splice(wantedIndex, 1);
            localStorage.setItem('posts', JSON.stringify(this.posts));

            callback();
        }
    }

    app.services.PostsService = PostsService;
})(App);