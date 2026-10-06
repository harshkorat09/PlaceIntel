# PLACEINTEL CURRENT IMPLEMENTATION
> FORENSIC DISCOVERY DOCUMENT

## 1. COMPLETE FILE-BY-FILE DETAILS

**Frontend Files (`apps/web/src/`)**
- `App.tsx`: Main router. Uses `react-router-dom`. Sets up routes, developer role overrides (`/recruiter`, `/tpo`). 
- `main.tsx`: React entry point. Imports context providers.
- `index.css`: Tailwind configuration and core styles, variables.
- `api/client.ts`: Axios instance with JWT interceptors.
- `api/authService.ts`, `companyService.ts`, `placementService.ts`, `profileService.ts`, `chatService.ts`, `analyticsService.ts`: Axios clients wrapping API calls.
- `contexts/AuthContext.tsx`: Manages user login state, JWT in localStorage.
- `components/ProtectedRoute.tsx`: Checks `user` context, role gating (`requireAdmin`).
- `components/RecruiterLayout.tsx`, `TpoLayout.tsx`, `StudentLayout.tsx`: UI shells with sidebars and headers.
- `views/Dashboard.tsx` (Admin), `StudentViews.tsx` (StudentDashboard): Dashboard UI.
- `views/Placements.tsx` (Admin), `StudentJobs.tsx` (Student): Placement lists.
- `views/StudentJobDetails.tsx`: Fetches placement data and Fit Score via API.
- `views/Companies.tsx` (Admin), `StudentCompanies.tsx`, `StudentCompanyDetails.tsx`: Company directories.
- `views/Auth.tsx`, `Signup.tsx`: Login/Registration UI. Calls auth API.
- `views/AIAssistant.tsx`, `StudentAskPlaceIntel.tsx`: Chatbot UI. Calls `chatService`.
- `views/RecruiterPipeline.tsx`, `RecruiterDashboard.tsx`, `RecruiterJobDetails.tsx`, `RecruiterCandidateProfile.tsx`: Recruiter interfaces. *Status: PROTOTYPE/MOCKED*. Uses local arrays.
- `views/TpoAnalytics.tsx`, `TpoDashboard.tsx`, `TpoStudents.tsx`, `TpoCompanies.tsx`: TPO interfaces. *Status: PROTOTYPE/MOCKED*. Uses local arrays.

**Backend Files (`apps/api/src/`)**
- `server.ts`: Express setup, CORS, route imports (`/api/*`).
- `db.ts`: Prisma Client instantiation.
- `routes/*.routes.ts`: Maps HTTP methods to controllers.
- `controllers/auth.controller.ts`: Registration, Login, Me endpoints. DB ops on `User`.
- `controllers/placement.controller.ts`: CRUD for Placement, Fit Score logic (combines branch, skills, CGPA). Uploads notice to chatbot ingestion.
- `controllers/company.controller.ts`: CRUD for Company.
- `controllers/chat.controller.ts`: Forwards chat requests to FastAPI chatbot service.
- `middlewares/auth.middleware.ts`: JWT verification, role checking.
- `validators/*.validator.ts`: Zod schemas for input validation.

**Chatbot Files (`chatbot/app/`)**
- `main.py`: FastAPI entry point.
- `api/chat.py`: `/chat` endpoint. Calls generation, retrieval.
- `api/ingestion.py`: `/ingestion/placements/{id}/notice` endpoint. Parses PDF to Vector DB.
- `generation/answer_generator.py`, `question_resolver.py`: LLM logic.
- `retrieval/hybrid_retriever.py`, `source_builder.py`: Vector search via pgvector.
- `database.py`: SQLAlchemy connection to PostgreSQL.

**Prisma (`prisma/`)**
- `schema.prisma`: Defines tables (User, Company, Placement, Skill, Branch, Attachment, ChatSession, ChatMessage).

---

## 2. COMPLETE PROJECT STRUCTURE

