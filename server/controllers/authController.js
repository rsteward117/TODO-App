const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.get_user = (req, res) =>{
    res.json({user: req.user})
}

exports.register = [
    // Validate the fields
    body("username", "Your username must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .custom(async (val) => {
        const user = await User.findOne({ username: val });
        if (user) {
          throw new Error("That username already exists!");
        }
      }),
    body("email", "Your email must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (val) => {
        const user = await User.findOne({ email: val });
        if (user) {
          throw new Error("That email already exists!");
        }
      }),
    body("password", "Your password must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
  
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        // If there are errors, set the status code to 400 and return the first error message
        return res.status(400).json({ message: errors.errors[0].msg });
      } else {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ user: newUser });
      }
    }),
];

exports.login = [
    body("usernameOrEmail", "your username/email must not be empty.")
    .trim()
    .isLength({min: 1})
    .escape(),
    body("password", "your password must not be empty.")
    .trim()
    .isLength({min: 1})
    .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            res.status(400).json({message: errors.errors[0].msg })    
        } else {
            passport.authenticate('local', {session: false}, (err, user, info) =>{
                if(err || !user){
                    const message = info ? info.message : "Invalid Credentials";
                    return res.status(400).json({message});
                }
                const token = jwt.sign({sub: user.id}, process.env.JWT_SECRET, {
                    expiresIn: '1d',
                });
                return res.json({ token, user });
            })(req, res, next)
        }
    })
];
