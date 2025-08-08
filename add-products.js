import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  rating: Number,
  numReviews: Number
});

const Product = mongoose.model('Product', productSchema);

// Sample products
const products = [
  {
    name: "iPhone 15 Pro",
    description: "The latest iPhone with advanced camera system and A17 Pro chip.",
    price: 999.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    stock: 50,
    rating: 4.8,
    numReviews: 120
  },
  {
    name: "MacBook Air M2",
    description: "Ultra-thin laptop with M2 chip and up to 18 hours of battery life.",
    price: 1199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    stock: 30,
    rating: 4.9,
    numReviews: 85
  }
];

async function addProducts() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Add new products
    const result = await Product.insertMany(products);
    console.log(`Added ${result.length} products successfully!`);

    console.log('Database updated!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

addProducts(); 