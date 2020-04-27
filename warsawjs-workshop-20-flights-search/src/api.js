export function readAirportList() {
    //always return when using promises
    return fetch('https://warsawjs-flights-api.herokuapp.com/airports')
        .then(res => {
          return  res.json();
        });
}

export function searchFligths(obj) {
    const {
        fromCode,
        toCode,
        dateFrom,
        dateTo
    } = obj;
    return fetch(`https://warsawjs-flights-api.herokuapp.com/flights/${fromCode.toString()}/${toCode.toString()}/${dateFrom}/${dateTo}`)
        .then(res => {
           return res.json();
        });
}

//export default window.readAirport = readAirportList;