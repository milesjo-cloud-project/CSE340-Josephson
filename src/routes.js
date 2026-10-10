const express = require('express');
const router = express.Router();
const { facultyController, siteController } = require('./controllers');

router.get('/', siteController.homePage);
router.get('/about', siteController.aboutPage);
router.get('/student', siteController.studentPage);
router.get('/faculty', facultyController.facultyListPage);
router.get('/faculty/:facultyId', facultyController.facultyDetailPage);

router.use(siteController.notFoundPage);
router.use(siteController.errorPage);

module.exports = router;
