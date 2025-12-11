
# Fleet App

A real-time communication platform built using MERN, Socket.IO, Tailwind CSS, GSAP, and Cloudinary.

---
<img width="1519" height="894" alt="image" src="https://github.com/user-attachments/assets/cbb0fe72-e62a-4a18-af7b-a353e9160bd7" />
<img width="1518" height="892" alt="image" src="https://github.com/user-attachments/assets/19c52807-3f75-4cd1-9c51-3b936957fa44" />
<img width="1521" height="894" alt="image" src="https://github.com/user-attachments/assets/52862ea2-c95f-4cac-a9ab-8d85eefe207e" />
<img width="1465" height="873" alt="image" src="https://github.com/user-attachments/assets/53f67db4-ffbd-4c45-b36d-4fe46de052ce" />

<img width="1521" height="883" alt="image" src="https://github.com/user-attachments/assets/7a67f58d-d1dc-495d-834f-b87ba7e2460e" />

<img width="1507" height="889" alt="image" src="https://github.com/user-attachments/assets/65ae31eb-523e-4491-a01f-586dff1c20ed" />
<img width="1493" height="803" alt="image" src="https://github.com/user-attachments/assets/67d8d0df-6634-45f1-9486-c10ed76eaf4b" />
<img width="1483" height="895" alt="image" src="https://github.com/user-attachments/assets/73cb956a-36fb-4b95-9462-b2883d1d53f1" />







### Features

---

* Real-time chat system
* One-to-one messaging
* Group chat support
* MBTI personality test
* Category-based group discovery
* Cloudinary media uploads
* Friend request system
* Group file viewer
* Profile customization
* GSAP animated UI
* Fully responsive layout

---

### Real-Time Messaging

---

* Powered by Socket.IO
* One-to-one chat
* Group chat rooms
* Online/offline presence
* realtime friend request system

---

### MBTI Personality Test

---

* Interactive MBTI-style questionnaire
* Calculates 4 personality dimensions:

  * Introversion (I) / Extroversion (E)
  * Sensing (S) / Intuition (N)
  * Thinking (T) / Feeling (F)
  * Judging (J) / Perceiving (P)
* Produces 4-letter personality type
* Used for group recommendations
* Personality type shown on user profile

---

### Profile Section

---

* Update profile picture
* Edit username & bio
* Display personality type
* Set categories/interests
* View and manage friends
* Responsive UI

---

### Friend System

---

* Send friend requests
* Receive friend requests in real-time
* Accept / Reject friends
* Only friends can chat privately
* Socket.IO-based live notifications

---

### Category-Based Groups

---

* Groups categorized by interests
* Browse groups by category
* Join groups that match interests
* Personality-based recommendations

---

### Group Management

---

* Create new groups
* Add members (Admin only)
* Remove members (Admin only)
* Leave group
* View group description
* View all members

---

### Group File Manager

---

* Stores all media shared in groups
* View images
* View documents / PDFs
* All files uploaded through Cloudinary

---

### Message Types

---

* Text messages
* Images
* PDFs / Documents
* Cloudinary file uploads
* Media preview support

---

### UI and Animations

---

* Built with Tailwind CSS
* GSAP animations for transitions
* Smooth interactions
* Fully responsive design

---

### Tech Stack

---

* MERN Stack
* React (Frontend)
* Tailwind CSS
* GSAP
* Node.js + Express
* MongoDB (Mongoose)
* Socket.IO
* Cloudinary

---

### Project Architecture

---

* `frontend/` React + Tailwind + GSAP
* `backend/` Node.js + Express
* `socket/` handles all real-time events
* `models/` for MongoDB schemas
* `controllers/` for API logic

---

### Installation

---

* Clone repository
* Install dependencies
* Setup environment variables
* Start backend and frontend

---

### Clone the Project

---

* `git clone https://github.com/yourusername/fleet-app.git`
* `cd fleet-app`

---

### Install Dependencies

---

* `cd backend && npm install`
* `cd frontend && npm install`

---

### Environment Variables (Backend)

---

* `MONGO_URI=your_mongodb_url`
* `JWT_SECRET=your_secret`
* `CLOUDINARY_CLOUD_NAME=your_name`
* `CLOUDINARY_API_KEY=your_key`
* `CLOUDINARY_API_SECRET=your_secret`

---

### Running the Project

---

* Start backend: `npm run dev` (inside backend folder)
* Start frontend: `npm start` (inside frontend folder)
* Open the app at: `http://localhost:3000`

---

### Socket.IO Events

---

* `sendMessage`
* `receiveMessage`
* `messageStatus`
* `joinRoom`
* `friendRequest`
* `friendAccept`
* `groupUpdated`
* `onlineUsers`

---

### Future Enhancements

---

* Voice messages
* Video compression
* Message reactions
* Delete/edit message
* Push notifications


---


