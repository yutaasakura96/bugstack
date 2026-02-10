# BugStack

A modern, full-stack issue tracking application built with Next.js 16, TypeScript, and PostgreSQL. BugStack provides a clean and intuitive interface for teams to manage bugs, track progress, and collaborate on software development projects.

## Project Overview

**BugStack** is a comprehensive issue tracking system designed to help development teams efficiently manage and resolve software issues. The application provides a centralized platform for creating, assigning, tracking, and analyzing bugs throughout the software development lifecycle.

### What it Does
- Create, edit, and delete issues with rich markdown descriptions
- Assign issues to team members
- Track issue status (Open, In Progress, Closed)
- Filter and search issues by status
- Visualize issue statistics with interactive charts
- Display latest issues on a dashboard
- Authenticate users via Google OAuth

### Who it's For
- Software development teams looking for a lightweight issue tracker
- Project managers who need to monitor bug resolution progress
- Individual developers who want to track issues in their personal projects
- Teams seeking an alternative to heavyweight project management tools

## Features

- **Issue Management**
  - Create issues with title and markdown-formatted descriptions
  - Edit existing issues with real-time updates
  - Delete issues with confirmation dialog
  - Rich text editing with SimpleMDE markdown editor
  
- **Issue Assignment & Status**
  - Assign issues to registered users
  - Update issue status (Open, In Progress, Closed)
  - Filter issues by status
  - Unassign issues when needed
  
- **Dashboard Analytics**
  - Visual summary of issue counts by status
  - Interactive charts showing issue distribution
  - Latest issues widget with quick access
  - Real-time data updates
  
- **Authentication & Authorization**
  - Google OAuth integration
  - Session-based authentication with JWT
  - Protected routes for authenticated users only
  - Secure user profile management
  
- **User Experience**
  - Responsive design for mobile and desktop
  - Loading skeletons for better perceived performance
  - Toast notifications for user actions
  - Pagination for large issue lists
  - Client-side and server-side validation

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form state management
- **React Markdown** - Markdown rendering
- **SimpleMDE** - Markdown editor
- **Recharts** - Charting library for data visualization

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM 7** - Database ORM with type safety
- **PostgreSQL** - Relational database
- **NextAuth.js 4** - Authentication library
- **Zod** - Schema validation

### Styling & UI
- **Radix UI Themes** - Component library
- **Radix UI Icons** - Icon set
- **React Icons** - Additional icon library
- **Tailwind Typography** - Typography plugin
- **ClassNames** - Conditional className utility

### Dev Tools & Utilities
- **ESLint** - Code linting
- **Prisma Studio** - Database GUI
- **React Loading Skeleton** - Loading placeholders
- **React Hot Toast** - Toast notifications

### State Management & Data Fetching
- **TanStack React Query** - Server state management
- **Axios** - HTTP client
- **React Query DevTools** - Development debugging tools

### Monitoring & Error Tracking
- **Sentry** - Real-time error monitoring and reporting

## Libraries & Frameworks

### Core Dependencies

- **Next.js** - Server-side rendering, static site generation, and API routes
- **React** - Component-based UI development
- **TypeScript** - Type safety and better developer experience
- **Prisma** - Type-safe database client and migrations
- **NextAuth.js** - Complete authentication solution with OAuth providers
- **Zod** - Runtime type validation for forms and API requests
- **React Hook Form** - Performant form validation with minimal re-renders
- **TanStack React Query** - Powerful async state management, caching, and synchronization
- **Radix UI** - Unstyled, accessible UI components with full keyboard navigation
- **Tailwind CSS** - Rapid UI development with utility classes
- **Axios** - Promise-based HTTP client for API requests
- **Recharts** - Composable charting library for React
- **SimpleMDE** - User-friendly markdown editor
- **React Markdown** - Safely render markdown content
- **React Hot Toast** - Lightweight toast notifications
- **React Loading Skeleton** - Beautiful animated loading placeholders
- **Sentry** - Application monitoring and error tracking

## APIs & Integrations

### Authentication
- **Google OAuth 2.0** - User authentication via Google accounts
  - Managed through NextAuth.js with Prisma adapter
  - JWT-based session strategy
  - Secure token handling

### Database
- **PostgreSQL** - Primary data store
  - Hosted on Neon (serverless PostgreSQL)
  - Connection pooling with Prisma
  - Support for both direct and pooled connections

### Third-Party Services
- **Sentry** - Error tracking and performance monitoring
  - Real-time error reporting
  - Stack trace analysis
  - Performance metrics

### Internal APIs
All API routes are built as Next.js API Routes:
- `/api/auth` - Authentication endpoints (NextAuth)
- `/api/issues` - CRUD operations for issues
- `/api/issues/[id]` - Individual issue operations
- `/api/users` - User management endpoints

## Architecture & Structure

### High-Level Architecture

BugStack follows the Next.js App Router architecture with a clear separation between client and server components:

```
Frontend (React) ↔ API Routes (Next.js) ↔ Prisma ORM ↔ PostgreSQL Database
                         ↓
                  NextAuth.js (Authentication)
                         ↓
                  Google OAuth Provider
```

### Project Structure

