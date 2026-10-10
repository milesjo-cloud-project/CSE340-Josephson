const student = {
  name: 'Jane Doe',
  id: 'A01234567',
  email: 'jane.doe@example.edu',
  address: '123 University Way, Rexburg, ID'
};

const getStudent = () => ({ ...student });

module.exports = { getStudent };
