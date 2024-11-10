import { pool } from '/Users/jameschristianbarr/CSC317/project-4-databases-sfbarr/server/config/database.js';
// Get a list of restaurants
// STATUS: WORKING
const getRestaurants = async () => {
    try {
        console.log('getRestaurants() is called from somewhere, makes query to pool, returns databse if it exists');
        const result = await pool.query(`SELECT * FROM restaurants`);
        
        const restaurantData = result.rows;
        console.log(restaurantData);
        restaurantData.forEach(restaurant => {
            console.log(restaurant.id, restaurant.name);  // Access the columns of each row
          });
        return restaurantData;
    } catch (error) {
        console.log(error);
    }
};


// Get a restaurant by id
// STATUS: WORKING v2 (fixed query syntax problem)
const getRestaurant = async (id) => {
    
    try {
        const result = await pool.query(`SELECT * FROM restaurants WHERE id = $1`, [id]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
};

const getReviewsForRestaurant = async (id) => {
    try {
        const result = await pool.query(`SELECT * FROM reviews WHERE restaurant_id = $1`, [id] );
    } catch (error) {
        console.log(error);
    }
} 

// Create a new restaurant entry
// STATUS: WORKING
const createRestaurant = async (newRestaurant) => {

    try {
        const insertQuery = `
                INSERT INTO restaurants (name, phone, address, photo)
                VALUES ($1, $2, $3, $4);
            `;
            const values = [newRestaurant.name, newRestaurant.phone, newRestaurant.address, newRestaurant.photo];
            await pool.query(insertQuery, values);

    } catch (error) {
        
    }
    var oldLength = restaurantData.length;
    
    restaurantData.push(restaurantEntry); // push into restaurantData
    return (oldLength !== restaurantData.length);
};

// Delete a restaurant by id
// STATUS: WORKING
const deleteRestaurant = async (id) => {
    try {
        const result = await pool.query(`
            DELETE FROM restaurants WHERE id = $1`, [id]);
            if (result.rowCount > 0) {
                console.log(`Restaurant with id ${id} was successfully deleted.`);
                return true;
            } else {
                console.log(`No restaurant found with id ${id}.`);
                return false;
            }
    } catch (error){
        console.log(error);
    }
};


export default {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    deleteRestaurant
};