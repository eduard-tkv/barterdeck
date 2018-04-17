import React, { Component } from 'react';
import { incrementCount, postObject } from '../actions/index';

import { Route, Link } from 'react-router-dom';

import Header from './Header';
import Home from '../containers/Home';
import Footer from './Footer';

import Register from '../containers/Register';
import Login from '../containers/Login';
import ContactUser from './ContactUser';
import EditProfile from '../containers/EditProfile';
import ListItem from '../containers/ListItem';
import ViewItem from './ViewItem';
import ViewProfile from './ViewProfile';

export default class App extends Component {

  constructor(props) {
    super(props);
    console.log(`props below App`);
    console.log(props);
    //this.state = props.store.getState();
  }

  render(){
    return (
      <div>
        <Header />
        <Route exact path='/' component={ Home }/>
        <Route path="/login" component={ Login }/>
        <Route path="/register" component={ Register }/>
        <Route path="/list-item" component={ ListItem } />
        <Route path="/edit-profile" component={ EditProfile } />
        <Footer />
      </div>
    )
  }
}