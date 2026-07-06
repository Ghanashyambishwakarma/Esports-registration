# Esports Tournament Registration System

A modern, responsive web application for managing esports tournament registrations with real-time Firebase integration.

## 🎮 Features

- **Player/Team Registration Form**
  - Collect essential player and team information
  - Support for multiple popular games (BGMI, Valorant, CS2, Free Fire, etc.)
  - Real-time form validation
  - Responsive design for all devices

- **Admin Dashboard**
  - View all registrations in a clean table format
  - Filter by status (All, Pending, Approved, Rejected)
  - Search functionality by player name, team, game, or email
  - Edit registration details inline
  - Delete unwanted registrations
  - Export data to CSV format
  - Real-time statistics display

- **Firebase Integration**
  - Cloud Firestore for data storage
  - Real-time data synchronization
  - No storage bucket required (free tier compatible)
  - Secure and scalable backend

- **Modern UI/UX**
  - Gaming-inspired neon aesthetics
  - Smooth animations and transitions
  - Toast notifications for user feedback
  - Mobile-responsive design

## 🚀 Technologies Used

- **Frontend**: React 18
- **Backend**: Firebase (Firestore Database)
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Orbitron, Rajdhani, Bebas Neue (Google Fonts)
- **Notifications**: React Toastify
- **Hosting**: Firebase Hosting / Vercel / Netlify compatible

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn package manager
- A Firebase account (free tier works perfectly)

## 🔧 Installation & Setup

### Step 1: Clone or Extract the Project

If you received a ZIP file, extract it to your desired location.

### Step 2: Install Dependencies

```bash
cd esports-registration
npm install
```

### Step 3: Firebase Setup

#### 3.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard (you can disable Google Analytics if you don't need it)

#### 3.2 Enable Firestore Database

1. In your Firebase project, go to "Build" → "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (you can update security rules later)
4. Select your preferred region
5. Click "Enable"

#### 3.3 Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (</>) to add a web app
4. Register your app with a nickname (e.g., "Esports Registration")
5. Copy the `firebaseConfig` object

#### 3.4 Update Firebase Configuration

Open `src/config/firebase.js` and replace the placeholder values with your actual Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 4: Run the Development Server

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## 🏗️ Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🚀 Deployment

### Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init
```
- Select "Hosting"
- Choose your Firebase project
- Set `build` as your public directory
- Configure as a single-page app: Yes
- Don't overwrite index.html: No

4. Build and deploy:
```bash
npm run build
firebase deploy
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=build
```

## 📁 Project Structure

```
esports-registration/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AdminDashboard.js
│   │   ├── AdminDashboard.css
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── RegistrationForm.js
│   │   └── RegistrationForm.css
│   ├── config/
│   │   └── firebase.js
│   ├── styles/
│   │   └── index.css
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Firebase Security Rules

For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations/{document} {
      // Allow anyone to create registrations
      allow create: if true;
      
      // Allow read/write access to authenticated users (add authentication if needed)
      allow read, update, delete: if true; // Change this for production!
    }
  }
}
```

**Important**: The above rules allow anyone to read/write. For production:
- Implement Firebase Authentication
- Restrict admin operations to authenticated admin users
- Add proper validation rules

## 🎨 Customization

### Colors
Edit CSS variables in `src/styles/index.css`:
```css
:root {
  --primary-neon: #00ff88;
  --secondary-neon: #ff0080;
  --accent-cyan: #00d4ff;
  --accent-purple: #9d00ff;
  /* ... */
}
```

### Games List
Edit the `games` array in `src/components/RegistrationForm.js`

### Regions
Edit the `regions` array in `src/components/RegistrationForm.js`

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify your Firebase config credentials
- Check Firebase Console for any billing or quota issues
- Ensure Firestore is enabled in your project

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Port Already in Use
```bash
PORT=3001 npm start
```

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For issues or questions:
1. Check Firebase Console for any errors
2. Verify all dependencies are installed correctly
3. Ensure Firebase configuration is correct

## 🎯 Future Enhancements

- User authentication for admin panel
- Email notifications to participants
- Payment integration for tournament fees
- Match scheduling system
- Bracket generation
- Live tournament updates

---

**Made with ⚡ for the Esports Community**
