# FireShop - Project Structure

## 📁 Directory Organization

```
fireshop/                          # Root workspace
├── frontend/                       # React + Vite frontend
│   ├── src/                        # React source code
│   │   ├── components/             # Reusable React components
│   │   │   ├── Navbar.jsx         # Navigation bar with debug logs
│   │   │   └── products/
│   │   ├── context/                # React Context (Auth, Cart)
│   │   ├── pages/                  # Page components
│   │   ├── routes/                 # Route guards (ProtectedRoute)
│   │   ├── services/               # Business logic (auth, cart, products, orders)
│   │   ├── firebase/               # Firebase config
│   │   ├── App.jsx                # Main app with routing
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Styles
│   ├── index.html                 # HTML entry point
│   ├── package.json               # Frontend dependencies (Vite, React, TailwindCSS)
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS config
│   └── postcss.config.js          # PostCSS config
│
├── backend/                        # Express server + Firebase admin
│   ├── package.json               # Backend dependencies (Express, Firebase Admin)
│   ├── firestore.rules            # Firestore security rules
│   └── [server files to be created]
│
└── package.json                   # Workspace root (script shortcuts)
```

## 🔧 What Was Done (Step by Step)

### Step 1: Removed Invalid Files
- ✅ Deleted `{src/` - Invalid folder name (was causing issues)
- ✅ Deleted `dist/` - Build output folder (auto-generated, not needed in version control)

### Step 2-3: Created Backend Structure
- ✅ Created `/backend/` folder
- ✅ Moved `package.json` (Express config) to `/backend/`
- ✅ Moved `package-lock.json` to `/backend/`
- ✅ Moved `firestore.rules` to `/backend/` (Firebase config file)

### Step 4: Reorganized Frontend
- ✅ Renamed `/fireshop/fireshop/` → `/frontend/`
- ✅ Cleaned up frontend folder (removed firestore.rules)

### Step 5-6: Cleaned Root Directory
- ✅ Removed duplicate `package.json` from root
- ✅ Removed duplicate `package-lock.json` from root
- ✅ Kept only monorepo structure

### Step 7: Created Workspace Config
- ✅ Created new root `package.json` with workspace scripts
  - `npm run dev:frontend` - Run Vite dev server
  - `npm run dev:backend` - Run Express server
  - `npm run build:frontend` - Build React app
  - `npm run build:backend` - Build backend

---

## 🚀 How to Run

### Frontend Only
```bash
cd frontend
npm run dev           # Start Vite dev server on http://localhost:5173
npm run build         # Build for production
```

### Backend Only
```bash
cd backend
npm install
npm run dev           # Start Express server (needs server.js to be created)
```

### From Root (Recommended)
```bash
npm run install:all   # Install all dependencies
npm run dev:frontend  # Start frontend dev server
npm run dev:backend   # Start backend server (in another terminal)
```

---

## 📝 Files Removed (Unused/Duplicate)

| File | Reason |
|------|--------|
| `/fireshop/fireshop/{src/` | Invalid folder name with syntax error |
| `/fireshop/fireshop/dist/` | Build output (auto-generated, not tracked) |
| Root `/package.json` (old) | Moved to `/backend/package.json` |
| Root `/package-lock.json` (old) | Moved to `/backend/package-lock.json` |

---

## ✅ Current Status

- **Frontend**: Ready to run with `npm run dev` (includes debug logging in Navbar)
- **Backend**: Structure ready, needs `server.js` to be created
- **Database**: firestore.rules in `/backend/` ready for Firestore deployment
- **Debug Logging**: Added to `src/components/Navbar.jsx` for auth/cart state tracking

---

## 🔐 Next Steps

1. Create `/backend/server.js` for Express API
2. Connect Firebase Admin SDK to backend
3. Update Firestore security rules in `/backend/firestore.rules`
4. Test frontend-backend integration
5. Add environment variables (`.env` files for both frontend and backend)
