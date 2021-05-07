import React, { Component } from "react";
import { connect } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { APP_LOAD } from "./actions/actionTypes";
import Routes from "./components/_routes";
import ReactNotification from 'react-notifications-component';

import "./styles/main.bundle.css";
import 'react-notifications-component/dist/theme.css';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    token: state.common.token,
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: (token) =>
    dispatch({ type: APP_LOAD, token, skipTracking: true })
});

class App extends Component {
  componentWillMount() {
    const token = window.localStorage.getItem('token');
    
    this.props.onLoad(token ? token : null);
  }

  render() {
    return (
      <div className="app-container">
        <ReactNotification />
        <Routes />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);