```text
PlaceIntel/
├── apps/
│   ├── api/                   # Express Backend
│   │   ├── src/
│   │   │   ├── controllers/   # Business logic (auth, placements, chat)
│   │   │   ├── middlewares/   # Auth and validation interceptors
│   │   │   ├── routes/        # Endpoint definitions
│   │   │   ├── validators/    # Zod schemas
│   │   │   ├── db.ts          # Prisma client
│   │   │   └── server.ts      # Express setup
│   │   └── package.json
│   └── web/                   # React Frontend
│       ├── src/
│       │   ├── api/           # Axios wrappers
│       │   ├── assets/        # Images, CSS
│       │   ├── components/    # Layouts, Charts, Navigation
│       │   ├── contexts/      # AuthContext
│       │   ├── views/         # Page-level components (35 total)
│       │   ├── App.tsx        # React Router configuration
│       │   ├── index.css      # Tailwind core styles
│       │   └── main.tsx       # React entry
│       └── package.json
├── chatbot/                   # Python FastAPI Microservice
│   ├── app/
│   │   ├── api/               # Chat and ingestion endpoints
│   │   ├── generation/        # LLM integration
│   │   ├── ingestion/         # PDF Parsing
│   │   ├── repositories/      # DB persistence for chats
│   │   ├── retrieval/         # Vector DB queries
│   │   ├── config.py          # Env vars
│   │   └── main.py            # App init
│   └── requirements.txt
├── prisma/
│   ├── schema.prisma          # Database schema (PostgreSQL)
│   └── seed.ts                # DB initialization data
├── package.json               # Monorepo config
└── pnpm-workspace.yaml        # Workspace config
```

---

## 3. EVERY PAGE INVENTORY

**Student Suite**
- `StudentDashboard` (`/`): Shows stats, upcoming drives. *Real data mixed with static placeholders*.
- `StudentJobs` (`/placements`): Lists available drives. *Real data from `/api/placements`*.
- `StudentJobDetails` (`/placements/:id`): Shows job reqs, fetches Fit Score from `/api/placements/:id/fit-score`. *Real data*.
- `StudentAskPlaceIntel` (`/ask-placeintel`): Chatbot interface. *Real data from `/api/chat`*.
- `StudentCompanies`, `StudentCompanyDetails`: Lists companies. *Real data*.
- `StudentProfile`, `StudentSettings`, `StudentApplications`, `StudentDocuments`, `StudentNotifications`, `StudentHelpDesk`, `StudentMyPosition`, `StudentCalendar`, `PlacementMarket`: Extensive UI shells containing heavily *mocked* or *static* data, pending backend connections.

**Admin Suite**
- `Dashboard` (`/`): High level metrics. *Static/Real mix*.
- `Placements` (`/placements`): Admin CRUD table for drives. *Real data*.
- `Companies` (`/companies`): Admin CRUD table for companies. *Real data*.
- `Analytics` (`/analytics`): System metrics. *Uses `/api/stats`*.
- `AdminPanel` (`/admin`): Access control.

**Recruiter Suite (PROTOTYPE)**
- `RecruiterDashboard` (`/recruiter/dashboard`): Metrics, upcoming interviews. *Mock Data*.
- `RecruiterJobs` (`/recruiter/jobs`): Active mandates. *Mock Data*.
- `RecruiterJobDetails` (`/recruiter/jobs/:id`): Specific mandate metrics. *Mock Data*.
- `RecruiterPipeline` (`/recruiter/pipeline`): Pipeline tracking. *Mock Data*.
- `RecruiterCandidateProfile` (`/recruiter/pipeline/:id`): Candidate dossier. *Mock Data*.

**TPO Suite (PROTOTYPE)**
- `TpoDashboard` (`/tpo/dashboard`): High level overview. *Mock Data*.
- `TpoStudents` (`/tpo/students`): Student directory. *Mock Data*.
- `TpoCompanies` (`/tpo/companies`): Partner drives. *Mock Data*.
- `TpoAnalytics` (`/tpo/analytics`): Institutional metrics. *Mock Data*.

---

## 4. EVERY DISPLAYED VALUE (Examples of Real vs Mock)

