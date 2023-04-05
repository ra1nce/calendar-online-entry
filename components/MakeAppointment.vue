<template>
    <div id="make-appointment">
        <div class="form">
            <div class="form-title">
                <span class="form-title-main-text">Запись на прием</span>
                <span class="form-title-close" @click="hideMakeAppointment()">Закрыть</span>
            </div>

            <div class="form-inputs">
                <input type="text" class="form-input" placeholder="Имя">
                <input type="text" class="form-input" placeholder="Фамилия">
                <input type="text" class="form-input" placeholder="Номер телефона">
                <input type="text" class="form-input" placeholder="Email">
            </div>

            <p class="date-info">Дата записи: {{ date }} в {{ hour }}</p>

            <div class="btn-row">
                <input class="form-btn" type="submit" value="Записаться">
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