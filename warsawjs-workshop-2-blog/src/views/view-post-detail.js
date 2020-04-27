/**
 * Created by Adam on 15.01.2017.
 */
(function (app) {
    let ViewBase = app.views.ViewBase;


    class ViewPostDetail extends ViewBase {
        constructor() {
            super();
            this.tpl = document.querySelector('#view-post-detail-tpl');
            this.container = document.querySelector('.view-posts-container');

        }

        preRender(data) {
            this.render(data, this.tpl.innerHTML, this.container);

            this.btnAddComment = this.container.querySelector('.btn-add-comment')
            this.btnAddComment.addEventListener('click', (evt) => {
                this.sendAddCommentEvt(data);
            })
        }
        sendAddCommentEvt(post){
            document.dispatchEvent(new CustomEvent(
                'add-comment',
                {detail:post}
            ));
        }
    }
    app.views.ViewPostDetail = ViewPostDetail;
})(App);