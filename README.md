# Semester Project 4 - Holidaze

A holiday venue booking platform where users can browse venues, make bookings, and manage their own listings as a venue manager. This project demonstrates full-stack development capabilities using modern web technologies, focusing on performance, accessibility, and user experience.

## Project links

**[Report](https://docs.google.com/document/d/1sBZZEI44OesDf80YFx9oO124vcRF52RCKW4RZejLEew/edit?usp=sharing)**

**[Github Repo](https://github.com/SanderTorg/holidaze-exam-2-santorg)**

**[Github Kanban](https://github.com/users/SanderTorg/projects/6/views/1)**

**[Github Gannt Chart](https://github.com/users/SanderTorg/projects/6/views/4)**

**[Production Deployment](https://holidaze-exam-2-santorg.vercel.app/)**

**[Figma Project]()**

**[Mobile Design]()**

**[Desktop Design]()**

## Features

- **User Authentication**: Register and log in as a customer or venue manager.
- **Browse Venues**: Explore listings with search, filter, and sort capabilities.
- **Booking System**: Book venues by selecting available dates and number of guests.
- **Venue Management**: Venue managers can create, edit, and delete their own venues and view bookings per venue.
- **User Profiles**: Update avatar, banner, bio, and toggle venue manager status.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Modern UI**: Styled with Tailwind CSS v4 and shadcn/ui, featuring smooth animations and accessible components.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)
- **State Management**: [Zustand 5](https://zustand-demo.pmnd.rs/) (with `persist` middleware)
- **Forms & Validation**: [React Hook Form 7](https://react-hook-form.com/) + [Zod 4](https://zod.dev/)
- **Date Handling**: [date-fns 4](https://date-fns.org/) + [react-day-picker 10](https://daypicker.dev/) + [Luxon 3](https://moment.github.io/luxon/)
- **Notifications**: [Sonner](https://ui.shadcn.com/docs/components/radix/sonner)
- **Carousel**: [Embla Carousel](https://ui.shadcn.com/docs/components/radix/carousel)
- **Testing**:
  - Unit Testing: [Vitest 4](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
  - E2E Testing: [Playwright 1.59](https://playwright.dev/) (Chromium, Firefox, WebKit)
- **API**: [Noroff Holidaze API](https://docs.noroff.dev/docs/v2/holidaze/venues)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SanderTorg/holidaze-exam-2-santorg.git
   cd holidaze-exam-2-santorg
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root and add the required environment variables (see `.env.example` if available).

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
npm run start
```

### Testing

Run unit tests:

```bash
npm run test
```

Run End-to-End (E2E) tests:

```bash
npm run test:e2e
```

View E2E test report:

```bash
npm run test:e2e:report
```

## Project Structure

```
app/                  # Next.js App Router pages and layouts
├── login/            # Login page
├── register/         # Register page
├── profile/          # User profile page
├── venues/           # Venue listing and detail pages
│   └── [id]/         # Dynamic venue detail route
├── about/            # About page
├── contact/          # Contact page
├── layout.tsx        # Root layout
└── page.tsx          # Home page
components/
├── layout/           # Navbar, Footer, layout wrappers
├── pages/            # Page-level client components
│   ├── auth/         # Login and register forms
│   ├── profile/      # Profile page, customer bookings, manager dashboard
│   ├── venues/       # Venue listings client
│   └── slug/         # Venue detail client
├── ui/               # shadcn/ui primitives
└── universal/        # Shared form and rating components
lib/
├── actions/          # Server actions (auth, bookings, venues)
├── db/               # API and auth fetch helpers
├── hooks/            # Zustand store
├── schema/           # Zod validation schemas
└── types/            # TypeScript interfaces
tests/                # Playwright E2E test stories
```

## Author

**[Sander Dorgan Torgersen](https://github.com/SanderTorg)**
