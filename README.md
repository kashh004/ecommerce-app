# ## Live Demo
 
## Live Demo

- 🛒 Frontend: [https://project-ppbljbsjo-akash-n-s-projects.vercel.app](https://project-ppbljbsjo-akash-n-s-projects.vercel.app)
- ⚙️ Backend API: [https://ecommerce-app-638m.onrender.com](https://ecommerce-app-638m.onrender.com)

# E-Commerce Web Application

A full-stack e-commerce web application built with React.js, Node.js, Express.js, and MongoDB.

## Features

### User Features
- User registration and authentication (JWT-based)
- Browse products with search and filtering
- View product details
- Add products to shopping cart
- Place orders with shipping information
- View order history and status

### Admin Features
- Admin dashboard for product management
- Add, edit, and delete products
- View all orders
- Update order status
- Manage inventory

## Tech Stack

### Frontend
- React.js 19
- React Router for navigation
- React Bootstrap for UI components
- Axios for API calls
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Start MongoDB (if using local MongoDB):
```bash
# On macOS/Linux
mongod

# On Windows
"C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe"
```

5. Seed the database with sample data:
```bash
# Import sample data (products and admin user)
npm run data:import

# Admin credentials:
# Email: admin@example.com
# Password: admin123
```

6. Run the development server:
```bash
# Run both frontend and backend
npm run dev:full

# Or run them separately:
# Backend only
npm run server

# Frontend only
npm run dev
```

7. Open your browser and navigate to:
<<<<<<< HEAD
- Frontend: [LINK](https://project-ppbljbsjo-akash-n-s-projects.vercel.app)
- Backend API: [LINK](https://ecommerce-app-638m.onrender.com)
=======
- Frontend: https://project-ppbljbsjo-akash-n-s-projects.vercel.app
- Backend API: https://ecommerce-app-638m.onrender.com
>>>>>>> Save local changes before pulling

## Project Structure

```
project/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Home.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── OrderHistory.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders/myorders` - Get user orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  rating: Number,
  numReviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  products: [{
    productId: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  status: String,
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

### For Customers
1. Register a new account or login
2. Browse products on the home page or products page
3. Use search and filter options to find products
4. Click on a product to view details
5. Add products to your cart
6. Proceed to checkout and place your order
7. View your order history

### For Admins
1. Login with admin credentials
2. Access the admin dashboard
3. Add, edit, or delete products
4. View and manage all orders
5. Update order statuses

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control (admin vs user)
- Input validation and sanitization
- Protected routes and middleware

## Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Product reviews and ratings system
- Wishlist functionality
- Email notifications
- Advanced admin analytics
- Image upload functionality
- Real-time chat support
