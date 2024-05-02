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
        store
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
        // searchService(searchForm) {
        //     const endpoint = servicesEndpoint + searchForm.selectedServices[0] + '/apartments/' + '?';

        //     const queryParams = [];
        //     if (searchForm.selectedServices.length > 0) {

        //     }
        //     const queryString = queryParams.join('&');
        //     const finalEndpoint = endpoint + queryString;
        //     this.fetchApartments(finalEndpoint);
        // },

        // searchApartments(searchForm) {

        //     const endpoint = defaultEndpoint + '?';

        //     const queryParams = [];
        //     if (searchForm.address) {
        //         queryParams.push(`address=${searchForm.address}`);
        //     }
        //     if (searchForm.rooms) {
        //         queryParams.push(`rooms=${searchForm.rooms}`);
        //     }
        //     if (searchForm.beds) {
        //         queryParams.push(`beds=${searchForm.beds}`);
        //     }


        //     const queryString = queryParams.join('&');
        //     const finalEndpoint = endpoint + queryString;
        //     this.fetchApartments(finalEndpoint);



        //     if (searchForm.selectedServices.length > 0) {
        //         axios.get(`${servicesEndpoint}${searchForm.selectedServices}/apartments/`)
        //             .then(res => {
        //                 const { apartments } = res.data;
        //                 this.apartments = apartments;
        //             })
        //             .catch(err => {
        //                 console.error(err.message);
        //                 this.$router.push({ name: 'not-found' });
        //             })
        //             .then(() => {
        //                 store.isLoading = false;
        //             })

        //     };
        // },
        handleAddressSelect(selectedAddress) {

            if (selectedAddress.lat && selectedAddress.lon) {
                // Gestisci l'indirizzo selezionato come desiderato, ad esempio salvandolo nel tuo modello
                const lat = selectedAddress.lat;
                const lon = selectedAddress.lon;

                // Se c'è un indirizzo selezionato, filtra gli appartamenti per quell'indirizzo
                const filteredEndpoint = `${filterEndpoint}?lat=${lat}&lon=${lon}`;
                axios.get(filteredEndpoint)
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

                // Utilizza lat e lon come desideri
                console.log("Latitudine:", lat);
                console.log("Longitudine:", lon);
                console.log(selectedAddress);
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
            <AxiosExample @select="handleAddressSelect" />
            <SearchForm @submit-search="$emit('search-apartments', $event)" :services="services" />
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