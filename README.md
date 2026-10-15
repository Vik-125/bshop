# BShop – Barbershop Booking Application

BShop is a full-stack barbershop booking application designed to simplify the process of discovering barbershops, exploring services, and managing appointments. It allows customers to book appointments with their preferred barbers while enabling shop owners to manage their shops, services, and bookings.

The project is built using **Flutter, Node.js, Express.js, and MongoDB**, with JWT-based authentication and Cloudinary for image storage.

## 🚀 Features

### 👤 Customer Features
- User registration and login.
- Secure authentication using JWT and password hashing with bcrypt.
- View and manage profile information.
- Discover barbershops and barbers.
- View available services and their prices.
- Book appointments with preferred barbers.
- Book multiple services in a single appointment.
- Cancel bookings and view booking history.
- Save favorite barbers.
- View completed booking history.
- Add reviews for completed appointments.
- Upload and manage photos associated with service history.

### 💈 Shop Owner Features
- Register and authenticate as a shop owner.
- Create and manage barbershop profiles.
- Manage barbers associated with shops.
- Add and manage services and prices.
- Manage customer bookings.
- Mark confirmed appointments as completed.
- Maintain shop and service information.

### 🔐 Security and Backend
- RESTful API architecture.
- JWT-based authentication and protected routes.
- Password hashing using bcrypt.
- MongoDB database integration using Mongoose.
- Image uploads using Multer and Cloudinary.
- Booking validation and appointment status management.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Flutter | Cross-platform frontend |
| Dart | Frontend programming language |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| bcrypt | Password hashing |
| Multer | File upload handling |
| Cloudinary | Image storage |
| Postman | API testing |
| Git & GitHub | Version control |

## 🏗️ Project Architecture

BShop/
├── bshop_app/          # Flutter frontend
│   └── lib/             # Dart application code
│
└── backend/       # Node.js backend
    ├── app.js            # Express application setup
    ├── routes/           # API routes
    ├── controllers/      # Request handling logic
    ├── models/           # Mongoose schemas
    ├── middleware/       # Authentication and validation
    ├── config/           # Configuration
    ├── package.json
    └── .env              # Environment variables (not committed)

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- [Flutter SDK](https://docs.flutter.dev/get-started/install)
- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance
- [Cloudinary](https://cloudinary.com/) account
- Git

### 1. Clone the Repository

```bash
git clone <https://github.com/Vik-125/bshop>
cd BShop
```


Replace the placeholder with your actual GitHub repository URL.

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the backend root directory and configure the required environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Ensure the variable names match those referenced in your backend code.

### 3. Start the Backend

```bash
npm run dev
```

The backend will run on the configured port, for example:

```text
http://localhost:5000
```

### 4. Configure the Flutter App

Open another terminal and navigate to the Flutter project:

```bash
cd bshop_app
flutter pub get
```

Run the application:

```bash
flutter run
```

**Important:** When testing on a physical device or Android emulator, configure the API base URL to point to the backend's reachable address. `localhost` on a physical phone refers to the phone itself, not your development computer.

## 🔄 Application Workflow

1. Customers register and log in.
2. Customers browse barbershops, barbers, and available services.
3. Customers select a barber, choose services, and book an appointment.
4. Shop owners manage appointments and confirm their completion.
5. Completed appointments can contribute to a customer's service history.
6. Customers can review completed services and maintain their personal history.

## 🧪 API Testing

Backend APIs can be tested using [Postman](https://www.postman.com/).

Test the following areas:

- Authentication and profile management.
- Shop and barber management.
- Service creation and retrieval.
- Appointment booking and cancellation.
- Appointment availability and completion.
- Reviews, favorites, and service history.
- Image upload and deletion.

Use the actual API routes configured in the backend when creating Postman requests.

## 🔒 Environment Variables and Security

- Never commit `.env` files or API secrets to GitHub.
- Store JWT secrets and Cloudinary credentials securely.
- Use password hashing rather than storing plain-text passwords.
- Validate request data and enforce authorization on protected operations.
- Configure production environment variables separately from local development.

## 🎯 Project Goals

BShop aims to provide a convenient digital booking experience for customers and an efficient appointment management system for barbershop owners. It also serves as a practical full-stack development project demonstrating mobile development, REST API design, database modeling, authentication, and cloud-based media storage.

## 🚧 Future Enhancements

- Real-time appointment notifications.
- More advanced availability and scheduling management.
- Online payments and booking confirmations.
- AI-powered hairstyle recommendations.
- Improved search, filtering, and barber discovery.
- Production deployment and automated testing.

## 👨‍💻 Author

**Ashvik Jha**

B.Tech Computer Science and Engineering  
GL Bajaj Institute of Technology & Management

---

*BShop — Find your barber. Book your style.*