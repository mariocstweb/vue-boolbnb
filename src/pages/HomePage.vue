<script>
/* IMPORTAZIONE */
import ApartmentList from '../components/apartments/ApartmentList.vue';
import AppJumbo from '../components/AppJumbo.vue';
import SearchForm from '../components/SearchForm.vue';
import AppAlert from '../components/AppAlert.vue';
import { store } from '../data/store';
import axios from 'axios';

/* ENDPOINT */
const defaultEndpoint = 'http://localhost:8000/api/apartments/';
const filterEndpoint = 'http://localhost:8000/api/apartments/filter';
const servicesEndpoint = 'http://localhost:8000/api/services/';

export default {
    name: 'HomePage',
    components: { ApartmentList, AppJumbo, SearchForm, AppAlert },
    data: () => ({
        apartments: [],
        services: [],
        isAlertOpen: false,
        store,
    }),


    methods: {

        /* FUNZIONE PER FARE UNA CHIAMATA API PER VISSUALIZZARE TUTTI GLI APPARATEMNTI */
        fetchApartments(endpoint = defaultEndpoint) {
            this.isLoading = true;
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

        /* FUNZIONE PER FARE UNA CHIAMATA API PER RECUPERARE TUTTI I SERVIZI */
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

        /* FUNZIONE PER FARE UNA CHIAMATA API PER FILTRARE IN BASE A CERTI PARAMETRI SELEZIONATI DALL'UTENTE */
        handleAddressSelect(form) {
            console.log(form);

            /* SE LATITUDINE E LOGITUDINE SONO NULLI RICHIAMA LA FUNZIONE CON TUTTI GLI APPARTAMENTI */
            if (form.lat == null && form.lon == null) {
                this.fetchApartments();

                /* ALTRIMENTI SE ESISTENO */
            } else if (form.lat && form.lon) {

                /* ENDPOINT DI BASE */
                let filteredEndpoint = `${filterEndpoint}/?lat=${form.lat}&lon=${form.lon}`;

                /* SE SELEZIONATO FILTRO PER STANZE */
                if (form.rooms) {
                    filteredEndpoint += `&rooms=${form.rooms}`;
                }

                /* SE SELEZIONATO FILTRO PER LETTI */
                if (form.beds) {
                    filteredEndpoint += `&beds=${form.beds}`;
                }

                /* SE SELEZIONATO FILTRO PER SERVIZI */
                if (form.selectedServices.length > 0) {
                    const servicesQuery = form.selectedServices.join(',');
                    filteredEndpoint += `&services=${servicesQuery}`;
                }

                /* SE SELEZIONATO FILTRO PER RAGGIO */
                if (form.radius) {
                    filteredEndpoint += `&radius=${form.radius}`;
                }

                /* CHIMATA API CON O SENZA FILTRI */
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

                console.log("Latitudine:", form.lat);
                console.log("Longitudine:", form.lon);
            }
        }
    },

    /* ALL'AVVIO DELLA PAGINA */
    created() {
        this.fetchApartments();
        this.fetchServices();
    }
};
</script>

<template>
    <!-- JUMBO -->
    <AppJumbo />

    <!-- CONTENUTO -->
    <div class="container">
        <!-- ALERT -->
        <AppAlert :show="isAlertOpen" @close="isAlertOpen = false" @retry="fetchApartments" />
        <div class=" search-form p-2">
            <!-- BARRA DI RICERCA -->
            <SearchForm @submit-search="handleAddressSelect" :services="services" />
        </div>
        <!-- LOADER -->
        <AppLoader v-if="store.isLoading" />
        <!-- LISTA APPARTAMENTI -->
        <ApartmentList v-else :apartments="apartments" />
    </div>

</template>

<style lang="scss" scoped>
/* SERACHFORM  */
.search-form {
    margin: 0 auto;
    position: relative;
    bottom: 34px;
    max-width: 530px;
}
</style>