const express = require('express');
const router = express.Router();
const bukuController = require('../controllers/bukuController');

// Routes untuk CRUD buku
// Ambil semua buku
router.get('/buku', bukuController.getAllBuku);
// Cari buku
router.get('/buku/search', bukuController.searchBuku);
// Ambil buku by ID
router.get('/buku/:id', bukuController.getBukuById);
// Buat buku baru
router.post('/buku', bukuController.createBuku);
// Update buku
router.put('/buku/:id', bukuController.updateBuku);
//  Hapus buku
router.delete('/buku/:id', bukuController.deleteBuku);

module.exports = router;