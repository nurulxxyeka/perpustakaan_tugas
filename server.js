const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const bukuRoutes = require('./routes/bukuRoutes');
app.use('/api', bukuRoutes);

// Route default
app.get('/', (req, res) => {
    res.json({
        message: 'Selamat datang di API Perpustakaan',
        endpoints: {
            'GET /api/buku': 'Ambil semua buku',
            'GET /api/buku/:id': 'Ambil buku by ID',
            'GET /api/buku/search?keyword=...': 'Cari buku',
            'POST /api/buku': 'Buat buku baru',
            'PUT /api/buku/:id': 'Update buku',
            'DELETE /api/buku/:id': 'Hapus buku'
        }
    });
});

// Handle 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server',
        error: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log('API Perpustakaan siap digunakan!');
});