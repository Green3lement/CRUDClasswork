"use strict";

const User = require("../models/users");

module.exports = {
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
        let newUser = new User({
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode
        });
        users.create(newUser)
        .then(users =>{
            res.locals.users = users;
            res.locals.redirect = "/users";
            next();
        })
        .catch((error) => {
            console.log(`Error saving user: ${error.message}`);
        })
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