import express from 'express';

import restaurantFunctions from '../data/restaurants.js'; 
const { createRestaurant, deleteRestaurant, getRestaurants } = restaurantFunctions; 


const router = express.Router();

// Add routes here


router.get('/restaurants', (req, res) => {
    console.log("Router get request \n\n");
    const restaurants = getRestaurants();
    res.json(restaurants); // Respond with JSON
});

// Create a new restaurant
router.post('/restaurants', (req, res) => {
    console.log("Router just got a POST request \n\n"); 
    const newRestaurant = req.body; 
    const createdRestaurant = createRestaurant(newRestaurant);
    res.status(201).json(createdRestaurant); // send newly created element as response
});


// Delete a restaurant by ID

router.delete('/restaurants/:id', (req, res) => {
    console.log("API just received HTTP DELETE request \n\n");
    const id = parseInt(req.params.id, 10); // Extract ID from the URL and parse it
    console.log(`Received request to delete restaurant with ID: ${+id}`);
    const deleted = deleteRestaurant(id); 

    // Check if the restaurant was deleted
    if (deleted) {                          
        res.status(204).send();
    } else {
        res.status(404).send('Restaurant not found');
    }
});

export {router as backendRouter};