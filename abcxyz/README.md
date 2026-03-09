# abcxyz — Tic Tac Toe with Social Features

A full-stack Tic Tac Toe web application built with **Next.js 14**, **TypeScript**, **TypeORM**, and **SQLite (better-sqlite3)**.

## Features

- 🎮 **Interactive Tic Tac Toe** — 3x3 board with X and O markers, win/draw detection, and move history
- 👥 **Local Multiplayer** — Enter two player names and play on the same device
- 💾 **Persistent Stats** — Player wins, losses, and draws are stored in a SQLite database
- 🏆 **Leaderboard** — View top players ranked by wins and win rate, with a podium for top 3
- 🔗 **Share Results** — Copy a formatted game result to clipboard and share it anywhere
- 📋 **Move History** — See every move made during the game

## Project Structure

```
abcxyz/
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   ├── components/       # React components
│   ├── entities/         # TypeORM entities (User, Game)
│   ├── lib/              # Database initialization
│   └── utils/            # Game logic utilities
├── Dockerfile
├── docker-compose.yml
└── .env
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Local Development

```bash
# Install dependencies
npm i

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create or edit the `.env` file:

```env
DATABASE_PATH=./data/abcxyz.db
NEXT_PUBLIC_APP_NAME=abcxyz
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Running with Docker

### Using Docker Compose (recommended)

```bash
docker-compose up --build
```

The app will be available at [http://localhost:3000](http://localhost:3000).

The SQLite database is persisted in a Docker named volume (`abcxyz-data`).

### Building manually

```bash
# Build the image
docker build -t abcxyz .

# Run the container
docker run -p 3000:3000 -v abcxyz-data:/app/data abcxyz
```

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create or get a user |
| GET | `/api/games` | Get recent games |
| POST | `/api/games` | Save a completed game |
| GET | `/api/leaderboard` | Get leaderboard data |

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite via better-sqlite3
- **ORM**: TypeORM
- **Containerization**: Docker, Docker Compose
