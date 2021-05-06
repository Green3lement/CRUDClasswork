"use strict";

const express = require("express"), app = express(),
    router = require("./routes/index"),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    subscriberController = require("./controllers/subscriberController"),
    courseController = require("./controllers/coursesController"),
    userController = require("./controllers/usersController"),
    methodOverride = require("method-override"),
    layouts = require("express-ejs-layouts"),
    cookieParser = require("cookie-parser"),
    expressSession = require("express-session"),
    expressValidator = require("express-validator"),
    connectFlash = require("connect-flash"),
    User = require("./models/user"),
    mongoose = require("mongoose"),
    passport = require("passport");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/confetti_cuisine",
    { useNewUrlParser: true, useFindAndModify: false }
    );

mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
  });

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.set("token", process.env.TOKEN || "recipeT0k3n");

app.use(
    methodOverride( "_method", { 
        methods: ["POST", "GET"]
    })
);


app.use(layouts);
app.use(express.static("public"));
app.use(expressValidator());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.use(cookieParser("my_passcode"));
app.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 400000
    },
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);
app.use(connectFlash());

app.use((req, res, next) => {
    res.locals.loggedIn = req.isUnauthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next();
});

app.use("/", router);

app.listen(app.get('port'), () => {
    console.log(`Server is running on port: ${app.get("port")}`)
});
