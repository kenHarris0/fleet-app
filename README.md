# Fleet App

A real-time communication platform built using MERN, Socket.IO, Tailwind CSS, GSAP, and Cloudinary.  
Supports personal chats, group chats, friend requests, file sharing, personality-based grouping, and category-based group discovery.

---

## Features

### Real-Time Messaging (Socket.IO)
- One-to-one chat
- Group chat
- Message statuses: Sent, Delivered, Seen
- Typing indicators
- Online/Offline status tracking
- Realtime updates for friend requests and group actions

### Category-Based Group Discovery
- Users can explore groups based on categories such as:
  - Fitness
  - Tech
  - Education
  - Gaming
  - Movies
- Users can join groups that match their interests.

### Personality-Based Grouping (MBTI Test)
- Built-in Myers–Briggs Type Indicator questionnaire
- System categorizes users into one of the 16 MBTI personality types
- Groups can be recommended or joined based on personality
- Personality information shown in profile section

### Profile Section and Customization
- Update profile picture
- Update username and bio
- View personality type
- Customize interests and categories
- Manage friend visibility and settings

### Friend System
- Send friend requests in real time
- Receive accept/reject notifications instantly
- Only friends can start private chats
- Notification system powered by Socket.IO

### Group Features
- Create new groups
- Add members (Admin-only)
- Remove members (Admin-only)
- View all group members
- Leave group
- View group description
- Realtime group updates for all members

### Group File Manager
- View all files shared inside the group
- Supports:
  - Images
  - PDFs
  - Documents
- All uploads stored using Cloudinary

### Message Types
- Text messages
- Images
- Documents
- Cloudinary-backed media upload and preview

### Frontend UI
- Built using React.js and Tailwind CSS
- GSAP animations for transitions and interactions
- Responsive interface for mobile and desktop

---

## Tech Stack

### Frontend
- React.js
- Context API
- Tailwind CSS
- GSAP
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.IO
- Cloudinary

---

## Project Architecture

