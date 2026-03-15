# Session 1 — Project Kickoff with GitHub Copilot

**Date:** March 15, 2026  
**Tool:** GitHub Copilot CLI  
**Model:** Claude Sonnet 4.6  
**Repository:** [Nebrija-ISW-2026/cosoteca](https://github.com/Nebrija-ISW-2026/cosoteca)

---

## 🎯 Goal

Decide on a classroom project idea, create a GitHub repository, and scaffold a working application skeleton with the right tech stack.

---

## 💬 Conversation Summary

### 1. Brainstorming the Project Idea

The session started by asking Copilot for **small application ideas suitable for a Software Engineering classroom**. Copilot suggested categories covering:

- Foundational CRUD apps (To-Do List, URL Shortener, Expense Tracker)
- Collaboration tools (Bug Tracker, Kanban Board, Code Review Tool)
- Architecture pattern examples (Chat App, Library Catalog, Notification Service)
- Security & Auth examples (Login System, Rate Limiter)

The **Library Catalog** idea was selected for deeper exploration.

---

### 2. Expanding on the Library Catalog

Copilot explained how a Library Catalog covers a wide range of SE concepts:

| Concept | How It Appears |
|---|---|
| Domain Modeling | `Book`, `Author`, `Member`, `Loan` entities |
| Database Design | Normalization, foreign keys, many-to-many |
| REST API Design | `GET /books`, `POST /books`, `PATCH /books/:id/checkout` |
| State Management | `available → checked_out → returned` |
| Testing | Unit tests for business rules, integration tests for API |
| Auth & Roles | Librarian vs. Member permissions |

A progressive complexity roadmap was proposed:
1. CLI app with in-memory data
2. Add a database (SQLite → PostgreSQL)
3. Expose a REST API
4. Build a frontend UI
5. Add auth, deployment, CI/CD

---

### 3. The Idea: **Cosoteca**

Inspired by the Library Catalog concept, the project was refined into a **"Biblioteca de las Cosas"** — a community app to borrow and lend physical objects between people.

---

### 4. Choosing a Repository Name

Copilot suggested several name options:

| Name | Description |
|---|---|
| `biblioteca-de-las-cosas` | Literal, descriptive, Spanish-native |
| `bdlc` | Short acronym |
| `library-of-things` | English equivalent |
| `prestamos-comunitarios` | "Community Loans" |
| **`cosoteca`** ✅ | Portmanteau of *cosa* + *biblioteca* |
| `things-library` | Simple English name |
| `objetos-compartidos` | "Shared Objects" |

**Selected: `cosoteca`** — playful, memorable, and unique.

---

### 5. Creating the Repository

- First attempt: `Nebrija` organization → ❌ Insufficient permissions
- Listed available organizations: `el-together`, `Nebrija-ISW-2026`
- Second attempt: `Nebrija-ISW-2026/cosoteca` → ✅ Created successfully

🔗 https://github.com/Nebrija-ISW-2026/cosoteca

---

### 6. Choosing the Tech Stack

Copilot recommended several stacks. The **Top Pick** was selected:

> **Next.js 14** (App Router, TypeScript) + **Prisma ORM** + **PostgreSQL**

Reasoning:
- One language across the stack (JavaScript/TypeScript)
- Next.js handles both frontend and API routes in one project
- Prisma makes database modeling visual and beginner-friendly
- Industry-relevant, excellent documentation

---

### 7. Choosing a Cloud Provider

For free deployment:

- **Vercel** — zero-config for Next.js, preview deployments per PR, free tier
- **Neon** — serverless PostgreSQL, free tier, native Vercel integration

**Why Neon over Supabase for a classroom?**  
Supabase provides built-in auth, storage, and real-time — which shortcuts features students should build themselves. Neon just provides a database and stays out of the way.

Recommended deployment combo:
```
GitHub → Vercel (hosting + preview deploys) → Neon (serverless Postgres)
```

---

### 8. Scaffolding the Project

Copilot scaffolded the project with:

#### Tech Setup
- `create-next-app` with TypeScript, Tailwind CSS, App Router, `src/` directory
- Prisma initialized with PostgreSQL datasource
- `@prisma/client` installed

#### Domain Schema (`prisma/schema.prisma`)

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  items     Item[]
  loans     Loan[]
}

model Item {
  id          String   @id @default(cuid())
  name        String
  description String?
  available   Boolean  @default(true)
  ownerId     String
  owner       User     @relation(...)
  loans       Loan[]
}

model Loan {
  id         String     @id @default(cuid())
  status     LoanStatus @default(PENDING)
  itemId     String
  borrowerId String
  ...
}

enum LoanStatus {
  PENDING
  ACTIVE
  RETURNED
  CANCELLED
}
```

#### Project Structure Created

```
src/
├── app/
│   ├── api/
│   │   ├── items/route.ts    # GET + POST /api/items
│   │   ├── loans/route.ts    # GET + POST /api/loans
│   │   └── users/route.ts    # GET + POST /api/users
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
│   └── prisma.ts             # Prisma singleton (dev-safe)
└── types/
prisma/
└── schema.prisma
```

#### Other Files
- `README.md` — full project documentation
- `.env.example` — template for environment variables

---

### 9. Opening the Pull Request

- Branch created: `scaffold/initial-setup`
- 23 files committed
- PR #1 opened: [scaffold: initial Next.js + Prisma project setup](https://github.com/Nebrija-ISW-2026/cosoteca/pull/1)

---

## 🧠 Key SE Concepts Demonstrated

| Concept | Where |
|---|---|
| **Requirements gathering** | Brainstorming the app idea and scope |
| **Domain modeling** | Designing User, Item, Loan entities |
| **Database design** | Relationships, normalization, enums |
| **State machines** | LoanStatus: PENDING → ACTIVE → RETURNED/CANCELLED |
| **API design** | RESTful routes for each resource |
| **Git workflow** | Feature branch → PR → merge to main |
| **Environment config** | `.env` / `.env.example` separation |
| **Tech stack decisions** | Trade-offs between Supabase vs Neon, different frameworks |

---

## 🔜 Suggested Next Steps

- [ ] Add `GET /api/items/:id`, `PATCH /api/items/:id`, `DELETE /api/items/:id`
- [ ] Add `PATCH /api/loans/:id` to update loan status (return/cancel)
- [ ] Build a basic frontend: item listing page, borrow form
- [ ] Add input validation (e.g. with `zod`)
- [ ] Add authentication (e.g. NextAuth.js)
- [ ] Configure Vercel + Neon for deployment
- [ ] Write unit and integration tests
