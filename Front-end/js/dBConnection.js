import pkg from 'pg';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Client } = pkg;

dotenv.config({ path: '../Front-end/js/.env' });

// Get environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Create PostgreSQL client (if you need direct database access)
const client = new Client({
    connectionString: `postgresql://postgres.opralkrabelemyuylwou:${DB_PASSWORD}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
    ssl: { rejectUnauthorized: false },
});

// Connect to the database
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to Supabase PostgreSQL Successfully');
    } catch (error) {
        console.error('Connection error', error.stack);
    }
}

// User Management Functions
export async function createUser({
    f_name,
    l_name,
    username,
    address,
    number,
    email,
    password,
}) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { data, error } = await supabase
        .from("users")
        .insert([{
            f_name,
            l_name,
            username,
            address,
            number,
            email,
            password: hashedPassword,
        }])
        .select();

    if (error) {
        console.error("Error creating user:", error.message);
        throw new Error("Error creating user: " + error.message);
    }

    return data[0];
}

// Authentication Functions
export async function getUserByEmail(email) {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error) throw new Error(error.message);
    return data;
}

export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Product Management Functions
export async function getProductById(productId) {
    const { data, error } = await supabase
        .from("products")
        .select("*, product_images(image_url)")
        .eq("id", productId)
        .single();

    if (error) throw new Error("Error fetching product details");
    return data;
}

// Product CRUD Operations
export async function saveProductToDatabase({
    name,
    original_price,
    discounted_price,
    category,
    stock,
    mainImageUrl,
    additionalImages = [],
    description
}) {
    const { data: product, error: productError } = await supabase
        .from("products")
        .insert([{
            name,
            original_price,
            discounted_price,
            category,
            stock,
            image_url: mainImageUrl,
            description
        }])
        .select();

    if (productError) throw productError;

    if (additionalImages.length > 0) {
        const imageRecords = additionalImages.map(url => ({
            product_id: product[0].id,
            image_url: url,
        }));
        
        const { error: imageError } = await supabase
            .from("product_images")
            .insert(imageRecords);
            
        if (imageError) throw imageError;
    }

    return product[0];
}

// Export the client and connection function
export default { client, connectToDatabase };

// Call the function to establish the connection
connectToDatabase();