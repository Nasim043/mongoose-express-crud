# Mongoose Express CRUD Mastery API

This API manages users and their orders. This API is developed by using Express.js, TypeScript, and Mongoose.

### Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/Nasim043/mongoose-express-crud.git
```

## Installation

```bash
cd mongoose-express-crud
npm install
```
## Set up environment variables:
Create a .env file in the root directory with:
```bash
PORT=5000
DATABASE_URL=your_mongo_url
BCRYPT_SALT_ROUNDS=10
```
## Run locally
```bash
npm run build
npm run dev
```

# API Endpoint
1. **Create a user**
   - **Endpoint:** `POST /api/users`
   - **Description:** Create a new user.
2. **Get all users**
   - **Endpoint:** `GET /api/users`
   - **Description:** Retrieves a list of all users.
3. **Get user by ID**
   - **Endpoint:** `GET /api/users/:userId`
   - **Description:** Retrieves user details by ID.
4. **Update user by ID**
   - **Endpoint:** `PUT /api/users/:userId`
   - **Description:** Update user details by ID.
5. **Delete a user by ID**
   - **Endpoint:** `DELETE /api/users/:userId`
   - **Description:** Deletes a user by ID.
5. **Add New Product in Order**
   - **Endpoint:** `GET /api/users/:userId`
   - **Description:** Add New Product in Order by user ID.
7. **Retrieve all orders for a user**
   - **Endpoint:** `GET /api/users/:userId/orders`
   - **Description:** Retrieve all orders for a specific user by user ID.
8. **Calculate Total Price of Orders**
   - **Endpoint:** `GET /api/users/:userId/orders/total-price`
   - **Description:** Calculate the Total Price of Orders for Specific Users by User ID.
