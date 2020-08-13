# MERNTasks

A project build with the MERN Stack to manage projects and tasks in each project.

## Project Setup

### 1. Run in both folders.
```
npm install
```

### 2. Create a .env in both folders

client .env:
```
REACT_APP_BACKEND_URL=
```
Backend URL. The default URL in this project is http://localhost:4000

server .env:
```
DB_MONGO=
SECRET=
```
In DB_MONGO I used a cluster in [MongoDB](https://www.mongodb.com/). 

SECRET is the secret word that use JWT to sign and verify the token.

## Running the project
# Client

Move to the client directory

    cd client
    
and run

    npm start
    
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Server

Move to the server directory

    cd server
    
and run

    npm run dev
    
Port 4000 is the default port in the server. You can change it manually in the server/index.js file.
