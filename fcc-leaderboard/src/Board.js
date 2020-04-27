import React, {Component} from 'react';

const Camper = (props) => {
    const {username, img, alltime, recent, number} = props; 
    return (
      <tr className="">
      <td>{number}</td>
      <td><a href={`https://github.com/${username}`} target="_blank"><img src={img} alt="Avatar" className="img-round"/>{username}</a></td>
      <td>{alltime}</td>
      <td>{recent}</td>
    </tr>
    );
};

class Board extends Component {
constructor(props){
super(props);
  this.state = {
    recent: [],
    all: [],
    alltime: false,
  };
};
  
  handleClick(){
   this.setState({alltime: !this.state.alltime}); 
  }
  componentDidMount(){ //fetch data and store in state container
  fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    .then(result => {return result.json()})
      .then(data => {
  this.setState({recent: data});
  });
  fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
    .then(result => {return result.json()})
      .then(data => {
  
   this.setState({all: data});
  });
  };
  
  render () {
    let container = this.state.alltime ? this.state.all : this.state.recent;
  return (
    <div className="app">
    <h1>FreeCodeCamp Leaderboard</h1>
    <table className="">
    <tr>
      <th>#</th>
      <th>User</th>
      <th><button className={this.state.alltime ? 'active' : ''} onClick={()=> this.setState({alltime: true})}>Sort by Alltime Points</button></th>
      <th><button className={this.state.alltime ? '' : 'active'} onClick={()=> this.setState({alltime: false})}>Sort by Last 30 days points</button></th>
    </tr>
      {container.map((el, i)=>{
       i++;
       return (
       <Camper
         number={i}
         username={el.username}
         img={el.img}
         alltime={el.alltime}
         recent={el.recent}
        />
);
})} 
    </table>
    </div>
  );
  };
};
export default Board;