# Priconne arena API

Priconne API wrapper written in NestJS. Used to search player profile.

## Prerequisites

- Git
- NodeJS 16+
- yarn
- Docker

## Quick start

To install all the required stack on a server, we used Docker to build the application image.

```bash
# 1. Clone the repository
git clone https://github.com/pokeguys/pcr-arena-api.git
cd pcr-arena-api

# 2. Install Dependencies
yarn

# 3. Create a ".env" file
cp .env.example .env

# 4. Run via Docker
docker compose -f docker-compose.infra.yml -f docker-compose.dev.yml up

# 5. Run the migration script in docker
docker compose -f docker-compose.dev.yml exec -T api npx mikro-orm migration:up
```

## License

MIT License
