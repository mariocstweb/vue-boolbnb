<script>
import ApartmentList from '../components/apartments/ApartmentList.vue';
import AppJumbo from '../components/AppJumbo.vue';
import AppAlert from '../components/AppAlert.vue';
import { store } from '../data/store';
import axios from 'axios';
import BasePagination from '../components/BasePagination.vue';
const defaultEndpoint = 'http://localhost:8000/api/apartments/';
const servicesEndpoint = 'http://localhost:8000/api/services/';

export default {
    name: 'HomePage',
    components: { ApartmentList, AppJumbo },
    data: () => ({
        apartments: {
            data: [],
            links: [],
        },
        services: {
            data: [],
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

        fetchServices(endpoint = servicesEndpoint) {
            this.isLoading = true;
            axios.get(endpoint)
                .then(response => {
                    this.isAlertOpen = false;
                    this.services = response.data;
                })
                .catch(error => {
                    console.error(error);
                    this.isAlertOpen = true;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        searchApartments(searchForm) {
            const endpoint = defaultEndpoint + '?';

            const queryParams = [];
            if (searchForm.address) {
                queryParams.push(`address=${searchForm.address}`);
            }
            if (searchForm.rooms) {
                queryParams.push(`rooms=${searchForm.rooms}`);
            }
            if (searchForm.beds) {
                queryParams.push(`beds=${searchForm.beds}`);
            }


            const queryString = queryParams.join('&');
            const finalEndpoint = endpoint + queryString;



            // Filtra gli appartamenti in base ai servizi selezionati
            let filteredApartments = this.apartments.data;
            if (searchForm.selectedServices.length > 0) {
                filteredApartments = filteredApartments.filter(apartment => {
                    return searchForm.selectedServices.every(serviceId => {
                        return apartment.services.includes(serviceId);
                    });
                });
            }

            // Aggiorna la lista degli appartamenti con quelli filtrati
            this.apartments.data = filteredApartments;

            // Effettua la richiesta con l'URL costruito
            this.fetchApartments(finalEndpoint);
        }

    },

    created() {
        this.fetchApartments();
        this.fetchServices();
    }
};
</script>

<template>
    <AppJumbo @search-apartments="searchApartments" :services="services" />
    <div class="container">
        <AppAlert :show="isAlertOpen" @close="isAlertOpen = false" @retry="fetchApartments" />
        <div class="d-flex justify-content-center flex-column align-items-center">
            <BasePagination class="" :links="apartments.links" @changePage="fetchApartments" />
        </div>
        <AppLoader v-if="store.isLoading" />
        <ApartmentList v-else :apartments="apartments.data" />
    </div>
</template>
