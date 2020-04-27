/**
 * Created by Adam on 15.01.2017.
 */
(function (app) {
    class Helpers {
        static getRandomId(){
            return parseInt(Math.random()*1000);
        }
        static getHash(str) {
            if(!str.includes('#')) return;
            let divided = str.split('#');
            return divided.pop();
        }
    }
    app.Helpers = Helpers;
})(App);