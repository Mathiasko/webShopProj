function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

const crypt = {
  saltRounds: 10,
  jwtPrivateKey: 'this-is-the-key',
};


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = {
  getOffset,
  emptyOrRows,
  crypt,
  asyncForEach
};
