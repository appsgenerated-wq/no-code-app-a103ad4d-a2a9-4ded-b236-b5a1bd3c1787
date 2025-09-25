# FlavorFind - Recipe Sharing App

Welcome to FlavorFind, a modern web application for discovering and sharing recipes. This project is built entirely with a React frontend and a Manifest backend.

## ✨ Features

- **User Authentication**: Secure user sign-up and login, powered by Manifest.
- **Recipe CRUD**: Create, read, update, and delete your own recipes.
- **Image Uploads**: Add beautiful photos to your recipes and user profiles.
- **Community Feed**: Browse all recipes shared by the community.
- **Role-Based Access**: Users can only edit their own recipes, while admins have full control.
- **Auto-Generated Admin Panel**: A complete admin interface at `/admin` for managing users and recipes.

## 🚀 Getting Started

Follow these steps to get the FlavorFind application running locally.

### Prerequisites

- Node.js (v16+)
- npm
- Manifest CLI (`npm install -g @mnfst/cli`)

### 1. Setup the Backend

1.  **Initialize Manifest**:
    ```bash
    mnfst init
    ```
2.  **Start the Backend Server**:
    The Manifest backend server provides the database, API, and admin panel.
    ```bash
    mnfst dev
    ```
    Your backend is now running at `http://localhost:3000`.
    You can access the admin panel at `http://localhost:3000/admin`.
    - **Admin email**: `admin@manifest.build`
    - **Admin password**: `admin`

### 2. Setup the Frontend

1.  **Install Dependencies**:
    Navigate to the `frontend` directory and install the required packages.
    ```bash
    cd frontend
    npm install
    ```

2.  **Run the React App**:
    ```bash
    npm run dev
    ```
    Your React application is now running at `http://localhost:5173`.

### Using the App

- Visit `http://localhost:5173` to see the landing page.
- Click "Try Demo" to log in with the default admin credentials and start exploring.
- Create your own recipes and see them appear on the dashboard.
- Visit the Admin Panel to manage all data directly.
