import React, {Component} from 'react';
import {withStyles, TextField, Button} from '@material-ui/core';
import {connect} from 'react-redux';

import Layout from './Layout';
import * as actions from '../actions';
import * as urls from '../urls';
const styles =   {
    styles:{
    display: 'flex',
    flex: '1',
    justifyContent: 'space-around',}
    
}

class LoginPage extends Component {
state = {
    username: 'aa',
    password: 'wdo',
    submitting: false
}

handleSubmit = () => {
    global.console.warn(this.props.history);
    this.props.login({username: this.state.username, password: this.state.password}).then(()=>{
       global.console.warn(this.props.history);
       this.props.history.push(urls.PROJECT_LIST);
    }).catch((err) => {console.log(err)});
}

handleChangeUserName = (event) => {
    this.setState({username: event.target.value});
}

handleChangePassword = (event) => {
    this.setState({password: event.target.value});
}

render () {
const {classes} = this.props;

    return (
        <form>
            <div className={classes.styles}>
            <TextField name="username" label="username" value={this.state.username} onChange={this.handleChangeUserName} />
            <TextField name="password" label="password" value={this.state.password} onChange={this.handleChangePassword} />
            <Button variant="raised" onClick={this.handleSubmit} >Login Submit</Button>
            </div>
        </form>
    )
}
//w tym komponencie wywloac akcje reduktora

}
const mapDispatchToProps = {login: actions.login};
export default withStyles(styles)(connect(null, mapDispatchToProps)(LoginPage));