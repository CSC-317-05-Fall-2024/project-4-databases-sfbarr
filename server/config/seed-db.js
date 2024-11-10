/* Initialize the data in the DB */
console.log(`top of the seed-db.js \n`);
import { pool } from './database.js';


// dropTables COMPLETE
const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS restaurants;
            DROP TABLE IF EXISTS reviews;
        `;
        await pool.query(dropTablesQuery);
    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    try {
        const createTablesQuery = 
            // We could add 'IF NOT EXISTS' to prevent
            // duplication, but that's an edge case
            `CREATE TABLE restaurants (
                id SMALLSERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                address VARCHAR(255),
                phone VARCHAR(15),
                photo VARCHAR(255)
            );
             CREATE TABLE reviews (
                id SERIAL PRIMARY KEY,
                rating INTEGER NOT NULL,
                content TEXT,
                restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE
            );   
            `;

        const firstTime = new Date().getMilliseconds();  // Time before query
        
        await pool.query(createTablesQuery);    // Checks pool for queries to db

        var timeAfter = (new Date().getMilliseconds()) - firstTime;  // Time since query
        if (!(timeAfter < 0)) { // cull out of bound nums 
            console.log("\x1b[33m" + timeAfter + "㎳\x1b[0m" + " spent seeding");
        } else {
            timeAfter *= -1;
            timeAfter += 1000 
            console.log(`Took longer than expected...`);
        }
    } catch (error) {
        console.log(error)
    }
}

const insertData = async () => {

    // Hardcode into SQL query or use Paramaterization??

    try {

        const restaurantData = [ 
            { "name": "Anzukko", "phone": "(415) 555-5555", "address": "2F Le Sixieme bldg., 422-1 Ebisu-cho, Nakagyo-ku", "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora" },
            { "name": "Nishiki Warai", "phone": "(415) 555-5555", "address": "499 Nakauoyacho, Nishikikoji Sagaru, Kyoto, 604-8055", "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora" },
            { "name": "Giro Giro Hitoshina", "phone": "(415) 555-5555", "address": "420-7 Nanba-cho, Takoyakushi-sagaru, Kiyamachi-dori, Shimogyo-ku, Kyoto, 600-8015", "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora" },
            { "name": "Ippudo Ramen", "phone": "(415) 555-5555", "address": "580 Nakanocho, Nishikikoji-Sagaru, Teramachi-dori, Nakagyo-ku, Kyoto, 604-8042", "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora" },
            { "name": "Kamaiki", "phone": "(415) 555-5555", "address": "9-1 Imamikadocho, Nara, 630-8374", "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora" },
            { "name": "Edogawa Naramachi", "phone": "(415) 555-5555", "address": "15 Kunodocho, Nara, 630-8357", "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora" },
            { "name": "Tenryu-ji Shigetsu (Vegan)", "phone": "(415) 555-5555", "address": "68 Sagatenryuji Susukinobabacho, Ukyo-ku, Kyoto, 616-8385", "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora" },
            { "name": "Arashiyama Yoshimura", "phone": "(415) 555-5555", "address": "3-4 Sagatenryuji Tsukurimichicho, Ukyo-ku, Kyoto, 616-8384", "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora" },
            { "name": "Sumibi Yakiniku Tsunku", "phone": "(415) 555-5555", "address": "714 Ebisunocho Shimogyo-ku Ebisu Square Bldg. 1F, Kyoto 600-8310 Kyoto Prefecture", "photo": "https://placehold.co/235x188?text=Restaurant+Image&font=Lora" }
        ];

        for (const restaurant of restaurantData) {
            const insertQuery = `
                INSERT INTO restaurants (name, phone, address, photo)
                VALUES ($1, $2, $3, $4);
            `;
            const values = [restaurant.name, restaurant.phone, restaurant.address, restaurant.photo];
            await pool.query(insertQuery, values);
        }
        const insertReviewsQuery = `
            INSERT INTO reviews (rating, review, restaurant_id) VALUES
            (5, 'Amazing food!', 1),
            (4, 'Great service but a bit noisy.', 1),
            (3, 'Okay food but was seated next to toilet :/', 2),
            (5, 'Absolutely fantastic experience!', 2);
        `;
        await pool.query(insertReviewsQuery);

        console.log("Data inserted successfully!");
    } catch (error) {
        console.log(error)
    }
}

const setup = async () => {
    await dropTables();
    await createTables();
    await insertData();
}

setup();
