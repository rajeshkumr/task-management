FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

ARG NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
