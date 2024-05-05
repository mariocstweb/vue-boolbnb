<script>

/* IMPORTAZIONI */
import AppLoader from '../components/AppLoader.vue';
import ApartmentShow from '../components/apartments/ApartmentShow.vue';
import { store } from '../data/store';
import axios from 'axios';

/* ENDPOINT LISTA APPARATAMENTI */
const endpoint = 'http://localhost:8000/api/apartments/';

export default {
    name: 'ApartmentDetailPage',
    components: { ApartmentShow, AppLoader },
    data: () => ({
        apartment: null,
        store,
    }),

    methods: {
        /* FUNZIONE PER FARE UNA CHIAMATA API PER VISSUALIZZARE IL DETTAGLIO DELL'APPARATEMNTO */
        getPost() {
            store.isLoading = true;
            axios.get(endpoint + this.$route.params.id)
                .then(res => { this.apartment = res.data; })
                .catch(err => { console.error(err) })
                .then(() => { store.isLoading = false; })
        },
    },

    /* ALL'AVVIO DELLA PAGINA */
    created() {
        this.getPost();
    }
};
</script>

<template>

    <!-- LOADER -->
    <AppLoader v-if="store.isLoading && !apartment" />
    <div class="container box-show">
        <!-- SHOW APPARTAMENTO -->
        <ApartmentShow v-if="!store.isLoading && apartment" :apartment="apartment" :isDetail="true" />
    </div>

</template>

<style scoped>

/* BOX MARGINE SUPERIORE */
.box-show {
    margin-top: 90px;
}

</style>