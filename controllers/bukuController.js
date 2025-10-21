const Buku = require('../models/bukuModel');

const bukuController = {
    // Ambil semua buku
    getAllBuku: (req, res) => {
        Buku.getAll((err, results) => {
            if (err) {
                console.error('Error mengambil data buku:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Terjadi kesalahan server',
                    error: err.message
                });
            }
            res.json({
                success: true,
                message: 'Data buku berhasil diambil',
                data: results
            });
        });
    },

    // Ambil buku berdasarkan ID
    getBukuById: (req, res) => {
        const id = req.params.id;
        Buku.getById(id, (err, results) => {
            if (err) {
                console.error('Error mengambil data buku:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Terjadi kesalahan server',
                    error: err.message
                });
            }
            
            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Buku tidak ditemukan'
                });
            }

            res.json({
                success: true,
                message: 'Data buku berhasil diambil',
                data: results[0]
            });
        });
    },

    // Buat buku baru
    createBuku: (req, res) => {
        const { judul, penulis, tahun_terbit, isbn, status } = req.body;

        // Validasi input
        if (!judul || !penulis) {
            return res.status(400).json({
                success: false,
                message: 'Judul dan penulis harus diisi'
            });
        }

        const bukuData = {
            judul,
            penulis,
            tahun_terbit: tahun_terbit || null,
            isbn: isbn || null,
            status: status || 'tersedia'
        };

        Buku.create(bukuData, (err, results) => {
            if (err) {
                console.error('Error membuat buku:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Gagal membuat buku',
                    error: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: 'Buku berhasil dibuat',
                data: {
                    id: results.insertId,
                    ...bukuData
                }
            });
        });
    },

    // Update buku
    updateBuku: (req, res) => {
        const id = req.params.id;
        const { judul, penulis, tahun_terbit, isbn, status } = req.body;

        // Validasi input
        if (!judul || !penulis) {
            return res.status(400).json({
                success: false,
                message: 'Judul dan penulis harus diisi'
            });
        }

        const bukuData = {
            judul,
            penulis,
            tahun_terbit: tahun_terbit || null,
            isbn: isbn || null,
            status: status || 'tersedia'
        };

        Buku.update(id, bukuData, (err, results) => {
            if (err) {
                console.error('Error mengupdate buku:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Gagal mengupdate buku',
                    error: err.message
                });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Buku tidak ditemukan'
                });
            }

            res.json({
                success: true,
                message: 'Buku berhasil diupdate',
                data: {
                    id: parseInt(id),
                    ...bukuData
                }
            });
        });
    },

    // Hapus buku
    deleteBuku: (req, res) => {
        const id = req.params.id;

        Buku.delete(id, (err, results) => {
            if (err) {
                console.error('Error menghapus buku:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Gagal menghapus buku',
                    error: err.message
                });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Buku tidak ditemukan'
                });
            }

            res.json({
                success: true,
                message: 'Buku berhasil dihapus'
            });
        });
    },

    // Cari buku
    searchBuku: (req, res) => {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: 'Keyword pencarian harus diisi'
            });
        }

        Buku.search(keyword, (err, results) => {
            if (err) {
                console.error('Error mencari buku:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Terjadi kesalahan saat pencarian',
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: 'Hasil pencarian berhasil diambil',
                data: results
            });
        });
    }
};

module.exports = bukuController;