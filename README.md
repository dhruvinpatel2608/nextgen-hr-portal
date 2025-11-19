# NextGen HR System

A complete HR recruitment system with job posting, application CRUD operations, and a responsive front-end UI.  
Built using **Node.js**, **MongoDB**, and **Bootstrap** with a clean, modern design.

---

## 🚀 Features

### ✅ Frontend (HTML + CSS + Bootstrap)
- Add Job Application  
- View All Applications  
- Edit Application  
- Delete Application  
- Clean, modern UI  
- Light Navbar + Medium Dark Background theme  
- Fully responsive design  

### ✅ Backend (Node.js + MongoDB)
- REST API with full CRUD  
- Endpoints:
  - `POST /storeJobVacancy`
  - `GET /getapplications`
  - `POST /getSingleJobAppData`
  - `PUT /updateJobApplication`
  - `DELETE /deleteJobApplication`
- Uses MongoDB native driver  
- Automatic JSON body handling  
- CORS enabled  

---

## 📁 Project Structure

project-folder/

│── server.js

│── package.json

│── package-lock.json

│── Web/

- index.html
- jobpost.html
- viewjobpost.html

│── README.md


---

## 🛠 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/nextgen-hr-system.git
cd nextgen-hr-system

### 2️⃣ Install dependencies
npm install

3️⃣ Start MongoDB

Ensure MongoDB is running on:
mongodb://localhost:27017

4️⃣ Start backend server
npm start
http://localhost:4000


