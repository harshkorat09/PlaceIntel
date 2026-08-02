FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY apps/api/package.json apps/api/package.json
COPY packages packages
RUN pnpm install --frozen-lockfile=false
COPY apps/api apps/api
COPY prisma prisma
RUN pnpm --filter @placeintel/api prisma:generate
RUN pnpm --filter @placeintel/api build
EXPOSE 4000
CMD ["pnpm", "--filter", "@placeintel/api", "start"]
