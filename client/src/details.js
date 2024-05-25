function run() {
  new Vue({
    el: '#details',
    data: {
      id: 'default',
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

    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
