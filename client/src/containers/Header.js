import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';

// state here is redux store state i.e. the result of store.getState()
// and this state will passed in as props to our presentational component
// basically a container component will pass props to the corresponding presentational component

function mapStateToProps(state){
  return {
    user: state.user
  }
}

// same as store.dispatch
function mapDispatchToProps(dispatch){
  return {
    logout(){
      console.log(`inside header logout() container:`);
      dispatch({
          type: 'LOGOUT_S'
      })
    }
  }
}

// connect will return a component
let HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;