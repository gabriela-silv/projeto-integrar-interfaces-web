# Click And Buy API

## Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm**
- **Docker & Docker Compose** (to run MongoDB in a container for testing)

## Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository_url>
   cd click-and-buy-api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configuration:**
    - (Optional) Create a `.env` file in the root directory.
    - Define `MONGO_URI` in the `.env` file if you want to override the default MongoDB connection string (`mongodb://127.0.0.1:27017/clickAndBuy`).

## Running MongoDB with Docker Compose

A `docker-compose.yaml` file is provided to run a MongoDB container for testing purposes. To start the MongoDB container, run:

```bash
docker-compose up -d
```

- The MongoDB container will be available at `mongodb://127.0.0.1:27017`.
- It uses a volume named `mongo-data` for data persistence.

## Running the Application

1. **Start the API Server:**
   ```bash
   npm start
   ```
   or, if using nodemon for development:
   ```bash
   npm run dev
   ```

2. **Access the API:**
   The API will be running at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Authentication
- **POST `/api/auth/signup`**  
  Register a new user.

- **POST `/api/auth/login`**  
  Login an existing user.

### Users
- **GET `/api/users`**  
  Retrieve all users.

- **POST `/api/users`**  
  Add a new user.

- **PUT `/api/users/:username`**  
  Update an existing user by username.

- **DELETE `/api/users/:username`**  
  Delete a user by username.

### Products
- **GET `/api/products`**  
  Retrieve all products.

- **GET `/api/products/:productCode`**  
  Retrieve a product by product code.

- **POST `/api/products`**  
  Add a new product.

- **PUT `/api/products/:productCode`**  
  Update a product by product code.

- **DELETE `/api/products/:productCode`**  
  Delete a product by product code.

- **POST `/api/products/apply-discount`**  
  Apply a discount to a product.

### Orders
- **GET `/api/orders`**  
  Retrieve all orders.

- **GET `/api/orders/:id`**  
  Retrieve an order by its ID.

- **POST `/api/orders`**  
  Create a new order.  
  _Request Body:_
    - `userId`: User identifier
    - `productCodes`: Array of product codes

### Profile
- **POST `/api/profile/update-image`**  
  Update the profile image of a user.

- **POST `/api/profile/update`**  
  Update user profile information (e.g., address, phone).

## Swagger API Documentation

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)
