# MsgDrop — WhatsApp CRM Platform 💬

MsgDrop is a modern, responsive WhatsApp CRM platform built for small businesses (salons, gyms, clinics) to automate customer communication, launch marketing campaigns, and manage customer data.

## 🚀 Tech Stack

### Frontend
- **React (Vite)**
- **TypeScript**
- **Vanilla CSS / Tailwind** for responsive UI and fluid animations
- **React Router** for protected routing and dashboard navigation

### Backend
- **Node.js + Express**
- **TypeScript**
- **Prisma ORM** with **SQLite** for rapid development
- **Passport.js** for Google & Meta (Facebook) OAuth
- **JWT** (JSON Web Tokens) for stateless session authentication

## 📁 Project Structure

- `/frontend` — Contains the React application, UI components, mock data, and routing.
- `/backend` — Contains the Express server, Prisma schema, authentication routes, and database configuration.
- `docker-compose.yml` — Optional Docker configuration for containerized deployment.

## 🛠️ Local Development Setup

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Ensure a `.env` file exists with `DATABASE_URL="file:./dev.db"`
   - Add your Google/Meta API keys to the `.env` file for real OAuth.
4. Run Prisma database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will run on http://localhost:3001*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on http://localhost:5173*

## 🔐 Authentication Config (Google & Meta)

This application uses **Passport.js** to handle third-party logins. 
To enable real logins, you need to create OAuth applications in Google Cloud Console and Facebook Developers, and paste the keys into `backend/.env`.

**Google Setup:**
- Authorized Redirect URI: `http://localhost:3001/api/v1/auth/google/callback`

**Meta (Facebook) Setup:**
- Valid OAuth Redirect URI: `http://localhost:3001/api/v1/auth/facebook/callback`

*(Note: Meta login is currently mocked in `routes/auth.ts` for demo purposes. To enable real Meta login, swap out `mockOAuthHandler` with the passport strategy in the routes file).*

## ✨ Key Features
- **Dashboard Overview**: Track total contacts, messages sent, live campaigns, and recovered revenue.
- **Responsive Navigation**: Adaptive sidebar that collapses into a hamburger menu on mobile devices.
- **Contact Management**: Search, filter, and add new CRM contacts.
- **Campaign Workflows**: Launch "Win-Back" and "Post-Visit" automated flows via Modal interfaces.
- **Google OAuth Login**: Secure entry into the platform using real Google accounts.
