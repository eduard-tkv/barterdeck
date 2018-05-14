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
		case RESPONSE_INITIAL_STATE:
			return { ...state, listings28: action.payload, isFetching: false };
    break;
    case RESPONSE_INITIAL_STATE_ERROR:
    console.log(`inside response initial state error`);
    return { ...state, isFetching: true };
    break;
    case SET_FORM_VALUES:
      //console.log(`inside set form values reducer, action payload name and value below`);
      //console.log(`name: ${action.payload.name} and value: ${action.payload.value}`);
      return { 
        ...state,  
        formValues: { 
          ...state.formValues, 
          [action.payload.name]: action.payload.value
        } 
      };
    break;
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
    break;    
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
    break;  
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
    break;    
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
    break;        
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
    break;
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
            loggedIn: false
          }
        }
      } else {
        return {
          ...state,
          user: {
            loggedIn: true
          },
          login: {
            message: action.payload.message
          }
        }
      }
      break;
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
          },
          editProfile: {
            complete: false,
            form: {
              firstName: '',
              lastName: '',
              aboutMe: ''
            }
          }
        }
      }
    break;
    case 'LISTITEM_RESPONSE':
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
          userStatus: {
            loggedin: true,
            message: action.payload.message
          }
        }
      }
    break;
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
    break;    
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
            setLocationMessage: action.payload.message,
            setLocationDone: true
          }
        }
      }
    break;
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
    break;
		default:
		  return state;
	}
}
