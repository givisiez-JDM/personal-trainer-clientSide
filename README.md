# 🏋️‍♀️ Personal Trainer – Client Side

Frontend application for managing clients, training plans, exercise logs, and progress—designed to work seamlessly with the **personal-trainer-serverSide** API.

## 🌟 Features

* User authentication (login, logout)
* Dashboard showing clients, training plans, progress
* Create, view, edit, delete clients and plans
* Responsive UI for desktop and mobile
* API integration using REST (or GraphQL, as applicable)
* Form validations and user-friendly messaging

## 🧱 Tech Stack

* **Framework / Library**: React 
* **Styling**: Styled-component
* **HTTP Client**: Axios
* **State Management**: Context API
* **Routing**: React Router
* **Linting / Formatting**: ESLint, Prettier

*(Customize based on your stack.)*

## 🔧 Getting Started

### Prerequisites

* Node.js v20+
* npm

### Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/givisiez-JDM/personal-trainer-clientSide.git
   cd personal-trainer-clientSide
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

4. **Run the development server**

   ```bash
   npm start
   ```

   The app should be available at `http://localhost:3000` (or the configured port).

## 📱 Application Overview

### Core Pages / Components

* **Login / Authentication**: Secure access with form validation
* **Dashboard**: Summary of clients, plans, recent activity
* **Clients List**: View all clients, search, select
* **Client Detail**: View/edit individual client info and training plans
* **Training Plans**: Create and manage workout routines
* **Progress Tracking**: Log sessions and view historical performance

### API Integration

Example of API usage in React (adjust for your stack):

```js
// Example with Axios
axios.get(`${process.env.REACT_APP_API_URL}/clients`, {
  headers: { Authorization: `Bearer ${token}` }
});
```

## 🎨 Styling & Assets

* Custom components for forms, modals, navigation, and cards
* Responsive design via CSS grid/flexbox

## 🛡️ Testing & Quality

* **Linting** with ESLint:

  ```bash
  npm run lint
  ```
* **Formatting** with Prettier:

  ```bash
  npm run format
  ```
* **UI / Integration Tests** using Jest + React Testing Library:

  ```bash
  npm test
  ```
