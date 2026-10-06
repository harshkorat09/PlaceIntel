# PlaceIntel — Final Scope & Implementation Plan

## 1. Source of Truth
Use these sources in this order:
1. Official PlaceIntel SRS — Final Revised Version 1.0.
2. `PLACEINTEL_CURRENT_IMPLEMENTATION.md` forensic audit.
3. Approved Stitch UI/design direction.

The SRS defines PlaceIntel as a CHARUSAT placement-information intelligence platform. Semester 5 scope includes manual/admin entry of real placement notices, role-based login, placement search/filtering, company and placement management, analytics, Fit Score, and a grounded chatbot. The SRS explicitly limits the current implementation to manual entry and says automated collection/cloud hosting are outside the current scope. fileciteturn8file0L197-L207

**Core rule:** If a feature cannot be justified by the SRS or is not a necessary dependency of an SRS feature, it must not remain.

---

# 2. Final Product Boundary

PlaceIntel is **not** a recruitment-management platform.

Final application roles:
- Student
- Administrator

Do not keep Recruiter or TPO application roles.

The dataset should use real CHARUSAT placement notices, manually entered by administrators; the SRS expects roughly 50–100 records. fileciteturn8file0L217-L222

---

# 3. Final Student Scope

## Authentication
KEEP:
- Login
- Registration if already supported
- Logout
- Protected student access

## Dashboard
KEEP, but simplify to a clean entry point using only real data:
- real placement summaries
- recent/relevant placements
- real analytics summaries
- placement search entry
- Ask PlaceIntel entry

No invented institutional metrics.

## Placement Opportunities — CORE
KEEP:
- Search
- Skill filter
- Branch filter
- Package range filter
- Year filter
- Open placement details

Listings may show company, position, package range when available, deadline when known, eligible branches, and Fit Score. fileciteturn8file0L460-L469

## Placement Details — CORE
Show:
- Company
- Position
- Package range
- Deadline when known
- CGPA requirement when stated
- Eligible branches
- Required skills
- Full description
- Attachment/reference information where supported
- Personal Fit Score

Missing values must be shown honestly as not specified/not available.

## Fit Score — CORE
Use real:
- Student branch
- Student CGPA
- Student skills
- Placement eligible branches
- Placement CGPA requirement when available
- Placement required skills

Explain the contributing factors. Fit Score is a compatibility guide, not selection probability. Do not hardcode scores or manufacture eligibility. fileciteturn8file0L470-L504

## Analytics — CORE
Keep descriptive, database-backed analytics such as:
- company count
- placement count
- package ranges
- skill demand
- branch distribution
- year-wise trends

Use real backend aggregates. Do not present predictive hiring metrics. fileciteturn8file0L505-L510

## Ask PlaceIntel — CORE
Keep:
Student UI → main API → FastAPI → pgvector/Placement_Chunk → grounded LLM → answer + source notice.

Requirements:
- authenticated student
- reject empty question
- retrieve relevant placement chunks
- preserve source notice
- answer only from evidence
- show source
- show uncertainty when evidence is weak
- safely say it cannot answer when evidence is insufficient
- never hallucinate placement facts

These are explicit SRS guardrails. fileciteturn8file0L521-L547

## Student Profile
KEEP as a supporting feature for Fit Score:
- Name
- Email
- Branch
- CGPA
- Skills

Do not turn it into a resume/career-management product.

---

# 4. Final Admin Scope

## Admin Authentication
KEEP:
- Login
- Logout
- protected routes
- server-side role enforcement

The SRS requires server-side role protection, not merely hidden UI buttons. fileciteturn8file0L449-L459

## Admin Dashboard
KEEP, simplified to real database-backed summaries.

## Companies — CORE
Real CRUD:
- Create
- Read
- Update
- Delete

## Placements — CORE
Real CRUD:
- Create
- Read
- Update
- Delete

Placement management must support:
- company
- position
- package range
- deadline
- CGPA requirement
- description
- skills
- eligible branches
- attachment metadata where supported

## Skills
KEEP real management/read functionality required by the SRS.

## Branches
KEEP real management/read functionality required by the SRS.

## Attachments
KEEP only as placement-notice support; do not create a separate document-management product.

## Analytics
KEEP descriptive, database-backed analytics.

The SRS explicitly identifies the administrator as responsible for company, placement, skill, branch and attachment information and system statistics. fileciteturn8file0L208-L216

---

# 5. Explicitly Remove

## Recruiter
Remove:
- Recruiter dashboard
- Recruiter jobs
- Recruiter job details
- Candidate pipeline
- Candidate profile
- Shortlisting
- Interview scheduling
- Recruiter candidate management

