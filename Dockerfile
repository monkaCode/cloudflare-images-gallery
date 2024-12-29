# Stage 1: Build the frontend application
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run build

CMD ["npm", "start"]