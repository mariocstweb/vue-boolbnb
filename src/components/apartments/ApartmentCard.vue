<script>
export default {
    name: 'ApartmentCard',

    props: { apartment: Object, isDetail: Boolean },
};
</script>

<template>

    <div class="col-lg-3 col-md-4 col-sm-12 rounded-3">
        <div class="row h-100 justify-content-center align-items-center flex-column">
            <!-- ROTTA CHE PORTA AL DETTAGLIO DELL'APPARTAMENTO -->
            <RouterLink class="navbar-brand " :to="{ name: 'apartment-detail', params: { id: apartment.id } }">
                <div class="col">
                    <!-- IMMAGINE -->
                    <img v-if="apartment.cover" :src="apartment.cover" :alt="apartment.title" class="box-img rounded-3">
                </div>
                <div class="col">
                    <!-- TITOLO -->
                    <h5 class="m-2">{{ apartment.title }}</h5>
                </div>
                <div class="col-12 d-flex justify-content-start align-items-center pe-2 flex-wrap">
                    <!-- INDIRIZZO -->
                    <address class="ms-2"><i class="fa-solid fa-location-dot me-2 color-main"></i> {{
                        apartment.address}}</address>
                </div>
            </RouterLink>
        </div>
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

</style>