<script>

/* IMPORTAZIONI */
import { RouterLink } from 'vue-router';
import axios from 'axios';
import tt from "@tomtom-international/web-sdk-maps";
import '@tomtom-international/web-sdk-maps/dist/maps.css';
/* ENDPOINT */
const message_endpoint = 'http://localhost:8000/api/messages';

export default {
    name: 'ApartmentCard',

    data() {
        return {
            apartment: '',
            services: [],
            isLoading: true,
            form: {
                name: '',
                email: '',
                content: '',
            },
            errors: {},
            successMessage: '',
            loadingMessage: false
        }
    },

    methods: {

        /* FUNZIONE PER LA CREAZIONE DEL MESSAGGIO */
        sendMessage(id) {

            this.validation();

            /* SE NON CI SONO ERRORI */
            if (!this.hasErrors) {
                this.loadingMessage = true;
                /* INVIO CHIAMATA API */
                axios.post(message_endpoint, {
                    name: this.form.name,
                    email: this.form.email,
                    text: this.form.text,
                    apartment_id: id
                }).then(() => {
                    this.form = { name: '', email: '', text: '', apartment_id: id }; this.errors = {}; this.successMessage = 'Messaggio inviato';
                }).catch(err => {
                    if (err.response.status === 400) {
                        const { errors } = err.response.data;
                        const errorMessages = {};
                        for (let field in errors) errorMessages[field] = errors[field][0];
                        this.errors = errorMessages;
                    } else {
                        this.errors = { network: 'si è verificato un errore' }
                    }
                    this.successMessage = ''
                }).then(() => { this.loadingMessage = false })
            }
        },

        /* CAMPI DI VALIDAZIONE */
        validation() {
            this.errors = {};
            if (!this.form.name) { this.errors.name = 'Il nome è obbligatorio' }
            if (!this.form.text) { this.errors.text = 'Il contenuto della mail è obbligatorio' }
            if (!this.form.email) {
                this.errors.email = 'La mail è obbligatoria'
            } else if (!this.form.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                this.errors.email = 'La mail inserita non è valida'
            }
        },

        /* CONTROLLO SE NELL'OGGETO CI SONO ERRORI O NO */
        isEmpty(obj) {
            return Object.entries(obj).length
        },
        getMap() {
            if (this.apartment.address) {
                const mapContainer = document.getElementById('map');
                const lat = mapContainer.dataset.latitude;
                const lon = mapContainer.dataset.longitude;
                const map = tt.map({
                    key: 'CQWxKov1VbOtQuz5Ermuoa57Re2YitYT',
                    container: mapContainer,
                    center: [lon, lat],
                    zoom: 8
                });
                map.addControl(new tt.NavigationControl());
                const marker = new tt.Marker().setLngLat([lon, lat]).addTo(map);
            }
        },
    },

    props: { apartment: Object, isDetail: Boolean },

    computed: {
        /* CONTROLLO EORRE PRIMA DI MANDARE LA CHIAMATA API */
        hasErrors() {
            return Object.entries(this.errors).length
        },
    },
    created() {
        setTimeout(() => {
            this.getMap();
        }, 2000);
    }
};

</script>

