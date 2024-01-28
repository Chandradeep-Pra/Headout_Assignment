import express from 'express';

// Imports the main logic for processing data requests
import mainLogic from './mainLogic.js'; 

// Creates an Express router for modular route handling
const router = express.Router(); 

// Mounts the main logic handler for the `/data` route
//console.log("Coming from controller.js", typeof mainLogic);
router.use( mainLogic); 

export default router; 