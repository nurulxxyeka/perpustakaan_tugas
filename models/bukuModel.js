const db = require('../config/database');

const Buku = {
    // Ambil semua buku
    getAll: (callback) => {
        const query = 'SELECT * FROM buku ORDER BY created_at DESC';
        db.query(query, callback);
    },

    // Ambil buku berdasarkan ID
    getById: (id, callback) => {
        const query = 'SELECT * FROM buku WHERE id = ?';
        db.query(query, [id], callback);
    },

    // Buat buku baru
    create: (data, callback) => {
        const query = 'INSERT INTO buku (judul, penulis, tahun_terbit, isbn, status) VALUES (?, ?, ?, ?, ?)';
        const values = [
            data.judul, 
            data.penulis, 
            data.tahun_terbit, 
            data.isbn, 
            data.status || 'tersedia'
        ];
        db.query(query, values, callback);
    },

    // Update buku
    update: (id, data, callback) => {
        const query = 'UPDATE buku SET judul = ?, penulis = ?, tahun_terbit = ?, isbn = ?, status = ? WHERE id = ?';
        const values = [
            data.judul, 
            data.penulis, 
            data.tahun_terbit, 
            data.isbn, 
            data.status, 
            id
        ];
        db.query(query, values, callback);
    },

    // Hapus buku
    delete: (id, callback) => {
        const query = 'DELETE FROM buku WHERE id = ?';
        db.query(query, [id], callback);
    },

    // Cari buku
    search: (keyword, callback) => {
        const query = 'SELECT * FROM buku WHERE judul LIKE ? OR penulis LIKE ?';
        const searchTerm = `%${keyword}%`;
        db.query(query, [searchTerm, searchTerm], callback);
    }
};

module.exports = Buku;