let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
  email: { 
    type: String,
    unique: true,
    lowercase: true
  },
  nickname:  {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String,
  listings: [
    {
      itemOffered: String,
      itemSought: String,
      sellFor: Number,
      description: String,
      images: [String],
      postedDate: Number
    }
  ],
  location: {
    locality: String,
    administrative_area_level_1: String,
    country: String
  }
});

Account.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameQueryFields: ["email"],
  limitAttempts: true, 
  maxAttempts: 7 
});

//mySchema..plugin(passportLocalMongoose, { usernameField: 'email', usernameQueryFields: ['email'], usernameLowerCase: true, limitAttempts: true, maxAttempts: 20 }); 

module.exports = mongoose.model('Account', Account);

/*
 * new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim()
  };

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
 */