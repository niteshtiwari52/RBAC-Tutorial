
# RBAC-Tutorial( Role Based Access control Tutorial)


## Tech Stack

### Client
- **React**: JavaScript library for building user interfaces
- **Redux**: State management for React
- **Axios**: HTTP client for API requests
- **React Router**: For handling client-side routing

### Server
- **Node.js**: JavaScript runtime for the server-side
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing data
- **JSON Web Tokens (JWT)**: For user authentication and session management

### Authentication
- **JWT (JSON Web Token)**: 
  - Implemented for secure user authentication. After login or registration, a JWT is issued to the user, which is then used to authenticate API requests and manage user sessions. This ensures stateless and secure communication between the client and server. In my case I am generating JWT token after verifying EMail OTP and rediercting user to dashboard to use the functionality of the Application.

## Testing Credentials

Below are the test credentials for different roles in the RBAC Tutorial project. Use these to test various role-based access controls within the application.

### Admin
- **Email:** admin1@gmail.com  
- **Password:** password123

### Project Manager
- **Email:** p1@gmail.com  
- **Password:** password@123

### User
- **Email:** user1@gmail.com  
- **Password:** password@123

> **Note:** These credentials are for testing purposes only and should not be used in a production environment.


## Run Locally

### Clone the project

```bash
  git clone [https://link-to-project](https://github.com/niteshtiwari52/RBAC-Tutorial.git)
```
### Go to the project directory

```bash
  cd RBAC-Tutorial
```
### Set up environment variables

#### Server
###### Create a .env file in the server directory:
```bash
  cd server
  touch .env
```
##### Add the following environment variables to the .env file:
```bash
  CLIENT_URL= http://localhost:3000
  JWT_SECRET= your_jwt_secret
  MONGO_URI= your_mongo_db_connection_string
  PORT= 4000

```

###### Make sure to replace the values with your actual credentials.

#### Client
###### Create a .env file in the client directory:
```bash
  cd ../client
  touch .env
```
##### Add the following environment variables to the .env file:
```bash
  REACT_APP_API_URL=http://localhost:4000
```
###### Make sure to replace the values with your actual credentials.

### Install Dependency to Run the Project
##### Install Server Dependency
```bash
  cd server
  npm install
```
##### Install Client Dependency
```bash
  cd client
  npm install
```
### Run the Client and Server Both Individually
##### Run Client Server 
```bash
  cd client
  npm start
```
##### Run Server
```bash
  cd server
  npm run dev
```## Tech Stack



