// Add your server code here.
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { backendRouter } from './routes/api.js';

import restaurantsModule from './data/restaurants.js';

const { getRestaurant, createRestaurant, getRestaurants, deleteRestaurant } = restaurantsModule;

const app = express();

app.use(express.json()); // middleware for parsing JSONs

app.use('/api', backendRouter); // mount API router

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'KyotoAttractions.html'));
});
app.delete('/restaurants/:id', (req, res) => {
    console.log(`Delete from server.js`);
});

app.get('/restaurants', (req, res) => {
    const restaurants = getRestaurants();
    
    res.render('restaurants', { restaurantData: restaurants });
});
app.get('/restaurants/:id', (req, res) => {
    
    var restaurant = getRestaurant(parseInt(req.params.id, 10));
    res.render('restaurant-details', {restaurant});
});

app.get('/new-restaurant-form', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'new-restaurant-form.html'));
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

