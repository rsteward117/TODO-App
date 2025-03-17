const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
require('dotenv').config();
const User = require('../models/User');

const isEmail = (input) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
}

passport.use(
    new LocalStrategy({usernameField: 'usernameOrEmail', passwordField: 'password'}, async (usernameOrEmail, password, done) => {
        try {
            let user;
            if(isEmail(usernameOrEmail)) {
                user = await User.findOne({ email: usernameOrEmail });
            } else {
                user = await User.findOne({ username: usernameOrEmail });
            }
            
            if(!user) {
                return done(null, false, {message: "Incorrect username or email"});
            }

            //compares the password with the bcryptjs hased password from the prisma/postgresql database
            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                return done(null, false, {message: "Incorrect password"});
            }
            return done(null, user);
        } catch(err){
            return done(err);
        }
    })
);

const opts = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),    
}

passport.use(new JwtStrategy(opts, async function(jwt_payload, done){
   const user = await User.findById(jwt_payload.sub);
   if(user){
    return done(null, user);
   } else {
    return done(null, false);
   }
}));

module.exports = passport