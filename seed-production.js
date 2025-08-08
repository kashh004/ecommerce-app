import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'fallback-uri';

// Product data
const products = [
  {
    name: "iPhone 15 Pro",
    description: "The latest iPhone with advanced camera system and A17 Pro chip. Features a 6.1-inch Super Retina XDR display and titanium design.",
    price: 999.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    stock: 50,
    rating: 4.8,
    numReviews: 120
  },
  {
    name: "MacBook Air M2",
    description: "Ultra-thin laptop with M2 chip, 13.6-inch Liquid Retina display, and up to 18 hours of battery life.",
    price: 1199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    stock: 30,
    rating: 4.9,
    numReviews: 85
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max technology for maximum cushioning and style.",
    price: 129.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    stock: 100,
    rating: 4.6,
    numReviews: 200
  },
  {
    name: "The Great Gatsby",
    description: "Classic novel by F. Scott Fitzgerald about the Jazz Age and the American Dream.",
    price: 12.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    stock: 75,
    rating: 4.7,
    numReviews: 150
  },
  {
    name: "Coffee Maker",
    description: "Programmable coffee maker with 12-cup capacity and auto-shutoff feature.",
    price: 89.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    stock: 40,
    rating: 4.4,
    numReviews: 90
  },
  {
    name: "Denim Jacket",
    description: "Classic denim jacket with comfortable fit and timeless style.",
    price: 79.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
    stock: 60,
    rating: 4.5,
    numReviews: 110
  },
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with 30-hour battery life and premium sound quality.",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 25,
    rating: 4.7,
    numReviews: 180
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat made from eco-friendly materials, perfect for home workouts.",
    price: 29.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    stock: 80,
    rating: 4.3,
    numReviews: 95
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with heart rate monitor and GPS capabilities.",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 35,
    rating: 4.6,
    numReviews: 140
  },
  {
    name: "Kitchen Knife Set",
    description: "Professional 8-piece knife set with wooden block and sharpening steel.",
    price: 149.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
    stock: 20,
    rating: 4.8,
    numReviews: 75
  },
  {
    name: "Casual T-Shirt",
    description: "Comfortable cotton t-shirt with a modern fit, perfect for everyday wear.",
    price: 24.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    stock: 120,
    rating: 4.4,
    numReviews: 85
  },
  {
    name: "Formal Shirt",
    description: "Elegant formal shirt made from premium cotton, ideal for professional settings.",
    price: 59.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    stock: 45,
    rating: 4.6,
    numReviews: 65
  },
  {
    name: "Hooded Sweatshirt",
    description: "Warm and cozy hooded sweatshirt perfect for casual outings and cold weather.",
    price: 44.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    stock: 70,
    rating: 4.3,
    numReviews: 95
  },
  {
    name: "Summer Dress",
    description: "Light and breezy summer dress with floral pattern, perfect for warm weather.",
    price: 69.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
    stock: 35,
    rating: 4.7,
    numReviews: 55
  }
];

// Connect to MongoDB
async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Import Product model
    const { default: Product } = await import('./backend/models/Product.js');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully inserted ${insertedProducts.length} products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 