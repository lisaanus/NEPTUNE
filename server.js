const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get("/api/data", (req, res) => {

    const dbPath = path.join(__dirname, "data", "database.json");

    fs.readFile(dbPath, "utf8", (err, data) => {

        if (err) {

            return res.status(500).json({
                error: "Gagal membaca database"
            });

        }

        res.json(JSON.parse(data));

    });

});

app.get("*", (req, res) => {

    res.sendFile(path.join(__dirname, "index.html"));

});

app.listen(PORT, () => {

    console.log(`Server berjalan di http://localhost:${PORT}`);

});

module.exports = app;