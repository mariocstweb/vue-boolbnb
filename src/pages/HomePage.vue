<script>
import ApartmentList from '../components/apartments/ApartmentList.vue';
import AppJumbo from '../components/AppJumbo.vue';
import AppAlert from '../components/AppAlert.vue';
import { store } from '../data/store';
import axios from 'axios';
const defaultEndpoint = 'http://localhost:8000/api/apartments/';
const servicesEndpoint = 'http://localhost:8000/api/services/';

export default {
    name: 'HomePage',
    components: { ApartmentList, AppJumbo },
    data: () => ({
        apartments: [],
        services: [],
        isAlertOpen: false,
        store
    }),
    methods: {
        fetchApartments(endpoint = defaultEndpoint) {
            this.isLoading = true;
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
        // searchService(searchForm) {
        //     const endpoint = servicesEndpoint + searchForm.selectedServices[0] + '/apartments/' + '?';

        //     const queryParams = [];
        //     if (searchForm.selectedServices.length > 0) {

        //     }
        //     const queryString = queryParams.join('&');
        //     const finalEndpoint = endpoint + queryString;
        //     this.fetchApartments(finalEndpoint);
        // },

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
            this.fetchApartments(finalEndpoint);



            if (searchForm.selectedServices.length > 0) {
                axios.get(`${servicesEndpoint}${searchForm.selectedServices}/apartments/`)
                    .then(res => {
                        const { apartments } = res.data;
                        this.apartments = apartments;
                    })
                    .catch(err => {
                        console.error(err.message);
                        this.$router.push({ name: 'not-found' });
                    })
                    .then(() => {
                        store.isLoading = false;
                    })

            };

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
        <AppLoader v-if="store.isLoading" />
        <ApartmentList v-else :apartments="apartments" />
    </div>
</template>
