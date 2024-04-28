<script>
import AppLoader from '../components/AppLoader.vue';
import ApartmentCard from '../components/apartments/ApartmentCard.vue';
import { store } from '../data/store';
import axios from 'axios';
const endpoint = 'http://localhost:8000/api/apartments/';

export default {
    name: 'ApartmentDetailPage',
    components: { ApartmentCard, AppLoader },
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
    },
    created() {
        this.getPost();
    }
};
</script>

<template>
    <AppLoader v-if="store.isLoading && !apartment" />
    <ApartmentCard v-if="!store.isLoading && apartment" :apartment="apartment" :isDetail="true" />

</template>

<style scoped></style>