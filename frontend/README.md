# Spring Boot Auth - Next.js Frontend

A modern, responsive authentication frontend built with Next.js 14, TypeScript, and Tailwind CSS. This frontend integrates seamlessly with the Spring Boot backend for user registration, login, and Google OAuth authentication.

## Features

- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔐 **JWT Authentication** - Secure token-based authentication
- 🔑 **Google OAuth** - One-click sign in with Google
- 📱 **Responsive** - Works on all devices
- ⚡ **Fast** - Built with Next.js 14 for optimal performance
- 🔄 **Auto Token Refresh** - Automatic JWT token refresh
- 🛡️ **Protected Routes** - Route guards for authenticated pages

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Spring Boot backend running on port 8080

## Getting Started

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_OAUTH_REDIRECT_URI=http://localhost:3000/oauth2/redirect
```

### 3. Start Development Server

```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── login/
│   │   │   └── page.tsx       # Login page
│   │   ├── register/
│   │   │   └── page.tsx       # Registration page
│   │   ├── dashboard/
│   │   │   └── page.tsx       # Protected dashboard
│   │   └── oauth2/
│   │       └── redirect/
│   │           └── page.tsx   # OAuth2 callback handler
│   ├── components/            # Reusable components
│   ├── context/
│   │   └── AuthContext.tsx    # Authentication context provider
│   ├── lib/
│   │   └── api.ts             # API client with axios
│   └── types/
│       └── auth.ts            # TypeScript type definitions
├── public/                    # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Pages

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Landing page with features overview | No |
| `/login` | User login with email/password or Google | No |
| `/register` | New user registration | No |
| `/dashboard` | User dashboard after login | Yes |
| `/oauth2/redirect` | OAuth2 callback handler | No |

## Authentication Flow

### Email/Password Login

1. User enters credentials on `/login`
2. Frontend sends POST to `/api/auth/login`
3. Backend returns JWT tokens
4. Tokens stored in cookies
5. User redirected to `/dashboard`

### Google OAuth Login

1. User clicks "Continue with Google"
2. Redirected to Spring Boot OAuth2 endpoint
3. Google authentication completes
4. Spring Boot redirects to `/oauth2/redirect` with tokens
5. Frontend stores tokens and redirects to `/dashboard`

## API Integration

The frontend communicates with the Spring Boot backend through:

- **Proxy Rewrites** - Next.js proxies `/api/*` requests to the backend
- **Axios Interceptors** - Automatic token attachment and refresh
- **Error Handling** - Centralized error handling with retry logic

## Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

## Styling

This project uses Tailwind CSS with custom components defined in `globals.css`:

- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary buttons
- `.btn-google` - Google OAuth button
- `.input-field` - Form input fields
- `.card` - Card containers
- `.link` - Styled links

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8080` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID | - |
| `NEXT_PUBLIC_OAUTH_REDIRECT_URI` | OAuth redirect URI | `http://localhost:3000/oauth2/redirect` |

## Development Tips

### Running with Backend

1. Start MySQL: `docker-compose up -d mysql`
2. Start Spring Boot: `mvn spring-boot:run`
3. Start Frontend: `cd frontend && npm run dev`

### Testing OAuth

For Google OAuth to work locally:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project, then go to "APIs & Services" > "Credentials"
3. Create OAuth 2.0 Client ID (Web application)
4. Configure the following:

   **Authorised JavaScript origins:**
   - `http://localhost:3000`

   **Authorised redirect URIs:**
   - `http://localhost:3000/api/auth/google/callback`

5. Set your Google Client ID and Secret in the backend `application.properties`:
   ```properties
   spring.security.oauth2.client.registration.google.client-id=your-client-id
   spring.security.oauth2.client.registration.google.client-secret=your-client-secret
   ```

   Or as environment variables:
   ```bash
   export GOOGLE_CLIENT_ID=your-client-id
   export GOOGLE_CLIENT_SECRET=your-client-secret
   ```

## Building for Production

```bash
npm run build
npm run start
```

Or use Docker:

```bash
docker build -t auth-frontend .
docker run -p 3000:3000 auth-frontend
```

## License

MIT