import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import * as urls from "../urls";
import ProjectList from "./ProjectList";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import Credits from "./Credits";
import Header from "./Header";

import { connect } from "react-redux";
const mapStateToProps = state => {
  return { isLoggedIn: !!state.auth.username }; //albo w ()
};

class Layout extends Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to={urls.LOGIN} />;
    }
    return (
      <div>
        <Header history={this.props.history} />
        <Switch>
          <Route path={urls.PROJECT_LIST} component={ProjectList} />
          <Route path={urls.PROJECT_EDIT} component={EditPost} />
          <Route path={urls.PROJECT_CREATE} component={CreatePost} />
          <Route path={urls.CREDITS} component={Credits} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Layout);
