const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk membaca request body berbentuk JSON dan URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyediakan akses ke file statis (HTML, CSS, JS, Images) di root folder
app.use(express.static(path.join(__dirname, '/')));

// API Endpoint untuk mengambil data dari database.json secara dinamis
app.get('/api/data', (req, res) => {
    const dbPath = path.join(__dirname, 'data', 'database.json');
    
    // Cek apakah file database.json ada di folder data/
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Gagal membaca database.json:', err);
            return res.status(500).json({ error: 'Gagal memuat basis data maritim.' });
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseErr) {
            console.error('Gagal parsing JSON:', parseErr);
            res.status(500).json({ error: 'Format database tidak valid.' });
        }
    });
});

// Endpoint Utama untuk menyajikan halaman cangkang (Landing Page SPA)
app.get('(.*)', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Menjalankan server lokal
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`⚓ CV. NEPTUNE EKA SARANA - SERVER ACTIVE ⚓`);
    console.log(`🌐 Website dapat diakses di: http://localhost:${PORT}`);
    console.log(`====================================================`);
});