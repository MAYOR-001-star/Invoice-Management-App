# Invoice Management App

This is a fully functional invoice management application built with **React**, **TypeScript**, and **Tailwind CSS**. I built this to handle the entire lifecycle of an invoice, from creation and drafting to payment and deletion, with a strong focus on clean UI/UX and responsive design.

## Features

- **Full CRUD Support**: Create, read, update, and delete invoices seamlessly.
- **Smart Persistence**: I used **LocalStorage** to handle the data, so all your invoices stay saved in the browser. You can refresh or close the app and your progress won't be lost.
- **Filtering**: A built-in filter to sort through Draft, Pending, and Paid invoices instantly.
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

## Data Persistence

One of the key things I wanted to get right was making sure the app actually saves your work. I went with the browser's **LocalStorage API** to handle this. It's simple but effective—it means you can start an invoice, close your browser, and everything will still be there when you come back. I built a custom utility to manage the storage, handling everything from generating unique IDs to updating invoice statuses.

## Design Decisions

I went with a **mobile-first** approach for the CSS to ensure the app is usable on any device. For the layout, I used a mix of **CSS Grid** and **Flexbox** to handle the complex invoice card structure on desktop vs mobile. The theme implementation uses CSS variables hooked into a React Context for a smooth, flicker-free transition between modes.

