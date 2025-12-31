# StayMate 🏠

> A comprehensive roommate and property matching platform connecting tenants with landlords and roommates with each other.

StayMate is a full-stack web application that facilitates secure roommate matching, property listings, bookings, and real-time communication. Built with Spring Boot 3.2 (Java 17) backend and Next.js 14 frontend, featuring JWT authentication, OAuth2 integration, WebSocket messaging, and role-based access control.

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture Overview](#-architecture-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Development Workflow](#-development-workflow)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Real-time Features](#-realtime-features)
- [Configuration](#-configuration)
- [Docker Deployment](#-docker-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Features

- **🔐 Authentication & Authorization**
  - Email/password registration and login
  - Google OAuth2 integration
  - JWT-based authentication (access + refresh tokens)
  - Role-based access control (RBAC): Admin, User, House Owner
  - Email and phone verification support

- **👥 User Management**
  - User profiles with bio, profile pictures, and preferences
  - Role selection (Tenant, Landlord)
  - Account management and deletion
  - User search and discovery

- **🏘️ Property Management**
  - Property listings with images, location, pricing
  - Property types: Apartment, House, Room, Studio
  - Search and filter properties by location, price, features
  - Property verification system
  - Property analytics for landlords

- **🤝 Roommate Matching**
  - Roommate posts with preferences (budget, location, move-in date)
  - Filter by gender preference, smoking, pets, occupation
  - Search and browse roommate listings
  - Create, edit, and manage roommate posts

- **📝 Applications & Bookings**
  - Apply for properties
  - Booking request system
  - Booking status management (Pending, Confirmed, Cancelled, Completed)
  - Application tracking for tenants and landlords

- **💬 Real-time Messaging**
  - WebSocket-based real-time chat
  - Private conversations between users
  - Unread message tracking
  - Message history and search

- **🔔 Notifications**
  - Real-time notifications via WebSocket
  - Notification preferences
  - Unread notification counts
  - Notification history

- **⭐ Reviews & Ratings**
  - Property reviews and ratings
  - User reviews
  - Rating aggregation

- **📊 Dashboard (Role-based)**
  - **Tenant Dashboard**: Upcoming visits, recommended properties, compatibility stats
  - **Landlord Dashboard**: Property analytics, booking requests, earnings
  - **Admin Dashboard**: User management, system analytics, platform health

- **🔍 Matching System**
  - Compatibility matching algorithm
  - Match suggestions
  - Match history

- **🚨 Reporting System**
  - User and property reporting
  - Report management (Admin)
  - Report severity and status tracking

- **📱 Responsive Design**
  - Modern UI with Tailwind CSS
  - Dark mode support
  - Mobile-friendly interface

---

## 🏗️ Architecture Overview

StayMate follows a **microservice-ready monolithic architecture** with clear domain separation:

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │Components│  │ Context  │  │   API    │   │
│  │  (App)   │  │ (React)  │  │ Providers│  │  Client  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       └─────────────┴──────────────┴──────────────┘          │
│                     │                                        │
│              HTTP/REST API + WebSocket                       │
└─────────────────────┼────────────────────────────────────────┘
                      │
┌─────────────────────┼────────────────────────────────────────┐
│              Backend (Spring Boot)                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Authentication Layer                    │   │
│  │  ┌──────────────┐  ┌──────────────┐                │   │
│  │  │    JWT       │  │    OAuth2    │                │   │
│  │  │  Provider    │  │   Handler    │                │   │
│  │  └──────────────┘  └──────────────┘                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Domain Layer (DDD)                      │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │   │
│  │  │User  │ │Prop  │ │Book  │ │Msg   │ │Room  │ ... │   │
│  │  │      │ │      │ │      │ │      │ │mate  │     │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘     │   │
│  │  ┌──────────────────────────────────────────────┐   │   │
│  │  │  Controller → Service → Repository           │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Data Layer                              │   │
│  │  ┌──────────────┐  ┌──────────────┐                │   │
│  │  │   JPA/Hib    │  │   Flyway     │                │   │
│  │  │  Repositories│  │  Migrations  │                │   │
│  │  └──────────────┘  └──────────────┘                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Infrastructure                          │   │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐           │   │
│  │  │MySQL │  │WebSoc│  │Actuator│ │Swagger│          │   │
│  │  │      │  │ket   │  │       │  │       │          │   │
│  │  └──────┘  └──────┘  └──────┘  └──────┘           │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
```

### Design Patterns

- **Domain-Driven Design (DDD)**: Clear domain boundaries
- **Strategy Pattern**: Role-based dashboard strategies
- **Repository Pattern**: Data access abstraction
- **DTO Pattern**: Data transfer objects for API responses
- **Mapper Pattern**: Entity ↔ DTO conversion

---

## 🛠️ Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 17 | Core language |
| **Spring Boot** | 3.2.0 | Application framework |
| **Spring Security** | 6.x | Authentication & authorization |
| **Spring Data JPA** | 3.x | Data persistence |
| **Spring WebSocket** | 6.x | Real-time messaging |
| **Spring OAuth2 Client** | 6.x | OAuth2 integration |
| **Hibernate** | 6.x | ORM |
| **MySQL** | 8.0 | Primary database |
| **Flyway** | 9.x | Database migrations |
| **JWT (jjwt)** | 0.12.3 | Token management |
| **Lombok** | Latest | Boilerplate reduction |
| **Maven** | 3.6+ | Build tool |
| **Swagger/OpenAPI** | 2.3.0 | API documentation |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.2.3 | React framework |
| **React** | 18.3.1 | UI library |
| **TypeScript** | 5.4.5 | Type safety |
| **Tailwind CSS** | 3.4.3 | Styling |
| **Axios** | 1.6.8 | HTTP client |
| **STOMP.js** | 7.2.1 | WebSocket client |
| **SockJS** | 1.6.1 | WebSocket fallback |
| **React Hook Form** | 7.69.0 | Form handling |
| **Zod** | 4.2.1 | Schema validation |
| **Recharts** | 3.6.0 | Data visualization |
| **Framer Motion** | 12.23.26 | Animations |
| **Lucide React** | 0.378.0 | Icons |

### Infrastructure

- **Docker & Docker Compose**: Containerization
- **MySQL 8.0**: Database
- **Nginx** (optional): Reverse proxy

---

## 📁 Project Structure

```
StayMate/
├── server/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/webapp/
│   │   │   │   ├── Application.java              # Main entry point
│   │   │   │   ├── auth/                        # Authentication module
│   │   │   │   │   ├── config/                  # Security & WebSocket config
│   │   │   │   │   ├── controller/              # Auth endpoints
│   │   │   │   │   ├── dto/                     # Request/Response DTOs
│   │   │   │   │   ├── entity/                  # User entity
│   │   │   │   │   ├── exception/               # Exception handlers
│   │   │   │   │   ├── mapper/                  # Entity mappers
│   │   │   │   │   ├── repository/              # User repositories
│   │   │   │   │   ├── security/                # JWT & OAuth2
│   │   │   │   │   └── service/                 # Auth services
│   │   │   │   └── domain/                      # Domain modules (DDD)
│   │   │   │       ├── user/                    # User management
│   │   │   │       ├── property/                # Property listings
│   │   │   │       ├── roommate/                # Roommate matching
│   │   │   │       ├── booking/                 # Booking system
│   │   │   │       ├── application/             # Property applications
│   │   │   │       ├── match/                   # Matching algorithm
│   │   │   │       ├── messaging/               # Real-time messaging
│   │   │   │       ├── notification/            # Notifications
│   │   │   │       ├── review/                  # Reviews & ratings
│   │   │   │       ├── report/                  # Reporting system
│   │   │   │       ├── dashboard/               # Dashboard (Strategy pattern)
│   │   │   │       ├── contact/                 # Contact form
│   │   │   │       └── admin/                   # Admin operations
│   │   │   └── resources/
│   │   │       ├── application.properties       # Main config
│   │   │       ├── application-*.properties     # Profile configs
│   │   │       └── db/migration/                # Flyway migrations
│   │   └── test/                                 # Test files
│   ├── Dockerfile                                # Backend Docker image
│   ├── pom.xml                                   # Maven dependencies
│   └── Makefile                                  # Development commands
│
├── frontend/                      # Next.js Frontend
│   ├── src/
│   │   ├── app/                   # Next.js App Router
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── layout.tsx         # Root layout
│   │   │   ├── login/             # Authentication pages
│   │   │   ├── register/
│   │   │   ├── dashboard/         # Dashboard (role-based)
│   │   │   │   ├── page.tsx       # Dashboard router
│   │   │   │   ├── _components/   # Dashboard components
│   │   │   │   ├── admin/         # Admin pages
│   │   │   │   ├── properties/    # Property management
│   │   │   │   └── bookings/      # Booking management
│   │   │   ├── properties/        # Property listings
│   │   │   ├── roommates/         # Roommate posts
│   │   │   ├── messages/          # Messaging UI
│   │   │   ├── notifications/     # Notifications UI
│   │   │   ├── search/            # Search pages
│   │   │   └── ...                # Other pages
│   │   ├── components/            # Reusable components
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── admin/             # Admin components
│   │   │   ├── roommates/         # Roommate components
│   │   │   └── search/            # Search components
│   │   ├── context/               # React contexts
│   │   │   ├── AuthContext.tsx    # Auth state
│   │   │   └── ThemeContext.tsx   # Theme state
│   │   ├── lib/                   # Utilities
│   │   │   ├── api.ts             # API client (Axios)
│   │   │   └── socket.ts          # WebSocket client
│   │   └── types/                 # TypeScript types
│   │       └── auth.ts
│   ├── public/                    # Static assets
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── docker/                        # Docker configurations
│   └── mysql/
│       └── init/                  # MySQL init scripts
│
├── docker-compose.yml             # Docker Compose setup
└── README.md                      # This file
```

---

## 📦 Prerequisites

- **Java 17+** (JDK 17 or higher)
- **Maven 3.6+**
- **Node.js 18+** and npm
- **Docker & Docker Compose** (for containerized setup)
- **MySQL 8.0** (if running without Docker)
- **Google OAuth2 Credentials** (for Google login)

---

## 🚀 Quick Start

### Option 1: Full Local Development (Recommended)

```bash
# Terminal 1: Start MySQL and Backend
cd server
make mysql              # Start MySQL container
mvn spring-boot:run     # Run Spring Boot (uses MySQL profile)

# Terminal 2: Start Frontend
cd frontend
npm install
npm run dev

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
# API Docs: http://localhost:8080/swagger-ui.html
```

### Option 2: H2 In-Memory Database (Fast Testing)

```bash
# Backend only (no MySQL needed)
cd server
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

### Option 3: Full Docker Deployment

```bash
# From project root
docker-compose up -d mysql        # Start MySQL
cd server
make build                        # Build backend image
cd ../frontend
docker build -t staymate-frontend .  # Build frontend image

# Or use Makefile commands
make all                          # Start all services (MySQL + App)
```

### Option 4: Using Makefile Commands

```bash
# From server directory
make mysql                        # Start MySQL container
make dev-mysql                    # Run app locally with MySQL
make test                         # Run tests
make package                      # Build JAR
```

---

## 💻 Development Workflow

### Backend Development

1. **Start MySQL**:
   ```bash
   cd server
   make mysql
   ```

2. **Run with Auto-reload**:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=mysql
   ```
   Spring Boot DevTools will auto-reload on code changes.

3. **Run Tests**:
   ```bash
   mvn test
   ```

4. **Create Database Migration**:
   ```bash
   # Add SQL file to server/src/main/resources/db/migration/
   # Format: V{version}__{description}.sql
   # Example: V16__add_user_preferences.sql
   ```

5. **Check Database**:
   ```bash
   make db-shell  # Open MySQL shell
   ```

### Frontend Development

1. **Install Dependencies**:
```bash
cd frontend
npm install
   ```

2. **Start Development Server**:
   ```bash
npm run dev
```

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

4. **Linting**:
```bash
   npm run lint
   ```

### Code Structure Guidelines

- **Backend**: Follow domain-driven design principles
  - Each domain has its own package: `controller`, `service`, `repository`, `entity`, `dto`, `mapper`
  - Use DTOs for API requests/responses
  - Use Mappers to convert between entities and DTOs

- **Frontend**: Follow Next.js App Router conventions
  - Pages in `src/app/`
  - Reusable components in `src/components/`
  - API client in `src/lib/api.ts`
  - Types in `src/types/`

### Git Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "Add feature"`
3. Push and create PR: `git push origin feature/your-feature`

---

## 📚 API Documentation

### Base URL

- **Local**: `http://localhost:8080`
- **Production**: `https://your-domain.com`

### Authentication

All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <access_token>
```

### API Endpoints

#### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | No |
| `POST` | `/api/auth/login` | Login with email/password | No |
| `POST` | `/api/auth/refresh-token` | Refresh access token | No |
| `GET` | `/api/auth/me` | Get current user | Yes |
| `GET` | `/api/auth/check-email` | Check email availability | No |
| `POST` | `/api/auth/logout` | Logout user | Yes |
| `GET` | `/api/auth/validate` | Validate JWT token | Yes |
| `POST` | `/api/auth/select-role` | Select user role (Tenant/Landlord) | Yes |
| `GET` | `/oauth2/authorization/google` | Initiate Google OAuth | No |

#### Users (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/users/profile` | Get user profile | Yes |
| `PUT` | `/api/users/profile` | Update user profile | Yes |
| `DELETE` | `/api/users/profile` | Delete account | Yes |
| `GET` | `/api/users/search` | Search users | Yes |

#### Properties (`/api/properties`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/properties` | List/search properties | No |
| `GET` | `/api/properties/{id}` | Get property details | No |
| `POST` | `/api/properties` | Create property | Landlord |
| `PUT` | `/api/properties/{id}` | Update property | Landlord (owner) |
| `DELETE` | `/api/properties/{id}` | Delete property | Landlord (owner) |
| `GET` | `/api/properties/my` | Get my properties | Landlord |

#### Roommates (`/api/roommates`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/roommates` | Search roommate posts | No |
| `GET` | `/api/roommates/{id}` | Get roommate post | No |
| `POST` | `/api/roommates` | Create roommate post | Yes |
| `PUT` | `/api/roommates/{id}` | Update roommate post | Yes (owner) |
| `DELETE` | `/api/roommates/{id}` | Delete roommate post | Yes (owner) |
| `GET` | `/api/roommates/my` | Get my posts | Yes |

#### Bookings (`/api/bookings`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/bookings` | Create booking | Yes |
| `GET` | `/api/bookings/my-bookings` | Get my bookings | Yes |
| `GET` | `/api/bookings/requests` | Get booking requests | Landlord |
| `PATCH` | `/api/bookings/{id}/status` | Update booking status | Yes |
| `DELETE` | `/api/bookings/{id}` | Cancel booking | Yes |

#### Applications (`/api/applications`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/applications` | Submit application | Tenant |
| `GET` | `/api/applications/my` | Get my applications | Tenant |
| `GET` | `/api/applications/property/{propertyId}` | Get property applications | Landlord |
| `PATCH` | `/api/applications/{id}/status` | Update application status | Landlord |

#### Messages (`/api/messages`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/messages/conversations` | Get conversations | Yes |
| `GET` | `/api/messages/conversations/{id}` | Get conversation | Yes |
| `POST` | `/api/messages/conversations` | Create conversation | Yes |
| `GET` | `/api/messages/conversations/{id}/messages` | Get messages | Yes |
| `POST` | `/api/messages/send` | Send message | Yes |
| `POST` | `/api/messages/read` | Mark as read | Yes |
| `GET` | `/api/messages/unread-count` | Get unread count | Yes |

#### Notifications (`/api/notifications`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/notifications` | Get notifications | Yes |
| `GET` | `/api/notifications/unread-count` | Get unread count | Yes |
| `POST` | `/api/notifications/{id}/read` | Mark as read | Yes |
| `DELETE` | `/api/notifications/{id}` | Delete notification | Yes |

#### Dashboard (`/api/dashboard`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/dashboard/stats` | Get dashboard stats (role-based) | Yes |

#### Admin (`/api/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/admin/users` | List all users (paginated) | Admin |
| `POST` | `/api/admin/users` | Create user | Admin |
| `PUT` | `/api/admin/users/{id}` | Update user | Admin |
| `DELETE` | `/api/admin/users/{id}` | Delete user | Admin |
| `GET` | `/api/admin/stats` | Admin dashboard stats | Admin |

#### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/actuator/health` | Application health status |

### WebSocket Endpoints

- **Connection**: `ws://localhost:8080/ws`
- **Subscribe**: `/user/queue/messages` (private messages)
- **Send**: `/app/chat` (send message)

### API Response Format

#### Success Response
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Error Response
```json
{
  "timestamp": "2024-01-01T00:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/auth/register"
}
```

### Example API Calls

#### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
  "email": "user@example.com",
  "password": "SecurePass123"
  }'
```

#### Get Profile (Authenticated)
```bash
curl -X GET http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer <access_token>"
```

---

## 🗄️ Database Schema

### Core Entities

#### Users
- **users**: User accounts with authentication info
- **user_roles**: User roles (ROLE_USER, ROLE_ADMIN, ROLE_HOUSE_OWNER)

#### Properties
- **properties**: Property listings with details (title, description, location, price, features)

#### Roommates
- **roommate_posts**: Roommate search posts with preferences

#### Bookings
- **bookings**: Booking requests and confirmations

#### Applications
- **applications**: Property applications with status

#### Messaging
- **conversations**: Conversation threads between users
- **messages**: Individual messages in conversations

#### Notifications
- **notifications**: User notifications

#### Reviews & Reports
- **reviews**: Property/user reviews
- **reports**: User/property reports

### Entity Relationships

```
User (1) ──── (N) Property (owned by)
User (1) ──── (N) RoommatePost
User (1) ──── (N) Booking (as tenant/landlord)
Property (1) ──── (N) Application
User (1) ──── (N) Conversation (as participant)
Conversation (1) ──── (N) Message
User (1) ──── (N) Notification
```

### Database Migrations

Migrations are managed by Flyway and located in `server/src/main/resources/db/migration/`:

- `V1__init_schema.sql`: Initial schema
- `V2__create_property_table.sql`: Property table
- `V3__create_bookings_table.sql`: Bookings
- `V5__create_review_and_report_tables.sql`: Reviews & reports
- `V11__roomate_posts.sql`: Roommate posts
- ... and more

To create a new migration:
1. Create SQL file: `V{next_version}__{description}.sql`
2. Place in `server/src/main/resources/db/migration/`
3. Flyway will automatically apply it on next startup

---

## 🔌 Real-time Features

### WebSocket Configuration

StayMate uses **Spring WebSocket** with **STOMP** protocol for real-time messaging:

- **Backend**: SockJS endpoint at `/ws`
- **Frontend**: STOMP client with SockJS fallback
- **Authentication**: JWT token in connection headers

### WebSocket Flow

1. **Connection**: Client connects to `/ws` with JWT token
2. **Authentication**: Server validates token via `WebSocketAuthInterceptor`
3. **Subscription**: Client subscribes to `/user/queue/messages`
4. **Messaging**: Messages sent via `/app/chat`, received on subscribed queue

### Implementation Details

**Backend** (`WebSocketConfig.java`):
```java
- Endpoint: /ws (SockJS)
- Broker: /topic, /queue, /user
- App prefix: /app
- User prefix: /user
```

**Frontend** (`lib/socket.ts`):
```typescript
- Connect to ws://localhost:8080/ws
- Subscribe to /user/queue/messages
- Send to /app/chat
```

### Real-time Features Available

- ✅ Real-time messaging
- ✅ Notification delivery
- ✅ Unread count updates
- ✅ Typing indicators (can be added)

---

## ⚙️ Configuration

### Backend Configuration

Configuration files are in `server/src/main/resources/`:

- **application.properties**: Default (MySQL)
- **application-dev.properties**: Development (H2 in-memory)
- **application-mysql.properties**: MySQL local
- **application-docker.properties**: Docker MySQL

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `3306` |
| `DB_NAME` | Database name | `authdb` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | (required) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | (required) |
| `JWT_SECRET` | JWT signing secret | (default provided) |
| `OAUTH2_REDIRECT_URI` | OAuth2 redirect URI | `http://localhost:3000/oauth2/redirect` |
| `ADMIN_SECRET_KEY` | Admin secret key | (default provided) |

### Frontend Configuration

Environment variables (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
BACKEND_URL=http://localhost:8080
```

### Google OAuth2 Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select project
3. Enable Google+ API
4. Create OAuth 2.0 Client ID (Web application)
5. Configure:
   - **Authorized JavaScript origins**: `http://localhost:3000`, `http://localhost:8080`
   - **Authorized redirect URIs**:
     - `http://localhost:8080/login/oauth2/code/google` (backend)
     - `http://localhost:3000/oauth2/redirect` (frontend)
6. Set environment variables:
   ```bash
   export GOOGLE_CLIENT_ID=your-client-id
   export GOOGLE_CLIENT_SECRET=your-client-secret
   ```

### JWT Configuration

| Property | Default | Description |
|----------|---------|-------------|
| `app.jwt.secret` | (base64) | JWT signing secret (512-bit recommended) |
| `app.jwt.access-token-expiration-ms` | 900000 (15 min) | Access token lifetime |
| `app.jwt.refresh-token-expiration-ms` | 604800000 (7 days) | Refresh token lifetime |

**Generate JWT Secret**:
```bash
openssl rand -base64 64
```

---

## 🐳 Docker Deployment

### Docker Compose Services

- **mysql-db**: MySQL 8.0 database
- **app**: Spring Boot backend (optional, via profile)
- **frontend**: Next.js frontend (optional)

### Quick Start with Docker

```bash
# Start MySQL only
docker-compose up -d mysql

# Start all services (if configured)
docker-compose --profile app up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Clean volumes
docker-compose down -v
```

### Makefile Commands (from `server/`)

```bash
make mysql          # Start MySQL container
make mysql-stop     # Stop MySQL container
make app            # Build and start app container
make all            # Start all services
make logs           # View logs
make clean          # Stop and remove volumes
make db-shell       # Open MySQL shell
make db-reset       # Reset database (WARNING: deletes data)
```

### Building Docker Images

**Backend**:
```bash
cd server
docker build -t staymate-backend .
```

**Frontend**:
```bash
cd frontend
docker build -t staymate-frontend .
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Backend (8080)**:
   ```bash
# Find process
lsof -i :8080

# Kill process
kill -9 <PID>
# Or
   lsof -ti:8080 | xargs kill -9
   ```

**Frontend (3000)**:
```bash
lsof -ti:3000 | xargs kill -9
```

**MySQL (3306)**:
```bash
lsof -ti:3306 | xargs kill -9
# Or stop Docker container
docker-compose stop mysql
```

#### 2. MySQL Connection Refused

```bash
# Check if MySQL is running
docker ps | grep mysql

# Check MySQL logs
docker logs staymate-mysql

# Restart MySQL
docker-compose restart mysql
```

#### 3. Google OAuth Not Working

- Verify redirect URIs match exactly (no trailing slashes)
   - Check client ID and secret are correct
   - Ensure OAuth consent screen is configured
- Check browser console for CORS errors

#### 4. Frontend Can't Reach Backend

- Verify backend is running: `curl http://localhost:8080/actuator/health`
- Check CORS configuration in `SecurityConfig.java`
- Verify proxy in `next.config.js`
- Check browser network tab for errors

#### 5. Database Migration Failures

```bash
# Check Flyway status
mvn flyway:info

# Repair Flyway (if needed)
mvn flyway:repair

# Reset database (WARNING: deletes data)
make db-reset
```

#### 6. WebSocket Connection Fails

- Verify JWT token is valid
- Check `WebSocketAuthInterceptor` logs
- Ensure CORS allows WebSocket connections
- Check browser console for connection errors

#### 7. Build Errors

**Maven**:
```bash
# Clean and rebuild
mvn clean install

# Skip tests
mvn clean install -DskipTests
```

**npm**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes**
4. **Run tests**: `mvn test` (backend), `npm test` (frontend)
5. **Commit**: `git commit -m "Add feature"`
6. **Push**: `git push origin feature/your-feature`
7. **Create Pull Request**

### Code Style

- **Backend**: Follow Java conventions, use Lombok where appropriate
- **Frontend**: Follow ESLint rules, use TypeScript strict mode
- **Commits**: Use conventional commits format

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🙏 Acknowledgments

- Spring Boot team
- Next.js team
- All open-source contributors

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review API documentation at `/swagger-ui.html`

---

**Happy Coding! 🚀**
