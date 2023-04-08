<template>
    <div class="hours-block">
        <div class="day-data">
            <p><span class="day-title">{{ day_name.toUpperCase() }}</span> - {{ date }}</p>
        </div>

        <div class="hours">
            <div class="hour" v-for="time in timeList" :key="time" @click="displayMakeAppointment(records.includes(`${date} ${time}`), time)" :class="{ 'day-off-hour': records.includes(`${date} ${time}`) }">
                {{ time }}
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    name: "Hours",
    setup() {
        const records = ref([]);

        onMounted(async () => {
            records.value = await getRecords();
        });

        return {
            timeList: generateTimeList("7:00", "23:00", "30"),
            records,
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
        displayMakeAppointment(isClose, hour) {
            if (isClose) {
                return;
            }

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

function getRecords() {
    let result = fetch('https://dev.raince.ru/api/records')
        .then(response => response.json())
        .then(data => {
            let records = [];
            for (let i of data) {
                records.push(i.recording_date)
            }
            return records;
        });

    return result;
}

</script>