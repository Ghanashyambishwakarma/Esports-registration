# Quick Start Guide - Esports Registration System

Get your tournament registration system running in 5 minutes!

## ⚡ Quick Setup (3 Steps)

### Step 1: Install Dependencies (2 minutes)

```bash
cd esports-registration
npm install
```

Wait for all packages to install...

### Step 2: Configure Firebase (2 minutes)

1. Go to https://console.firebase.google.com/
2. Create a new project
3. Enable Firestore Database (Start in test mode)
4. Copy your Firebase config
5. Paste it in `src/config/firebase.js`

### Step 3: Run the Application (1 minute)

```bash
npm start
```

That's it! Your app is now running at http://localhost:3000

## 🎯 What You Get

✅ **Registration Form** - Players can register for tournaments
✅ **Admin Dashboard** - Manage all registrations in one place
✅ **Real-time Updates** - Changes appear instantly
✅ **Export to CSV** - Download registration data
✅ **Mobile Responsive** - Works on all devices

## 📱 How to Use

### For Players:
1. Fill out the registration form
2. Click "Register Now"
3. Get confirmation notification

### For Admins:
1. Scroll down to Admin Dashboard
2. View all registrations
3. Filter by status or search by name
4. Edit or delete entries as needed
5. Export data to CSV

## 🔧 Customization

### Change Colors
Edit `src/styles/index.css` - Look for CSS variables at the top

### Add More Games
Edit `src/components/RegistrationForm.js` - Find the `games` array

### Add More Regions
Edit `src/components/RegistrationForm.js` - Find the `regions` array

## 🚀 Deploy to Production

### Firebase Hosting (Recommended)
```bash
npm install -g firebase-tools
firebase login
firebase init
npm run build
firebase deploy
```

### Vercel (Easy Alternative)
```bash
npm install -g vercel
vercel
```

### Netlify (Another Option)
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build
```

## 📚 Need More Help?

- **Full Documentation**: See `README.md`
- **Firebase Setup**: See `FIREBASE_SETUP.md`
- **Common Issues**: Check the Troubleshooting section in README

## 🎮 Features Overview

| Feature | Description |
|---------|-------------|
| Registration Form | Collect player/team details with validation |
| Admin Dashboard | View and manage all registrations |
| Search & Filter | Find registrations quickly |
| Edit Mode | Update registration details inline |
| Delete | Remove unwanted registrations |
| Export CSV | Download data for offline use |
| Real-time Sync | Updates appear instantly via Firebase |
| Responsive Design | Works on desktop, tablet, and mobile |
| Toast Notifications | User-friendly feedback messages |

## 🔐 Important Security Note

The default Firebase rules allow anyone to read/write data. This is fine for development, but for production:

1. Enable Firebase Authentication
2. Update Firestore security rules
3. Protect admin features with authentication

See `FIREBASE_SETUP.md` for details.

## 💡 Pro Tips

1. **Test mode expires in 30 days** - Update security rules before then
2. **Free tier limits** - 50K reads, 20K writes per day (plenty for most tournaments)
3. **Backup your data** - Export to CSV regularly
4. **Use environment variables** - Never commit Firebase credentials to Git

## 🎯 Next Steps

1. ✅ Get it running locally
2. ✅ Customize colors and branding
3. ✅ Add your tournament games
4. ✅ Test the registration flow
5. ✅ Deploy to production
6. ✅ Share with your community!

---

**Happy Tournament Organizing! 🏆**

Questions? Check the full README.md or FIREBASE_SETUP.md