**Real Displayed Values:**
- `StudentJobs`: `placement.position`, `placement.company.name`, `placement.ctc` fetched from DB.
- `StudentJobDetails`: `Fit Score (e.g. 84)` calculated in `placement.controller.ts` based on student branch/skills.
- `Companies`: `company.name`, `company.sector`, `company.status` fetched from DB.

**Mock/Static Displayed Values:**
- `RecruiterPipeline`: `mockCandidates` array (e.g. "Harsh Korat, 21CE048, 8.92 CGPA") hardcoded in file.
- `TpoAnalytics`: "Cohort Clearance: 78.4%", "Median Compensation: ₹9.20 LPA" hardcoded in file.
- `StudentHelpDesk`: FAQs and status badges are hardcoded HTML.
- `TpoStudents`: `mockStudents` array hardcoded in file.

---

## 5. EVERY BUTTON / INTERACTION

| Page | Element | File | Handler | Actual Behavior | API | DB | Status |
|---|---|---|---|---|---|---|---|
| Auth | "Login" Button | `Auth.tsx` | `handleSubmit` | Calls `login` context function. | `/api/auth/login` | Read `User` | REAL |
| Admin Placements | "Create" Button | `Placements.tsx` | `handleCreate` | Submits form. | `/api/placements` | Write `Placement` | REAL |
| Student Jobs | "Apply" Button | `StudentJobDetails.tsx` | `handleApply` | Changes local state to "Applied". | None | None | LOCAL-ONLY |
| Chatbot | "Send" Icon | `AIAssistant.tsx` | `handleSend` | Sends message. | `/api/chat` | Write `ChatSession` | REAL |
| Recruiter Pipeline | Checkbox | `RecruiterPipeline.tsx` | `handleSelect` | Adds ID to local array. | None | None | LOCAL-ONLY |
| Recruiter Pipeline | Sort Filter | `RecruiterPipeline.tsx` | None | Visual toggle only. | None | None | NO-OP |
| TPO Analytics | Export Dossier | `TpoAnalytics.tsx` | None | Visual button. | None | None | NO-OP |

---

## 6. EVERY API — COMPLETE TRACE

**POST `/api/auth/login`**
- Route: `auth.routes.ts`
- Controller: `auth.controller.ts` -> `login()`
- Auth: Public
- Trace: Validates credentials via `bcrypt` against `User` table, generates JWT. Used by `Auth.tsx`.

**GET `/api/placements`**
- Route: `placement.routes.ts`
- Controller: `placement.controller.ts` -> `getPlacements()`
- Auth: Required (`authenticate`)
- Trace: Queries Prisma `Placement` with `include: { company: true, branches: true, skills: true }`. Used by `StudentJobs.tsx`, `Placements.tsx`.

**GET `/api/placements/:id/fit-score`**
- Route: `placement.routes.ts`
- Controller: `placement.controller.ts` -> `getPlacementFitScore()`
- Auth: Required
- Trace: 
  - Fetches Placement requirements.
  - Fetches Student profile (branch, skills, CGPA).
  - Logic: 40% Branch match, 40% Skill match, 20% CGPA. Returns calculated score 0-100. Used by `StudentJobDetails.tsx`.

**POST `/api/chat`**
- Route: `chat.routes.ts`
- Controller: `chat.controller.ts` -> `chatWithAssistant()`
- Auth: Required
- Trace: Express acts as proxy, forwarding to FastAPI microservice `http://localhost:8000/chat`.

**POST `http://localhost:8000/chat` (FastAPI)**
- Route: `api/chat.py`
- Trace:
  - Validates session in PostgreSQL (`ChatSession`).
  - Resolves query context (LLM).
  - Retrieves documents from `Attachment` chunks via pgvector.
  - Generates answer via Gemini LLM.
  - Saves messages, returns response.

---

## 7. EVERY DATABASE MODEL

