NextAuth Project
A Next.js application implementing authentication with NextAuth.js, MongoDB for user storage, JWT-based sessions, and role-based access control (user and admin roles). Features include user registration, login, dashboard, and an admin panel for user management. Styled with Tailwind CSS.
Table of Contents

Features
Prerequisites
Installation
Configuration
Running the Application
Usage
Project Structure
API Endpoints
Role-Based Access
Troubleshooting
Contributing
License

Features

Authentication: Login and registration using NextAuth.js with Credentials provider and JWT sessions.
Role-Based Access: Two roles (user and admin) with protected routes.
User Management: Admins can view all users and toggle roles (user ↔ admin).
MongoDB Integration: Stores user data (name, email, hashed password, role) in MongoDB Atlas.
Responsive UI: Built with Tailwind CSS for a clean, modern interface.
Testing Endpoint: Verify MongoDB connection via /api/test-db.

Prerequisites

Node.js: v18.x or later (tested with v20.15.1).
pnpm: Package manager (v8.x or later recommended).
MongoDB Atlas: A free cluster for user storage.
Git: For cloning the repository.

Installation

Clone the Repository:
git clone <repository-url>
cd nextauth-project


Install Dependencies:
pnpm install


Set Up Environment Variables:

Create a .env.local file in the project root:NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl>
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/nextauth-app?retryWrites=true&w=majority
JWT_SECRET=<generate-with-openssl>
ADMIN_SETUP_SECRET=create-first-admin-secret-key-12345


Generate secrets:node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"


Replace <username> and <password> with your MongoDB Atlas credentials.
Ensure your IP is whitelisted in MongoDB Atlas (Network Access > Add IP Address > Allow Access from Anywhere).



Configuration

MongoDB Atlas:

Create a database named nextauth-app.
Ensure the users collection exists with at least one user:{
  "name": "Test User",
  "email": "user@example.com",
  "password": "<hashed_password>",
  "role": "user",
  "createdAt": "2025-08-26T00:00:00Z"
}


Generate a hashed password:node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('password123', 12).then(hash => console.log(hash))"




Admin Setup:

Use the /api/create-admin endpoint to create an admin user (one-time setup):curl -X POST http://localhost:3000/api/create-admin \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@example.com","password":"admin123","secretKey":"create-first-admin-secret-key-12345"}'


Remove src/app/api/create-admin/route.js after creating the first admin for security.



Running the Application

Start the Development Server:
pnpm dev


Opens at http://localhost:3000.


Build and Run for Production:
pnpm build
pnpm start



Usage

Home Page (/): Displays login/register links for guests or a dashboard link for authenticated users.
Login (/login): Sign in with email and password (e.g., user@example.com / password123).
Register (/register): Create a new user account (default role: user).
Dashboard (/dashboard): Shows user info and, for admins, an admin panel link.
Admin Panel (/admin): Admin-only page to view all users and toggle roles (user ↔ admin).
Test Database Connection:curl http://localhost:3000/api/test-db



Project Structure
nextauth-project/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── admin/users/route.js      # Admin-only: Fetch/toggle user roles
│   │   │   ├── auth/[...nextauth]/route.js # NextAuth.js authentication
│   │   │   ├── create-admin/route.js     # One-time admin creation
│   │   │   ├── register/route.js         # User registration
│   │   │   ├── test-db/route.js          # Test MongoDB connection
│   │   ├── admin/page.js                 # Admin panel
│   │   ├── dashboard/page.js             # User dashboard
│   │   ├── login/page.js                 # Login page
│   │   ├── register/page.js              # Registration page
│   │   ├── globals.css                   # Tailwind CSS styles
│   │   ├── layout.js                     # Root layout with AuthProvider
│   │   ├── page.js                       # Home page
│   ├── components/
│   │   ├── AuthProvider.js               # NextAuth.js session provider
│   │   ├── LoginForm.js                  # Login form component
│   │   ├── Navbar.js                     # Navigation bar with role-based links
│   │   ├── RegisterForm.js               # Registration form component
│   ├── lib/
│   │   ├── auth.js                       # NextAuth.js configuration
│   │   ├── mongodb.js                    # MongoDB connection
│   ├── utils/
│   │   ├── password.js                   # Password hashing/verification
│   │   ├── roles.js                      # Role management utilities
├── .env.local                            # Environment variables
├── package.json                          # Dependencies and scripts
├── tailwind.config.js                    # Tailwind CSS configuration
├── next.config.mjs                       # Next.js configuration

API Endpoints

GET/POST /api/auth/[...nextauth]: Handles login, session, and sign-out (NextAuth.js).
POST /api/register: Registers a new user (role: user).
POST /api/create-admin: Creates or promotes an admin user (requires ADMIN_SETUP_SECRET).
GET /api/admin/users: Fetches all users (admin-only, excludes passwords).
PUT /api/admin/users: Updates a user’s role (admin-only).
GET /api/test-db: Tests MongoDB connection and lists collections/users.

Role-Based Access

User Role:
Access: /dashboard
Actions: View personal info, navigate app.


Admin Role:
Access: /dashboard, /admin
Actions: View all users, toggle roles (user ↔ admin) via /api/admin/users.



Troubleshooting

HTTP 500 Error on /api/auth/signin:
Check MongoDB Connection:curl http://localhost:3000/api/test-db

Ensure MONGODB_URI is correct and IP is whitelisted in MongoDB Atlas.
Verify User Data: Ensure users collection has valid entries with hashed passwords.
Secrets: Confirm NEXTAUTH_SECRET and JWT_SECRET are set in .env.local.
Logs: Enable debug: true in src/lib/auth.js and check terminal logs.


PlantUML Diagram:
To visualize the app’s flow, use the provided nextauth_project_diagram.puml:java -jar plantuml.jar nextauth_project_diagram.puml

Or paste into plantuml.com.



Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/xyz).
Commit changes (git commit -m "Add xyz feature").
Push to the branch (git push origin feature/xyz).
Open a pull request.

License
MIT License. See LICENSE for details.
