# 🎯 Student Scoreboard – React (Vite)

A **neon-themed** Student Scoreboard built with React and Vite for the **Web Dev II – Unit 3** lab.  
It lets you manage students, update scores in real-time, and view pass/fail status with a cyber-style UI.

---

## 🚀 Tech Stack

- ⚛️ **React** (Functional Components + Hooks)
- ⚡ **Vite** (Fast dev server & bundler)
- 🎨 **Pure CSS** (Custom neon theme, no Tailwind)
- 💡 **JavaScript (ES6 + JSX)**

---

## 🧩 Features

- 👥 **View Students**  
  Display all students in a responsive, animated table.

- ✏️ **Update Scores Live**  
  Change scores directly from the table; UI updates instantly.

- ➕ **Add New Student**  
  Add student name + score using a sleek form, auto-clears on submit.

- ✅ **Pass / ❌ Fail Status**  
  - Pass → score **≥ 40**  
  - Fail → score **< 40**  
  Clearly highlighted with colored badges.

- 📊 **Quick Stats (Optional)**  
  - Total students  
  - Total passed  
  - Average score  

---

## 🧱 Component Architecture

- `App`  
  - Holds **students state** using `useState`  
  - Calculates stats and passes data via **props**

- `Header`  
  - Shows the main title: **Student Scoreboard**  
  - Uses custom typography and neon accent line

- `AddStudentForm`  
  - Controlled inputs for **name** and **score**  
  - Calls `onAddStudent(name, score)` from `App`

- `StudentTable`  
  - Renders the table structure  
  - Shows either **rows** or an **empty state** message

- `StudentRow`  
  - Reusable row component  
  - Displays name, score, pass/fail badge  
  - Local input to update score, calls `onUpdateScore(id, score)`

---

## ⚙️ Getting Started

```bash
# 1️⃣ Create Vite + React app
npm create vite@latest student-scoreboard -- --template react

cd student-scoreboard

# 2️⃣ Install dependencies
npm install

# 3️⃣ Run in development
npm run dev
```

Place the components inside `src/components/` and the CSS inside `src/index.css`.

---

## 🎨 Styling Highlights

- Dark **cyber dashboard** background with subtle grid overlay
- Neon accents using CSS variables:
  - `--neon`, `--gold`, `--pass`, `--fail`, etc.
- Smooth **hover effects**, **table row animations**, and **status badges**
- Clean **typography** with imported Google fonts:
  - `Bebas Neue`, `Space Mono`, `DM Sans`

---

## 📚 Concepts Demonstrated

- Functional components only (no classes)
- `useState` for local and shared state
- Passing data and callbacks through **props**
- Conditional rendering (pass/fail + empty state)
- Controlled form inputs
- Separation of **UI (CSS)** and **logic (JSX)**

---

## ✅ Assignment Mapping

- ✔ Functional Requirements (View, Update, Add, Pass/Fail)
- ✔ Component Structure (Header, StudentTable, StudentRow, AddStudentForm)
- ✔ State & Props (state in `App`, props to children)
- ✔ Pure CSS styling (tables, inputs, buttons, layout)

---

> 💬 *“Built for Web Dev II Lab – focusing on clean components, state management, and modern UI styling.”*
