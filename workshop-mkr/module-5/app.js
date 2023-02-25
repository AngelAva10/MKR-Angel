const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());

// CRUD - Create, Read, Update, Delete
// CRUD API - userS 
// GET /users
// GET /users/:id
// POST /users
// PUT /users/:id
// DELETE /users/:id
// REST API - Representational State Transfer
// 

// users object
// {
//   id: 1,
//   name: 'user 1',
//   age: 'user 1 age',
//   status: false
// }
let users = [];
app.get('/users', (request, response) => {
  response.status(200).json(users);
});

app.get('/users/:id', (request, response) => {
  // get id from request params
  const { id } = request.params;
  // find user by id -> db
  const user = users.filter(user => user.id === id);
  // validate user exists
  if (!user.length) {
    response.status(404).json({ message: 'user not found' });
    return;
  }
  // send response
  response.status(200).json(user);
});

// POST /users -> create user
app.post('/users', (request, response) => {
  // get name and age from request body
  const { name, age } = request.body;
  // validate object
  if (!name || !age) {
    response.status(400).json({ message: 'Invalid request' });
    return;
  }
  // create user object
  const user = {
    id: uuidv4(),
    name,
    age,
    status: false
  };
  // add user object to users array
  users.push(user)
  // send response 
  response.status(201).json(users);
});


app.put('/users/:id', (request, response) => {
  // get id from request params
  const { id } = request.params;
  // get the elements from request body
  const { name, age, status } = request.body;

  // find user by id
  const user = users.filter(user => user.id === id)[0]; // []

  if (!user) {
    response.status(404).json({ message: 'user not found' });
    return;
  }

  // update user object
  users.map(user => {
    if (user.id === id) {
      user.name = name ? name : user.name;
      user.age = age ? age : user.age;
      user.status = status ? status : user.status;
    }
    return user;
  });

  // send response
  response.status(200).json({ message: 'user updated successfully', users: users.filter(user => user.id === id)[0] });

});




// DELETE /users/:id -> delete user
const deleteController = (request, response) => {
  const { id } = request.params;
  const user = users.filter(user => user.id === id)[0]; // []
  if (!user) {
    response.status(404).json({ message: 'user not found' });
    return;
  }
  const filteredusers = users.filter(user => user.id !== id);
  users = [...filteredusers]
  response.status(200).json({ message: 'user deleted successfully' });
};

app.delete('/users/:id', deleteController);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});