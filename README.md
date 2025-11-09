# 📈 PERN Stack CRM

A robust, full-stack Customer Relationship Management (CRM) application built with PostgreSQL, Express, React, and Node.js. Designed to help [Your Target Audience, e.g., 'small businesses', 'freelancers'] manage leads, track interactions, and visualize their sales pipeline.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 📍 Table of Contents

* [Features](#✨-features)
* [Tech Stack](#🛠️-tech-stack)
* [Screenshots](#📸-screenshots)
* [Getting Started](#🚀-getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation & Setup](#installation--setup)
* [Environment Variables](#env-environment-variables)
* [Usage](#🧑‍💻-usage)
* [License](#📝-license)

---

## ✨ Features

* **User Authentication:** Secure user registration and login (e.g., using JWT).
* **Dashboard:** An at-a-glance view of key metrics (e.g., new leads, revenue, tasks).
* **Contact Management:** Create, Read, Update, and Delete customer/lead profiles.
* **Sales Pipeline:** Visualize and manage leads through different sales stages (e.g., 'New', 'Contacted', 'Qualified', 'Won').
* **Task Tracking:** Create and assign tasks related to specific contacts or deals.
* **Search & Filtering:** Easily find contacts or deals based on specific criteria.

---

## 🛠️ Tech Stack

### Frontend
* **React** (v18.x.x)
* **React Router** (for client-side routing)
* **Axios** (for API requests)
* **[Material ui]** 
* **[Redux Toolkit]** 

### Backend
* **Node.js**
* **Express**
* **PostgreSQL** (Database)
* **Sequelize** (ORM or DB driver)
* **bcrypt.js** (for password hashing)
* **JSON Web Token (JWT)** (for authentication)
* **cors** (for enabling cross-origin requests)

---


---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

You will need the following tools installed on your system:
* [Node.js](https://nodejs.org/) (v18.x or later recommended)
* [PostgreSQL](https://www.postgresql.org/download/)
* [Git](https://git-scm.com/)

### Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/divyanshpandit/pern-crm.git](https://github.com/divyanshpandit/pern-crm.git)
    cd pern-crm
    ```

2.  **Set up the Backend**
    ```bash
    # Navigate to the server directory (e.g., 'cd server' or 'cd backend')
    cd server

    # Install dependencies
    npm install

    # Create your .env file (see .env.example)
    cp .env.example .env

    # Edit .env with your database credentials (see section below)
    ```

3.  **Set up the Database**
    * Open your PostgreSQL admin tool (like `psql` or PGAdmin).
    * Create a new user: `CREATE USER my_crm_user WITH PASSWORD 'your_secure_password';`
    * Create a new database: `CREATE DATABASE my_crm_db;`
    * Grant privileges to your user: `GRANT ALL PRIVILEGES ON DATABASE my_crm_db TO my_crm_user;`
    * Run database migrations/seeders (if you have them)
        ```bash
        # Example if using Sequelize:
        npx sequelize db:migrate
        npx sequelize db:seed:all
        ```

4.  **Set up the Frontend**
    ```bash
    # Navigate to the client directory (e.g., 'cd client' or 'cd frontend')
    cd ../client

    # Install dependencies
    npm install

    # Create your .env file (if needed, e.g., for API URL)
    cp .env.example .env
    ```

5.  **Run the Application**
    * **Terminal 1 (Backend):**
        ```bash
        cd server
        npm run dev  # Or 'npm start'
        ```
    * **Terminal 2 (Frontend):**
        ```bash
        cd client
        npm start
        ```
    Open [http://localhost:3000](http://localhost:3000) (or your frontend port) to view the app.

---

## .env Environment Variables

You will need to create a `.env` file in your `server` directory.

```ini
# .env file for backend

# PostgreSQL Database
DB_USER=my_crm_user
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_NAME=my_crm_db
DB_PORT=5432

# Authentication
JWT_SECRET=a_very_strong_and_secret_key
JWT_EXPIRES_IN=1d

# Server
PORT=5000 # Or your preferred backend port
