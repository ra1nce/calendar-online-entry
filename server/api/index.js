const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('calendar.db');


const transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/bin/mail'
});


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
    const current_date = new Date().toISOString();

    console.log(first_name, last_name, phone, email, recording_date)

    db.run(`INSERT INTO records (first_name, last_name, phone, email, recording_date, date_added) VALUES ('${first_name}', '${last_name}', '${phone}', '${email}', '${recording_date}', '${current_date}')`, function(err) {
        if (err) {
            return console.log(err.message);
        }
    });

    const mailOptions = {
        from: 'robot',
        to: 'fds.fdsfdsfsd@bk.ru',
        subject: 'Appointment',
        text: 'Testing email from Nuxt'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('sent');
        }
    });

    res.send(true);
});

module.exports = app;
