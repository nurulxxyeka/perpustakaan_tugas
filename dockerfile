# Gunakan image Node.js resmi
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code
COPY . .

# Expose port
EXPOSE 3000

# Command untuk menjalankan aplikasi
CMD ["npm", "start"]