FROM node:24-alpine AS base
RUN apk add --no-cache openssl

# Rebuild the source code only when needed
FROM base AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci \
    && rm -rf node_modules/@next/swc-linux-*-gnu \
    && npm cache clean --force

COPY . .

RUN SKIP_ENV_VALIDATION=1 npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/deploy-server.sh .

RUN dos2unix ./deploy-server.sh

CMD source deploy-server.sh
