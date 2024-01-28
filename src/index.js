import express from 'express';
import controller from './components/controller.js'; // Imports the controller responsible for handling requests

// Creates an Express application
const app = express(); 

// Defines the port on which the server will listen
const PORT = process.env.SERVER_PORT || 8080; 



// Mounts the controller middleware,  route handling
app.use(controller); 

app.listen(PORT, () => { // Starts the server and logs a message
  console.log(`Server listening on port ${PORT}`);
});

