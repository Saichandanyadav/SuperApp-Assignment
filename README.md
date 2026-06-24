# Super App

A modern entertainment dashboard built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Zustand**. The application provides a personalized user experience through category-based onboarding, live weather updates, rotating news feeds, movie discovery, notes persistence, and a countdown timer.

## 🚀 Live Demo

Add your deployed URL here:

```bash
https://your-app.vercel.app
```

## 📂 GitHub Repository

Add your repository URL here:

```bash
https://github.com/your-username/super-app
```

---

## 📖 Project Overview

Super App is a multi-feature entertainment dashboard developed as part of a Frontend Developer assignment.

The application allows users to:

* Register and personalize their profile
* Select entertainment preferences
* View live weather information
* Read automatically rotating news updates
* Save personal notes
* Use a countdown timer
* Discover movies based on selected interests
* View detailed movie information in an interactive modal

The project focuses on clean architecture, state management, performance optimization, reusable components, and responsive UI implementation.

---

## ✨ Features

### Authentication & Registration

* User registration form
* Form validation using React Hook Form and Zod
* Error handling and validation messages
* User information persistence

### Category Onboarding

* Multi-category selection
* Minimum 3 categories required
* Interactive category cards
* Persistent user preferences

### Super Dashboard

#### User Profile Widget

* Name
* Username
* Email
* Mobile Number
* Selected Categories

#### Weather Widget

* Live weather information
* Temperature
* Humidity
* Wind Speed
* Location Details

#### Notes Widget

* Auto-save functionality
* Persistent storage using localStorage
* Real-time updates

#### Timer Widget

* Start
* Pause
* Resume
* Reset
* Custom countdown support

#### News Feed Widget

* Latest news integration
* Auto-rotating articles every 2 seconds
* Dynamic content updates

### Entertainment Discovery

* Category-based movie recommendations
* Movie listing grid
* Hover animations
* Responsive card design

### Movie Details Modal

* Poster
* Title
* Genre
* Plot
* Cast
* Runtime
* Ratings
* Release Information

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15
* React 19
* TypeScript

### Styling

* Tailwind CSS

### State Management

* Zustand

### Form Handling

* React Hook Form
* Zod

### APIs

* OpenWeatherMap API
* News API
* OMDB API

### Storage

* Browser LocalStorage

### Deployment

* Vercel

---

## 📁 Folder Structure

```bash
src/
│
├── app/
│   ├── register/
│   ├── categories/
│   ├── dashboard/
│   └── movies/
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── widgets/
│   └── movies/
│
├── features/
│   ├── auth/
│   ├── categories/
│   ├── dashboard/
│   └── movies/
│
├── store/
│   ├── userStore.ts
│   ├── categoryStore.ts
│   ├── notesStore.ts
│   └── timerStore.ts
│
├── hooks/
├── services/
├── types/
├── utils/
├── constants/
├── providers/
└── lib/
```

---

## 🔄 Application Flow

### Step 1

User Registration

↓

### Step 2

Category Selection

(Minimum 3 Categories)

↓

### Step 3

Dashboard

* Profile
* Weather
* Notes
* Timer
* News

↓

### Step 4

Movie Discovery

↓

### Step 5

Movie Details Modal

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory.

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key

NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key

NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/super-app.git
```

Navigate to project directory:

```bash
cd super-app
```

Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

---

## ▶️ Running Locally

Start the development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Run production build:

```bash
npm start
```

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

* Mobile Devices
* Tablets
* Laptops
* Desktop Screens

---

## 🚀 Performance Optimizations

Implemented:

* Next.js Image Optimization
* Dynamic Imports
* Lazy Loading
* Zustand State Persistence
* Component Memoization
* Efficient Rendering
* Code Splitting

Target Lighthouse Score:

```bash
90+
```

---

## 🔒 Validation & Error Handling

Implemented:

* Form Validation
* API Error Handling
* Loading States
* Empty States
* Network Failure Handling
* User Feedback Messages

---

## 🎨 UI & UX Highlights

* Pixel-perfect Figma implementation
* Smooth hover animations
* Interactive cards
* Responsive layouts
* Modal transitions
* Accessible form controls
* Clean visual hierarchy

---

## 📸 Screenshots

Add screenshots of:

* Registration Page
* Category Selection Page
* Dashboard
* Weather Widget
* News Widget
* Movie Discovery Page
* Movie Details Modal

---

## 🌟 Future Improvements

* User Authentication with Backend
* Dark Mode Support
* Bookmark Movies
* Personalized Recommendations
* Multi-language Support
* PWA Support
* Advanced Search & Filters

---

## 👨‍💻 Author

Sai Chandan Gundaboina

Frontend Developer

* React.js
* Next.js
* TypeScript
* Node.js

GitHub: https://github.com/your-username

LinkedIn: https://linkedin.com/in/your-profile

---

## 📄 License

This project was created as part of a Frontend Developer technical assessment and is intended for educational and evaluation purposes.
