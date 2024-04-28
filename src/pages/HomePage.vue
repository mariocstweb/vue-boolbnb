<script>
import ApartmentList from '../components/apartments/ApartmentList.vue';
import AppAlert from '../components/AppAlert.vue';
import { store } from '../data/store';
import axios from 'axios';
import BasePagination from '../components/BasePagination.vue';
const defaultEndpoint = 'http://localhost:8000/api/apartments/';


export default {
    name: 'HomePage',
    components: { ApartmentList },
    data: () => ({
        apartments: {
            data: [],
            links: [],
        },
        isAlertOpen: false,
        store
    }),
    methods: {
        fetchApartments(endpoint = defaultEndpoint) {
            store.isLoading = true
            axios.get(endpoint).then(res => {
                this.isAlertOpen = false;
                const { data, links } = res.data
                this.apartments = { data, links };
            }).catch(err => {
                console.error(err)
                this.isAlertOpen = true;
            }).then(() => {
                store.isLoading = false;
            })
        }
    },
    created() {
        this.fetchApartments();
    }
};
</script>

<template>
    <AppAlert :show="isAlertOpen" @close="isAlertOpen = false" @retry="fetchApartments" />
    <div class="d-flex justify-content-center flex-column align-items-center">
        <BasePagination class="" :links="apartments.links" @changePage="fetchApartments" />
    </div>
    <AppLoader v-if="store.isLoading" />
    <ApartmentList v-else :apartments="apartments.data" />
</template>

<style scoped></style>