- **`User`**: Core auth. Full CRUD by Admin/Auth APIs.
- **`Company`**: Recruiter profiles. Full CRUD by Admin APIs.
- **`Placement`**: Mandates. Full CRUD by Admin APIs. Has relations to Company, Branch, Skill.
- **`Branch` / `Skill`**: Taxonomies. Created via seeds, read by APIs. Used for Fit Scores.
- **`StudentSkill` / `PlacementSkill` / `PlacementBranch`**: Join tables.
- **`Attachment` / `PlacementChunk`**: Vector embeddings for RAG. Populated by FastAPI `/ingestion` endpoint.
- **`ChatSession` / `ChatMessage`**: Chat history. Written by FastAPI `/chat` endpoint.

---

## 8. COMPLETE MOCK / STATIC DATA INVENTORY

| File | Location | Actual Data | Purpose | Status |
|---|---|---|---|---|
| `RecruiterPipeline.tsx` | `mockCandidates` array | Aarav Mehta (21IT084), Harsh Korat (21CE048) | Populates pipeline table | MOCK |
| `RecruiterDashboard.tsx` | Inline JSX | 14 active mandates, 412 candidates | Dashboard metrics | STATIC |
| `RecruiterJobDetails.tsx`| Inline JSX | Pipeline funnels (Registered -> Shortlisted) | Funnel metrics | STATIC |
| `TpoDashboard.tsx` | Inline JSX | 84.2% Placement Rate, ₹9.2LPA | Institutional metrics | STATIC |
| `TpoAnalytics.tsx` | Inline JSX | Branch-wise bars (CE 88.3%, IT 85.5%) | Analytic charts | STATIC |
| `TpoCompanies.tsx` | `mockPartners` array | Microsoft IDC, Sophos, TCS | Partner listings | MOCK |
| `TpoStudents.tsx` | `mockStudents` array | Aarav Mehta, Diya Patel, etc | Student listings | MOCK |

---

## 9. COMPLETE UI STATUS AUDIT

| Page | UI Status | Functional Status | Pending Work / Notes |
|---|---|---|---|
| **Auth/Login** | COMPLETE | REAL | Fully connected to DB. |
| **Student Dashboard** | COMPLETE | PARTIAL | Mixed real jobs with static metrics. |
| **Student Placements** | COMPLETE | REAL | Fetches DB data. Missing real apply logic (local only). |
| **Admin Placements** | COMPLETE | REAL | Full CRUD working. |
| **AI Assistant** | COMPLETE | REAL | Connects to FastAPI RAG backend. |
| **Recruiter Suite (All)** | COMPLETE | MOCKED | UI is extremely high fidelity. Requires backend API for recruiter specific data. |
| **TPO Suite (All)** | COMPLETE | MOCKED | UI is extremely high fidelity. Requires backend API for institutional reporting. |
| **Student Calendar** | PENDING | MOCKED | Exists as an un-implemented shell or mocked UI. |
| **Student Documents** | PARTIAL | MOCKED | UI shell exists. |

---

## 10. EXTRA / DUPLICATE / LEGACY DISCOVERY

- **Duplicate Placements List**: `Placements.tsx` (Admin) and `StudentJobs.tsx` (Student) render identical data differently based on role. `StudentJobs` relies heavily on visual cards, `Placements` relies on a generic table.
- **Disconnected Feature**: "Apply" button on `StudentJobDetails.tsx`. The button updates local state `isApplied` but triggers NO backend API call. There is no `Application` model in the Prisma schema.
- **Disconnected Feature**: "Export" buttons throughout Recruiter and TPO suites are NO-OP visual placeholders.
- **Disconnected Role Configuration**: Recruiter and TPO roles were added to the `Role` enum in AuthContext, but backend `schema.prisma` enum `Role` only contains `STUDENT` and `ADMIN`. Therefore, the dev overrides in `App.tsx` (`if (window.location.pathname.startsWith('/recruiter'))`) are the only way to reach these pages.

---

## 11. COMPLETE FEATURE INVENTORY

