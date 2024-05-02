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
        rooms: null
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

        handleAddressSelect(form) {
    console.log(form);

    if (form.lat && form.lon) {
        // Costruisci l'endpoint con i parametri lat e lon
        const filteredEndpoint = `${filterEndpoint}/?lat=${form.lat}&lon=${form.lon}`;
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
    } else {
        this.fetchApartments();
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
    padding: 5px 5px;
    border-radius: 10px;
    max-width: 900px;

    .btn-light {
        background-color: white;
        color: black;
        border: 1px solid #DEE2E6;

    }
}
</style>