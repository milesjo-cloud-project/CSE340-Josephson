const { getFacultyById, getSortedFaculty } = require('../../models/faculty/faculty');

const facultyListPage = (req, res) => {
  const supportedSortFields = ['name', 'department', 'title'];
  const requestedSortBy = req.query.sortBy;
  const sortBy = supportedSortFields.includes(requestedSortBy)
    ? requestedSortBy
    : 'name';
  const facultyList = getSortedFaculty(sortBy);

  res.render('faculty/list', {
    title: 'Faculty Directory',
    facultyList,
    sortBy
  });
};

const facultyDetailPage = (req, res) => {
  const { facultyId } = req.params;
  const facultyMember = getFacultyById(facultyId);

  if (!facultyMember) {
    const err = new Error('Faculty member not found');
    err.status = 404;
    return res.status(404).render('faculty/detail', {
      title: 'Faculty Member Not Found',
      facultyMember: null,
      error: 'Faculty member not found'
    });
  }

  res.render('faculty/detail', {
    title: `${facultyMember.name} - Profile`,
    facultyMember,
    error: null
  });
};

module.exports = {
  facultyListPage,
  facultyDetailPage
};
