# Invoice Management App

This is a fully functional invoice management application built with **React**, **TypeScript**, and **Tailwind CSS**. I built this to handle the entire lifecycle of an invoice, from creation and drafting to payment and deletion, with a strong focus on clean UI/UX and responsive design.

## Features

- **Full CRUD Support**: Create, read, update, and delete invoices seamlessly.
- **Persistent Storage**: Uses LocalStorage to keep your data safe even after a browser refresh.
- **Smart Filtering**: Quickly filter invoices by status (Draft, Pending, Paid).
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens with a specialized layout for each.
- **Theme Switching**: Built-in support for Light and Dark modes with persistent user preference.
- **Form Validations**: Comprehensive client-side validation for all fields to ensure data integrity.
- **Interactive UI**: Smooth transitions, hover states, and intuitive navigation.

## Tech Stack

- **Frontend**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Custom SVG icons
- **State Management**: React Context & Hooks

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Design Decisions

I went with a **mobile-first** approach for the CSS to ensure the app is usable on any device. For the layout, I used a mix of **CSS Grid** and **Flexbox** to handle the complex invoice card structure on desktop vs mobile. The theme implementation uses CSS variables hooked into a React Context for a smooth, flicker-free transition between modes.
