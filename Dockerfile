FROM node:20-alpine
WORKDIR /app
COPY ./BackEnd/package*.json ./
RUN npm ci --only=production
COPY ./BackEnd .
EXPOSE 5000
CMD ["node", "src/index.js"]