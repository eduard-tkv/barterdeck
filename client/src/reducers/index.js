import initialState from './initialState';

import {
  RESPONSE_INITIAL_STATE,
  RESPONSE_INITIAL_STATE_ERROR,
  SET_FORM_VALUES,
  ERROR_PASSWORD_MISMATCH,
  RESPONSE_LOGIN,
  RESPONSE_REGISTER,
  ERROR
} from '../constants/actionTypes';

export default function reducer(state=initialState, action){
	switch(action.type){
    case 'INITIAL_STATE_RESPONSE':
      console.log(`inside initial state response, response below`);
      console.log(action.payload);
			return { 
        ...state, 
        listings28: action.payload.listings,
        user: {
          ...state.user,
          loggedIn: action.payload.loggedIn,
          nickname: action.payload.nickname
        },
        isFetching: false
      };
    case RESPONSE_INITIAL_STATE_ERROR:
    console.log(`inside response initial state error`);
    return { ...state, isFetching: true };
		case 'LOGIN_FORM_VALUES_R':
      return { 
        ...state,  
        login: {
          ...state.login,
          form:{
            ...state.login.form,
            [action.payload.name]: action.payload.value
          }
        } 
      };
		case 'REGISTER_FORM_VALUES_R':
      return { 
        ...state,  
        register: {
          ...state.register,
          form:{
            ...state.register.form,
            [action.payload.name]: action.payload.value
          }
        } 
      };
		case 'LIST_ITEM_FORM_VALUES_R':
      return { 
        ...state,  
        listItem: {
          ...state.listItem,
          form:{
            ...state.listItem.form,
            [action.payload.name]: action.payload.value
          }
        } 
      };
    case 'LIST_ITEM_ATTACH_IMAGE_R':
    console.log(`inside list item attach image payload below`);
    console.log(action.payload);
    console.log(action.payload.size);
      return { 
        ...state,  
        listItem: {
          ...state.listItem,
          form: {
            ...state.listItem.form, 
            image: action.payload
          }
        } 
      };
    case 'REGISTER_ERROR_PASSWORDS_DONTMATCH':
    console.log(`inside reducer passwords dont match`);
      return  {
        ...state,
        register: {
          ...state.register,
          error: true,
          errorMessage: 'Passwords must match!'
        }
      }
    case ERROR:
      console.log(`inside reducer case error`);
      break;
    case 'LOGIN_RESPONSE':
      if(action.payload.error){
        return { 
          ...state, 
          login: {
            ...state.login,
            error: true,
            errorMessage: action.payload.message
          },
          user: {
            ...state.user,
            loggedIn: false
          }
        }
      } else {
        return {
          ...state,
          user: {
            ...state.user,
            loggedIn: true,
            nickname: action.payload.nickname
          },
          login: {
            ...state.login,
            message: action.payload.message
          }
        }
      }
    case 'REGISTER_RESPONSE':
      if(action.payload.error){
        return {
          ...state, 
          register: {
            ...state.register,
            error: true,
            errorMessage: action.payload.message
            }
          }
      } else {
        return {
          ...state,
          user: {
            loggedIn: true
          },
          register: {
            message: action.payload.message,
            form: {
              nickname: '',
              email: '',
              passwordOne: '',
              passwordTwo: ''
            }
          }
        }
      }
    case 'LISTITEM_RESPONSE':
      if(action.payload.error){
        return {
          ...state, 
          listItem: {
            ...state.listItem,
            errorMessage: action.payload.message
            }
          }
      } else {
        return {
          ...state,
          listItem: {
            ...state.listItem,
            message: action.payload.message
          }
        }
      }
		case 'EDITPROFILE_FORM_VALUES_R':
      return { 
        ...state,  
        editProfile: {
          ...state.editProfile,
          form:{
            ...state.editProfile.form,
            [action.payload.name]: action.payload.value
          }
        } 
      };
    case 'SETLOCATION_RESPONSE':
      console.log(`inside set location response saga, response below`);
      console.log(action);
      if(action.payload.error){
        return {
          ...state,
          editProfile: {
            ...state.editProfile,
            setLocationError: true,
            setLocationErrorMessage: action.payload.message
          }
        }
      } else {
        return {
          ...state,
          editProfile: {
            ...state.editProfile,
            setLocationError: false,
            setLocationMessage: action.payload.message
          }
        }
      }
    case 'EDITPROFILE_RESPONSE_R':
    if(action.payload.error){
      return {
        ...state,
        editProfile: {
          ...state.editProfile,
          error: true,
          errorMessage: 'Error saving profile. Please try again'
        }
      }
    } else {
      return {
        ...state,
        editProfile: {
          ...state.editProfile,
          error: false,
          message: 'Profile saved',
          complete: true
        }
      }
    }
    case 'LOGOUT_R':
    console.log(`inside logout r`);
      return {
        ...state,
        user: {
          ...state.user,
          loggedIn: false,
          nickname: ''
        }
      }
		default:
		  return state;
	}
}
