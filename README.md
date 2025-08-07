# CharityConnect 🤝

A modern web platform connecting donors with NGOs and charitable organizations to facilitate seamless donations and support for those in need.

## 📋 Features

- **User Registration & Authentication**: Secure user accounts with JWT-based authentication
- **Multi-User Dashboard**: Separate interfaces for regular users, administrators, and NGOs
- **Donation Management**: Easy donation process with multiple payment options
- **Drop-off Coordination**: Physical donation drop-off scheduling and management
- **NGO Directory**: Browse and connect with registered NGOs
- **Admin Panel**: Administrative oversight and management tools
- **Email Notifications**: Automated email updates for donations and activities
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service integration
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DhruvKatheria/TechRush.git
   cd charity-connect
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/charity-connect
   JWT_SECRET=your_jwt_secret_key
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system or configure MongoDB Atlas connection.

6. **Run the application**
   
   **Backend server (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend development server (Terminal 2):**
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📁 Project Structure

```
charity-connect/
├── backend/                 # Backend API server
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── .env                 # Environment variables
│   ├── server.js            # Server entry point
│   └── package.json         # Backend dependencies
├── src/                     # Frontend source code
│   ├── components/          # React components
│   ├── assets/              # Static assets
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── public/                  # Public static files
├── index.html               # HTML template
├── package.json             # Frontend dependencies
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.cjs       # PostCSS configuration
└── vite.config.js           # Vite configuration
```

## 🎯 Key Components

### Frontend Components
- **HomePage**: Landing page with hero section
- **UserDashboard**: User account management and donation history
- **AdminDashboard**: Administrative controls and oversight
- **NGODashboard**: NGO-specific management interface
- **DonatePage**: Donation form and payment processing
- **DropOffPage**: Schedule physical donations
- **NGOs**: Browse registered organizations

### Backend Models
- **User**: User account information
- **NGO**: NGO registration and details
- **DonationRequest**: Donation tracking and management

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Code Style
- ESLint configuration for React best practices
- Tailwind CSS for consistent styling
- Component-based architecture

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Priyanshu Rathi** - [@Oyepiyu](https://github.com/Oyepiyu)
- **Dhairya Jotwani** - [@DJ-007-WEB](https://github.com/DJ-007-WEB)
- **Shrawani Kotawar** - [@shrawani268](https://github.com/shrawani268)
- **Dhruv Katheria** - [@DhruvKatheria](https://github.com/DhruvKatheria)

## 🙏 Acknowledgments

- Thanks to all contributors and the open-source community
- Icons provided by Lucide React
- Styling powered by Tailwind CSS

## 📞 Support

If you have any questions or need support, please open an issue on GitHub or contact the maintainers.

---

Made with ❤️ for connecting hearts and helping hands.
