/**
 * Created by Adam on 15.01.2017.
 */
(function(app){

    let ViewBase = app.views.ViewBase;



    class ViewPostList extends ViewBase{
        constructor(){
            super();
            this.tpl = document.querySelector('#view-post-list-tpl');
            this.container = document.querySelector('.view-posts-container');

            this.container.addEventListener('click', (evt) => {
                let el = evt.target;
                //let isRemoveBtn = evt.target.tagName === 'BUTTON';
                if(el.className.includes('btn-remove')){
                    let id = parseInt(el.getAttribute('data-id'));
                    this.sendRemoveEvt(id)

                }
            })

        }

        sendRemoveEvt(id){
           document.dispatchEvent(new CustomEvent(
               'remove-post',
               {detail: id}
           ));
        }
        preRender(data){
            this.render(data, this.tpl.innerHTML, this.container);
        }
       /* render(data){
           let result = Handlebars.compile(this.tpl.innerHTML)(data);
           this.container.innerHTML = result;

        } */
    }

    app.views.ViewPostList = ViewPostList;


})(App);
