<script>
import AppLoader from '../components/AppLoader.vue';
import ApartmentShow from '../components/apartments/ApartmentShow.vue';
import { store } from '../data/store';
import axios from 'axios';
const endpoint = 'http://localhost:8000/api/apartments/';
// Endpoint per le visualizzazioni
const viewsEndpoint = `http://localhost:8000/api/apartments/${this.$route.params.id}/views`;


export default {
    name: 'ApartmentDetailPage',
    components: { ApartmentShow, AppLoader },
    data: () => ({
        apartment: null,
        store,
    }),
    methods: {
        getPost() {
            store.isLoading = true;
            axios.get(endpoint + this.$route.params.id)
                .then(res => { this.apartment = res.data; })
                .catch(err => { console.error(err) })
                .then(() => { store.isLoading = false; })
        },

        async sendView() {
            try {
                const res = await axios.post(viewsEndpoint, {
                    apartment_id: this.apartment.id
                });
                console.log(res.data.indirizzoIP);
            } catch (error) {
                console.error('Errore durante il recupero dell\'indirizzo IP:', error);
            }
        }
    },


    created() {
        console.log('created - ID dell\'appartamento:', this.$route.params.id);
        this.getPost();
    },
};
</script>

<template>
    <AppLoader v-if="store.isLoading && !apartment" />
    <div class="container box-show">

        <!-- <ApartmentShow v-if="!store.isLoading && apartment" :apartment="apartment" :isDetail="true" /> -->
        <!-- <ApartmentShow v-if="!store.isLoading && apartment" :apartment="apartment" :isDetail="true" /> -->
        <ApartmentShow v-if="apartment" :apartment="apartment" :isDetail="true" />
    </div>

</template>

<style scoped>
.box-show {
    margin-top: 90px;
}
</style>