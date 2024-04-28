<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'ApartmentCard',
    props: { apartment: Object, isDetail: Boolean },
    computed: {
        abstract() {
            const abstract = this.apartment.description.slice(0, 150);
            return abstract + '...';
        },
        pubblicationDate() {
            const date = new Date(this.apartment.created_at);

            let day = date.getDate();
            let month = date.getMonth() + 1;
            const year = date.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();

            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month;
            if (hours < 10) hours = '0' + hours;
            if (minutes < 10) minutes = '0' + minutes;


            return `${day}/${month}/${year} alle ${hours}:${minutes}`;
        }
    }
};
</script>

<template>

    <div class="box-show mt-4">

        <h1>{{ apartment.title }}</h1>
        <hr>
        <section id="info-apartment">
            <div class="row pb-3">
                <div class="col-7">
                    <p>{{ apartment.description }}</p>
                </div>
                <div class="col-5 ">
                    <img :src="apartment.cover" :alt="apartment.title" class="img-fluid img-apartment-guest">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <RouterLink :to="{ name: 'home' }" class="btn btn-secondary">Torna Indietro</RouterLink>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.card {
    border: 1px solid #258277;
}

.card-header,
.card-footer {
    background-color: #51a59b;

    .show-button {
        background-color: #454c81;
        color: #fff;
    }
}
</style>