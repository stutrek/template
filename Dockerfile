FROM node:24-alpine as builder

# RUN apk add --no-cache curl gcc musl-dev
# RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# ENV PATH="/root/.cargo/bin:${PATH}"
# RUN rustup target add wasm32-unknown-unknown
# RUN cargo install wasm-bindgen-cli


WORKDIR /app

# COPY /Cargo.toml ./
# COPY /Cargo.lock ./
# COPY /crates ./crates
# COPY /scripts ./scripts

COPY /package.json ./
COPY /packages/api/package.json ./packages/api/
COPY /packages/dictionary/package.json ./packages/dictionary/
COPY /packages/site/package.json ./packages/site/
COPY /package-lock.json ./package-lock.json

RUN npm ci; npm cache clean --force
COPY . .
RUN npm run build --workspace=site

FROM node:24-alpine as runner

WORKDIR /app
COPY --from=builder /app/packages/site/next.config.mjs ./
COPY --from=builder /app/packages/site/public ./public
COPY --from=builder /app/packages/site/.next/standalone ./
COPY --from=builder /app/packages/site/.next/static ./packages/site/.next/static
EXPOSE 5000

CMD ["node", "packages/site/server.js"]