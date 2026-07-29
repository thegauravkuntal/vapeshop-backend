# Vape Shop Mumbai Backend API

## Tech Stack
- **Runtime:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (JSON Web Tokens)
- **Validation:** express-validator
- **Password Hashing:** bcryptjs

## Setup Instructions

### 1. Install MongoDB
Download and install MongoDB Community Edition from https://www.mongodb.com/try/download/community

Make sure MongoDB is running on `mongodb://localhost:27017`

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment
Edit `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vape-shop
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
```

### 4. Seed the Database
```bash
npm run seed
```
This creates 13 categories and 24 sample products.

### 5. Start the Server
```bash
npm run dev
```
Server runs on `http://localhost:5000`

### 6. Connect Frontend
Update `apps/web/src/api/EcommerceApi.js` base URL to:
```js
const BASE_URL = 'http://localhost:5000/api';
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user (protected) |
| PUT | /api/auth/profile | Update profile (protected) |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List all products |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create product (admin) |
| PUT | /api/products/:id | Update product (admin) |
| DELETE | /api/products/:id | Delete product (admin) |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/categories | List all categories |
| GET | /api/categories/:id | Get single category |
| POST | /api/categories | Create category (admin) |
| PUT | /api/categories/:id | Update category (admin) |
| DELETE | /api/categories/:id | Delete category (admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders | Create order (protected) |
| GET | /api/orders/my | Get my orders (protected) |
| GET | /api/orders/:id | Get order by ID (protected) |
| GET | /api/orders | Get all orders (admin) |
| PUT | /api/orders/:id/status | Update order status (admin) |

## Default Admin
- **Email:** admin@vapeshop.com
- **Password:** admin123
