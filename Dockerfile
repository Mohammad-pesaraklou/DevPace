
# Base Image
FROM node:20-alpine AS base
RUN corepack enable pnpm

# Install Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /DevPace

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .


FROM deps as builder
WORKDIR /Devpace
COPY --from=deps /DevPace/node_modules ./node_modules
COPY . .
RUN pnpm run build


FROM builder as runner
WORKDIR /Devpace

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 Devpace


COPY --from=builder /DevPace/public ./public
COPY --from=builder --chown=Devpace:nodejs /DevPace/.next/standalone ./
COPY --from=builder --chown=Devpace:nodejs /DevPace/.next/static ./.next/static


USER Devpace
EXPOSE 3000
ENV PORT=3000
CMD ["node","server.js"]


