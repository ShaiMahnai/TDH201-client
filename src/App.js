import React, { Component } from 'react';

import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import MapPage from './containers/MapPage/MapPage.js';
import About from './containers/About/About.js'
import Menu from './containers/Menu/Menu.js'
import HomePage from './containers/HomePage/HomePage.js'




export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };



  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Menu />
          <Switch>
            <Route exact path="/" render={(props) => <HomePage {...props} />} />
            <Route exact path="/map" render={(props) => <MapPage {...props} />} />
            <Route path="/about" render={(props) => <About {...props} />} />
          </Switch>
        </BrowserRouter>
      </div>


    )
  }

}

export default App;