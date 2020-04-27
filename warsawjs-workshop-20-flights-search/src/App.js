import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './api.js';
import { readAirportList, searchFligths } from './api.js';
import SearchForm from './SearchForm.js';
import FlightDashboard from './FlightDashboard.js';

class App extends Component {

  state = {
    isLoading: false,
    airports: [],
    searchParams: null,
    flights: [] 
    //tutaj jest miejsce na wrzucenie propsów na przykład constructor nie jest juz potrzebny
  }

  componentDidMount(){

    this.setState({isLoading: true});
    readAirportList().then((airports) => {
      this.setState({
        airports: airports,
        isLoading: false,
      });
  })
  .catch((error) => {
        global.console.warn(error);
        this.setState({ isLoading: false });
      });;
}
handleReset = () => {
  this.setState({flights:[]});
}
handleSubmit = (data) => {

  this.setState({userData: data});

  this.setState({isFetching:true});
  searchFligths(data).then(res=>{
    this.setState({flights:res});
    this.setState({isFetching: false});
  });
  
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
     
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          {this.state.isLoading ? "Loading..." : (this.state.flights.length > 0 ? <FlightDashboard data={this.state.flights} onReset={this.handleReset}/> :  <SearchForm airports={this.state.airports} initialValue={null} onReset={this.handleReset} onSubmit={this.handleSubmit} />)}
      </div>
    );  
  }
}

export default App;
