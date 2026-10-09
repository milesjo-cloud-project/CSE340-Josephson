// Catalog controller (placeholder)
const { getCourseById, getAllCourses } = require('../../models/catalog/catalog');

const catalogListPage = (req, res) => {
  const courses = getAllCourses();
  res.render('catalog/list', {
    title: 'Course Catalog',
    courses
  });
};

const catalogDetailPage = (req, res) => {
  const { courseId } = req.params;
  const course = getCourseById(courseId);
  if (!course) {
    return res.status(404).render('catalog/detail', {
      title: 'Course Not Found',
      course: null
    });
  }
  res.render('catalog/detail', {
    title: course.name,
    course
  });
};

module.exports = {
  catalogListPage,
  catalogDetailPage
};
