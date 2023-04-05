<template>
    <div class="calendar">
        <div class="month">
            <div class="month-arrow-left" v-on:click="change_month(-1)">
                <img class="c-pointer" src="left-arrow.svg" alt="" srcset="">
            </div>
            
            <p class="month-name">{{ calendar_data.month_name }} {{ calendar_data.current_year }}</p>

            <div class="month-arrow-right" v-on:click="change_month(1)">
                <img class="c-pointer" src="right-arrow.svg" alt="" srcset="">
            </div>
        </div>

        <div class="weekdays">
            <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
        </div>

        <div class="weeks">
            <div class="week" v-for="week in calendar_data.calendar_matrix" :key="week">
                <div class="weekday-num" v-for="day_data in week" :key="day_data" :class="{ 'other-month-weekday': !day_data.is_current_month }" @click="change_date(day_data.day_full_name)">
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
        },
        methods: {
            change_month: function(amount) {
                this.calendar_data.month_index += amount;

                if (this.calendar_data.month_index == -1) {
                    this.calendar_data.month_index = 11;
                    this.calendar_data.current_year -= 1;
                } else if (this.calendar_data.month_index == 12) {
                    this.calendar_data.month_index = 0;
                    this.calendar_data.current_year += 1;
                }

                this.calendar_data.month_name = this.calendar_data.month_list[this.calendar_data.month_index];
                this.calendar_data.calendar_matrix = getCalendarMatrix(
                    this.calendar_data.current_year, 
                    this.calendar_data.month_index
                );
            },
            change_date(data) {
                console.log(data)
                this.$emit('changeDate', data)
            },
        }
    }

    function format_date_num(num) {
        return num.toString().padStart(2, '0');
    }

    function create_day_obj(day, month_index, year, is_current_month) {
        return {
            day: day,
            day_full_name: `${format_date_num(day)}.${format_date_num(month_index + 1)}.${year}`,
            is_current_month: is_current_month,
        }
    }

    function getCalendarMatrix(year, month_index) {
        let calendar_matrix = [];
        let current_month = new Date(year, month_index, 1);
        let week_days = [];
        let day_index = current_month.getDay();

        if (day_index == 0) {
            day_index = 7;
        }

        if (day_index !== 1) {
            let number_days_previous_month = new Date(year, month_index, 0).getDate();

            for (let i = day_index - 2; i >= 0; i--) {
                week_days.push(
                    create_day_obj(number_days_previous_month - i, month_index - 1, year, false)
                )
            }
        }

        let day = 1;

        while (day <= new Date(year, month_index + 1, 0).getDate()) {
            if (week_days.length < 7) {
                week_days.push(
                    create_day_obj(day, month_index, year, true)
                );
            } else {
                calendar_matrix.push(week_days);
                week_days = [
                    create_day_obj(day, month_index, year, true)
                ];
            }

            day += 1;
        }

        if (week_days.length > 1) {
            let temp_next_month_day = 1;
            while (week_days.length < 7) {
                week_days.push(
                    create_day_obj(temp_next_month_day, month_index + 1, year, false)
                )
                temp_next_month_day += 1;
            }
            calendar_matrix.push(week_days);
        }

        return calendar_matrix;
    }

    function getCalendarData() {
        const month_list = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const weekday_list = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const date = new Date();

        let month_index = date.getMonth();
        let current_year = date.getFullYear();
        let month_name = month_list[month_index]
        
        let calendar_matrix = getCalendarMatrix(current_year, month_index);

        return {
            month_list: month_list,
            weekday_list: weekday_list,
            month_index: month_index,
            month_name: month_name,
            current_year: current_year,
            calendar_matrix: calendar_matrix,
        }
    }
</script>