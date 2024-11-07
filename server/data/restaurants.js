// Fill this in
let restaurantData = [ 
    {
        "id" : 0,
        "name": "Anzukko",
        "phone": "(415) 555-5555",
        "address": "2F Le Sixieme bldg., 422-1 Ebisu-cho, Nakagyo-ku",
        "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora"
    },
    {
        "id" : 1,
        "name": "Nishiki Warai",
        "phone": "(415) 555-5555",
        "address": "499 Nakauoyacho, Nishikikoji Sagaru, Kyoto, 604-8055",
        "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora"
    },
    {   
        "id" : 2,
        "name": "Giro Giro Hitoshina",
        "phone": "(415) 555-5555",
        "address": "420-7 Nanba-cho, Takoyakushi-sagaru, Kiyamachi-dori, Shimogyo-ku, Kyoto, 600-8015",
        "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora"
    },
    {
        "id" : 3,
        "name": "Ippudo Ramen",
        "phone": "(415) 555-5555",
        "address": "580 Nakanocho, Nishikikoji-Sagaru, Teramachi-dori, Nakagyo-ku, Kyoto, 604-8042",
        "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora"
    },
    {
        "id" : 4,
        "name": "Kamaiki",
        "phone": "(415) 555-5555",
        "address": "9-1 Imamikadocho, Nara, 630-8374",
        "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora"
    },
    {
        "id" : 5,
        "name": "Edogawa Naramachi",
        "phone": "(415) 555-5555",
        "address": "15 Kunodocho, Nara, 630-8357",
        "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora"
    },
    {
        "id" : 6,
        "name": "Tenryu-ji Shigetsu (Vegan)",
        "phone": "(415) 555-5555",
        "address": "68 Sagatenryuji Susukinobabacho, Ukyo-ku, Kyoto, 616-8385",
        "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora"
    },
    {
        "id" : 7,
        "name": "Arashiyama Yoshimura",
        "phone": "(415) 555-5555",
        "address": "3-4 Sagatenryuji Tsukurimichicho, Ukyo-ku, Kyoto, 616-8384",
        "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora"
    },
    {
        "id" : 8,
        "name": "Sumibi Yakiniku Tsunku",
        "phone": "(415) 555-5555",
        "address": "714 Ebisunocho Shimogyo-ku Ebisu Square Bldg. 1F, Kyoto 600-8310 Kyoto Prefecture",
        "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora"
    }
];



const getNextId = () => {
    // We're using 0 as first ID, so length is already +1
    return restaurantData.length;
}

// Get a list of restaurants
const getRestaurants = () => {
    console.log('getRestaurants() returns [] from restaurants.js');
    return restaurantData;
};


// Get a restaurant by id
const getRestaurant = (id) => {
    
    console.log("getRestaurant request");
    var restaurant = restaurantData.find(restaurant => restaurant.id === id)
    return restaurant; 
};

// Create a new restaurant entry
const createRestaurant = (newRestaurant) => {

    // concoct new restaurant w/ ID using existing form info!
    const restaurantEntry = {
        id: getNextId(),
        ...newRestaurant // spread function/operator(?)
    };
    var oldLength = restaurantData.length;
    
    restaurantData.push(restaurantEntry); // push into restaurantData
    return (oldLength !== restaurantData.length);
};

// Delete a restaurant by id

const deleteRestaurant = (id) => {
    const index = restaurantData.findIndex(restaurant => restaurant.id === id);
    var len = restaurantData.length; 
    if (index !== -1) {
        restaurantData.splice(index, 1); // Remove the restaurant
        if (restaurantData.length != len){
            console.log(len);
            console.log(restaurantData.length);
            return true; // Tell callee deletion was successful
        } 
        
    }
    return false; // Restaurant not found
};


export default {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    deleteRestaurant
};