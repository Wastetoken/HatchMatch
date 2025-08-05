# Chicken Genetics Calculator

## Overview

This is a full-stack web application for calculating genetic crosses between chicken breeds. The application helps users predict offspring characteristics by analyzing genetic traits, physical features, production capabilities, and behavioral patterns when crossing different chicken breeds. It provides detailed genetic analysis including Punnett squares, inheritance patterns, hybrid vigor calculations, and pricing estimates for the resulting crosses.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite for fast development
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming support
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Language**: TypeScript with ES modules
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Genetic Calculations**: Custom genetics calculator service for cross predictions
- **API Design**: RESTful endpoints for breed management and cross calculations

### Data Models
- **Breed Schema**: Comprehensive breed information including genetic traits, physical characteristics, production data, behavior traits, and pricing
- **Genetic Traits**: Gene-allele pairs with dominance patterns (dominant, recessive, codominant, incomplete)
- **Cross Predictions**: Calculated offspring predictions with genetic breakdown, hybrid vigor effects, and confidence scoring

### Key Features
- **Breed Database**: Searchable collection of chicken breeds with filtering by category
- **Genetic Calculator**: Advanced cross prediction engine with Mendelian inheritance modeling
- **Visual Components**: Interactive breed selectors, prediction results display, and genetic analysis visualization
- **Responsive Design**: Mobile-first design with adaptive layouts

### Build System
- **Development**: Vite dev server with HMR and TypeScript checking
- **Production**: Vite build with esbuild bundling for the server
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)

## External Dependencies

### Database
- **Drizzle ORM**: Type-safe database toolkit configured for PostgreSQL
- **Neon Database**: Serverless PostgreSQL for production deployment
- **Connection**: Environment-based DATABASE_URL configuration

### UI Framework
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **TypeScript**: Full type safety across frontend, backend, and shared schemas
- **Zod**: Runtime type validation and schema definition
- **ESLint/Prettier**: Code formatting and linting (implied from TypeScript setup)

### Third-party Services
- **Replit Integration**: Development environment plugins and banner integration
- **Cartographer**: Replit-specific development tooling for enhanced debugging