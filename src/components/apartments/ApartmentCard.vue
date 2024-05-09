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
            <div class="col sponsor-box">
                <!-- IMMAGINE -->
                <img v-if="apartment.cover" :src="apartment.cover" :alt="apartment.title" class="box-img rounded-3">
                <div class="sponsor" v-if="apartment.sponsors && apartment.sponsors.length !== 0">
                    <i class="fa-solid fa-award"></i> In Evidenza
                </div>
            </div>
            <div class="col">
                <!-- TITOLO -->
                <h5 class="my-2">{{ apartment.title }}</h5>
            </div>
            <div class="col-12 d-flex justify-content-start align-items-center">
                <!-- INDIRIZZO -->
                <div class="w-text"><i class="fa-solid fa-location-dot me-1 color-main"></i> {{
                    apartment.address }}</div>
            </div>
        </RouterLink>
    </div>

</template>

<style lang="scss" scoped>
.w-text {
    width: 50px;
}




/* IMMAGINE */
.box-img {
    height: 300px;
    width: 100%;
    transition: transform .2s;

    &:hover {
        transform: scale(1.03);
    }
}

/* COLORE BASE */
.color-main {
    color: #ff5a5f;
}

.h5 {
    font-size: 1.20rem;
}

.sponsor-box {
    position: relative;
}


.sponsor {
    position: absolute;
    // background: linear-gradient(100deg, #FF5A5F, #FF9D0A);
    background: linear-gradient(45deg, rgba(255, 90, 95, 1), rgba(255, 157, 10, 1));
    color: white;
    top: 8px;
    right: 8px;
    padding: 4px 8px;
    border-radius: 8px;
}
</style>