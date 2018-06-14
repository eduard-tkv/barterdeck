import React, { Component } from 'react';
import { incrementCount, postObject } from '../actions/index';

import { Route, Link } from 'react-router-dom';

//import Header from './Header';
import Home from '../containers/Home';
import Footer from './Footer';

import Register from '../containers/Register';
import Login from '../containers/Login';
import ContactUser from './ContactUser';
import EditProfile from '../containers/EditProfile';
import ListItem from '../containers/ListItem';
import ViewItem from './ViewItem';
import ViewProfile from '../containers/ViewProfile';

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
        <Route exact path='/' component={ Home }/>
        <Route path="/login" component={ Login }/>
        <Route path="/register" component={ Register }/>
        <Route path="/list-item" component={ ListItem } />
        <Route path="/view-profile/user/:nickname" component={ ViewProfile } />
        <Route path="/edit-profile/user/:nickname" component={ EditProfile } />
        <Footer />
      </div>
    )
  }
}