#BASE: install deps
FROM oven/bun:canary-alpine AS base
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install

# DEV
FROM base AS dev
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "bunx drizzle-kit push && bun run dev"]

#BUILD
FROM base AS builder
WORKDIR /app
COPY . .
RUN bun run build

# PROD
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]