The current audit identifies these as mocked/prototype functionality. fileciteturn7file0L183-L239

## TPO
Remove:
- TPO dashboard
- TPO students
- TPO companies
- TPO analytics
- TPO-specific institutional metrics

The current audit identifies these as static/mock functionality. fileciteturn7file0L409-L429

## Application Management
Remove:
- Application dashboard
- Apply/Applied workflow
- Application status
- Shortlist status
- Interview status
- Offer tracking
- Application conversion metrics

Do not add an Application Prisma model merely to make the prototype Apply button work. The SRS defines a placement deadline as the last date to apply when known, but does not define an in-app application-management system. fileciteturn8file0L683-L715

## Other unsupported prototype features
Remove unless a direct SRS dependency is demonstrated:
- Saved/bookmarked opportunities
- Student calendar
- Student notification center
- Resume/document vault
- Career readiness score
- Placement readiness score
- Institutional benchmark
- Hiring velocity
- Candidate conversion
- Predictive hiring metrics
- Email automation
- Automated placement ingestion
- AWS deployment UI/settings

Automated placement email ingestion is explicitly a future Semester 6 enhancement. fileciteturn8file0L918-L930

---

# 6. Hard Mock/Static Data Policy

No invented/demo data may be presented as real PlaceIntel data.

Remove hardcoded:
- companies
- students
- candidates
- placement records
- packages
- placement rates
- cohort clearance
- median compensation
- Fit Scores
- skill statistics
- branch statistics
- hiring statistics

Every displayed value must be traceable to:
1. PostgreSQL/database record
2. backend calculation from database records
3. authenticated student's stored profile
4. grounded chatbot retrieval

If real data is unavailable, show an honest empty/not-specified state.

The SRS explicitly says the platform is grounded in real placement notices and that missing data should not be invented. fileciteturn8file0L153-L166

---

# 7. Button / Interaction Policy

Every meaningful button must have a real purpose.

- Real supported action → keep and connect.
- Real navigation → keep.
- Decorative/no-op → remove.
- Fake prototype action → remove.
- Unsupported feature → remove.

Do not leave fake Apply, Shortlist, Interview, Export Dossier, candidate actions, or no-op sorting/filtering controls.

---

# 8. Data Integrity

Examples:
- Missing package → “Not specified”
- Missing CGPA requirement → “Not specified”
- Missing deadline → “Not specified”
- Missing eligibility → do not manufacture it
- Weak chatbot evidence → safe no-answer response

The SRS explicitly says missing requirements must not be treated as matches and unusual notice conditions should be preserved rather than invented. fileciteturn8file0L478-L504

---

# 9. Authentication / Authorization

Keep:
- bcrypt
- JWT
- protected routes
- server-side admin checks
- student access
- admin access

Remove frontend developer overrides exposing unsupported Recruiter/TPO roles.

---

# 10. API Contract

Core SRS API responsibilities include:
- login
- companies CRUD
- placements CRUD/search/filter
- skills GET
- stats GET
- placement Fit Score GET
- chat POST

Verify for every service:
- method
- URL
- request shape
- response shape/envelope
- auth
- error behavior
- frontend mapping

No mock arrays when a real API exists.

The SRS endpoint summary defines these responsibilities. fileciteturn8file0L548-L589

---

# 11. UX States

Every major data-backed page must handle:

### Loading
Clean loading state.

### Empty
Example: “No placements match your current filters.”

### Error
Example: “Unable to load placements. Please try again.”

Do not convert API/database failures into empty results. The SRS explicitly requires distinguishable structured errors. fileciteturn8file0L590-L599

### Unauthorized
Return to login when authentication is invalid/expired.

---

# 12. UI Rules

Approved Stitch UI is the visual source of truth. Do not redesign it from scratch.

Preserve:
- Primary Navy `#07203F`
- Deep Midnight `#031024`
- Warm Cream `#F5F3E1`
- White surfaces
- Muted Slate
- subtle borders
- consistent typography
- 16–32px corner radii
- unified top bar
- persistent left navigation where applicable

Avoid:
- purple/violet
- neon/cyan
- gradients
- glassmorphism
- AI glow
- unnecessary decorative cards
- excessive dashboards
- clutter

Simplify the UI as unsupported features are removed.

---

# 13. Final Navigation

## Student
- Dashboard
- Placements
- Analytics
- Ask PlaceIntel
- Profile

## Admin
- Dashboard
- Companies
- Placements
- Skills
- Branches
- Analytics

Do not expose Recruiter, TPO, Applications, Candidate Pipeline, Interviews, Offers, Notifications, or Calendar.

---

# 14. Final User Journeys

