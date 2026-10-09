const express = require('express');
const router = express.Router();
const { facultyListPage, facultyDetailPage } = require('./controllers/faculty/faculty');

router.get('/faculty', facultyListPage);
router.get('/faculty/:facultyId', facultyDetailPage);

module.exports = router;
