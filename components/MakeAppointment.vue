<template>
    <div id="make-appointment">
        <div class="form">
            <div class="form-title">
                <span class="form-title-main-text">Запись на прием</span>
                <span class="form-title-close" @click="hideMakeAppointment()">Закрыть</span>
            </div>

            <div class="form-inputs">
                <input type="text" class="form-input" id="form_first_name" placeholder="Имя">
                <input type="text" class="form-input" id="form_last_name" placeholder="Фамилия">
                <input type="text" class="form-input" id="form_phone" placeholder="Номер телефона">
                <input type="text" class="form-input" id="form_email" placeholder="Email">
                <input type="text" class="form-input" style="display: none" id="form_recording_date" :value="date + ' ' + hour" placeholder="Дата записи">
            </div>

            <p class="date-info">Дата записи: {{ date }} в {{ hour }}</p>

            <div class="btn-row">
                <input class="form-btn" type="submit" value="Записаться" @click="sendPostMakeAppointment()">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {

    },
    methods: {
        hideMakeAppointment() {
            document.getElementById('make-appointment').style.display = 'none';
        },
        sendPostMakeAppointment() {
            const first_name = document.getElementById("form_first_name").value;
            const last_name = document.getElementById("form_last_name").value;
            const phone = document.getElementById("form_phone").value;
            const email = document.getElementById("form_email").value;
            const recording_date = document.getElementById("form_recording_date").value;

            fetch('http://45.15.159.129:3000/api/make_appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ first_name, last_name, phone, email, recording_date })
            }).then(res => res.json()) // response type
                .then(response => {
                    console.log('Success:', JSON.stringify(response));
                    location.reload();
                }) // log the response to console for debugging purposes
                .catch(error => console.error('Error:', error)); // log the error to console for debugging purposes
        }
    },
    props: {
        date: {
            type: String,
            required: true
        },
        hour: {
            type: String,
            required: true
        },
    },
}
</script>