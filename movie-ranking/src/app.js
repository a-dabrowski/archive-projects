class GetMovies {
    constructor(container) {
        this.container = container;
        this.promiseArr = [];
        this.toRenderContainer = {}; //if everything is in order and put in container dispatch event READY to render app
        this.getMoviesList();
    }

    countMean(data) {
        let container = {
            count: 0,
            sum: 0
        };
        for (let i = 0; i < data.length; i++) {
            container.count++;
            container.sum += Number(data[i].rating);
        }
        return Math.floor(container.sum / container.count * 100) / 100; //return 2 decimal points
    }

    countDistribution(data) {
        const arr = [0, 0, 0, 0, 0]; //given the fact that rating is 1-5
        data.forEach(function (el) {
            arr[el.rating - 1]++;
        });
        return arr;
    }

    promisifiedXHR(obj) {
        return new Promise((resolve, reject) => {
            //lexical scope with arrow function so no need to use .bind(this)
            let xhr = new XMLHttpRequest();
            xhr.open(obj.method || "GET", obj.url, true);
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status);
                }
            };
            xhr.onerror = function () {
                reject(xhr.status);
            };
            xhr.send(obj.body);
        });
    }

    getMoviesList() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://movie-ranking.herokuapp.com/movies", true);
        xhr.send();
        xhr.onreadystatechange = () => {
            //lexical scope with arrow function so no need to use .bind(this)
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = JSON.parse(xhr.response);
                for (let i = 0; i < response.length; i++) {
                    // for each movie push its img url and title to render container
                    this.toRenderContainer[response[i].id] = {
                        img: response[i].poster,
                        title: response[i].title
                    };
                    this.getMovieRating(response[i].id);
                }
            } else {
                // throw new Error(`Req failed status code is ${xhr.status} state is ${xhr.readyState}`);
            }
        };
    }

    getMovieRating(mov_id) {
        this.promisifiedXHR({
            url: `https://movie-ranking.herokuapp.com/movies/${mov_id}/ratings`
        }).then(value => {
            //lexical scope
            let data = JSON.parse(value);
            this.toRenderContainer[data[0].movie_id].mean = this.countMean(data);
            this.toRenderContainer[
                data[0].movie_id
            ].distribution = this.countDistribution(data);
            this.render(this.container, mov_id);
            //render every movie seperately
            return;
        });
    }

    rateMovie(mov_id, rating) {
        console.log(rating);
        this.promisifiedXHR({
            url: `https://movie-ranking.herokuapp.com/movies/${mov_id}/ratings?rating=${rating}`,
            method: "POST"
        });
    }

    render(container, k) {
        this.container.innerHTML += `
              <div id="${k}" class="movie" data-title="${this.toRenderContainer[
      k
    ].title.toLowerCase()}">
                <h1>${this.toRenderContainer[k].title}</h1>
                <img src=${this.toRenderContainer[k].img} alt="${
      this.toRenderContainer[k].title
    } poster">
                <p>Average Rating: <strong>${
                  this.toRenderContainer[k].mean
                }</strong></p>
                <div class="rating-container">
                <form data-movie-id="${k}" class="rating"> 
                <input name="rating" id="${k}-5" type="radio" value="5"></input><label for="${k}-5" title="Masterpiece!"></label>
                <input name="rating" id="${k}-4" type="radio" value="4"></input><label for="${k}-4" title="Great movie"></label>
                <input name="rating" id="${k}-3" type="radio" value="3"></input><label for="${k}-3" title="Mediocre"></label>
                <input name="rating" id="${k}-2" type="radio" value="2"></input><label for="${k}-2" title="Some kind of mistake"></label>
                <input name="rating" id="${k}-1" type="radio" value="1"></input><label for="${k}-1" title="Massive failure"></label>
                <button type="submit">Submit vote</button> 
                </form>
                </div> 
                <button class="reveal-modal">Show rating distribution</button>
                <div class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h2>${this.toRenderContainer[k].title}</h2>
                       <ul>
                         <li>${this.toRenderContainer[k].distribution[0]}</li>
                         <li>${this.toRenderContainer[k].distribution[1]}</li>
                         <li>${this.toRenderContainer[k].distribution[2]}</li>
                         <li>${this.toRenderContainer[k].distribution[3]}</li>
                         <li>${this.toRenderContainer[k].distribution[4]}</li>
                        </ul>
                    </div>
                </div>
              </div>`;
        document.dispatchEvent(new CustomEvent("render-complete"));
        //emit event that content is ready to render and delete preloader
    }
}

class SortAlphabetically {
    constructor(nodeCollection, nodeParent) {
        this.collection = nodeCollection;
        this.nodeParent = nodeParent;
    }

    sorting(sortWith) {
        let cache = [];
        for (let i = 0; i < this.collection.length; i++) {
            cache.push(this.collection[i]);
        }
        const a = cache.sort(sortWith);
        return this.outputHTML(a);
    }

    outputHTML(sorted) {
        let html = "";
        for (let i = 0; i < sorted.length; i++) {
            html += sorted[i].outerHTML;
        }
        this.nodeParent.innerHTML = html;
    }

    ascending(a, b) {
        const aVal = a.attributes["data-title"].nodeValue;
        const bVal = b.attributes["data-title"].nodeValue;
        return aVal > bVal;
    }

    descending(a, b) {
        const aVal = a.attributes["data-title"].nodeValue;
        const bVal = b.attributes["data-title"].nodeValue;
        return aVal < bVal;
    }
}

(function (container) {
    const app = new GetMovies(container);
    const asc = document.getElementById("sort-ascending");
    const desc = document.getElementById("sort-descending");
    //add listener for rating movie
    document.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log(e.target);
        if (!e.target.querySelector("input:checked")) {
            alert("Select rate first.");
        } else {
            app.rateMovie(
                e.target.attributes["data-movie-id"].nodeValue,
                e.target.querySelector("input:checked").value
            );
            //hide form after submit and add Thank You message
            e.target.outerHTML = '<p class="success"> Thank you for your vote!</p>';
        }
    });
    //document delete pre loader class which will be created in future
    document.addEventListener("render-complete", function () {
        //delete preloader
        container.classList.remove("preloader");
        //create sorter
        const sorter = new SortAlphabetically(
            document.querySelectorAll("div#app > div"),
            container
        );
        //add Event listener for ascend
        asc.addEventListener("click", function () {
            sorter.sorting(sorter.ascending);
        });
        //add event listener for descend
        desc.addEventListener("click", function () {
            sorter.sorting(sorter.descending);
        });
        //add event listener for click on modal
        document.addEventListener("click", function (e) {
            // not the most elegant solution but sorting films destroys listeners on "Show distribution" button
            if (e.target.classList.contains("reveal-modal")) {
                console.log("modal btn");
                e.target.nextElementSibling.classList.add("display-modal"); //addClass might look better in code
                e.target.nextElementSibling.classList.add("de-emphasize");
            }
            if (e.target.classList.contains("modal")) {
                //hide modal when user click outside of modal content box
                e.target.classList.remove("display-modal");
                //e.target.style.display = 'none';
            }
            if (e.target.classList.contains("close")) {
                //hide modal when user clicks close button
                e.target.parentNode.parentNode.classList.remove("display-modal");
            }
        });
    });
})(document.getElementById("app"));