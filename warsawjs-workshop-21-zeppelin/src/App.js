import React, { Component } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { withStyles, CssBaseline } from "@material-ui/core";
import * as urls from "./urls";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
//import Login from './components/Login';
import "./App.css";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import reducer from "./reducers"; //poprawic adres
//loginpage handleSubmit
const composeEnchancers =  global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;
const store = createStore(
  reducer,
  composeEnchancers(applyMiddleware(reduxThunk))
);

//connect TODO


class App extends Component {
  render() {
    const classes = "App-component";
    return (
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route path={urls.LOGIN} exact component={LoginPage} />
              <Route path={urls.ROOT} component={Layout} />
             
            </Switch>
            {/* {exact daje nam scisle} */}
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
