# Account-Me

Account-Me is a web application designed to help users stay accountable and complete their goals with the support of an accountability partner.

Instead of relying solely on self-discipline, users can invite a friend or partner to track their progress, review completed tasks, and provide ratings and feedback.

---

## Features

### Task Management
- Create tasks with due dates and check-in times
- Track pending and completed tasks
- View current and historical task progress

### Accountability Partner System
- Invite a partner through email
- Generate shareable invite links
- Connect with a partner who can monitor your progress

### Evidence-Based Check-Ins
- Upload proof of task completion
- Store and display uploaded evidence
- Allow partners to review submissions

### Partner Dashboard
- View all partner submissions
- Review uploaded evidence
- Rate completed tasks from 1–5 stars

### Streak Tracking
- Current streak tracking
- Longest streak tracking
- Completed task statistics
- Pending task statistics

### Documentation & Feedback
- Built-in documentation page
- Feedback and bug reporting form
- Spam protection through Formspree


## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Vite

### Backend & Database
- Supabase Authentication
- Supabase Database
- Supabase Storage

### Other Services
- Formspree
- Date-fns
- Starability CSS

---

## Project Structure

```text
src/
├── assets/
├── auth/
├── components/
│   ├── Badge.jsx
│   ├── ContactForm.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── StatsBar.jsx
│   ├── TaskList.jsx
│   └── ThankYou.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Documentation.jsx
│   ├── InvitePage.jsx
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── PartnerDashboard.jsx
│   └── SignUp.jsx
│
├── styles/
├── supabaseClient.js
└── App.jsx
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/sudeepsarmah/Account-Me.git
```

Navigate into the project:

```bash
cd Account-Me
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
VITE_RECAPTCHA_SITE_KEY
```

Start the development server:

```bash
npm run dev
```

---

## Environment Variables

Required variables:

```env
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
VITE_RECAPTCHA_SITE_KEY
```

---

## Roadmap

### Current
- User authentication
- Task creation
- Partner invitations
- Evidence uploads
- Partner ratings
- Streak tracking

### Planned
- Email notifications
- Reminder system
- Dark mode
- Partner comments and feedback

---

## Contributing

Contributions, suggestions, and bug reports are welcome.

Feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Author

**Sudeepta Sarmah**

GitHub: https://github.com/sudeepsarmah

Project Repository:
https://github.com/sudeepsarmah/Account-Me