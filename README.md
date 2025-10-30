# Comment-Board-FE

[![Node](https://img.shields.io/badge/Node-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

Comment-Board-FE is a modern SPA frontend for browsing and submitting threaded comments. It features a clean, responsive
UI, client-side validation, a live preview with safe HTML, image attachments with Lightbox, and an accessible
modal-based editor powered by Next.js and Tailwind CSS.

---

## ✨ Core Features

- Comments browsing
    - 🔎 Pagination and sorting (client-driven)
    - 🧭 Threaded view with nested replies
    - 🖼️ Built‑in Lightbox gallery for image attachments
- Comment composer
    - 🧰 Quick formatting buttons: i, strong, code, a (inserts sanitized HTML tags)
    - 🖼️ Multiple image upload with previews and removal
    - 👁️ Live preview (sanitized) toggle
    - ✅ Realtime field validation and helpful error messages
    - 🔐 CAPTCHA challenge integration
- UX/UI
    - 🎯 Accessible modal dialog
    - 📱 Responsive layout (mobile → desktop)

---

## 🧰 Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript, React 19
- Styling: Tailwind CSS 4
- HTTP client: Axios
- Media: yet-another-react-lightbox
- Tooling: ESLint, TypeScript

---

## ⚙️ Installation & Setup

1. Clone the repository

   ```bash
   git clone https://github.com/Zebaro24/comment-board-fe.git
   cd comment-board-fe
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn
   ```

3. Create a .env.local file (at the repo root)

   ```dotenv
   # Public base URL of the backend API (protocol + host + optional port, no trailing slash)
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

   Notes:
    - The frontend talks to the backend under `${NEXT_PUBLIC_API_BASE_URL}/api` (e.g., http://localhost:8000/api).
    - CAPTCHA endpoint is expected at `/api/captcha/` and create‑comment at your backend route (see
      services/comments.ts).

4. Start the dev server

   ```bash
   npm run dev
   ```

   The app will be available at http://localhost:3000.

---

## 🐳 Quick Start (Docker Compose)

This project ships with a simple Docker Compose service for the frontend.

```bash
# Ensure your backend API is reachable from the container (configure CORS accordingly)
docker compose -p comment-board up -d --build
```

- Services started:
    - comment-board-fe (Next.js server on port 3000)

Open http://localhost:3000.

---

## 🧭 Running Locally (without Docker)

1. Ensure the backend API is running and reachable at `NEXT_PUBLIC_API_BASE_URL`.
2. Start the app in dev mode:

   ```bash
   npm run dev
   ```

3. Production build:

   ```bash
   npm run build
   npm start
   ```

---

## 🧪 Testing

This project does not include unit tests yet. You can still run the linter:

```bash
npm run lint
```

---

## 🔧 Configuration Reference

- NEXT_PUBLIC_API_BASE_URL: Public base URL used by the frontend to call the API.
    - Default (fallback in code): http://localhost:8000
    - Effective baseURL used by Axios: `${NEXT_PUBLIC_API_BASE_URL}/api`

Other behaviors and endpoints are defined in the services layer:

- src/services/http.ts – Axios instance with base URL
- src/services/captcha.ts – GET /captcha/ (returns { key, image })
- src/services/comments.ts – Submit new comment (FormData)

---

## 📦 Available Scripts

- dev: next dev
- build: next build
- start: next start
- lint: eslint

```bash
npm run dev   # start development server on :3000
npm run build # build for production
npm start     # run production build
npm run lint  # run eslint
```

---

## 🗂️ Project Highlights

- Modal-based comment form with formatting helpers and sanitized preview
- File attachments with thumbnails and Lightbox gallery
- Client-side validation for username, email, text length, image constraints
- CAPTCHA retrieval and submission flow (`key:value`)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 📬 Contact

- Developer: Denys Shcherbatyi
- Email: zebaro.work@gmail.com