```
bugstack/
├── app/                          # Next.js App Router directory
│   ├── api/                      # API route handlers
│   │   ├── auth/                 # NextAuth authentication
│   │   ├── issues/               # Issue CRUD operations
│   │   └── users/                # User management
│   ├── auth/                     # Authentication configuration
│   │   └── authOptions.ts        # NextAuth options
│   ├── components/               # Reusable UI components
│   │   ├── ErrorMessage.tsx
│   │   ├── IssueStatusBadge.tsx
│   │   ├── Link.tsx
│   │   ├── Pagination.tsx
│   │   ├── Skeleton.tsx
│   │   └── Spinner.tsx
│   ├── issues/                   # Issue-related pages
│   │   ├── _components/          # Issue-specific components
│   │   ├── [id]/                 # Individual issue page
│   │   ├── edit/[id]/            # Edit issue page
│   │   ├── list/                 # Issue list page
│   │   └── new/                  # Create issue page
│   ├── layout.tsx                # Root layout with navbar
│   ├── page.tsx                  # Dashboard homepage
│   ├── NavBar.tsx                # Main navigation
│   ├── IssueChart.tsx            # Dashboard chart component
│   ├── IssueSummary.tsx          # Dashboard summary cards
│   ├── LatestIssues.tsx          # Latest issues widget
│   ├── QueryClientProvider.tsx   # React Query setup
│   └── validationSchemas.ts      # Zod validation schemas
├── prisma/                       # Database configuration
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Database migrations
│   └── client.ts                 # Prisma client instance
├── public/                       # Static assets
├── .env.example                  # Environment variable template
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

### Key Design Patterns

- **Server Components by Default** - Leverage React Server Components for optimal performance
- **Client Components When Needed** - Use `'use client'` for interactive features
- **API Route Handlers** - RESTful API design with proper HTTP methods
- **Optimistic Updates** - React Query for optimistic UI updates
- **Form Validation** - Client-side and server-side validation with Zod
- **Type Safety** - End-to-end type safety from database to UI
- **Separation of Concerns** - Clear separation between data fetching, business logic, and presentation

## Setup & Installation

### Prerequisites

- **Node.js** >= 20.x
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database (local or cloud-hosted like Neon)
- **Google OAuth credentials** (from Google Cloud Console)
- **Sentry account** (optional, for error monitoring)

### Environment Variables

Create a `.env` file in the root directory with the following variables (see `.env.example` for reference):

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@host:port/database"
DIRECT_URL="postgresql://user:password@host:port/database"

# Database Credentials (if using separate variables)
DATABASE_USER="your_db_user"
DATABASE_PASSWORD="your_db_password"
DATABASE_NAME="your_db_name"
DATABASE_HOST="your_db_host"
DATABASE_PORT="5432"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Sentry (Optional)
SENTRY_AUTH_TOKEN="your_sentry_auth_token"
```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bugstack.git
   cd bugstack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual credentials
   ```

4. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations**
   ```bash
   npm run prisma:migrate:dev
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Additional Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Open Prisma Studio (Database GUI)
npm run prisma:studio

# Format Prisma schema
npm run prisma:format

# Deploy migrations to production
npm run prisma:migrate:deploy
```

## Usage

### Getting Started

1. **Sign In**
   - Click "Sign In" in the navigation bar
   - Authenticate with your Google account
   - You'll be redirected to the dashboard

2. **View Dashboard**
   - See issue statistics (Open, In Progress, Closed)
   - View interactive chart of issue distribution
   - Check the latest issues

3. **Create an Issue**
   - Navigate to "Issues" → "New Issue"
   - Enter a descriptive title
   - Add a detailed description using Markdown
   - Click "Submit New Issue"

4. **Manage Issues**
   - Browse all issues in the "Issues" page
   - Filter by status (Open, In Progress, Closed)
   - Click on an issue to view details
   - Edit title, description, status, or assignee
   - Delete issues if needed

5. **Assign Issues**
   - Open an issue detail page
   - Select a user from the "Assignee" dropdown
   - The issue will be assigned to that user

6. **Track Progress**
   - Update issue status as you work
   - Use the dashboard to monitor overall progress
   - Filter issues to focus on specific statuses

### Example Workflows

**Bug Reporting Workflow:**
1. User discovers a bug
2. Creates new issue with detailed description
3. Issue appears as "Open" on dashboard
4. Team lead assigns issue to developer
5. Developer changes status to "In Progress"
6. After fixing, developer marks as "Closed"

**Sprint Planning Workflow:**
1. Filter issues by "Open" status
2. Review and prioritize issues
3. Assign issues to team members
4. Team members update status as they work
5. Monitor progress on dashboard

## Future Improvements

### Planned Features
- **Comments & Discussions** - Add threaded comments to issues
- **Labels & Tags** - Categorize issues with custom labels
- **File Attachments** - Upload screenshots and logs
- **Advanced Filters** - Filter by assignee, date range, and labels
- **Email Notifications** - Notify users of issue updates
- **Activity Timeline** - Track all changes to an issue
- **Dark Mode** - Theme toggle for user preference
- **Bulk Operations** - Update multiple issues at once
- **Issue Templates** - Predefined templates for common issue types
- **Export/Import** - Export issues to CSV or JSON

### Technical Improvements
- **Real-time Updates** - WebSocket support for live updates
- **Search Functionality** - Full-text search across issues
- **Caching Strategy** - Redis for improved performance
- **Rate Limiting** - API rate limiting for security
- **Automated Testing** - Unit and integration tests
- **CI/CD Pipeline** - Automated deployment workflow
- **Accessibility Audit** - WCAG 2.1 AA compliance
- **Performance Optimization** - Image optimization and lazy loading
- **Database Indexing** - Optimize queries for large datasets
- **API Documentation** - Swagger/OpenAPI documentation

## Screenshots / Demo

*Screenshots and demo will be added once the application is deployed.*

**Planned sections:**
- Dashboard view with issue statistics
- Issue list with filtering
- Issue detail page
- Issue creation form
- Mobile responsive views

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 BugStack

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

**Built with ❤️ using Next.js, TypeScript, and PostgreSQL**
