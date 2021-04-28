const router = require("express").Router(),
    coursesController = require("../controllers/coursesController");

router.get("/courses", coursesController.index, coursesController.filterUserCourses,
                coursesController.responseJSON);
router.get("/courses/:id/join", coursesController.join, coursesController.responseJSON);

router.use(coursesController.errorJSON);

module.exports = router;