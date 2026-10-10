const { getStudent } = require('../../models/student/student');

const homePage = (req, res) => {
  res.render('home', { title: 'Welcome Home' });
};

const aboutPage = (req, res) => {
  res.render('about', { title: 'About Me' });
};

const studentPage = (req, res) => {
  res.render('student', {
    title: 'Student Information',
    ...getStudent()
  });
};

const notFoundPage = (req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    status: 404,
    message: 'The page you requested could not be found.'
  });
};

const errorPage = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status && err.status >= 400 ? err.status : 500;
  res.status(status).render('error', {
    title: status === 404 ? 'Page Not Found' : 'Server Error',
    status,
    message: status === 404
      ? 'The page you requested could not be found.'
      : 'Something went wrong while processing your request.'
  });
};

module.exports = { homePage, aboutPage, studentPage, notFoundPage, errorPage };
