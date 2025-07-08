# HyaQqabaz - Premium Middle Eastern Experience

## Overview

HyaQqabaz is a modern full-stack web application showcasing a premium Middle Eastern restaurant and lounge experience. The application features an elegant frontend displaying various offerings including cuisine, beverages, traditional sweets, and a shisha lounge. Built with React and Express, it follows a clean architecture with separation between client and server components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL sessions with connect-pg-simple
- **Development**: Hot reloading with tsx

### Key Design Decisions
- **Monorepo Structure**: Client, server, and shared code in a single repository
- **TypeScript First**: Strong typing across the entire application
- **Component-Driven**: Reusable UI components following atomic design principles
- **API-First**: RESTful API design with JSON communication
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Key Components

### Shared Components
- **Schema Definition**: Centralized database schema using Drizzle ORM
- **Type Safety**: Shared TypeScript types between client and server
- **Validation**: Zod schemas for runtime validation

### Frontend Components
- **UI Library**: Comprehensive set of accessible components (buttons, forms, dialogs, etc.)
- **Custom Hooks**: Mobile detection, toast notifications
- **Pages**: Home page with category selection and hexagonal content layout
- **Styling**: Custom CSS variables for theming with luxury design colors

### Backend Components
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Route Registration**: Modular route handling system
- **Development Tools**: Vite integration for hot reloading in development

## Data Flow

### Current Implementation
1. **Static Content**: Homepage displays static categories and content
2. **Memory Storage**: User data stored in memory (development only)
3. **Category Selection**: Client-side category filtering (placeholder implementation)

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Extensible Design**: Ready for additional entities (products, orders, etc.)

### API Structure
- **RESTful Design**: All API routes prefixed with `/api`
- **Error Handling**: Centralized error middleware
- **Request Logging**: Automatic API request logging in development

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database queries
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **tsx**: TypeScript execution for development
- **vite**: Build tool and development server
- **esbuild**: Fast bundling for production

### Third-Party Integrations
- **Replit**: Development environment integration
- **Google Fonts**: Typography (Playfair Display, Inter)
- **Font Awesome**: Icon library
- **Unsplash**: Stock images for content

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React app to `dist/public`
2. **Server Build**: esbuild bundles server code to `dist/index.js`
3. **Database Migration**: Drizzle migrations in `migrations/` directory

### Environment Configuration
- **Development**: Local development with hot reloading
- **Production**: Bundled application with optimized assets
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Scripts
- `npm run dev`: Development server with hot reloading
- `npm run build`: Production build
- `npm run start`: Production server
- `npm run db:push`: Deploy database schema changes

### Architecture Benefits
- **Type Safety**: End-to-end TypeScript ensures fewer runtime errors
- **Developer Experience**: Hot reloading and modern tooling
- **Scalability**: Modular architecture supports growth
- **Performance**: Optimized builds with tree shaking and code splitting
- **Accessibility**: Radix UI ensures accessible components out of the box

The application is currently in development stage with a foundation ready for implementing full restaurant functionality including menu management, ordering system, and user authentication.