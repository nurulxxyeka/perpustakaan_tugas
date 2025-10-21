const db = require('../config/database');

const Buku = {
    // Ambil semua buku
    getAll: async () => {
        try {
            const query = 'SELECT * FROM buku ORDER BY created_at DESC';
            const [results] = await db.execute(query);
            return results;
        } catch (error) {
            console.error('Error dalam getAll:', error);
            throw error;
        }
    },

    // Ambil buku berdasarkan ID
    getById: async (id) => {
        try {
            const query = 'SELECT * FROM buku WHERE id = ?';
            const [results] = await db.execute(query, [id]);
            return results;
        } catch (error) {
            console.error('Error dalam getById:', error);
            throw error;
        }
    },

    // Buat buku baru
    create: async (data) => {
        try {
            const query = 'INSERT INTO buku (judul, penulis, tahun_terbit, isbn, status) VALUES (?, ?, ?, ?, ?)';
            const values = [
                data.judul, 
                data.penulis, 
                data.tahun_terbit, 
                data.isbn, 
                data.status || 'tersedia'
            ];
            
            const [results] = await db.execute(query, values);
            return results;
        } catch (error) {
            console.error('Error dalam create:', error);
            throw error;
        }
    },

    // Update buku
    update: async (id, data) => {
        try {
            const query = 'UPDATE buku SET judul = ?, penulis = ?, tahun_terbit = ?, isbn = ?, status = ? WHERE id = ?';
            const values = [
                data.judul, 
                data.penulis, 
                data.tahun_terbit, 
                data.isbn, 
                data.status, 
                id
            ];
            
            const [results] = await db.execute(query, values);
            return results;
        } catch (error) {
            console.error('Error dalam update:', error);
            throw error;
        }
    },

    // Hapus buku
    delete: async (id) => {
        try {
            const query = 'DELETE FROM buku WHERE id = ?';
            const [results] = await db.execute(query, [id]);
            return results;
        } catch (error) {
            console.error('Error dalam delete:', error);
            throw error;
        }
    },

    // Cari buku
    search: async (keyword) => {
        try {
            const query = 'SELECT * FROM buku WHERE judul LIKE ? OR penulis LIKE ?';
            const searchTerm = `%${keyword}%`;
            const [results] = await db.execute(query, [searchTerm, searchTerm]);
            return results;
        } catch (error) {
            console.error('Error dalam search:', error);
            throw error;
        }
    }
};

module.exports = Buku;