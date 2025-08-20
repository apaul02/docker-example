FROM oven/bun:canary-alpine as builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:canary-alpine as runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public 

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static 

EXPOSE 3000

CMD ["bun", "server.js"]