| Feature | Location | Functional? | Real Data? | Backend/DB? | Status |
|---|---|---|---|---|---|
| **Login / Reg** | `Auth.tsx` | YES | YES | YES | FULLY CONNECTED |
| **Job Listings** | `StudentJobs.tsx` | YES | YES | YES | FULLY CONNECTED |
| **Fit Score Calc** | `StudentJobDetails` | YES | YES | YES | FULLY CONNECTED |
| **AI RAG Chat** | `StudentAskPlaceIntel` | YES | YES | YES | FULLY CONNECTED |
| **Admin CRUD** | `Companies.tsx`, etc | YES | YES | YES | FULLY CONNECTED |
| **Apply to Job** | `StudentJobDetails` | NO | NO | NO | LOCAL-ONLY (Missing DB Model) |
| **Candidate Pipelining** | `RecruiterPipeline` | NO | NO | NO | PROTOTYPE (MOCKED) |
| **Inst. Analytics** | `TpoAnalytics` | NO | NO | NO | PROTOTYPE (STATIC) |

---

## 12. FRONTEND → BACKEND → DATABASE CONNECTION MAP (Example: Chatbot)

**AI CHATBOT TRACE:**
1. `StudentAskPlaceIntel.tsx` -> User clicks Send.
2. `chatService.sendMessage(msg)` -> Axios POST `/api/chat`.
3. `chat.controller.ts` -> Validates JWT, forwards POST to `http://localhost:8000/chat`.
4. FastAPI `api/chat.py` -> Receives payload.
5. `chat_repository.py` -> Queries PostgreSQL `ChatSession` for history.
6. `hybrid_retriever.py` -> Embeds query, queries `PlacementChunk` (pgvector) in DB.
7. `answer_generator.py` -> Builds prompt with chunks, calls Gemini API.
8. `chat_repository.py` -> Saves user message and assistant answer to PostgreSQL `ChatMessage`.
9. FastAPI returns JSON -> Express returns JSON -> React updates UI.

---

## 13. MASTER INVENTORY TABLES

### ALL DATABASE MODELS

| Model | Purpose | Used By | CRUD Status |
|---|---|---|---|
| `User` | Students and Admins | Auth, Profile | Fully Connected |
| `Company` | Recruiter metadata | Admin Companies | Fully Connected |
| `Placement` | Job Mandates | Admin/Student | Fully Connected |
| `Branch`/`Skill` | Taxonomy | Dropdowns/FitScore | Real Data (Read Only) |
| `Attachment`/`Chunk`| Vector DB context | FastAPI Ingestion | Real Data |
| `Application` | Student job apps | NONE | **MISSING** |

### ALL DISCONNECTED / BROKEN FEATURES

| Feature | Frontend | Backend | Database | Problem / Status |
|---|---|---|---|---|
| **Applying to Jobs** | `handleApply` state | MISSING | MISSING | Button exists, no DB model exists. |
| **Recruiter Role** | Dev overrides in App.tsx | `schema.prisma` missing role | - | Role enum only has STUDENT, ADMIN. |
| **TPO Role** | Dev overrides in App.tsx | `schema.prisma` missing role | - | Role enum only has STUDENT, ADMIN. |
| **Recruiter Pipeline** | `RecruiterPipeline.tsx` | MISSING | MISSING | Fully mocked UI. |
| **TPO Analytics** | `TpoAnalytics.tsx` | MISSING | MISSING | Fully static UI. |

---

## 14. FINAL SUMMARY

**CURRENT IMPLEMENTATION STATUS:**
PlaceIntel currently possesses a fully functional, database-backed core engine for User Authentication, Placement and Company Management (Admin), Placement Viewing and Fit-Score calculation (Student), and a highly advanced Vector-DB powered AI RAG Chatbot (FastAPI). 

**PROTOTYPE STATUS:**
The recently developed `Recruiter` and `TPO` interfaces are entirely disconnected visual prototypes. They feature incredibly polished, complex UI components (charts, draggable pipelines, interactive tables) but are populated 100% by hardcoded local arrays (`mockCandidates`, `mockPartners`) and inline static numbers (e.g. `78.4%`). 

Additionally, a critical business feature—**Applying for a Placement**—is missing its backend implementation. The frontend button sets a local state, but there is no `Application` model in the database to record the action.

*This forensic audit is complete. Do not make modifications based on this document until requested.*
