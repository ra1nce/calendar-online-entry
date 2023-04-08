<template>
    <div class="center">
        <div class="items">

            <div class="item" v-for="record in records" :key="record">
                <div class="row">
                    <div class="column">
                        <p class="item-id">
                            {{ record.id }}
                        </p>
                    </div>
                    <div class="column">
                        <div class="row">
                            <span class="desc-item-row">Имя:</span><span class="item-first-name">{{ record.first_name }}</span>
                        </div>
                        <div class="row">
                            <span class="desc-item-row">Фамилия:</span><span class="item-last-name">{{ record.last_name }}</span>
                        </div>
                        <div class="row">
                            <span class="desc-item-row">Номер телефона:</span><span class="item-phone">{{ record.phone }}</span>
                        </div>
                        <div class="row">
                            <span class="desc-item-row">Email:</span><span class="item-email">{{ record.email }}</span>
                        </div>
                        <div class="row">
                            <span class="desc-item-row">Дата записи:</span><span class="item-recording-date">{{ record.recording_date }}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

    * {
        font-family: 'Inter', sans-serif;
        margin: 0;
        padding: 0;
    }

    .center {
        height: 100vh;

        margin-top: 40px;

        display: flex;
        justify-content: center;
    }

    .items {
        font-size: 18px;
        font-weight: 700;
        color: #fff;
    }

    .item {
        margin-bottom: 40px;
    }

    .row {
        display: flex;
    }

    .column {
        display: flex;
        flex-direction: column;

        margin: auto;
    }

    .item-id {
        width: 50px;
        font-size: 32px;
        margin-right: 20px;
    }

    .desc-item-row {
        width: 200px;
    }
</style>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const records = ref({});

        onMounted(async () => {
            records.value = await getRecords();
        });

        return {
            records,
        }
    },
}

function getRecords() {
    let result = fetch('https://dev.raince.ru/api/records')
        .then(response => response.json())
        .then(data => {
            return data;
        });

    return result;
}
</script>