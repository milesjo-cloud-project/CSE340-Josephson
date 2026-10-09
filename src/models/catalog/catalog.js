// Catalog data model (placeholder)
const catalog = {};

const getCourseById = (courseId) => {
  return catalog[courseId] || null;
};

const getAllCourses = () => {
  return Object.values(catalog);
};

module.exports = {
  getCourseById,
  getAllCourses
};
