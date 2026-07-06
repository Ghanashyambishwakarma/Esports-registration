# Firebase Setup Guide

This guide will walk you through setting up Firebase for the Esports Registration System.

## Step-by-Step Firebase Configuration

### 1. Create a Firebase Account

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account
3. If you're new, you'll see a welcome screen

### 2. Create a New Firebase Project

1. Click "Add project" (or "Create a project")
2. Enter a project name (e.g., "Esports Registration")
3. (Optional) You can disable Google Analytics if you don't need it
4. Click "Create project"
5. Wait for the project to be created (takes about 30 seconds)
6. Click "Continue" when ready

### 3. Enable Firestore Database

1. In the left sidebar, click "Build" → "Firestore Database"
2. Click "Create database"
3. Select "Start in test mode" (for development)
   - **Important**: Test mode allows all reads/writes for 30 days
   - You'll need to update security rules before going to production
4. Choose a Firestore location (select the one closest to your users)
   - Example: `us-central` for US, `asia-south1` for Asia, etc.
5. Click "Enable"
6. Wait for Firestore to be created

### 4. Get Your Firebase Configuration

1. Click the gear icon (⚙️) next to "Project Overview" in the left sidebar
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>` (if you don't see any apps yet)
5. Register your app:
   - App nickname: "Esports Registration Web"
   - Firebase Hosting: You can skip this for now
   - Click "Register app"
6. You'll see a code snippet with `firebaseConfig` object
7. Copy the entire `firebaseConfig` object

It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### 5. Update Your Project Configuration

1. Open your project folder
2. Navigate to `src/config/firebase.js`
3. Replace the placeholder values with your actual Firebase config:

**BEFORE (Placeholder):**
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

**AFTER (Your actual config):**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

4. Save the file

### 6. Test Your Connection

1. Start your development server:
```bash
npm start
```

2. Open http://localhost:3000 in your browser
3. Try submitting a test registration
4. Go back to Firebase Console → Firestore Database
5. You should see a new collection called "registrations" with your test data

### 7. Firestore Security Rules (Important for Production!)

The default test mode rules will expire after 30 days. For production, update your rules:

1. In Firebase Console, go to Firestore Database
2. Click the "Rules" tab
3. Update the rules to something more secure

**Example Security Rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registrations/{document} {
      // Allow anyone to create registrations (public form)
      allow create: if true;
      
      // Only authenticated users can read, update, or delete
      // (You'll need to add Firebase Authentication for this)
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

**For now (development), you can use:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Warning**: The above rule allows anyone to read/write. Only use during development!

### 8. Optional: Set Up Firebase Hosting

If you want to host your website on Firebase:

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
   - Select "Hosting" using spacebar, then press Enter
   - Select your Firebase project
   - Public directory: `build`
   - Single-page app: `Yes`
   - Automatic builds: `No`
   - Don't overwrite index.html

4. Build your React app:
```bash
npm run build
```

5. Deploy to Firebase:
```bash
firebase deploy
```

6. Your site will be live at: `https://your-project.web.app`

## Firestore Database Structure

Your registrations will be stored with this structure:

```
registrations (collection)
├── document_id_1
│   ├── playerName: "John Doe"
│   ├── teamName: "Alpha Squad"
│   ├── gameTitle: "Valorant"
│   ├── inGameId: "JohnD#1234"
│   ├── email: "john@example.com"
│   ├── phone: "+1234567890"
│   ├── region: "North America"
│   ├── teamSize: 5
│   ├── status: "pending"
│   └── createdAt: timestamp
├── document_id_2
│   └── ...
```

## Troubleshooting

### Error: "Firebase not initialized"
- Make sure you've updated `src/config/firebase.js` with your actual credentials

### Error: "Permission denied"
- Check your Firestore security rules
- Make sure you're in test mode for development

### Error: "Quota exceeded"
- Firebase free tier has limits (50K reads/day, 20K writes/day)
- Check Firebase Console → Usage tab
- Upgrade to Blaze (pay-as-you-go) plan if needed

### Can't see data in Firestore
- Make sure Firestore is enabled
- Check browser console for errors
- Verify your Firebase config is correct

## Free Tier Limits

Firebase Spark (Free) Plan includes:
- ✅ 50,000 document reads/day
- ✅ 20,000 document writes/day
- ✅ 20,000 document deletes/day
- ✅ 1 GB stored data
- ✅ 10 GB/month network egress

This is more than enough for small to medium tournaments!

## Need Help?

- Firebase Documentation: https://firebase.google.com/docs
- Firestore Guide: https://firebase.google.com/docs/firestore
- Firebase Console: https://console.firebase.google.com/

---

**You're all set! 🎮 Start building your esports community!**
