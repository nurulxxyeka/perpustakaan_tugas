const Buku = require('../models/bukuModel');

const bukuController = {
    // Ambil semua buku
    getAllBuku: async (req, res) => {
        try {
            const books = await Buku.getAll();
            
            res.json({
                success: true,
                message: 'Data buku berhasil diambil',
                data: books
            });
        } catch (error) {
            console.error('Error mengambil data buku:', error);
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server',
                error: error.message
            });
        }
    },

    // Ambil buku berdasarkan ID
    getBukuById: async (req, res) => {
        try {
            const id = req.params.id;
            const books = await Buku.getById(id);
            
            if (books.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Buku tidak ditemukan'
                });
            }

            res.json({
                success: true,
                message: 'Data buku berhasil diambil',
                data: books[0]
            });
        } catch (error) {
            console.error('Error mengambil data buku:', error);
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server',
                error: error.message
            });
        }
    },

    // Buat buku baru
    createBuku: async (req, res) => {
        try {
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

            const result = await Buku.create(bukuData);

            res.status(201).json({
                success: true,
                message: 'Buku berhasil dibuat',
                data: {
                    id: result.insertId,
                    ...bukuData
                }
            });
        } catch (error) {
            console.error('Error membuat buku:', error);
            res.status(500).json({
                success: false,
                message: 'Gagal membuat buku',
                error: error.message
            });
        }
    },

    // Update buku
    updateBuku: async (req, res) => {
        try {
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

            const result = await Buku.update(id, bukuData);

            if (result.affectedRows === 0) {
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
        } catch (error) {
            console.error('Error mengupdate buku:', error);
            res.status(500).json({
                success: false,
                message: 'Gagal mengupdate buku',
                error: error.message
            });
        }
    },

    // Hapus buku
    deleteBuku: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await Buku.delete(id);

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Buku tidak ditemukan'
                });
            }

            res.json({
                success: true,
                message: 'Buku berhasil dihapus'
            });
        } catch (error) {
            console.error('Error menghapus buku:', error);
            res.status(500).json({
                success: false,
                message: 'Gagal menghapus buku',
                error: error.message
            });
        }
    },

    // Cari buku
    searchBuku: async (req, res) => {
        try {
            const { keyword } = req.query;

            if (!keyword) {
                return res.status(400).json({
                    success: false,
                    message: 'Keyword pencarian harus diisi'
                });
            }

            const results = await Buku.search(keyword);

            res.json({
                success: true,
                message: 'Hasil pencarian berhasil diambil',
                data: results
            });
        } catch (error) {
            console.error('Error mencari buku:', error);
            res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan saat pencarian',
                error: error.message
            });
        }
    }
};

module.exports = bukuController;