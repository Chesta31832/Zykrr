FROM node:18-alpine as builder

WORKDIR /app

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json* yarn.lock* ./
RUN npm install

COPY . .
RUN npm run build

# Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Configure nginx to handle SPA routing
RUN printf 'server {\n  listen 3000;\n  root /usr/share/nginx/html;\n  location / {\n    try_files \$uri /index.html;\n  }\n  location /api/ {\n    proxy_pass http://backend:5000/;\n  }\n  location /api {\n    proxy_pass http://backend:5000;\n  }\n}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
