function fetchQuote() {
    fetch("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
    })
        .then(result => {
            return result.json();})
            .then(data => {
                document.querySelector('.quote').innerHTML = data[0].content;
                document.querySelector('.name').innerHTML = `<h2>${data[0].title}</h2>`;
                document.querySelector('.twitter-share-button').href = `https://twitter.com/intent/tweet?text=${document.querySelector('.quote').textContent}`;
            });
};

fetchQuote();

document.querySelector('.hot').addEventListener('click', ()=>{fetchQuote()});

