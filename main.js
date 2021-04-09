"use strict";

const express = require("express"), app = express(),
router = express.Router(),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
subscriberController = require("./controllers/subscriberController"),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine",
    {useNewUrlParser: true});

mongoose.set("useCreateIndex", true);

app.set("port", process.env.PORT || 3000);

router.set("view engine", "ejs");
router.use(layouts);



router.use(express.static("public"))

app.use(
    express.urlencoded({
        extended:false
    })
);

router.use(express.json());



router.use(methodOverride(),"_method", {methods: ["POST", "GET"]});

router.get("/", homeController.index);

router.get("/subscriber", subscriberController.index, subscriberController.indexView);
router.get("/subscriber/new", subscriberController.new);
router.get("/subscriber/create", subscriberController.create, subscriberController.redirectView);
router.get("/subscriber/:id", subscriberController.show, subscriberController.showView);
router.get("/subscriber/:id/edit", subscriberController.edit);
router.put("/subscriber/:id/update", subscriberController.update, subscriberController.redirectView);
router.delete("/subscriber/:id/delete", subscriberController.delete, subscriberController.redirectView);

router.get("/user",userController.index, userController.indexView);
router.get("/user/new", userController.new);
router.get("/user/create", userController.create, userController.redirectView);
router.get("/user/:id", userController.create, userController.redirectView);
router.get("/user/:id/edit", userController.edit);
router.put("/user/:id/update", userController.update, userController.redirectView);
router.delete("/user/:id/delete", userController.delete, userController.redirectView);

router.get("/course",courseController.index, courseController.indexView);
router.get("/course/new", courseController.new);
router.get("/course/create", courseController.create, courseController.redirectView);
router.get("/course/:id", courseController.create, courseController.redirectView);
router.get("/course/:id/edit", courseController.edit);
router.put("/course/:id/update", courseController.update, courseController.redirectView);
router.delete("/course/:id/delete", courseController.delete, courseController.redirectView);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get('port'), () => {
    console.log(`Server is running on port: ${app.get("port")}`)
});

//app.get("/subscriber", subscriberController.getAllSubscribers);
//app.get("/contact", subscriberController.getSubscriptionPage);
//app.post("/subscribe", subscriberController.saveSubscriber);

//app.get("/courses", homeController.showCourses);
//app.post("/contact", homeController.postedSignUpForm);

//app.get("/contact", homeController.showSignUp);
//app.post("/contact", homeController.postedSignUpForm);
//app.get("/", (req, res)=> {
//    res.render("index");
//});