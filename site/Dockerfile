# ---- build the static Astro site ----
FROM node:20-alpine AS build
WORKDIR /app

# Install deps (reproducible — lockfile committed)
COPY package.json package-lock.json ./
RUN npm ci

# Build
COPY . .
ARG PUBLIC_SITE_URL=https://ryan-garage.signalskernels.com
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
RUN npm run build

# ---- serve with nginx ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
