# 🎁 Donation Management System

🌎 Languages: [English](README.en-US.md) | [Português (Brasil)](README.pt-BR.md)

Complete system for NGOs to manage donations, control inventory, track batches, and generate barcode labels. Built to make daily operations simpler, faster, and fully traceable.

## ✨ Features

### 📊 Dashboard & Metrics
- Interactive dashboard with real-time metrics
- Critical alerts: expiring batches, low stock, out-of-stock products
- Stock evolution chart for the last 30 days
- Top 5 most distributed products

### 🏷️ Product Management
- Categories with icons
- Products and kits (bundle builder)
- Advanced filters by name, category, and type (product/kit)
- Kit assembly automatically consumes component stock

### 📦 Inventory Control
- Batches with quantity, expiration date, size, voltage, and notes
- Stock movements: inbound, outbound, loss, and adjustments
- Quick donation intake for multiple items at once
- EAN-13 barcodes (PNG) and bulk PDF label export
- Full traceability of all movements

### 🔐 Security & Users
- JWT authentication with ADMIN and VOLUNTARIO roles
- User management (create, edit, delete) for ADMIN
- Role-based access control on routes

### 🛠️ Infrastructure
- API docs with Swagger/OpenAPI
- Fully containerized with Docker
- Responsive for desktop, tablet, and mobile

## 🧱 Tech Stack

### Backend
- Spring Boot 3
- PostgreSQL
- Spring Security + JWT
- ZXing (EAN-13)
- OpenAPI/Swagger
- Docker

### Frontend
- React 19 with TypeScript
- Vite for optimized builds
- TanStack React Query for server state
- React Router v7
- Tailwind CSS + shadcn/ui
- Recharts for charts
- Tabler Icons
- Sonner for toasts
- Feature-Sliced Design

## 🚀 How to Run

### 1) Prerequisites
- Docker + Docker Compose
- Node.js 18+
- Java 17+
- Git

### 2) .env Setup (Important)

#### Backend
```bash
cd backend
cp .env.example .env
```

**Required** (set before running):
- `JWT_SECRET` — Secret key to sign JWTs (min 256 bits recommended)
- `JWT_EXPIRATION` — Token expiration in ms (e.g., `86400000` = 1 day)

**Optional** (defaults provided):
- `SPRING_DATASOURCE_URL` (default `jdbc:postgresql://db:5432/ong_db`)
- `SPRING_DATASOURCE_USERNAME` (default `admin`)
- `SPRING_DATASOURCE_PASSWORD` (default `admin`)
- `JWT_ACCESS_TOKEN_EXPIRATION` (default `1800000` = 30 min)
- `JWT_REFRESH_TOKEN_EXPIRATION` (default `604800000` = 7 days)
- `SERVER_PORT` (default `8080`)

**Example `.env`:**
```env
JWT_SECRET=your-256-bit-secret-key
JWT_EXPIRATION=86400000
```

#### Frontend (Optional)
```bash
cd frontend
```

Create `.env` if you want to override the API URL:
```env
VITE_API_URL=http://localhost:8080
```
Default without `.env` is `http://localhost:8080`.

### 3) Run with Docker (recommended)

`docker-compose.yml` brings up everything (DB, backend, frontend).

#### Option A: All services
```bash
cd backend
docker compose up --build -d
```

This starts:
- PostgreSQL on `5432`
- Backend on `8080`
- Frontend on `5173`

Access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui/index.html

Default users:
- `admin@ong.com` / `admin123`
- `admin2@ong.com` / `admin123`

#### Option B: Backend + DB only (frontend local)
```bash
cd backend
docker compose up db backend --build -d
```

Then in another terminal:
```bash
cd frontend
npm install
npm run dev
```

### 4) Run without Docker

#### Extra prerequisites
- PostgreSQL running locally
- Database created: `ong_db`

Create DB:
```bash
psql -U postgres
CREATE DATABASE ong_db;
CREATE USER admin WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE ong_db TO admin;
\q
```

#### Backend
```bash
cd backend
cp .env.example .env
```

Set `.env` for localhost:
```env
JWT_SECRET=your-256-bit-secret-key
JWT_EXPIRATION=86400000
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ong_db
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=admin
```

Start backend:
```bash
./mvnw spring-boot:run
```
Backend: http://localhost:8080

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

#### Helpful Docker commands
```bash
cd backend
docker compose logs -f
docker compose down
docker compose down -v
docker compose up --build backend -d
docker compose ps
```

Note: On the first run, `DataInitializer` may take a few seconds to seed test data. Wait for `✅ Inicialização completa!` in logs before using the app.

## 📚 API Documentation
- Swagger UI: http://localhost:8080/swagger-ui/index.html

## 🏗️ Project Structure

### Backend
```
backend/
├── src/main/java/com/ong/backend/
│   ├── config/           # Security, CORS, OpenAPI, DataInitializer
│   ├── controllers/      # REST Controllers
│   ├── dto/              # Request/Response DTOs
│   ├── exceptions/       # Global Exception Handler
│   ├── models/           # JPA entities
│   ├── repositories/     # JPA repositories
│   ├── security/         # JWT authentication & authorization
│   ├── services/         # Business rules
│   └── specifications/   # JPA Specifications for filters
└── resources/
    └── application.properties
```

### Frontend (Feature-Sliced Design)
```
frontend/
└── src/
    ├── features/
    │   ├── auth/
    │   │   ├── api/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   └── types/
    │   ├── categorias/
    │   ├── doacoes/
    │   ├── lotes/
    │   ├── movimentacoes/
    │   ├── produtos/
    │   └── usuarios/
    ├── shared/
    │   ├── api/
    │   ├── components/
    │   │   ├── data-display/
    │   │   ├── forms/
    │   │   └── layout/
    │   ├── hooks/
    │   ├── lib/
    │   └── types/
    ├── pages/
    ├── components/
    └── services/
```

## 📱 Usage Flow
1. Login at `/login` with `admin@ong.com` / `admin123`
2. Dashboard: view metrics and critical alerts
3. Create Category: name, description, icon
4. Register Product: single item or kit
5. Record Donation: use Quick Intake for multiple items
6. Generate Labels: automatic EAN-13 (PNG or bulk PDF)
7. Move Stock: inbound, outbound, loss, adjustments
8. Build Kits: consume components automatically
9. Manage Users (ADMIN): create, edit, remove users

## 🔒 Roles & Permissions

### ADMIN
- Full system access
- Full CRUD on all entities
- User management
- Metrics and reports

### VOLUNTARIO
- Dashboard and metrics
- CRUD for categories, products, batches
- Donation and movement records
- Label generation
- Kit assembly
- Cannot manage users

## 🤝 Contributing
1. Fork the repo
2. Create a branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit:
   ```bash
   git commit -m "feat: your change"
   ```
4. Push and open a Pull Request

## 🐛 Report Issues
Open an [issue](https://github.com/CassianoProenca/donation-system/issues) with:
- Clear description
- Steps to reproduce
- Expected result
- Screenshots if possible

## 📄 License
MIT — see LICENSE.

## 👨‍💻 Author
**Cassiano Proença**
- GitHub: [CassianoProenca](https://github.com/CassianoProenca)
- Email: cassianomeloprofissional@gmail.com

---

⭐ If this project helped you, consider starring the repo!
