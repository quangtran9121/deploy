# # Sử dụng Node.js chính thức
# FROM node:18

# # Set thư mục làm việc trong container
# WORKDIR /app

# # Copy file package.json và package-lock.json
# COPY package*.json ./

# # Cài đặt dependencies
# RUN npm install

# # Copy toàn bộ mã nguồn của ReactJS vào container
# COPY . .

# # Expose cổng ReactJS
# EXPOSE 80

# # Kích hoạt hot reload bằng npm start
# CMD ["npm", "start"]











# Sử dụng image Node.js chính thức
FROM node:18 AS build

# Set thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn của ReactJS vào container
COPY . .

# Build ứng dụng
RUN npm run build

# Sử dụng NGINX làm web server
FROM nginx:stable-alpine

# Copy file build vào thư mục NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Copy file cấu hình nginx tùy chỉnh (nếu có)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose cổng 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
