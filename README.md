# eCommerce MERN Stack

This project is a full-stack eCommerce application built with the MERN stack (MongoDB, Express.js, React, Node.js). It features a user-friendly dashboard for managing products, orders, and user accounts, and utilizes AWS S3 for file storage.

## Features

- **User Authentication:** Sign up, sign in, and manage user accounts.
- **Product Management:** View, add, edit, and delete products.
- **Shopping Cart:** Add items to the cart, update quantities, and proceed to checkout.
- **Order Management:** Place orders and view order history.
- **Dashboard:** An admin interface for managing products, orders, and users.
- **File Storage:** Upload and manage files using AWS S3.
- **Email Notifications:** Send confirmation emails with Nodemailer.

## Technologies

- **Frontend:** React, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **File Storage:** AWS S3
- **Email Service:** Nodemailer

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB server running locally or a MongoDB Atlas account.
- AWS account with S3 bucket created.
- Email service account (e.g., Gmail, SendGrid).

### Clone the Repository

```bash
git clone https://github.com/ChungZinh/ecommerce-mern-stack.git
cd ecommerce-mern-stack
```

### Frontend Setup

    1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

    2. Install dependencies:

    ```bash
    npm install
    ```

    3. Create a `.env` file in the `client` directory and add the following environment variable:

    ```env
    VITE_S3_ACCESS_KEY="your-access-key"
    VITE_S3_SECRET_ACCESS_KEY="your-secret-access-key"
    VITE_S3_REGION="region"
    VITE_S3_BUCKET="your-bucket"
    ```

    4. Start the frontend:

    ```bash
    npm start
    ```

### Backend Setup

    1. Navigate to the `server` directory:

    ```bash
    cd server
    ```


    2. Install dependencies:

    ```bash
    npm install
    ```


    3. Create a `.env` file in the `server` directory and add the following environment variables:

    ```env
    MONGO_URI=<Your MongoDB URI>
    PORT=5000
    EMAIL=<Your email>
    PASSWORD=<Your password>
    ```

    4: Start the server:

    ```bash
    node --watch index.js
    ```

### Deployment

The application is deployed and accessible at https://nest-ecommerce-one.vercel.app/.


### Dashboard

- The admin dashboard can be accessed from the frontend application. It allows administrators to:

  Manage Products: Add, edit, and delete product entries.
  Manage Categories: Add, edit, and delete product categories.
  Manage Orders: View and update order statuses.
  Manage Users: View and manage user accounts.


### File Storage with AWS S3

File Uploads: The application supports file uploads to AWS S3. Ensure your AWS credentials and bucket details are correctly set up in the .env file.


### Sending Confirmation Emails

To send confirmation emails, such as for bills or invoices, the application uses Nodemailer. Ensure you have configured your email service details in the .env file.

### API Endpoints

- **Authentication**:
    * POST /api/auth/sign-up - Register a new user.
    * POST /api/auth/sign-in - Authenticate a user and get a JWT token.

- **Products**:
    * GET /api/product - Retrieve a list of products.
    * POST /api/product - Add a new product (admin only).
    * PUT /api/product/:id - Update a product (admin only).
    * PUT /api/product/move-to-draft/:id - move to draft a product (admin only).

- **Categories**:
    * GET /api/category - Retrieve a list of categories.
    * POST /api/category - Add a new category (admin only).
    * PUT /api/category/:id - Update a category (admin only).
    * DELETE /api/category/:id - Delete a category (admin only).

- **Cart**:
    * GET /api/cart/:userId - Retrieve the current user's or params cart.
    * POST /api/cart/:userId - Add an item to the cart.
    * PUT /api/cart/:userId
    * DELETE /api/cart/:userId/items/:productId - Remove an item from the cart.
    * DELETE /api/cart/:userId - Remove cart

- **Orders**:
    POST /api/order - Place a new order.
    GET /api/order - Retrieve a list of orders for the current user.


### Contributing
Feel free to open issues or submit pull requests to contribute to this project.


### Contact
For any questions or support, please contact phamtrungvinh642002@gmail.com

