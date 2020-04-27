import React, {Component} from  'react';

class SearchForm extends Component {
    state ={
        fromCode: '',
        toCode: '',
        dateFrom: '',
        dateTo: ''
    }




handleFromChange = (event)=>{
    this.setState({fromCode:event.target.value});
    console.log(event.target.value);
}

handleToChange = (event)=>{
    this.setState({toCode:event.target.value});
   console.log(event.target.value);
}
handleFromDateChange = (event)=>{
    this.setState({dateFrom:event.target.value});
   console.log(event.target.value);
}
handleReturnDateChange = (event)=>{
    this.setState({dateTo:event.target.value});
   console.log(event.target.value);
}

handleSubmit = (event) =>{
  //console.log('Seartch');
    event.preventDefault();
  //  this.props.onSubmit(event);

    this.props.onSubmit(this.state);
}

handleReset = (e) => {
e.preventDefault();
    this.setState({
        fromCode: '',
        toCode: '',
        dateFrom: '',
        dateTo: ''
    });
}
    render(){
        return (    
            <div>
            <form id="flight" onSubmit={this.handleSubmit}>
            <label>From
                        <select name="from airport" form="flight" onChange={this.handleFromChange} value={this.state.fromCode}>
            {this.props.airports.map((el, i) => {
                return (
                    <option value={el.code} key={`Select-from ${i}`}>{el.country} {el.city}</option>
                );
            })}
            </select>
            </label>
           <label>To
             <select name="to airport" form="flight" onChange={this.handleToChange} value={this.state.toCode}>
                {this.props.airports.map(el => {
                return (
                    <option value={el.code}>{el.country} {el.city}</option>
                );
            })}
            </select>
           </label> 

            <input type="date" onChange={this.handleFromDateChange}/>
            <input type="date" onChange={this.handleReturnDateChange}/>
            <input type="submit" value="Search" /> 
            <button onClick={this.handleReset}>Reset</button>
            </form>
            </div>
        );
    }
}

export default SearchForm;