const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; //username & pass strategy(access username & pass through the strategy)
const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    try {
      // console.log("Recieved credentials:", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Incorrect username" }); //<--tree param(error,user,info)

      const isPasswordMatch =await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
