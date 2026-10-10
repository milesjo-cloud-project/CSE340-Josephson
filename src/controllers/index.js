// Centralized controllers export
const facultyController = require('./faculty/faculty');
const catalogController = require('./catalog/catalog');
const siteController = require('./site/site');

module.exports = {
  facultyController,
  catalogController,
  siteController
};
