"use strict";

const Subscriber = require("../models/subscriber");

module.exports = {
    index: (req, res, next) => {
        Subscriber.find()
        .then(subscriber => {
            res.locals.subscriber = subscriber;
            next()
        })
        .catch((error) => {
            console.log(`Error fetching subscriber data: $error.message`);
            next(error);
        })
    },
    indexView: (req, res) => {
        res.render("/subscriber/index");
    },
    new: (req, res) => {
        res.render("/subscriber/new");
    },
    create: (req, res, next) => {
        let newSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        });
        subscriber.create(newSubscriber)
        .then(subscriber =>{
            res.locals.subscriber = subscriber;
            res.locals.redirect = "/subscriber";
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
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
        .then(subscriber => {
            res.locals.subscriber = subscriber;
            next();
        })
    },
    showView: (req, res, next) =>{
        res.render(subscriber/show);
    },
    edit: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findById(subscriberId)
        .then(subscriber => {
            res.redirect("/subscriber/edit",{subscriber: subscriber});
        })
    },
    update: (req, res, next) => {
        let subscriberId = req.params.id;
        let updatedSubscriber = new Subscriber({
            name: req.body.name,
            email: req.body.email,
            zipCode: req.body.zipCode
        });

        Subscriber.findByIdAndUpdate(subscriberId, updatedSubscriber)
        .then(subscriber => {
            res.locals.subscriber = subscriber;
            res.locals.redirect = `/subscriber/${subscriber._id}`;
            next();
        })
        .catch((error) => {
            console.log(`Error fetching subscriber by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findByIdAndRemove(subscriberId)
        .then(subscriber => {
            res.locals.subscriber = subscriber;
            res.locals.redirect = `/subscriber/`;
            next();
        })
        .catch((error) => {
            console.log(`Error fetching subscriber by ID: ${error.message}`);
            next(error);
        })
    }
}