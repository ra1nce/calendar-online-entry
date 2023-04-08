<template>
    <div class="center">
        <div class="items">
            <div class="item">
                <div class="row">
                    <div class="column">
                        <p class="item-id">
                            1
                        </p>
                    </div>
                    <div class="column">
                        <div class="row">
                            <span class="desc-item-row">Имя:</span><span class="item-first-name">John</span>
                        </div>
                        <div class="row">
                            <span class="desc-item-row">Фамилия:</span><span class="item-last-name">Domang</span>
                        </div>
                        <div class="row">
                            <span class="desc-item-row">Номер телефона:</span><span class="item-phone">+7 977 999 99 99</span>
                        </div>
                        <div class="row">
                            <span class="desc-item-row">Email:</span><span class="item-email">testmail@mail.ru</span>
                        </div>
                        <div class="row">
                            <span class="desc-item-row">Дата записи:</span><span class="item-recording-date">09.04.2023 14:30</span>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="item">
                <div class="row">
                    <div class="column">
                        <p class="item-id">
                            2
                        </p>
                    </div>
                    <div class="column">
                        <div class="row">
                            <span class="desc-item-row">Имя:</span><span class="item-first-name">John</span>
                        </div>
                        <div class="row">
                            <span class="desc-item-row">Фамилия:</span><span class="item-last-name">Domang</span>
                        </div>
                        <div class="row">
                            <span class="desc-item-row">Номер телефона:</span><span class="item-phone">+7 977 999 99 99</span>
                        </div>
                        <div class="row">
                            <span class="desc-item-row">Email:</span><span class="item-email">testmail@mail.ru</span>
                        </div>
                        <div class="row">
                            <span class="desc-item-row">Дата записи:</span><span class="item-recording-date">09.04.2023 14:30</span>
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
        font-size: 18px;
        font-weight: 700;
        color: #fff;
        margin: 0;
        padding: 0;
    }

    .center {
        height: 100vh;

        margin-top: 40px;

        display: flex;
        justify-content: center;
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
export default {
    setup() {
        
    },
}
</script>