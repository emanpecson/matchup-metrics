# Matchup Metrics

An NBA analytics web app for comparing player performances and building custom lineups. Browse player stats, build side-by-side 5-player lineup comparisons, and create rosters — all backed by data scraped from [nba.com](https://www.nba.com).

## Features

- **Lineup Matchups** — Build two 5-player lineups (2G / 2F / 1C) and compare them across stats like PPG, APG, RPG, shooting percentages, and Yahoo Fantasy points
- **Player Browser** — Search, filter by team/position, and paginate through the full NBA player database with detailed stat breakdowns
- **Roster Builder** — Assemble position-locked 5-player rosters
- **Dark/Light Mode** — Theme toggle with system preference support
- **Responsive Design** — Works on desktop and mobile

## Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Database:** MongoDB with Prisma ORM
- **Styling:** Tailwind CSS, Shadcn/UI, Radix UI, Framer Motion
- **Data:** Python/Selenium scrapers for NBA player stats and game schedules

## Getting Started

### Prerequisites

- Node.js (v18+)
- A MongoDB instance (e.g. MongoDB Atlas)
- Python 3 with Selenium and ChromeDriver (only needed for scraping)

### Setup

```bash
git clone https://github.com/emanpecson/matchup-metrics.git
cd matchup-metrics
npm install
```

Create a `.env` file in the project root:

```
DATABASE_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority
NEXT_PUBLIC_APP_TITLE=Matchup Metrics
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scraping Data

Player stats and game schedules are scraped from nba.com using Python scripts. Scrape, post to the database, or both:

```bash
# Players
npm run "scrape-players -s"       # scrape only
npm run "scrape-players -p"       # post to DB only
npm run "scrape-players -s -p"    # scrape and post

# Games
npm run "scrape-games -s"
npm run "scrape-games -p"
npm run "scrape-games -s -p"
```

Requires Python 3, Selenium, and ChromeDriver installed locally.

## Project Structure

```
src/
  app/
    (dashboard)/          # Main pages: matchup, players, roster-builder
    api/                  # REST endpoints for players, teams, games, rosters
  components/             # React components (player cards, lineup slots, filters, nav)
  types/                  # TypeScript types and builder classes
  hooks/                  # Custom React hooks
  data/                   # Static data (routes, NBA teams, positions)
  utils/                  # Helpers (fantasy scoring, photo URLs, string formatting)
prisma/
  schema.prisma           # MongoDB schema (Player, Team, Game, Roster)
scripts/
  scrape_players/         # Python scraper for player stats and bios
  scrape_games/           # Python scraper for game schedules
```
