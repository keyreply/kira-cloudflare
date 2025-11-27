# PPP Academy

A modern React application built with Vite, featuring Hero Icons and Tailwind CSS.

## Features

- ⚡️ React 19 with Vite for fast development
- 🎨 Tailwind CSS 4 for styling
- 🎯 Hero Icons for beautiful UI elements
- 🚀 Cloudflare Pages deployment ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/keyreply/ppp-academy.git
cd ppp-academy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment to Cloudflare Pages

### Prerequisites

1. Install Wrangler CLI (if not already installed):
```bash
brew install wrangler
```

2. Authenticate with Cloudflare:
```bash
wrangler login
```

### Deploy

1. Build the application:
```bash
npm run build
```

2. Deploy to Cloudflare Pages:
```bash
npm run deploy
```

For preview deployments:
```bash
npm run deploy:preview
```

### Environment Variables

If you need environment variables:

1. Copy the example file:
```bash
cp .dev.vars.example .dev.vars
```

2. Add your variables to `.dev.vars` (for local development)
3. Add production variables in the Cloudflare dashboard under Pages > Settings > Environment variables

## Project Structure

```
ppp-academy/
├── src/
│   ├── components/     # React components
│   ├── data/          # Data files
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Static assets
└── dist/              # Production build (generated)
```

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Icons**: Hero Icons
- **Deployment**: Cloudflare Pages
- **Linting**: ESLint

## License

MIT
