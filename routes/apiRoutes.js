const router = require("express").Router(),
    coursesController = require("../controllers/coursesController");

router.get("/courses", coursesController.index, coursesController.filterUserCourses);
router.get("/courses/:id/join", coursesController.join);

router.use(coursesController.errorJSON);

module.exports = router;