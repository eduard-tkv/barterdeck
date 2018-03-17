export default {
	count: 0,
  listings28: [],
  isFetching: false,
  userStatus: {
    loggedin: false,
    message: ''
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
    error: false,
    errorMessage: ''
  },
  login: {
    form: {
      email: '',
      password: ''
    },
    error: false,
    errorMessage: ''
  }
};