# 🌸 AatmaNirbharnari

> **Empowering Women Entrepreneurs Through Technology**

[![Live Demo](https://img.shields.io/badge/Live-Demo-rose?style=for-the-badge&logo=vercel)](https://aatma-nirbharnari.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-5-green?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

AatmaNirbharnari is a full-stack MERN web application developed as an **individual internship project**. The platform empowers women entrepreneurs by providing a digital marketplace where they can showcase their home-based businesses, increase their visibility, and connect directly with customers.

---

## 🚀 Features

### 👩‍💼 Business Management
- List and showcase your business with images
- Categorized marketplace (Tiffin Service, Tailoring, Beauty, Handicrafts)
- Search and filter businesses by category
- Detailed business profile pages

### 🔐 User Authentication
- Role-based registration: `customer`, `entrepreneur`, `admin`
- Secure login with bcrypt password hashing
- JWT-based authentication with protected routes
- Login alert & welcome emails on every auth event

### 📨 Inquiry System
- Customers can send inquiries directly to business owners via modal form
- Business owners receive **real-time notifications** via Socket.io
- Email alert sent to owner on every new inquiry
- Entrepreneurs can track all inquiries from their dashboard

### 🚨 Complaint & Reporting
- Customers can report businesses via a report modal
- Complaints are saved and an urgent email is fired to the admin
- Status tracking: `open → investigating → resolved → dismissed`

### 📊 Entrepreneur Dashboard
- Stats overview: Total Inquiries, Unread Messages, Businesses Listed, Unique Customers
- Animated Area Chart for inquiry growth trends
- Recent inquiries table with read/unread status badges
- Quick actions: Add Business, View Storefront, Customer Insights
- Task checklist widget

### 🎨 Modern User Interface
- Animated ambient background blobs and floating SVG doodles
- Framer Motion page transitions and micro-animations
- Glassmorphism card panels (`glass-panel`)
- Fully responsive layout (mobile-first)
- Consistent brand color palette: rose, coral, peach, cream

---

## 🛠️ Tech Stack

### Frontend
| Package | Version | Purpose |
|---------|---------|---------|
| Next.js | 16 | React framework (App Router) |
| React | 19 | UI library |
| Tailwind CSS | 4 | Utility-first styling |
| Framer Motion | 12 | Animations & transitions |
| Recharts | 3 | Dashboard charts (Area, Line) |
| Lucide React | 1 | Icon set |
| React Icons | 5 | Additional icons |
| React Hook Form | 7 | Form management |
| Zod | 4 | Schema validation |
| Axios | 1 | HTTP client |
| Socket.io Client | 4 | Real-time communication |
| clsx + tailwind-merge | — | Conditional class utilities |

### Backend
| Package | Version | Purpose |
|---------|---------|---------|
| Express | 5 | HTTP server & routing |
| Mongoose | 9 | MongoDB ODM |
| Socket.io | 4 | Real-time WebSocket server |
| jsonwebtoken | 9 | JWT generation & verification |
| bcryptjs | 3 | Password hashing |
| Multer | 2 | File/image upload handling |
| Nodemailer | 9 | Email notifications |
| Helmet | 8 | Security HTTP headers |
| cors | 2 | Cross-origin resource sharing |
| dotenv | 17 | Environment variable loading |
| nodemon | 3 | Dev auto-restart |

### Database
- **MongoDB Atlas** — Cloud-hosted MongoDB
- **Mongoose** — Schema modeling and validation

### Deployment
- **Frontend** → Vercel (Next.js)
- **Backend** → Vercel (Serverless Functions via `vercel.json`)

---

## 📂 Project Structure

```text
AatmaNirbharnari/
│
├── backend/
│   ├── middleware/
│   │   ├── authMiddleware.js        ← JWT protect guard
│   │   ├── uploadMiddleware.js      ← Multer image upload (5MB limit)
│   │   ├── adminMiddleware.js       ← Admin role guard
│   │   ├── entrepreneurMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   │
│   ├── models/
│   │   ├── User.js                  ← fullName, email, password, role
│   │   ├── Business.js              ← businessName, owner, category, location, image...
│   │   ├── Message.js               ← customerName, subject, message, status, businessId
│   │   ├── Complaint.js             ← reportedBy, targetBusinessId, status
│   │   ├── Category.js
│   │   └── LearningContent.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js            ← POST /register, POST /login
│   │   ├── businessRoutes.js        ← GET /, GET /:id, POST / (protected)
│   │   ├── inquiryRoutes.js         ← POST /, GET /, GET /my-inquiries (protected)
│   │   ├── complaintRoutes.js       ← POST /, GET /
│   │   ├── adminRoutes.js
│   │   └── learningRoutes.js
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                ← MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth/
│   │   │   │   ├── registerController.js
│   │   │   │   └── loginController.js
│   │   │   ├── business/
│   │   │   │   ├── createBusinessController.js
│   │   │   │   ├── getBusinessesController.js
│   │   │   │   └── getBusinessByIdController.js
│   │   │   ├── inquiryController.js ← submit, getAll, getMyInquiries
│   │   │   └── complaintController.js
│   │   └── utils/
│   │       └── emailService.js      ← Nodemailer wrapper
│   │
│   ├── utils/
│   │   └── generateToken.js         ← JWT sign utility
│   │
│   ├── uploads/                     ← Local business images (Multer)
│   ├── app.js                       ← Express app setup
│   ├── server.js                    ← HTTP server + Socket.io
│   └── vercel.json                  ← Vercel serverless config
│
└── frontend/
    └── src/
        ├── app/                     ← Next.js App Router pages
        │   ├── layout.tsx           ← Root layout (Navbar, AuthProvider, fonts)
        │   ├── page.tsx             ← Homepage (Hero + Categories)
        │   ├── login/               ← Login page
        │   ├── register/            ← Registration page
        │   ├── businesses/          ← Marketplace listing
        │   ├── dashboard/           ← Entrepreneur dashboard
        │   ├── add-business/        ← Add business form
        │   ├── admin/               ← Admin panel
        │   ├── customer/            ← Customer view
        │   ├── entrepreneur/        ← Entrepreneur profile
        │   ├── messages/            ← Inbox / messages
        │   └── settings/            ← Account settings
        │
        ├── components/
        │   ├── Navbar.tsx           ← Global navigation bar
        │   ├── Sidebar.tsx          ← Dashboard sidebar
        │   ├── InquiryModal.tsx     ← Customer inquiry popup form
        │   ├── ReportModal.tsx      ← Business report/complaint popup
        │   └── ClientBusinessActions.tsx
        │
        ├── context/
        │   └── AuthContext.tsx      ← Global auth state (user, isLoggedIn, logout)
        │
        ├── hooks/                   ← Custom React hooks
        ├── lib/                     ← API base URL & utilities
        ├── services/                ← API call functions
        ├── store/                   ← State management
        └── types/                   ← TypeScript interfaces
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Raghavlavii/AatmaNirbharnari.git
cd AatmaNirbharnari
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000

# Email (Nodemailer)
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

Run the backend server:

```bash
npm run dev       # development (nodemon)
npm start         # production
```

Backend runs at: `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 📌 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login and receive JWT | ❌ |

### Business — `/api/business`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/business` | Get all businesses | ❌ |
| GET | `/api/business/:id` | Get business by ID | ❌ |
| POST | `/api/business` | Create a new business (with image upload) | ✅ JWT |

### Inquiries — `/api/inquiries`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/inquiries` | Submit a customer inquiry | ❌ |
| GET | `/api/inquiries` | Get all inquiries (optional ?businessId filter) | ❌ |
| GET | `/api/inquiries/my-inquiries` | Get inquiries for my businesses | ✅ JWT |

### Complaints — `/api/complaints`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/complaints` | Submit a business report | ❌ |
| GET | `/api/complaints` | Get all complaints (admin) | ✅ |

---

## 🔄 Key User Flows

### Registration
```
Fill register form → POST /api/auth/register
→ Password hashed (bcrypt, 10 rounds)
→ User created in MongoDB
→ Welcome email sent (async, non-blocking)
→ JWT token returned → stored in localStorage
→ AuthContext updated → redirect to /dashboard
```

### Adding a Business
```
Entrepreneur fills form + uploads image
→ POST /api/business (multipart/form-data, Bearer token)
→ authMiddleware verifies JWT
→ Multer saves image to uploads/
→ Business saved with owner = req.user._id
```

### Customer Sends Inquiry
```
Customer clicks "Contact" on business page
→ InquiryModal opens → fills form
→ POST /api/inquiries
→ Message saved to DB
→ Owner email notification sent
→ Socket.io emits "newInquiry" to owner's room in real-time
```

---

## 🔌 Real-Time Notifications

The backend uses **Socket.io** for real-time push notifications:

- On connect, clients emit `"join"` with their `userId` → join a personal socket room
- When a customer submits an inquiry → server emits `"newInquiry"` to the owner's room
- The entrepreneur's dashboard receives the event instantly without polling

> **Note:** WebSocket (Socket.io) does not work in Vercel's serverless environment. Real-time features are available in local/self-hosted deployments only.

---

## 👤 User Roles

| Role | Permissions |
|------|-------------|
| `customer` | Browse businesses, send inquiries, file complaints |
| `entrepreneur` | All customer permissions + list businesses + dashboard access |
| `admin` | Access admin panel, view all complaints and users |

---

## 🎯 Objectives

- Support women entrepreneurs through digital technology
- Provide an accessible platform for business discovery and customer connection
- Build a scalable, role-based MERN application following modern web practices
- Implement real-time features and automated email communication

---

## 🔮 Future Enhancements

- [ ] AI Business Mentor & Description Generator
- [ ] Real Business Analytics (replacing chart demo data)
- [ ] Reviews & Ratings system
- [ ] Wishlist / Favorites
- [ ] Cloud Image Upload (Cloudinary or AWS S3)
- [ ] Push Notifications
- [ ] Business Verification Badge
- [ ] Full Admin Dashboard (manage users, complaints, businesses)
- [ ] Mobile App (React Native)

---

## 👩‍💻 Developer

**Lavi Raghav**  
Individual Internship Project

---

## 📄 License

This project is developed as part of an internship for learning and educational purposes.
