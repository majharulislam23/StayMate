# Spring Boot Authentication Service

A secure authentication service built with Spring Boot 3.2, featuring JWT token-based authentication, Google OAuth2 integration, and a modern Next.js frontend.

## Features

- ✅ User registration with email/password
- ✅ User login with JWT tokens
- ✅ Google OAuth2 authentication
- ✅ JWT access and refresh tokens
- ✅ Role-based access control (RBAC)
- ✅ Password encryption with BCrypt
- ✅ CORS configuration
- ✅ Global exception handling
- ✅ Input validation
- ✅ Docker support with MySQL
- ✅ Multiple Spring profiles (dev, mysql, docker)
- ✅ Next.js frontend with Tailwind CSS

## Project Structure

```
├── docker/
│   └── mysql/
│       └── init/                     # MySQL initialization scripts
├── frontend/                         # Next.js Frontend Application
│   ├── src/
│   │   ├── app/                      # Next.js App Router pages
│   │   ├── components/               # Reusable React components
│   │   ├── context/                  # React context providers
│   │   ├── lib/                      # API client & utilities
│   │   └── types/                    # TypeScript type definitions
│   ├── package.json
│   └── README.md                     # Frontend documentation
├── src/main/java/com/webapp/auth/
│   ├── Application.java              # Main Spring Boot application
│   ├── config/                       # Configuration classes
│   │   └── SecurityConfig.java       # Spring Security configuration
│   ├── controller/                   # REST controllers
│   │   ├── AuthController.java       # Authentication endpoints
│   │   └── UserController.java       # User management endpoints
│   ├── dto/                          # Data Transfer Objects
│   ├── entity/                       # JPA entities
│   ├── exception/                    # Custom exceptions & handlers
│   ├── repository/                   # Data repositories
│   ├── security/                     # Security components
│   │   ├── JwtAuthenticationFilter.java
│   │   ├── JwtTokenProvider.java
│   │   ├── UserPrincipal.java
│   │   └── oauth2/                   # OAuth2 handlers
│   └── service/                      # Business logic
├── src/main/resources/
│   ├── application.properties        # Default configuration (MySQL)
│   ├── application-dev.properties    # Development profile (H2)
│   ├── application-mysql.properties  # MySQL profile (local)
│   └── application-docker.properties # Docker profile (MySQL)
├── docker-compose.yml                # Docker Compose configuration
├── Dockerfile                        # Application Docker image
├── Makefile                          # Convenient commands
└── .env.example                      # Environment variables template
```

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 18+ (for frontend)
- Docker & Docker Compose (for containerized deployment)
- Google OAuth2 credentials (for Google login)

## Quick Start

### Option 1: Run Both Backend & Frontend

```bash
# Terminal 1: Start MySQL and Backend
make mysql
mvn spring-boot:run

# Terminal 2: Start Frontend
cd frontend
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Local Development with H2

```bash
# Run with in-memory H2 database
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Option 3: Full Docker Deployment

```bash
# Copy environment template and configure
cp .env.example .env

# Start all services
make app
```

## Frontend

The project includes a modern Next.js frontend with:

- **Landing Page** - Features overview and call-to-action
- **Login Page** - Email/password and Google OAuth login
- **Registration Page** - New user signup with validation
- **Dashboard** - Protected page showing "Welcome to Spring Boot Dashboard"

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on [http://localhost:3000](http://localhost:3000) and automatically proxies API requests to the Spring Boot backend on port 8080.

### Frontend Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Axios for API calls
- Lucide React for icons

## Docker Commands

| Command | Description |
|---------|-------------|
| `make mysql` | Start MySQL container only |
| `make mysql-stop` | Stop MySQL container |
| `make app` | Start MySQL + App containers |
| `make all` | Start MySQL + App + phpMyAdmin |
| `make stop` | Stop all containers |
| `make clean` | Stop and remove volumes |
| `make logs` | View application logs |
| `make dev-mysql` | Run app locally with MySQL container |

## Configuration

### Database Configuration

Default configuration uses MySQL with:
- **Username**: `root`
- **Password**: `MdAshikur123+`
- **Database**: `authdb`

### Google OAuth2 Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to "APIs & Services" > "Credentials"
4. Create OAuth 2.0 Client ID (Web application)
5. Configure the following:

   **Authorised JavaScript origins:**
   - `http://localhost:3000`

   **Authorised redirect URIs:**
   - `http://localhost:3000/api/auth/google/callback`

6. Set environment variables:

```bash
export GOOGLE_CLIENT_ID=your-client-id
export GOOGLE_CLIENT_SECRET=your-client-secret
```

### JWT Configuration

| Property | Default | Description |
|----------|---------|-------------|
| `app.jwt.secret` | (base64 encoded) | JWT signing secret |
| `app.jwt.access-token-expiration-ms` | 900000 (15 min) | Access token lifetime |
| `app.jwt.refresh-token-expiration-ms` | 604800000 (7 days) | Refresh token lifetime |

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login with email/password | No |
| POST | `/api/auth/refresh-token` | Refresh access token | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/auth/check-email` | Check email availability | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/validate` | Validate JWT token | Yes |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/profile` | Get user profile | Yes |
| PUT | `/api/users/profile` | Update user profile | Yes |
| DELETE | `/api/users/profile` | Delete account | Yes |
| GET | `/api/users/{id}` | Get user by ID | Admin only |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/actuator/health` | Application health status |

## Request/Response Examples

### Register

**Request:**
```json
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "provider": "LOCAL",
    "roles": ["ROLE_USER"],
    "emailVerified": false
  }
}
```

### Login

**Request:**
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "provider": "LOCAL",
    "roles": ["ROLE_USER"],
    "emailVerified": false
  }
}
```

### Accessing Protected Endpoints

Include the JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `3306` |
| `DB_NAME` | Database name | `authdb` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | - |
| `JWT_SECRET` | JWT signing secret (base64) | (default provided) |
| `OAUTH2_REDIRECT_URI` | OAuth2 redirect URI | `http://localhost:3000/oauth2/redirect` |

## Security Features

- **Password Hashing**: BCrypt with strength 10
- **JWT Tokens**: RS256 signed tokens with configurable expiration
- **CORS**: Configured for frontend origins
- **Rate Limiting**: (Can be added with Spring Cloud Gateway)
- **Input Validation**: Jakarta Bean Validation
- **SQL Injection Protection**: JPA/Hibernate parameterized queries
- **XSS Protection**: Proper response content types

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 8080
   lsof -ti:8080 | xargs kill -9
   ```

2. **MySQL connection refused**
   - Ensure MySQL container is running: `docker ps`
   - Check MySQL logs: `docker logs auth-mysql`

3. **Google OAuth not working**
   - Verify redirect URIs match exactly
   - Check client ID and secret are correct
   - Ensure OAuth consent screen is configured

4. **Frontend can't reach backend**
   - Verify backend is running on port 8080
   - Check CORS configuration
   - Ensure proxy configuration in `next.config.js`

## License

MIT