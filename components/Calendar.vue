<template>
    <div class="calendar">
        <div class="month">
            <div class="month-arrow-left">
                <img class="c-pointer" src="left-arrow.svg" alt="" srcset="">
            </div>
            
            <p class="month-name">{{ calendar_data.current_month_name }} {{ calendar_data.current_year }}</p>

            <div class="month-arrow-right">
                <img class="c-pointer" src="right-arrow.svg" alt="" srcset="">
            </div>
        </div>

        <div class="weekdays">
            <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
        </div>


        <div class="weeks">
            <div class="week" v-for="week in calendar_data.calendar_matrix" :key="week">
                <div class="weekday-num" v-for="day_data in week" :key="day_data" :class="{ 'other-month-weekday': !day_data.is_current_month }">
                    {{ day_data.day }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Calendar",
        data() {
            return {
                calendar_data: getCalendarData(),
                weekdays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            }
        }
    }

    function getCalendarData() {
        const month_list = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const weekday_list = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const date = new Date();

        let current_year = date.getFullYear();
        let current_day = date.getDate();
        let current_weekday = weekday_list[date.getDay()]
        let current_month_name = month_list[date.getMonth()]
        let calendar_matrix = [];

        let current_month = new Date(current_year, date.getMonth(), 1);
        let week_days = [];

        if (current_month.getDay() !== 1) {
            let number_days_previous_month = new Date(current_year, date.getMonth(), 0).getDate();

            for (let i of Array.from(Array(current_month.getDay() - 1).keys()).reverse()) {
                week_days.push(
                    {
                        day: number_days_previous_month - i,
                        is_current_month: false,
                    }
                )
            }
        }

        let day = 1;

        while (day <= new Date(current_year, date.getMonth() + 1, 0).getDate()) {
            if (week_days.length < 7) {
                week_days.push(
                    {
                        day: day,
                        is_current_month: true,
                    }
                );
            } else {
                calendar_matrix.push(week_days);
                week_days = [
                    {
                        day: day,
                        is_current_month: true,
                    }
                ];
            }

            day += 1;
        }

        if (week_days.length > 1) {
            let temp_next_month_day = 1;
            while (week_days.length < 7) {
                week_days.push(
                    {
                        day: temp_next_month_day,
                        is_current_month: false,
                    }
                )
                temp_next_month_day += 1;
            }
            calendar_matrix.push(week_days);
        }

        return {
            month_list: month_list,
            weekday_list: weekday_list,
            current_month_name: current_month_name,
            current_weekday: current_weekday,
            current_year: current_year,
            current_day: current_day,
            calendar_matrix: calendar_matrix,
        }
    }

    console.log(getCalendarData())
</script>