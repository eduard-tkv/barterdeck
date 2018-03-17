import React from 'react';
import { connect } from 'react-redux';

import ListItem from '../components/ListItem';

// state here is redux store state i.e. the result of store.getState()
// and this state will be passed in as props to our presentational component
// basically a container component will pass props to the corresponding presentational component
function mapStateToProps(state){
  return {
    listItem: state.listItem,
    userStatus: state.userStatus
  }
}

// same as store.dispatch
function mapDispatchToProps(dispatch){
  // console.log(`inside products mapdispatchtoprops`);
  return {
    listItemFormValues(name, value){
      console.log(`inside listitemformvalues dispatch and name is:`);
      console.log(name);
      dispatch({
          type: 'LIST_ITEM_FORM_VALUES_R',
          payload: { name, value }
      })
    },

    listItemAttachImage(payload){
      console.log(`inside products mapdispatchtoprops handleclick and id is:`);
      dispatch({
          type: 'LIST_ITEM_ATTACH_IMAGE_R',
          payload: payload
      })
    },

    listItemSubmit(itemOffered, itemSought, sellFor, description, image){
      console.log(`inside mapDispatchToProps, listItemSubmit`);
      // console.log(formsInput);
      dispatch({
        type: 'LIST_ITEM_SUBMIT_S',
        payload: { 
          itemOffered,
          itemSought,
          sellFor,
          description,
          image
         }
      })
    }
  }
}

// connect will return a component
let ListItemContainer = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export default ListItemContainer;