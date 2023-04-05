const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('calendar.db');

// Создание таблицы в базе данных
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS records (id INTEGER, first_name TEXT, last_name TEXT, phone TEXT, email TEXT, recording_date TEXT, date_added TEXT)");
});

// Добавляем middleware который парсит входящие запросы с типом данных JSON.
app.use(express.json());


app.get('/records', async (req, res) => {
    db.all('SELECT * FROM records', (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.send(rows);
    });
});

app.post('/add_record', async (req, res) => {
    const { first_name, last_name, phone, email, recording_date } = req.body;
    const current_date = new Date().toISOString();

    db.run(`INSERT INTO records (first_name, last_name, phone, email, recording_date, date_added) VALUES ('${first_name}', '${last_name}', '${phone}', '${email}', '${recording_date}', '${current_date}')`, function(err) {
        if (err) {
            return console.log(err.message);
        }
    });

    res.send(true);
});

module.exports = app;
