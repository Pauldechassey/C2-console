FROM node:20-bullseye-slim

WORKDIR /app

# Install dependencies including devDependencies so local `vite` is available
COPY package.json package-lock.json ./
RUN npm install --include=dev --silent && npm install -g vite

COPY . .

EXPOSE 5173
ENV HOST 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
