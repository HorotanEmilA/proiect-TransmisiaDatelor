function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      vegetables: [], // Change cars to vegetables
      vegetablesService: null, // Update variable name
      message: ''
    },
    created: function () {
      this.vegetablesService = vegetables(); // Update function call to vegetables()
      this.vegetablesService.get().then(response => (this.vegetables = response.data)); // Update function call to get vegetables
    },
    methods: {
      deleteVegetable: function(id) { // Update function name and parameter
        console.log('HTTP DELETE towards backend, vegetable ID: ' + id); // Update log message
        this.vegetablesService.remove(id).then(response => {
          this.vegetablesService.get().then(response => (this.vegetables = response.data)); // Update function call to get vegetables
        });
      },
    }
  });

  indexComponent.use(VueMaterial); // You can keep this line if you're using VueMaterial

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
