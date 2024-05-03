<script>
import ApartmentList from '../components/apartments/ApartmentList.vue';
import AxiosExample from '../components/AxiosExample.vue';
import AppJumbo from '../components/AppJumbo.vue';
import SearchForm from '../components/SearchForm.vue';
import AppAlert from '../components/AppAlert.vue';
import { store } from '../data/store';
import axios from 'axios';
const defaultEndpoint = 'http://localhost:8000/api/apartments/';
const filterEndpoint = 'http://localhost:8000/api/apartments/filter';
const servicesEndpoint = 'http://localhost:8000/api/services/';

export default {
    name: 'HomePage',
    components: { ApartmentList, AppJumbo, AxiosExample, SearchForm },
    data: () => ({
        apartments: [],
        services: [],
        isAlertOpen: false,
        store,
    }),
    methods: {
        fetchApartments(endpoint = defaultEndpoint) {
            this.isLoading = true;
            // Se non c'è un indirizzo selezionato, mostra tutti gli appartamenti
            if (!this.selectedAddress) {
                axios.get(endpoint)
                    .then(response => {
                        this.isAlertOpen = false;
                        console.log(response.data)
                        this.apartments = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        this.isAlertOpen = true;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        },

        filterApartments(endpoint = defaultEndpoint) {
            // Aggiungi i parametri di ricerca per rooms e beds
            endpoint += `?rooms=${this.rooms}`;
            axios.get(endpoint)
                .then(response => {
                    this.isAlertOpen = false;
                    console.log(response.data)
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
            this.store.isLoading = true;
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
                    this.store.isLoading = false;
                });
        },

        handleAddressSelect(form) {
            console.log(form);

            if (form.lat == null && form.lon == null) {
                this.fetchApartments();
            } else if (form.lat && form.lon) {
                let filteredEndpoint = `${filterEndpoint}/?lat=${form.lat}&lon=${form.lon}`;

                // Aggiungi il filtro per il numero di stanze se è stato selezionato dall'utente
                if (form.rooms) {
                    filteredEndpoint += `&rooms=${form.rooms}`;
                }

                if (form.beds) {
                    filteredEndpoint += `&beds=${form.beds}`;
                }

                // Aggiungi il filtro per i servizi selezionati
                if (form.selectedServices.length > 0) {
                    const servicesQuery = form.selectedServices.join(',');
                    filteredEndpoint += `&services=${servicesQuery}`;
                }
                if (form.radius) {
                    filteredEndpoint += `&radius=${form.radius}`;
                }

                axios.get(filteredEndpoint)
                    .then(response => {
                        this.isAlertOpen = false;
                        console.log(response.data);
                        this.apartments = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        this.isAlertOpen = true;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });

                // Utilizza lat e lon come desideri
                console.log("Latitudine:", form.lat);
                console.log("Longitudine:", form.lon);
            }
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
        <div class="d-flex justify-content-center align-items-center search-form gap-1">
            <!-- <AxiosExample @select="handleAddressSelect" /> -->
            <SearchForm @submit-search="handleAddressSelect" :services="services" />
        </div>
        <AppLoader v-if="store.isLoading" />
        <ApartmentList v-else :apartments="apartments" />
    </div>
</template>

<style lang="scss" scoped>
.search-form {
    margin: 0 auto;
    position: relative;
    bottom: 25px;
    background-color: #f2f2f2;
    padding: 7px 7px;
    border-radius: 10px;
    max-width: 1000px;

    .btn-light {
        background-color: white;
        color: black;
        border: 1px solid #DEE2E6;

    }
}
</style>