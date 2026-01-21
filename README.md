# 📰 Hacker News Reader

A modern, responsive Hacker News client built with React.  
Browse top stories, search articles, and explore deeply nested comment threads in a fast, accessible UI.

This project focuses on **real-world data handling**, **component architecture**, and **performance with large, nested datasets**.

---

## 🚀 Live Demo

🔗 https://your-live-url.com

---

## 🛠 Tech Stack

- **React** (Vite)
- **Redux Toolkit** – global state & async flows
- **React Query** – data fetching & caching
- **React Router** – client-side routing
- **Tailwind CSS** – utility-first styling
- **Framer Motion** – UI and interaction animations
- **lucide-react** – icon system
- **Semantic HTML & ARIA** – accessibility-first markup

---

## ✨ Features

- 🔍 **Search Hacker News stories** with debounced suggestions
- 🧵 **Deeply nested comments** with lazy rendering for performance
- ⚡ **Optimised rendering** for large comment trees
- 📱 **Mobile-first responsive layout**
- ♿ **Accessible UI** with keyboard navigation and screen-reader support
- 🌙 **Persistent dark mode**

---

## 🧠 Engineering Focus

`````md
The app is structured to be easily extended with additional data sources or persistence in the future.

The project was built iteratively, with an emphasis on:

- Managing **async data flows** and loading states
- Preventing unnecessary renders in **deep comment trees**
- Maintaining **readable, reusable UI components**
- Refactoring toward better structure as features evolved

Rather than a single “feature drop”, the codebase reflects ongoing improvement and real-world trade-offs.

---

## 📁 Project Structure

````text
src/
├── components/     # Reusable UI components
├── features/       # Redux slices (posts, search, comments, trending)
├── hooks/          # Custom hooks
├── pages/          # Route-level pages
├── utils/          # Shared helpers
├── styles/         # Global styles & Tailwind config
├── App.jsx
└── main.jsx


---


## 🧪 Lighthouse Scores

| Category       | Score |
| -------------- | ----- |
| Performance    | 95+   |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |

Achieved using semantic HTML, lazy rendering, accessible components, and careful layout design.

---

## 📌 Portfolio Context

This is a **front-end portfolio project** demonstrating:

- Real-world API consumption
- Scalable component architecture
- Performance and accessibility considerations
- Modern React tooling and patterns

It’s part of my job-seeking portfolio as a front-end developer.

---

## ▶️ Run Locally

```bash
git clone https://github.com/your-username/hacker-news-reader.git
cd hacker-news-reader
npm install
npm run dev
````
`````

```

```