## Student
Login/Register
→ Dashboard
→ Placement Opportunities
→ Search/Filter
→ Placement Details
→ Fit Score
→ Analytics / Ask PlaceIntel
→ Logout

## Admin
Admin Login
→ Dashboard
→ Companies / Placements / Skills / Branches
→ Create/Edit/Delete real records
→ Analytics
→ Logout

The SRS student activity diagram shows the same core student flow: authentication, search placements, placement detail, Fit Score, chatbot, analytics and logout. fileciteturn8file0L630-L634

---

# 15. Implementation Order

## Phase 1 — Scope Cleanup
1. Remove Recruiter/TPO routes and UI.
2. Remove application/candidate/interview/offer prototype UI.
3. Remove unsupported navigation.
4. Remove hardcoded mock/demo data.
5. Remove fake institutional metrics.
6. Remove no-op buttons.
7. Remove unsupported frontend role overrides.

## Phase 2 — Core Contract Verification
1. Auth
2. Companies
3. Placements
4. Skills
5. Branches
6. Profile
7. Analytics
8. Fit Score
9. Chatbot

## Phase 3 — Real Data Wiring
1. Replace remaining mock arrays with APIs.
2. Verify API-to-UI mapping.
3. Verify relational IDs.
4. Verify all displayed values originate from real data.

## Phase 4 — UX Completion
1. Loading states
2. Empty states
3. Error states
4. Form validation
5. Auth expiration handling
6. Fit Score explanation
7. Chatbot source/uncertainty states

## Phase 5 — Final UI Polish
1. Approved Stitch consistency
2. Remove clutter
3. Navigation verification
4. Responsive verification
5. Typography/spacing
6. Verify no unsupported feature remains

## Phase 6 — Acceptance Testing
Use real CHARUSAT placement records.

---

# 16. Acceptance Criteria

The system is not complete until:

### Authentication
- Student login works.
- Admin login works.
- Invalid credentials show an actionable error.
- Protected routes enforce authentication.
- Admin permissions are enforced server-side.

### Companies
- Admin can create/edit/delete companies.
- Real company data appears where required.

### Placements
- Admin can create/edit/delete placements.
- Skills and branches use real relationships.
- Student can search and filter by skill, branch, package and year.
- Student can open placement details.

### Fit Score
- Uses real student + placement data.
- Different student profiles can produce different scores.
- Branch logic works.
- CGPA logic works when specified.
- Skill overlap works.
- Missing requirements are not treated as matches.
- Explanation is visible.
- No score is hardcoded.

### Analytics
- Metrics come from real records.
- Counts/ranges/distributions/trends are database-backed.
- No fake institutional statistics remain.

### Chatbot
- Student can ask a question.
- Empty questions are rejected.
- Retrieval uses stored placement chunks.
- Answers are grounded.
- Source notice is displayed.
- Weak/no evidence produces a safe no-answer response.

### UI
- No dead buttons.
- No fake prototype interactions.
- No mock production-facing arrays.
- Loading/empty/error states work.
- Unsupported pages/features are removed.
- Approved Stitch design remains consistent.

---

# 17. Restrictions for Antigravity

DO NOT:
- invent requirements
- invent data
- invent metrics
- create unsupported roles
- create an Application model
- create Recruiter functionality
- create TPO functionality
- add automated email ingestion
- unnecessarily redesign Stitch UI
- replace real APIs with mocks
- make unsupported buttons functional by inventing backend behavior
- modify Prisma schema unless a genuine SRS-supported dependency requires it
- unnecessarily change chatbot architecture
- change Fit Score logic without verifying it against the SRS
- delete core SRS functionality

When uncertain:
`UNKNOWN — REQUIRES VERIFICATION.`

Do not guess.

---

# 18. Definition of Done

PlaceIntel is ready when:
- only SRS-supported functionality remains;
- Student and Administrator are the only application roles;
- all core data comes from database/backend;
- no fake/demo production-facing data remains;
- no dead interactive controls remain;
- placement search/filtering works;
- placement details work;
- Fit Score works and is explainable;
- analytics reflect real records;
- chatbot is grounded and source-aware;
- admin CRUD works;
- authentication/authorization works;
- loading/empty/error states work;
- approved Stitch UI remains visually consistent;
- complete student and admin journeys work end-to-end with real placement records.

## Guiding Principle

> If a feature cannot be justified by the SRS or a necessary dependency of an SRS feature, it should not exist.

> If a value cannot be traced to a database record, backend calculation, authenticated student data, or grounded chatbot retrieval, it must not be displayed as real data.

> If a button has no real purpose, remove it rather than making it look functional.

> Prefer a smaller, completely real PlaceIntel over a larger product full of prototype functionality.
