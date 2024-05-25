// Require necessary modules
var api = require('./src/api.js').app;
const fs = require('fs');
const vegetablesFilepath = './src/vegetables.json'; // vegetables json path

// Define routes and handlers
api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/vegetables', function (request, response) { // Update route vegetables
  response.json(getVegetables());
});

api.get('/vegetables/:id', function (request, response) { // Update route vegetable by ID
  let vegetable = getVegetableById(request.params.id);
  if (vegetable) response.json(vegetable);
  response.json('not found');
});

api.put('/vegetables', function (request, response) { // Update route ( comanda put + mesaj)
  saveVegetable(request.body);
  response.json('Vegetable was saved successfully');
});

api.post('/vegetables', function (request, response) { // Update route for adding new vegetable
  let vegetable = request.body;
  let vegetables = getVegetables();
  for(let i=0; i < vegetables.length; i++) {
    if (vegetables[i].id === vegetable.id) {
      vegetables[i] = vegetable;
    }
  }

  try {
    fs.writeFileSync(vegetablesFilepath, JSON.stringify(vegetables));
  } catch (err) {
    console.error(err)
  }

  response.json('Vegetable was updated successfully');
});

api.delete('/vegetables/:id', function (request, response) { // Update route for deleting vegetable by ID
  console.log(request.params.id);
  response.json('Vegetable with ID ' + request.params.id + ' was deleted');
});

// server start
api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

// functii pt interactiunea cu vegetables
function getVegetables() {
  let vegetables = [];
  try {
    vegetables = JSON.parse(fs.readFileSync(vegetablesFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return vegetables;
}

function saveVegetable(vegetable) {
  let vegetables = getVegetables();
  let maxId = getMaxId(vegetables);
  vegetable.id = maxId+1;
  vegetables.push(vegetable);
  try {
    fs.writeFileSync(vegetablesFilepath, JSON.stringify(vegetables));
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(vegetables) {
  let max = 0;
  for (var i=0; i<vegetables.length;i++) {
    if(max < vegetables[i].id) {
      max = vegetables[i].id;
    }
  }
  return max;
}

function getVegetableById(id){
  let vegetables = getVegetables();
  let selectedVegetable = null;
  for(var i=0; i<vegetables.length; i++) {
    if(id == vegetables[i].id) selectedVegetable = vegetables[i];
  }
  return selectedVegetable;
}
