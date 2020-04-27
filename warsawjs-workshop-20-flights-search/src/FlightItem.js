import React, {Component} from 'react';
    function FlightItem (props) {
        return (
            <div>
                <h1>Price for this Travel is {props.price} $</h1>
                <h2>
                  {props.start} to {props.end} airports route
                </h2>
                    <ul>
                    {props.outbound.map((el, i) =>{
                        return (
                            <li key={`Outbound ${i}`}> 
                            From: {el.airportFrom.length > 3 ? props.end : el.airportFrom } To: {el.airportTo.length > 3 ? props.start : el.airportTo}
                                <h4>Departure Hour: {el.startHour}</h4>
                                <h4>Flight length: {el.length}</h4>
                                <h5>Airline ID: {el.airline}</h5>
                            </li>
                        );
                    })}
                    </ul>
                    <h2>
                    {props.end} to {props.start} airports route
                    </h2>
                    <ul> {props.inbound.map((el, i) =>{
                        return (
                            <li key={`Inbound ${i}`}>
                                From: {el.airportFrom.length > 3 ? props.start : el.airportFrom } To: {el.airportTo.length > 3 ? props.end : el.airportTo}
                                <h4>Departure Hour: {el.startHour}</h4>
                                <h4>Flight length: {el.length}</h4>
                                <h5>Airline ID: {el.airline}</h5>
                            </li>
                        );
                    })}
                   
                    </ul>
            </div>
        );
    }
export default FlightItem;