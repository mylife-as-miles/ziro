# Zir0

Zir0 is an AI-powered API discovery platform that creates undetectable browser sessions to surface hidden endpoints in seconds.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
Zir0 leverages advanced AI and browser automation to discover undocumented or hidden API endpoints by simulating real user sessions. It is designed for security researchers, QA engineers, and developers who need to map out the full attack surface of web applications quickly and stealthily.

## Features
- **AI-Powered Crawling:** Uses AI to intelligently navigate and interact with web applications.
- **Undetectable Browser Sessions:** Mimics real user behavior to avoid detection by anti-bot systems.
- **Endpoint Discovery:** Surfaces hidden or undocumented API endpoints in seconds.
- **Modern UI:** Built with Next.js and Tailwind CSS for a responsive, user-friendly interface.
- **Extensible Architecture:** Modular codebase for easy customization and extension.

## Architecture
- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js API routes
- **Utilities:** Custom libraries for browser automation and endpoint analysis

## Getting Started
### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
git clone https://github.com/your-org/ziro.git
cd ziro
npm install
# or
yarn install
```

### Running the App
```bash
npm run dev
# or
yarn dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure
```
ziro/
├── app/                  # Next.js app directory (App Router)
│   ├── api/              # API routes (backend logic)
│   │   └── crawl/        # Endpoint crawling logic
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/           # Reusable React components
│   ├── Navbar.tsx
│   ├── ProgressBar.tsx
│   ├── ResultCard.tsx
│   ├── TerminalSidebar.tsx
│   └── UrlForm.tsx
├── lib/                  # Utility libraries
│   ├── hyper.ts          # Browser automation/AI logic
│   └── utils.ts          # General utilities
├── public/               # Static assets
│   ├── favicon.ico
│   ├── *.svg
│   └── Yellow BG.png
├── next.config.js        # Next.js configuration
├── package.json          # Project metadata and scripts
├── postcss.config.mjs    # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Configuration
- **Environment Variables:**
  - Configure any required environment variables in a `.env.local` file at the project root.
  - Example:
    ```env
    # .env.local
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
    ```
- **Tailwind CSS:**
  - Customizable via `tailwind.config.js` and `postcss.config.mjs`.
- **TypeScript:**
  - Strict typing enabled via `tsconfig.json`.

## Usage
1. **Enter a Target URL:** Use the UI to input the web application URL you want to analyze.
2. **Start Crawling:** The platform will launch an undetectable browser session and begin crawling the target.
3. **View Results:** Discovered endpoints and analysis will be displayed in real-time.

## Development
- **Component-Driven:** All UI elements are modular React components in `components/`.
- **API Logic:** Extend or modify crawling logic in `app/api/crawl/route.ts`.
- **Utilities:** Add new browser automation or AI logic in `lib/hyper.ts`.
- **Styling:** Customize styles using Tailwind CSS in `globals.css` and `tailwind.config.js`.

### Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint codebase

## Testing
- Add tests for components and utilities as needed.
- Recommended: [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/).

## Contributing
Contributions are welcome! Please open issues or pull requests for bug fixes, features, or improvements.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork and submit a pull request

## License
[MIT](LICENSE)

---

*Zir0 — AI-powered API discovery for the modern web.*