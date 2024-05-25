function run() {
  new Vue({
    el: '#update',
    data: {
      id: '',
      message: '',
      vegetable: {} // Change car to vegetable
    },
    created: function () {
      let uri = window.location.search.substring(1);
      let params = new URLSearchParams(uri);
      this.id = params.get("id");

      axios.get('http://localhost:3000/vegetables/' + this.id).then(
          (response) => {
              this.vegetable = response.data; // Update variable name to vegetable
          }
      );
    },
    methods: {
      update: function(){
          console.dir(this.vegetable);

          return axios.post('http://localhost:3000/vegetables', this.vegetable).then(
              (response) => {
                  this.message = response.data; // Update variable name to vegetable
              }
          );


      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
