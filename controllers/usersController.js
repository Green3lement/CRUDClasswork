"use strict";

const passport = require("passport");
const User = require("../models/users");
    getUserParams = body => {
        return{
            name:{
                first: body.first,
                last: body.last
            },
            email: body.email,
            password: body.password,
            zipCode: body.zipCode
        };
    };

module.exports = {
    login: (req, res) =>{
        res.render("users/login");
    },
    index: (req, res, next) => {
        User.find()
        .then(users => {
            res.locals.users = users;
            next()
        })
        .catch((error) => {
            console.log(`Error fetching users data: $error.message`);
            next(error);
        })
    },
    indexView: (req, res) => {
        res.render("/users/index");
    },
    new: (req, res) => {
        res.render("/users/new");
    },
    create: (req, res, next) => {
        if (req.skip) return next();
        let userParams = getUserParams(req.body);
        let newUser = new User(userParams);

        User.register(newUser, req.body.password, (error, user) =>{
            if(user) {
                req.flash("success", "YAY!");
                res.locals.redirect = "/users";
                next();
            }
            else{
                req.flash("error", `Failure! ${error.message}`);
                res.locals.redirect = "/users/new";
                next();
            }
        });
    },
    validate: (req, res, next) =>{
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();

        req.check("email", "email is not valid!").isEmail();
        req.check("zipCode", "Zip Code is not valid!").notEmpty().isInt().isLength({
            min: 5,
            max: 5
        });
        req.check("password", "Password is not valid!").notEmpty();

        req.getValidationResult().then((error) =>{
            if(!error.isEmpty()) {
                let messages = error.array().map (e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;
                res.locals.redirect = "/users/new";
                next();
            }
            else next();
        });
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Login failed! Check your  email or password!",
        successRedirect: "/",
        successFlash: "Logged IN!!!!!!!"
    }),
    logout:(req, res, next) => {
        req.logout();
        req.flash("success", "You have logged out.");
        res.locals.redirect = "/";
        next();
    },
    redirectView: (req, res, next) =>{
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },

    show: (req, res, next) => {
        let usersId = req.params.id;
        User.findById(usersId)
        .then(users => {
            res.locals.users = users;
            next();
        })
    },
    showView: (req, res, next) =>{
        res.render(users/show);
    },
    edit: (req, res, next) => {
        let usersId = req.params.id;
        User.findById(usersId)
        .then(users => {
            res.redirect("/users/edit",{users: users});
        })
    },
    update: (req, res, next) => {
        if(req.skip) return next();
        let usersId = req.params.id;
        let updatedUser = new User({
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        });

        User.findByIdAndUpdate(usersId, updatedUser)
        .then(users => {
            res.locals.users = users;
            res.locals.redirect = `/users/${users._id}`;
            next();
        })
        .catch((error) => {
            console.log(`Error fetching users by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let usersId = req.params.id;
        User.findByIdAndRemove(usersId)
        .then(users => {
            res.locals.users = users;
            res.locals.redirect = `/users/`;
            next();
        })
        .catch((error) => {
            console.log(`Error fetching users by ID: ${error.message}`);
            next(error);
        })
    }
}