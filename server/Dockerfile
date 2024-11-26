# Sử dụng image Node.js chính thức
FROM node:18

# Set thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn của NodeJS vào container
COPY . .

# Expose cổng mà NodeJS sẽ chạy
EXPOSE 5000

# Start ứng dụng Node.js
CMD ["npm", "start"]
