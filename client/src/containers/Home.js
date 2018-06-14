import React from 'react';
import { connect } from 'react-redux';

import { GET_INITIAL_STATE } from '../constants/actionTypes';

import Home from '../components/Home';

// state here is redux store state i.e. the result of store.getState()
// and this state will passed in as props to our presentational component
// i.e. a container component will pass props to the corresponding presentational component
function mapStateToProps(state){
  return {
    listings28: state.listings28,
    user: state.user
  }
}

//  same as store.dispatch
function mapDispatchToProps(dispatch){
  return {
    handleInitialState(){
      console.log(`inside mapdispatchprops handleinitialstate`);
      dispatch({
        type: 'GET_INITIAL_STATE_S'
      });
    }
  }
}

// connect will return a component
let HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;
