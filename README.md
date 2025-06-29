# BlogApp

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to create, read, update, and delete blog posts with different user roles (Admin, Author, and User).

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Multiple user roles (Admin, Author, User)
  - Secure password hashing
  - Protected routes

- **Blog Management**
  - Create, read, update, and delete blog posts
  - Rich text editing
  - Image upload support
  - Category management
  - Author management

- **User Interface**
  - Responsive design using Bootstrap
  - Modern and clean UI
  - User-friendly navigation
  - Mobile-first approach

## 🛠️ Tech Stack

### Frontend
- React 18
- Redux Toolkit for state management
- React Router v6 for routing
- React Bootstrap for UI components
- React Hook Form for form handling
- Axios for HTTP requests

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blog-App-master
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the backend directory with:
   ```
   PORT=5000
   DB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

## 🚀 Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The server will run on http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   cd client
   npm start
   ```
   The application will open in your default browser at http://localhost:3000

## 📝 API Documentation

### User Routes
- POST `/user-api/register` - Register a new user
- POST `/user-api/login` - User login
- GET `/user-api/profile` - Get user profile

### Author Routes
- POST `/author-api/create-post` - Create a new blog post
- PUT `/author-api/update-post/:id` - Update a blog post
- DELETE `/author-api/delete-post/:id` - Delete a blog post
- GET `/author-api/posts` - Get author's posts

### Admin Routes
- GET `/admin-api/users` - Get all users
- PUT `/admin-api/user/:id` - Update user role
- DELETE `/admin-api/user/:id` - Delete user
- GET `/admin-api/posts` - Get all posts

## 👥 User Roles

1. **Admin**
   - Manage all users and posts
   - Change user roles
   - Delete any content

2. **Author**
   - Create blog posts
   - Edit own posts
   - Delete own posts
   - Manage profile

3. **User**
   - Read posts
   - Comment on posts
   - Like posts
   - Update profile

## 🔒 Environment Variables

Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Shiva Shankar

## 🙏 Acknowledgments

- React Documentation
- MongoDB Documentation
- Express.js Documentation
- Bootstrap Documentation
