# 🎟️ MERNickets (CLIENT) — A Modern Online Ticket Booking Platform

MERNickets is a **modern, full‑stack online ticket booking platform** built using the **MERN stack**. This repository contains the **client‑side (frontend)** of the application, delivering a fast, responsive, and visually rich user experience.

Users can seamlessly browse, search, and book tickets for **Bus, Train, Launch, and Flight** routes with secure authentication and payments. The UI is crafted with a premium **glassmorphic design**, smooth animations, and **Dark / Light mode** support.

---

## 🌐 Live Application

### 🔗 Client (Frontend)

👉 [https://mernickets.netlify.app/](https://mernickets.netlify.app/)

### 🔗 Server (Backend API)

👉 [https://mernickets-server.vercel.app/](https://mernickets-server.vercel.app/)

---

## 🔑 Test Credentials

Use the following demo credentials to explore role‑based features:

### 👮‍♂️ Admin Account

* **Email:** [admin@mernickets.com](mailto:admin@mernickets.com)
* **Password:** Ab1234567890

### 🏪 Vendor Account

* **Email:** [vendor@mernickets.com](mailto:vendor@mernickets.com)
* **Password:** Ab1234567890

### 👤 User Account

* Login using **any valid email/password** or **Google Login**

---

## ✨ Core Features

### 🌍 General

* 🎨 **Modern UI/UX** — Tailwind CSS v4 + Framer Motion
* 🌗 **Dark / Light Mode** with global theme context
* 📱 **Fully Responsive** — Mobile, Tablet & Desktop
* 🔐 **Secure Authentication** — Firebase Email/Password & Google OAuth

---

### 👤 User (Traveler)

* 🔎 **Advanced Search & Filters** (From / To / Transport Type)
* ↕️ **Smart Sorting** by ticket price
* 🎟️ **Ticket Booking System** with quantity selection
* 💳 **Stripe Payments** for secure checkout
* 📊 **User Dashboard**

  * My Bookings (Pending / Accepted / Rejected)
  * Countdown timer for departure
  * Transaction history with payment IDs

---

### 🏪 Vendor (Service Provider)

* ➕ **Add / Update / Delete Tickets**
* 📩 **Manage Booking Requests** (Accept / Reject)
* 📈 **Revenue Analytics Dashboard**

  * Total Revenue
  * Tickets Sold
  * Tickets Added
* 📦 **Inventory & Status Tracking** (Pending / Approved / Rejected)

---

### 🛡️ Admin (Platform Manager)

* ✅ **Ticket Moderation** — Approve / Reject vendor tickets
* 👥 **User Management** — Assign roles (User / Vendor / Admin)
* 🚫 **Fraud Control** — Mark vendors as fraudulent
* ⭐ **Advertisement Control** — Feature up to 6 tickets on Home page
* 🧭 **Full Platform Oversight**

---

## 📁 Project Structure

```bash
MERNickets-SERVER-FullStack-Ticket-Booking-Platform/
│
├── public/
│
│
├── src/
│   ├── main.jsx                     # App entry point, renders <App/>
│   ├── App.jsx                      # Main App component, loads Routes
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx           # Shared layout: Navbar + Outlet + Footer
│   │
│   ├── components/
│   │   ├── Navbar.jsx               # Top navigation bar
│   │   ├── Footer.jsx               # Footer component
│   │   ├── Spinner.jsx              # Loading spinner
│   │   └── PaymentForm.jsx          # Stripe CardElement + payment handler
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   └── Home.jsx             # Homepage: hero banner + advertised tickets
│   │   ├── AllTickets/
│   │   │   └── AllTickets.jsx       # Shows all admin-approved tickets
│   │   ├── TicketDetails/
│   │   │   └── TicketDetails.jsx    # Ticket info + booking modal + countdown
│   │   ├── Dashboard/
│   │   │   ├── AddTicket.jsx        # Add ticket functionality for Vendor
│   │   │   ├── MyAddedTicket.jsx    # Vendor to review/update added tickets
│   │   │   ├── RequestedBookings.jsx   # Vendor to accept/reject booking request
│   │   │   ├── Transactions.jsx        # Transaction history for users
│   │   │   ├── VendorRevenue.jsx       # Revenue calculation for vendor
│   │   │   ├── UserDashboard.jsx    # User dashboard layout
│   │   │   ├── UserProfile.jsx      # User Profile
│   │   │   ├── VendorDashboard.jsx  # Vendor overview
│   │   │   ├── AdminDashboard.jsx   # Admin overview
│   │   │   ├── MyBookings.jsx       # User bookings list (paid + pending)
│   │   │   └── PaymentPage.jsx      # Loads Stripe Elements and PaymentForm
│   │   │
│   │   ├── Auth/
│   │   │   ├── Login.jsx            # Login form + Firebase sign-in
│   │   │   └── Register.jsx         # Registration + Firebase createUser
│   │   │
│   │   └── NotFound.jsx             # 404 page
│   │
│   ├── hooks/
│   │   ├── useAuth.js               # Returns auth user from context
│   │   └── useAxiosSecure.js        # Secure axios with JWT for payments│
│   ├── utils/
│   │   ├── axiosPublic.js           # Axios for public API calls
│   │   └── axiosSecure.js           # Axios with token for protected APIs
│   │
│   ├── router/
│   │   └── Routes.jsx               # All app routes + protected routes
│   │
│   ├── context/
│   │   └── AuthProvider.jsx         # Firebase auth context provider
│   │   └── ThemeContext.jsx         # Theme provider
│   │
│   ├── firebase/
│   │   └── firebase.config.js       # Firebase setup (auth initialization)
│   │
│   ├── payment/
│   │   └── stripe.js                # Loads Stripe public key (loadStripe)
│   │
│
├── .env                             # Firebase keys + Stripe PK
└── .gitignore                       # Ignore node_modules, .env, build files
└── tailwind.config.js
└──favicon.svg
```

---

## 🛠️ Technology Stack

### Frontend

* **React 19** (Vite)
* **Tailwind CSS v4**
* **Framer Motion** (Animations)
* **Recharts** (Charts & Analytics)
* **Stripe.js** (Payments)
* **React Router v7**

### Backend (Connected API)

* Node.js + Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Additional Tools

* **Firebase** — Authentication
* **ImgBB** — Image hosting
* **Netlify** — Client deployment

---

## 📦 Dependencies

```json
{
    "@heroicons/react": "^2.2.0",
    "@stripe/react-stripe-js": "^5.4.1",
    "@stripe/stripe-js": "^8.5.3",
    "@tailwindcss/vite": "^4.1.18",
    "axios": "^1.13.2",
    "firebase": "^12.6.0",
    "framer-motion": "^12.23.26",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.10.1",
    "recharts": "^3.6.0"
}
```

---

## 🏃‍♂️ Run Client Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/mdtajrianrashid/MERNickets-CLIENT-FullStack-Ticket-Booking-Platform.git
cd MERNickets-CLIENT-FullStack-Ticket-Booking-Platform
npm install
```

### 2️⃣ Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
VITE_stripe_publishable_key=YOUR_STRIPE_PUBLIC_KEY
VITE_API_URL=Server_API_URL
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

The app will run at:
👉 [http://localhost:5173](http://localhost:5173)

---

## 🚀 Deployment

* **Client:** Deployed on **Netlify**
* **Server:** Deployed on **Vercel**
* Environment variables securely configured on hosting platforms

---

## 👨‍💻 Author

**Takian Rashid**
Frontend & Full‑Stack Developer

* GitHub: [https://github.com/mdtakianrashid](https://github.com/mdtakianrashid)
* LinkedIn: [https://www.linkedin.com/in/mdtakianrashid/](https://www.linkedin.com/in/mdtakianrashid/)

---

⭐ If you like this project, don’t forget to give it a star!
