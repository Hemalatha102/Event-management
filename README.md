# Eventora - Event Management Application

Eventora is a responsive event discovery and registration application built with React and Vite. Visitors can browse curated events, search by title or location, filter by category, view event details, and register for an event.

## Features

- Responsive landing page and event listings
- Event search and category filters
- Event detail and registration dialogs
- Registration form with browser-based input validation
- Registration records saved in the current browser using `localStorage`
- Event images, pricing in Indian rupees, dates, times, and locations

## Technology

- React 19
- JavaScript (ES modules)
- Vite
- CSS
- React Router DOM (installed; the current interface is a single-page view)

## Getting started

### Requirements

- Node.js and npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

### Production build

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project structure

```text
hema/
|-- public/             # Public icons and static assets
|-- src/
|   |-- assets/         # Application images and assets
|   |-- App.jsx         # Event browsing and registration interface
|   |-- App.css         # Application styles and responsive layouts
|   |-- index.css       # Global styles
|   `-- main.jsx        # React entry point
|-- index.html
|-- package.json
`-- vite.config.js
```

## Data and scope

This version is a frontend application with a curated in-code event list. Registrations are stored only in the browser that created them; they are not sent to a server or shared between users or devices. The registration flow is a demo and does not process payments. There is no account system, event administration, or backend in the current project.

## Deployment

Build the application with `npm run build`, then deploy the generated `dist/` directory to a static hosting provider that supports single-page applications, such as GitHub Pages, Netlify, or Vercel. Configure the provider to serve `index.html` for the site route.
