const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const directTransport = require('nodemailer-direct-transport');

const app = express();
const db = new sqlite3.Database('calendar.db');
const fromHost = 'raince.ru';
const from = "robot@" + fromHost;

const transport = nodemailer.createTransport(directTransport({
    name: fromHost
}));


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

app.post('/make_appointment', async (req, res) => {
    const { first_name, last_name, phone, email, recording_date } = req.body;

    db.all('SELECT * FROM records', (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        if (rows.includes(recording_date)) {
            return false
        }
    });

    const current_date = new Date().toISOString();

    console.log(first_name, last_name, phone, email, recording_date)

    db.run(`INSERT INTO records (first_name, last_name, phone, email, recording_date, date_added) VALUES ('${first_name}', '${last_name}', '${phone}', '${email}', '${recording_date}', '${current_date}')`, function(err) {
        if (err) {
            return console.log(err.message);
        }
    });

    const mailOptions = {
        from, email,
        subject: 'Запись на прием',
        html: `${first_name} ${last_name}, вы записались на прием в <b>${recording_date}</b>!`
    };

    transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
    });

    res.send(true);
});

module.exports = app;
