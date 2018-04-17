export default {
	count: 0,
  listings28: [],
  isFetching: false,
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
      username: '',
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
    }
  }
};