"use strict";

const express = require("express"), app = express(),
    router = express.Router(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    subscriberController = require("./controllers/subscriberController"),
    courseController = require("./controllers/coursesController"),
    userController = require("./controllers/usersController"),
    methodOverride = require("method-override"),
    layouts = require("express-ejs-layouts"),
    passport = require("passport"),
    cookieParser = require("cookieParser"),
    expressSession = require("express-session"),
    expressValidator = require("express-validator"),
    connectFlash = require("connect-flash"),
    User = require("./models/user"),
    mongoose = require("mongoose"),
    passport = require("passport");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine",
    { useNewUrlParser: true });

mongoose.set("useCreateIndex", true);

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");




router.use(
    methodOverride( "_method", { 
        methods: ["POST", "GET"]
    })
);


router.use(layouts);
router.use(express.static("public"));
router.use(expressValidator());
router.use(
    express.urlencoded({
        extended: false
    })
);
router.use(express.json());

router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

router.use(connectFlash());

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isUnauthenticated();
    res.locals.currentUser = req.user;
});

router.get("/", homeController.index);

router.get("/subscriber", subscriberController.index, subscriberController.indexView);
router.get("/subscriber/new", subscriberController.new);
router.post("/subscriber/create", subscriberController.create, subscriberController.redirectView);
router.get("/subscriber/:id", subscriberController.show, subscriberController.showView);
router.get("/subscriber/:id/edit", subscriberController.edit);
router.put("/subscriber/:id/update", subscriberController.update, subscriberController.redirectView);
router.delete("/subscriber/:id/delete", subscriberController.delete, subscriberController.redirectView);

router.get("/users", userController.index, userController.indexView);
router.get("/users/new", userController.new);
router.post("/users/create", userController.validate, userController.create, userController.redirectView);
router.get("/users/:id", userController.create, userController.redirectView);

router.get("/users/login", userController.login);
router.post("users/login", userController.authenticate);
router.get("/users/logout", userController.logout, userController.redirectView);

router.get("/users/:id/edit", userController.edit);
router.put("/users/:id/update", userController.validate, userController.update, userController.redirectView);
router.delete("/users/:id/delete", userController.delete, userController.redirectView);

router.get("/courses", courseController.index, courseController.indexView);
router.get("/courses/new", courseController.new);
router.post("/courses/create", courseController.create, courseController.redirectView);
router.get("/courses/:id", courseController.create, courseController.redirectView);
router.get("/courses/:id/edit", courseController.edit);
router.put("/courses/:id/update", courseController.update, courseController.redirectView);
router.delete("/courses/:id/delete", courseController.delete, courseController.redirectView);

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