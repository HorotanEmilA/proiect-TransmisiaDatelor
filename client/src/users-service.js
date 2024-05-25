function vegetables() { // Change function name to vegetables
  get = function () {
    return axios.get('http://localhost:3000/vegetables'); // Update URL to fetch vegetables
  };

  remove = function (id) { // Change parameter name to id
    return axios.delete('http://localhost:3000/vegetables/' + id); // Update URL to delete vegetable by ID
  };

  return {
    get: get,
    remove: remove
  };
}
