# Gunakan image node.js yang ringan untuk development
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json terlebih dahulu untuk menginstal dependensi
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin semua file proyek
COPY . .

# Expose port untuk Vite (default: 5173)
EXPOSE 5173

# Set environment variable untuk mengaktifkan polling jika diperlukan (untuk file system watch)
ENV CHOKIDAR_USEPOLLING=true

# Jalankan Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
