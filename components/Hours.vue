<template>
    <div class="hours-block">
        <div class="day-data">
            <p><span class="day-title">{{ day_name.toUpperCase() }}</span> - {{ date }}</p>
        </div>

        <div class="hours">
            <div class="hour" v-for="time in timeList" :key="time" @click="displayMakeAppointment(time)">
                {{ time }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Hours",
    setup() {
        return {
            timeList: generateTimeList("7:00", "23:00", "30")
        }
    },
    props: {
        date: {
            type: String,
            required: true
        },
        day_name: {
            type: String,
            required: true
        },
    },
    methods: {
        displayMakeAppointment(hour) {
            this.changeHour(hour);

            document.getElementById('make-appointment').style.display = 'flex';
        },
        changeHour(hour) {
            this.$emit('changeHour', hour)
        },
  }
}

function generateTimeList(startHour, endHour, stepMinutes) {
    let startTime = new Date(`January 1, 2023 ${startHour}:00`); // начальное время
    let endTime = new Date(`January 1, 2023 ${endHour}:00`); // конечное время
    let timeList = []; // пустой массив для временных значений

    while (startTime <= endTime) {
        let hour = startTime.getHours();
        let minutes = startTime.getMinutes();

        // форматирование времени с добавлением ведущего нуля
        let formattedTime = `${hour.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;

        timeList.push(formattedTime); // добавление времени в список
        startTime.setTime(startTime.getTime() + stepMinutes * 60 * 1000); // увеличение времени на 30 минут
    }

    return timeList;
}

</script>