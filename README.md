# 🌸 AatmaNirbharnari

> **Empowering Women Entrepreneurs Through Technology**

AatmaNirbharnari is a full-stack MERN web application developed as an **individual internship project**. The platform aims to empower women entrepreneurs by providing a digital marketplace where they can showcase their businesses, increase their visibility, and connect with potential customers.

The project focuses on creating an accessible and user-friendly platform that promotes women-led businesses while providing a scalable foundation for future enhancements such as AI-powered business assistance, analytics, and community engagement.

---

## 🚀 Features

### 👩‍💼 Business Management

* Add new businesses
* View all businesses
* View business details
* Search businesses
* Business categories

### 🔐 User Authentication

* User Registration
* Secure Login
* JWT Authentication
* Protected Routes

### 🎨 Modern User Interface

* Responsive Design
* Clean and intuitive interface
* Built using Tailwind CSS
* Mobile-friendly layout

### 📈 Planned Features

* Business Dashboard
* AI Business Assistant
* AI Business Description Generator
* Business Analytics
* Reviews & Ratings
* Favorites
* Image Uploads
* Admin Panel

---

# 🛠️ Tech Stack

### Frontend

* Next.js
* React.js
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT
* bcrypt

### Version Control

* Git
* GitHub

---

# 📂 Project Structure

```text
AatmaNirbharnari/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── src/
│   │   ├── config/
│   │   └── controllers/
│   ├── utils/
│   ├── validations/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── app/
│       └── components/
│
└── README.md
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/Raghavlavii/AatmaNirbharnari.git
```

```bash
cd AatmaNirbharnari
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend server:

```bash
npm run dev
```

---

## Frontend Setup

Open another terminal.

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

---

# 📌 API Endpoints

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| GET    | `/api/business`     | Get all businesses    |
| GET    | `/api/business/:id` | Get business by ID    |
| POST   | `/api/business`     | Create a new business |

---

# 🎯 Objectives

* Support women entrepreneurs through digital technology.
* Provide an online platform for business discovery.
* Build a scalable MERN application following modern web development practices.
* Deliver a clean and responsive user experience.

---

# 🔮 Future Enhancements

* AI Business Mentor
* AI-powered Business Description Generator
* Business Analytics Dashboard
* Image Upload Support
* Reviews & Ratings
* Wishlist/Favorites
* Notifications
* Admin Dashboard
* Business Verification

---

# 👩‍💻 Developer

**Lavi Raghav**

Individual Internship Project

---

# 📄 License

This project is developed as part of an internship for learning and educational purposes.