<template>
    <!-- NAVIGAZIONE PAGINE  -->
    <nav class="d-flex align-items-center">
        <ol class="breadcrumb m-0">
            <li><span><i class="fa-solid fa-chevron-left me-2 fs-5 mt-1"></i></span></li>
            <li class="breadcrumb-item">
                <RouterLink :to="{ name: 'home' }" class="color-link">Home</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Dettaglio appartamento
            </li>
        </ol>
    </nav>
    <div class="box-show mt-4">
        <div class="row">
            <div class="col">
                <!-- TITOLO -->
                <h1>{{ apartment.title }}</h1>
                <hr>
            </div>
        </div>
        <section id="info-apartment" class="mt-3">
            <div class="row row-photo rounded-4 p-3 shadow mx-1 mb-5">
                <div class="col d-md-none">
                    <div id="carouselExampleFade" class="carousel slide carousel-fade">
                        <div class="carousel-inner rounded-4" style="height: 270px;">
                            <div class="carousel-item active">
                                <img :src="apartment.cover" :alt="apartment.title" class=" rounded-4 img-fluid">
                            </div>
                            <div v-for="image in apartment.photo" :key="image.id" class="carousel-item">
                                <img :src="image.image" :alt="apartment.title" class="rounded-4 img-fluid">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div class="col-sm-12 d-none d-md-block col-md-6">
                    <!-- IMMAGINE -->
                    <img :src="apartment.cover" :alt="apartment.title" class=" rounded-4 img-fluid">
                </div>
                <div class="col-md-6 d-none d-md-block d-flex align-items-center">
                    <div class="row g-3">
                        <div v-for="image in apartment.photo" :key="image.id" class="col-6 px-1">
                            <img :src="image.image" :alt="apartment.title" class="rounded-4 img-fluid">
                        </div>
                    </div>
                </div>
                <!-- INDIRIZZO -->
                <p class="fs-5 mt-3"><i class="fa-solid fa-location-dot me-2 color-main"></i> {{ apartment.address }}
                </p>
                <!-- DETTAGLI DELL'APPARTAMENTO -->
                <section id="detail">
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

            <div class="row g-4">
                <div class="col-sm-12 col-md-6">
                    <div class="card rounded-4 h-100 p-3 shadow">

                        <!-- DESCRIZIONE -->
                        <h2 class=""> Descrizione</h2>
                        <hr>
                        <p class="descrizione">{{ apartment.description }}</p>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6">
                    <div class="card rounded-4 h-100 p-3 shadow">

                        <!-- SERVIZI -->
                        <h2 class=""> Servizi</h2>
                        <hr>
                        <ul>
                            <li v-for="service in apartment.services"
                                class="fw-medium mb-3 d-flex gap-3 align-items-center text-service">
                                <i class="fa-solid fa-circle-check icon-show"></i>
                                <span class="material-symbols-outlined">{{ service.icon }}</span>
                                {{ service.label }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr>
            <!-- Mappa -->
            <h3 class="mb-3">Dove ti troverai</h3>
            <div class="row p-3">
                <div class="col shadow rounded-4">
                    <div v-if="apartment.address">
                        <div id="map" :data-latitude="apartment.latitude" :data-longitude="apartment.longitude"
                            style="height:480px"></div>
                    </div>
                </div>
                <div class="mt-4"><i class="fa-solid fa-location-dot me-1 color-main"></i> {{ apartment.address }}</div>
            </div>
            <hr>
            <!-- INFORMAZIONI HOST -->
            <h2>Popolarità</h2>
            <hr>
            <div class="row bg-beige rounded-4 p-5 shadow mx-3">
                <div class="col-6">
                    <!-- MESSAGGI -->
                    <div class="d-flex flex-column gap-1 align-items-center">
                        <h1 class="font-number">{{ apartment.messages.length }}</h1>
                        <h4 class="fs-5"><i class="fa-solid fa-envelope me-2"></i>Messaggi</h4>
                    </div>
                </div>
                <div class="col-6">
                    <!-- VISSUALIZZAZZIONI -->
                    <div class="d-flex flex-column gap-1 align-items-center">
                        <h1 class="font-number">{{ apartment.views.length }}</h1>
                        <h4 class="fs-5"><i class="fa-solid fa-eye me-2"></i>Visualizzazioni</h4>
                    </div>
                </div>
            </div>
        </section>
        <section id="message-form" class="mt-5 ">
            <h3 class="mb-3">Invia un messaggio all'host</h3>
            <hr>
            <div class="card rounded-4 p-3 shadow  mb-5">
                <!-- FORM -->
                <form class="form-floating needs-validation" @submit.prevent=" sendMessage(apartment.id)" novalidate>
                    <!-- NOME -->
                    <div class="mb-4">
                        <label for="name" class="form-label">Inserisci il tuo nome <span
                                class="form-text text-danger fs-5">*</span></label>
                        <input type="text" class="form-control" placeholder="Mario Rossi"
                            :class="{ 'is-invalid': errors.name }" id="name" v-model.trim="form.name" required>
                        <span v-if="errors.name" class="invalid-feedback" role="alert">{{ errors.name }}</span>
                        <span id="title-error" class="text-danger"></span>

                    </div>
                    <!-- EMAIL -->
                    <div class="mb-4">
                        <label for="email" class="form-label" required>Inserisci la tua email <span
                                class="form-text text-danger fs-5">*</span></label>
                        <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }" id="email"
                            placeholder="nome@esempio.com" v-model.trim="form.email">
                        <span v-if="errors.email" class="invalid-feedback" role="alert">{{ errors.email }}</span>
                    </div>
                    <!-- CONTENUTO -->
                    <div class="mb-2">
                        <label for="exampleFormControlTextarea1" class="form-label">Contenuto del messaggio <span
                                class="form-text text-danger fs-5">*</span></label>
                        <textarea class="form-control" :class="{ 'is-invalid': errors.text }"
                            placeholder="Scrivi un messaggio" id="floatingTextarea" style="height: 160px;"
                            v-model.trim="form.text" required></textarea>
                        <span v-if="errors.text" class="invalid-feedback" role="alert">{{ errors.text
                            }}</span>
                    </div>
                    <!-- BOTTONE INVIA  -->
                    <div class="d-flex align-items-center gap-4 mt-4">
                        <button type="submit" class="btn bg-hover">Invia messaggio</button>
                        <!-- LOADER -->
                        <div v-if="loadingMessage">
                            <div class="spinner-border" role="status">
                            </div>
                        </div>
                        <!-- ALERT SUCCESSO MESSAGGIO -->
                        <div v-if="successMessage"
                            class="alert alert-success alert-dismissible p-1 show d-flex justify-content-between align-items-center gap-2 m-0"
                            role="alert">
                            <strong><i class="fa-regular fa-circle-check"></i> {{ successMessage }}</strong>
                            <button type="button" class="button-close btn p-0" data-bs-dismiss="alert"
                                aria-label="Close"><i class="fa-solid fa-x"></i></button>
                        </div>
                        <!-- ALERT EROORE MESSAGGIO -->
                        <div v-if="isEmpty(errors)"
                            class="alert alert-danger d-flex justify-content-between align-items-center alert-dismissible fade show p-1 m-0 gap-2"
                            role="alert">
                            <strong><i class="fa-regular fa-circle-xmark"></i> Si è verificato un errore!</strong>
                            <button type="button" class="button-close btn p-0" data-bs-dismiss="alert"
                                aria-label="Close"><i class="fa-solid fa-x"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.descrizione {
    font-size: 20px;
}

.text-service {
    font-size: 20px;
}


.card {
    border: 1px solid rgb(197, 197, 197);
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

.color-link {
    color: #ff5a5f;

    &:hover {
        color: #ff999c;
    }
}
</style>