# Football Data Application

## Overview

This is a full-stack football (soccer) application built with React, Express, and PostgreSQL. The application provides real-time Liga MX (Mexican football league) data including match results, league standings, player statistics, and team information. It features a personalized experience where users can select their favorite team and see customized theming throughout the application.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with CSS variables for dynamic theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Data Scraping**: Puppeteer for web scraping football data

### Data Storage
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: PostgreSQL tables for teams, matches, standings, and players
- **Migrations**: Drizzle Kit for database schema management
- **Connection**: Connection pooling via Neon's serverless driver

## Key Components

### Database Schema
- **Teams**: Core team information including colors, logos, and stadium details
- **Matches**: Live and historical match data with scores and status
- **Standings**: League table with points, wins, losses, and goal statistics
- **Players**: Player statistics including goals and team affiliations

### Frontend Components
- **Team Selector**: Interactive team selection with personalized theming
- **Live Matches**: Real-time match display with auto-refresh
- **Standings Table**: League table with position indicators
- **Fixtures Panel**: Upcoming matches and top scorers
- **UI Components**: Comprehensive set of reusable Radix UI components

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Scraper Service**: Web scraping service for gathering live football data
- **API Routes**: RESTful endpoints for teams, matches, standings, and players

## Data Flow

1. **Data Collection**: Puppeteer scrapes football data from Google Sports
2. **Data Storage**: Scraped data is processed and stored in PostgreSQL via Drizzle ORM
3. **API Layer**: Express.js serves data through RESTful endpoints
4. **Frontend Queries**: React Query fetches and caches data from API endpoints
5. **UI Updates**: Components automatically re-render when data changes
6. **Real-time Updates**: Live matches refresh every 30 seconds

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **puppeteer**: Web scraping for live football data
- **@radix-ui**: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type safety across the application
- **drizzle-kit**: Database schema management and migrations

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite dev server with hot module replacement
- **Database**: Neon PostgreSQL database with environment-based connection
- **API Development**: Express server with automatic restart via tsx

### Production Build
- **Frontend**: Static files built with Vite and served by Express
- **Backend**: Node.js server bundled with esbuild
- **Database**: Production PostgreSQL database via DATABASE_URL environment variable
- **Environment**: Configured for both development and production environments

### Configuration Management
- **Environment Variables**: DATABASE_URL for database connection
- **Build Scripts**: Separate scripts for development, build, and production
- **Type Checking**: TypeScript compilation checking without emission

The application is designed to be easily deployable on platforms like Replit, with automatic database provisioning and environment setup.

## Recent Changes

### January 30, 2025 - Complete Application Enhancement
- ✅ Successfully migrated from Replit Agent to standard Replit environment
- ✅ Changed main title to "THE STYLE OF FOOTBALL" in English with "MX" subtitle
- ✅ Implemented red-black-white modern design theme with enhanced animations
- ✅ Created comprehensive PayPal integration for donations and betting sections
- ✅ Added complete database of all 18 Liga MX teams with full player rosters
- ✅ Built advanced trivia system with three difficulty levels and team-specific questions
- ✅ Fixed router navigation issues when selecting teams
- ✅ Enhanced futuristic UI with red particle effects and improved transitions
- ✅ Integrated team-specific theming throughout the application
- ✅ Added 12+ players per team with detailed statistics (goals, assists, appearances)