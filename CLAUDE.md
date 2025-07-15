# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ClimbTracker** - A climbing record management web application MVP. This is a Next.js 14 application for tracking climbing records using localStorage (no authentication in MVP phase).

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: shadcn/ui components with Tailwind CSS
- **State Management**: React Context + useReducer
- **Data Storage**: localStorage (JSON format)
- **Forms**: React Hook Form + Zod validation
- **Utilities**: date-fns (dates), Lucide React (icons), recharts (charts)
- **Language**: TypeScript

## Data Structure

Core data type:
```typescript
interface ClimbRecord {
  id: string; // UUID
  routeName: string;
  area: string;
  grade: string;
  routeType: 'boulder' | 'lead' | 'toprope';
  date: string; // ISO 8601 format
  status: 'completed' | 'failed' | 'practice';
  notes?: string;
  rating?: number; // 1-5 stars
  duration?: number; // minutes
  createdAt: string;
  updatedAt: string;
}
```

Storage keys:
- `climb-records`: ClimbRecord[] array
- `app-settings`: Application settings

## Architecture

This is currently a planning-stage project with only requirements documentation. The app will be structured as:

- **Pages**: Dashboard, Records List, Add/Edit Record, Statistics
- **Components**: Record cards, forms, charts, layout components
- **Hooks**: Custom localStorage operations, global state management
- **Utils**: Data validation, date formatting, statistics calculations

## Development Setup

The project is in initial planning phase. When implementing:

1. Set up Next.js 14 + TypeScript + Tailwind CSS
2. Install shadcn/ui components
3. Configure ESLint + Prettier
4. Implement localStorage data layer with Context API
5. Build responsive UI components (mobile-first: 320px+, tablet: 768px+, desktop: 1024px+)

## Key Features

- CRUD operations for climbing records
- Search and filtering (grade, route type, completion status, date range)
- Statistics dashboard (completion rates, grade distribution, activity charts)
- Responsive design for all device sizes
- No authentication (localStorage-based MVP)

## Future Expansion

Designed for migration to Supabase with user authentication in later phases. UUID-based records and proper timestamps prepare for database integration.