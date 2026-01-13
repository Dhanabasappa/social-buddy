# Social Buddy - Social Media App

A modern Instagram-like social media application built with React and Vite.This project showcases clean architecture, reusable components, and real-time social features such as stories, posts, messaging, notifications, and theme management.

## 🚀 Features 
- 📱 Social feed with stories and posts
- 🎬 Reels section with video support
- 💬 Messaging system with chat rooms
- 🔔 Notifications and user interactions
- 👤 User profiles with highlights and tabs
- 🎨 Dark / Light theme toggle

## 🛠 Tech Stack
- React 
- JavaScript (ES6+)
- Context API
- HTML5 & CSS3
- React Router v6


## 📂 Project Structure
```
src/

├── components/           # Reusable UI components

├── pages/                # Application pages

├── context/              # Global state management

├── App.jsx               # Main app component

├── main.jsx              # React DOM entry point

└── index.css             # Global styles
```

## ⚙️ Setup & Installation

### Clone the repository:
```bash
git clone https://github.com/Dhanabasappa/social-buddy.git
cd social-buddy
```

### Install dependencies:
```bash
npm install
```

### Run the application:
```bash
npm run dev
```


## 🎨 Theme Management
Social Buddy includes a built-in dark/light theme toggle accessible from the settings icon on your profile page.Theme preferences are managed globally using React Context API and persist throughout the application.

- **Light Mode**: Clean, bright interface with rusty orange gradient background
- **Dark Mode**: Dark interface (#1a1a1a) with proper contrast for readability


## 📱 Pages & Features

### Home Page
- Story carousel with user stories
- Social feed displaying posts from followed accounts
- Like, save, and share functionality
- 3-column responsive grid layout

### Reels Section
- Video reel grid with 4 columns (responsive)
- Sound toggle functionality per video
- Like counter with increment/decrement
- Comments popup
- Share functionality with send/sent toggle
- User search integration

### Notifications (Messages)
- Message inbox with active conversations
- User circles carousel for quick access
- Reorderable conversation list
- Chat room with keyboard support (Enter to send)
- Tab navigation (Inbox, Unread, Requests)

### Profile Page
- Personal profile with avatar and stats
- Highlights carousel
- Content tabs (Posts, Reels, Remix, Tagged)
- Settings dropdown with theme toggle
- User search integration for viewing other profiles
- Follow/Message buttons for searched profiles

### Search Functionality
- Search users by name
- View searched user profiles
- Send messages to searched users
- Follow/Unfollow functionality


## 📸 Screenshots

### Home Page 
![Home] (screenshots/home.png)(screenshots/dark.png)

### Reels Section
![Reels] (screenshots/reels.png),(screenshots/searched_user.png),(screenshots/searcheduser_chart.png)

### Profile Page
![Profile] (screenshots/profile.png),(screenshots/user_posts.png),(screenshots/user_reels.png),
(screenshots/user_remix.png)

### Notifications
![Notifications] (screenshts/notifications.png),(screenshots/usernotifications_chart.png)

### Add post
![AddPost] (screenshots/add_post.png)



