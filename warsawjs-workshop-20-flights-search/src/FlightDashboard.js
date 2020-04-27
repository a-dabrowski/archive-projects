import React, {Component} from 'react';
import FlightItem from './FlightItem.js'
import './flights.css';

class FlightDashboard extends Component {
    handleReset = ()=>{
        this.props.onReset();
    }
  
    render(){
        return (<div className="flights">
            <button onClick={this.handleReset}>Reset Search</button>
            <ul>
            {this.props.data.map((el, i)=>{
                return (
                    <li className="flights__item" key={`FlightItem ${i}`}>
                       <FlightItem price={el.price} outbound={el.outboundPath} inbound={el.inboundPath} end={el.inboundDate} start={el.outboundDate}/>
                    </li>
                );
            })}
            </ul>
        </div>
    )}
}

export default FlightDashboard;