<script>
import AppLoader from '../components/AppLoader.vue';
import ApartmentShow from '../components/apartments/ApartmentShow.vue';
import { store } from '../data/store';
import axios from 'axios';
const endpoint = 'http://localhost:8000/api/apartments/';

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
    },
    created() {
        this.getPost();
    }
};
</script>

<template>
    <AppLoader v-if="store.isLoading && !apartment" />
    <div class="container box-show">

        <ApartmentShow v-if="!store.isLoading && apartment" :apartment="apartment" :isDetail="true" />
    </div>

</template>

<style scoped>
.box-show {
    margin-top: 90px;
}
</style>