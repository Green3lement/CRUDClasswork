"use strict";

const Course = require("../models/courses");

module.exports = {
    index: (req, res, next) => {
        Course.find()
        .then(courses => {
            res.locals.courses = courses;
            next()
        })
        .catch((error) => {
            console.log(`Error fetching courses data: $error.message`);
            next(error);
        })
    },
    indexView: (req, res) => {
        res.render("/courses/index");
    },
    new: (req, res) => {
        res.render("/courses/new");
    },
    create: (req, res, next) => {
        let newCourse = new Course({
            title: req.body.title,
            description: req.body.description,
            maxStudent: req.body.maxStudent,
            cost: req.body.cost
        });
        courses.create(newCourse)
        .then(courses =>{
            res.locals.courses = courses;
            res.locals.redirect = "/courses";
            next();
        })
        .catch((error) => {
            console.log(`Error saving course: ${error.message}`);
        })
    },
    redirectView: (req, res, next) =>{
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let coursesId = req.params.id;
        Course.findById(coursesId)
        .then(courses => {
            res.locals.courses = courses;
            next();
        })
    },
    showView: (req, res, next) =>{
        res.render(courses/show);
    },
    edit: (req, res, next) => {
        let coursesId = req.params.id;
        Course.findById(coursesId)
        .then(courses => {
            res.redirect("/courses/edit",{courses: courses});
        })
    },
    update: (req, res, next) => {
        let coursesId = req.params.id;
        let updatedCourse = new Course({
            title: req.body.title,
            description: req.body.description,
            maxStudent: req.body.maxStudent,
            cost: req.body.cost
        });

        Course.findByIdAndUpdate(coursesId, updatedCourse)
        .then(courses => {
            res.locals.courses = courses;
            res.locals.redirect = `/courses/${courses._id}`;
            next();
        })
        .catch((error) => {
            console.log(`Error fetching courses by ID: ${error.message}`);
            next(error);
        })
    },
    delete: (req, res, next) => {
        let coursesId = req.params.id;
        Course.findByIdAndRemove(coursesId)
        .then(courses => {
            res.locals.courses = courses;
            res.locals.redirect = `/courses/`;
            next();
        })
        .catch((error) => {
            console.log(`Error fetching courses by ID: ${error.message}`);
            next(error);
        })
    }
}