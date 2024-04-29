<script>
import ApartmentList from '../components/apartments/ApartmentList.vue';
import AppJumbo from '../components/AppJumbo.vue';
import AppAlert from '../components/AppAlert.vue';
import { store } from '../data/store';
import axios from 'axios';
import BasePagination from '../components/BasePagination.vue';
const defaultEndpoint = 'http://localhost:8000/api/apartments/';

export default {
    name: 'HomePage',
    components: { ApartmentList, AppJumbo },
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
            this.isLoading = true;
            axios.get(endpoint)
                .then(response => {
                    this.isAlertOpen = false;
                    this.apartments = response.data;
                })
                .catch(error => {
                    console.error(error);
                    this.isAlertOpen = true;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        searchApartments(searchTerm) {
            const endpoint = `${defaultEndpoint}?address=${searchTerm}`;
            this.fetchApartments(endpoint);
        },
    },

    created() {
        this.fetchApartments();
    }
};
</script>

<template>
    <AppJumbo @search-apartments="searchApartments" />
    <div class="container">
        <AppAlert :show="isAlertOpen" @close="isAlertOpen = false" @retry="fetchApartments" />
        <div class="d-flex justify-content-center flex-column align-items-center">
            <BasePagination class="" :links="apartments.links" @changePage="fetchApartments" />
        </div>
        <AppLoader v-if="store.isLoading" />
        <ApartmentList v-else :apartments="apartments.data" />
    </div>
</template>
