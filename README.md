# Cosoteca 📦

**Biblioteca de las Cosas** — a community app to borrow and lend objects between people.

> Built as a classroom example for the Software Engineering course at Nebrija University (ISW 2026).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router, TypeScript) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| ORM | [Prisma](https://www.prisma.io/) |
| Database | [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech)) |
| Hosting | [Vercel](https://vercel.com/) |

---

## Domain Model

```
User ──< Item        (a user owns many items)
User ──< Loan        (a user can borrow many items)
Item ──< Loan        (an item can have many loan history entries)
```

### Entities

- **User** — someone who can lend or borrow items
- **Item** — an object available for lending (has `available` flag)
- **Loan** — a borrowing event with status: `PENDING → ACTIVE → RETURNED | CANCELLED`

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── items/       # GET /api/items, POST /api/items
│   │   ├── loans/       # GET /api/loans, POST /api/loans
│   │   └── users/       # GET /api/users, POST /api/users
│   ├── layout.tsx
│   └── page.tsx
├── components/          # Reusable React components
├── lib/
│   └── prisma.ts        # Prisma client singleton
└── types/               # Shared TypeScript types
prisma/
└── schema.prisma        # Database schema
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (local or [Neon](https://neon.tech) free tier)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nebrija-ISW-2026/cosoteca.git
   cd cosoteca
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Fill in your `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/cosoteca"
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | List all users |
| POST | `/api/users` | Create a user |
| GET | `/api/items` | List all items |
| POST | `/api/items` | Create an item |
| GET | `/api/loans` | List all loans |
| POST | `/api/loans` | Create a loan (borrow an item) |

---

## Deployment

This app is designed to deploy on **Vercel** with a **Neon** PostgreSQL database.

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com/)
3. Add `DATABASE_URL` as an environment variable
4. Vercel auto-deploys on every push to `main`
