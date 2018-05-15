export default {
  listings28: [],
  user: {
    nickname: '',
    loggedIn: false
  },
  listItem: {
    form: {
      itemOffered: '',
      itemSought: '',
      sellFor: '',
      description: '',
      image: ''
    },
    error: false,
    errorMessage: ''
  },
  register: {
    form: {
      nickname: '',
      email: '',
      passwordOne: '',
      passwordTwo: ''
    },
    message: '',
    error: false,
    errorMessage: ''
  },
  login: {
    form: {
      email: '',
      password: ''
    },
    message: '',
    error: false,
    errorMessage: ''
  },
  editProfile: {
    form: {
      firstName: '',
      lastName: '',
      aboutMe: '',
      location: {
        locality: '',
        administrative_area_level_1: '',
        country: ''
      }
    },
    complete: false,
    message: '',
    error: false,
    errorMessage: '',
    setLocationMessage: '',
    setLocationError: false,
    setLocationErrorMessage: '',
    setLocationDone: false
  },
  viewProfile: {
    form: {
      firstName: '',
      lastName: '',
      aboutMe: '',
      location: {
        locality: '',
        administrative_area_level_1: '',
        country: ''
      }
    }
  }
};