function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}
  
function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return { success: true, data: rows };
}

function getToken(headers) {
  if (headers && !headers.token) {
    return { message: 'Unauthorized' }
  }
}
  
module.exports = {
  getOffset,
  emptyOrRows
}