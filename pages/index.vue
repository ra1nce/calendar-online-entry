<template>
	<div class="center">
		<div class="content">
			<div class="title">
				<p>Запишись на прием <span class="bold">онлайн!</span></p>
			</div>

			<div class="calendar-panel">
				<div class="calendar-block">
					<Calendar @changeDate="handleChangeDate" />

					<div class="color-info-block">
						<div class="color-info">
							<div class="block32 day-off-hour"></div>
							<span>Занято</span>
						</div>
						<div class="color-info">
							<div class="block32 busy-hour"></div>
							<span>Выходной</span>
						</div>
					</div>
				</div>
				<div class="hour-block">
					<Hours @changeHour="changeHour" :date="nums_table.date" :day_name="nums_table.day_name" />
				</div>

			</div>
		
			<MakeAppointment :date="nums_table.date" :hour="nums_table.hour" />
		</div>
	</div>
</template>

<script>
import Records from '../components/Records.vue';
const moment = require('moment');

export default {
    name: "IndexPage",
    data() {
        return {
            nums_table: {
                date: new Date().toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }),
                day_name: new Date().toLocaleDateString("en-EN", { weekday: "long" }),
                hour: "00:00",
            }
        };
    },
    methods: {
        handleChangeDate(date_string) {
            console.log(moment(date_string, "DD.MM.YYYY"));
            let day_name = moment(date_string, "DD.MM.YYYY").format("dddd");
            this.nums_table.date = date_string;
            this.nums_table.day_name = day_name;
        },
        changeHour(hour) {
            this.nums_table.hour = hour;
        }
    },
    components: { Records }
}
</script>
