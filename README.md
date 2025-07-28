# Interview Notes Manager 

An aesthetic, feature-rich **full-stack MERN application** that helps you organize, categorize, and track your technical interview preparation notes. 

Live Demo: [Frontend (Netlify)](https://interview-notes-client.netlify.app) | [Backend API (Render)](https://interview-notes-api.onrender.com)

---

## Features

- 📝 Add, Edit, Delete Notes with rich-text content
- 🏷️ Tag & Categorize Notes (DSA, System Design, JavaScript, etc.)
- ⭐ Star Important Notes
- 🔍 Search, Filter by Tags/Categories
- 📊 Analytics Dashboard (Notes by Category, Tags Usage, Notes Over Time)
- ☁️ Export Notes as PDF
- 🌐 Responsive UI (Bootstrap + Custom CSS)
- 🔐 JWT Authentication (Register / Login)
- 📡 Global Network Error Handling
- 🛑 Error Boundaries for graceful UI crashes
- 🗂 Pagination (for large notes)
- ⚙️ Built with React, Node.js, Express, MongoDB

---

## Tech Stack

| Frontend  | Backend | Database | Deployment |
|-----------|---------|----------|------------|
| React     | Node.js | MongoDB Atlas | Netlify (Frontend) |
| Bootstrap | Express | Mongoose | Render (Backend API) |

---

## Project Structure

interview-notes-manager/  
|── client/ # React Frontend  
|── server/ # Node.js + Express Backend  
|── README.md

---

## Local Setup Instructions

1. **Clone the repository**
   ```
   git clone https://github.com/Navya-U/interview-notes-manager.git
   cd interview-notes-manager
   
2. **Setup Backend (Server)**
   ```
    cd server
    npm install
    # Create .env file with MONGO_URI and JWT_SECRET
    npm start

3. **Setup Frontend (Client)**
   ```
    cd client
    npm install
    npm start
  
4. **Access the app at**
   ```
   http://localhost:3000

---
   

## Live URLs

- Frontend (Netlify): [https://interview-notes-client.netlify.app](https://interview-notes-client.netlify.app)

- Backend API (Render): https://interview-notes-api.onrender.com/api

---


## Screenshots
- Landing Page:
  <img width="1365" height="598" alt="image" src="https://github.com/user-attachments/assets/e90ab463-c4be-4b98-bb4d-4e060c17b812" />

- Dashboard Analytics:
  <img width="1365" height="602" alt="image" src="https://github.com/user-attachments/assets/4beb3312-00e3-40a4-9b20-c0a5732cfa86" />

- Notes List with Filters:
  <img width="1362" height="599" alt="image" src="https://github.com/user-attachments/assets/7ba2890f-751e-4db3-a5ef-8bc8db9b7141" />

---

## What I Learned
- Full MERN stack project from scratch to deployment.
- Handling API error boundaries & global error banners.
- Building reusable charts with Recharts.
- Real-time filtering, sorting, and state management.
- Deploying Backend on Render & Frontend on Netlify.

---
## Contact Me
If you found this project useful or have any suggestions, feel free to connect with me on:

[LinkedIn](https://www.linkedin.com/in/navyaudhara/)

---







