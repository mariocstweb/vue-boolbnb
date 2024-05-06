<script>
export default {
    name: 'ApartmentCard',

    props: { apartment: Object, isDetail: Boolean },
};
</script>

<template>

    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 rounded-3 mb-5">

        <!-- ROTTA CHE PORTA AL DETTAGLIO DELL'APPARTAMENTO -->
        <RouterLink class="navbar-brand " :to="{ name: 'apartment-detail', params: { id: apartment.id } }">
            <div class="col">
                <!-- IMMAGINE -->
                <img v-if="apartment.cover" :src="apartment.cover" :alt="apartment.title" class="box-img rounded-3">
            </div>
            <div class="col">
                <!-- TITOLO -->
                <h5 class="my-2">{{ apartment.title }}</h5>
            </div>
            <div class="col-12 d-flex justify-content-start align-items-center">
                <!-- INDIRIZZO -->
                <div class=""><i class="fa-solid fa-location-dot me-1 color-main"></i> {{
                    apartment.address }}</div>
            </div>
        </RouterLink>
    </div>

</template>

<style lang="scss" scoped>
/* IMMAGINE */
.box-img {
    height: 270px;
    width: 100%;
}

/* COLORE BASE */
.color-main {
    color: #ff5a5f;
}

.h5 {
    font-size: 1.20rem;
}
</style>