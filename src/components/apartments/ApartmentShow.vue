<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'ApartmentCard',
    props: { apartment: Object, isDetail: Boolean },
    computed: {
        abstract() {
            const abstract = this.apartment.description.slice(0, 150);
            return abstract + '...';
        },
        pubblicationDate() {
            const date = new Date(this.apartment.created_at);

            let day = date.getDate();
            let month = date.getMonth() + 1;
            const year = date.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();

            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month;
            if (hours < 10) hours = '0' + hours;
            if (minutes < 10) minutes = '0' + minutes;


            return `${day}/${month}/${year} alle ${hours}:${minutes}`;
        }
    }
};
</script>

<template>

    <div class="box-show mt-4">
        <div class="row">
            <div class="col">
                <!-- title -->
                <h1>{{ apartment.title }}</h1>
            </div>
            <div class="col  d-flex justify-content-end align-items-center m-0">
                <!-- button indietro -->
                <RouterLink :to="{ name: 'home' }" class="btn bg-hover">Torna Indietro</RouterLink>
            </div>
        </div>
        <section id="info-apartment" class="mt-3">
            <div class="row pb-3">
                <div class="col-6 ">
                    <!-- img apartment -->
                    <img :src="apartment.cover" :alt="apartment.title" class="img-fluid img-apartment-guest rounded-4">
                </div>
                <!-- mettere altre immagini -->
            </div>
            <div class="row">
                <div class="col">
                    <!-- indirizzo -->
                    <p class="fs-5"><i class="fa-solid fa-location-dot me-2 color-main"></i> {{ apartment.address }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <!-- description -->
                    <h2 class="mb-3"> Descrizione</h2>
                    <p class="fs-5">{{ apartment.description }}</p>
                    <section id="detail">

                        <h2 class="card-title mt-5 mb-2">Dettaglio appartamento</h2>
                        <div class="fw-medium stats mb-2">Come è composto</div>
                        <ul class="d-flex gap-3">
                            <li>
                                <span class="badge fw-medium"><i class="fa-solid fa-door-closed me-2"></i>
                                    {{ apartment.rooms }} camere</span>
                            </li>
                            <li>
                                <span class="badge fw-medium"><i class="fa-solid fa-bath me-2"></i>
                                    {{ apartment.bathrooms }} bagni</span>
                            </li>
                            <li>
                                <span class="badge fw-medium"><i class="fa-solid fa-ruler-horizontal me-2"></i>
                                    {{ apartment.sqm }} mq</span>
                            </li>
                            <li>
                                <span class="badge fw-medium"><i class="fa-solid fa-bed me-2"></i> {{ apartment.rooms }}
                                    letti</span>
                            </li>
                        </ul>
                    </section>
                </div>
                <div class="col">
                    <!-- SERVIZI -->
                    <h2 class="mb-3"> Servizi</h2>
                    <ul>
                        <li v-for="service in apartment.services"
                            class="fw-medium mb-3 d-flex gap-3 align-items-center fs-5">
                            <i class="fa-solid fa-circle-check icon-show"></i>
                            <span class="material-symbols-outlined">{{ service.icon }}</span>
                            {{ service.label }}
                        </li>
                    </ul>
                </div>
            </div>
            <h2>Informazioni sull'host</h2>
            <div class="row bg-beige rounded-4 p-5">
                <div class="col-3">
                    <!-- host -->
                    <div class="d-flex flex-column gap-4 align-items-center">
                        <!-- immagine host -->
                        <img :src="apartment.cover" alt="profile" width="150px" height="150px" class="rounded-circle">
                        <h4>Mario Rossi</h4>
                    </div>
                </div>
                <div class="col-3">
                    <!-- appartamenti -->
                    <div class="d-flex flex-column gap-4 align-items-center">
                        <!-- immagine host -->
                        <h1 class="font-number">50</h1>
                        <h4><i class="fa-solid fa-building me-2"></i>Appartamenti</h4>
                    </div>
                </div>
                <div class="col-3">
                    <!-- messaggi -->
                    <div class="d-flex flex-column gap-4 align-items-center">
                        <!-- immagine host -->
                        <h1 class="font-number">10</h1>
                        <h4><i class="fa-solid fa-envelope me-2"></i>Messaggi</h4>
                    </div>
                </div>
                <div class="col-3">
                    <!-- Visualizzazioni -->
                    <div class="d-flex flex-column gap-4 align-items-center">
                        <!-- immagine host -->
                        <h1 class="font-number">500</h1>
                        <h4><i class="fa-solid fa-eye me-2"></i>Visualizzazioni</h4>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.card {
    border: 1px solid #258277;
}

.icon-show {
    color: #ff5a5f;
}

.card-header,
.card-footer {
    background-color: #51a59b;

    .show-button {
        background-color: #454c81;
        color: #fff;
    }
}

.font-number {
    font-size: 120px;
}

.bg-beige {
    background-color: #F0EFE9;
}

.bg-hover {
    background-color: #ff5a5f;
    color: white;

    &:hover {
        background-color: #ff999c;
    }
}

.color-main {
    color: #ff5a5f;
}

#detail {

    /* RECIPIENTE IMMAGINE DI COPERTINA */
    .thumb-img {
        width: 100%;
        height: 400px;
        margin-bottom: 25px;

        /* IMMAGINE COPERTINA */
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 15px;
        }
    }

    p {

        /* INDIRIZZO */
        .road {
            font-size: 20px;
        }
    }

    /* DETTAGLI */
    .stats {
        font-size: 20px;
        color: #737373;
    }

    /* LISTA */
    ul {
        padding: 0;
        list-style-type: none;

        /* LISTA DETTAGLI */
        .badge {
            color: black;
            font-size: 15px;
            background-color: #F2F2F2;
        }
    }
}
</style>