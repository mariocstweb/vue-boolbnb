<script>
/* IMPORTO AXIOS */
import axios from 'axios';

export default {
  name: 'SearchForm',

  data() {
    return {
      form: {
        rooms: 1,
        beds: 1,
        lat: null,
        lon: null,
        selectedServices: [],
        searchTerm: '',
        suggestions: [],
        showSuggestions: false,
        timeoutId: null,
        radius: 5000,
        baseUri: 'https://api.tomtom.com/search/2/geocode/',
        baseParams: {
          key: '53sGOQMX7vlm9luNV3aNYNhTMmaEKsKx',
          limit: 5,
          countrySet: 'IT',
          language: 'it-IT'
        },
      }
    };
  },

  emits: ['submit-search'],

  methods: {
    /* FUNZIONE CHE SI ATTIVA ALL'EVENTO @INPUT (ADDRESS)  */
    searchPlace() {
      this.form.showSuggestions = true;
      clearTimeout(this.form.timeoutId);
      this.form.timeoutId = setTimeout(() => {
        this.fetchApi(this.form.searchTerm);
      }, 400);
    },

    /* FUNZIONE IN CUI PASSO IL VALORE SCELTO DALL'UTENTE */
    fetchApi(query) {

      /* SE NON CE VALORE */
      if (!query) {
        this.form.suggestions = [];
        this.form.showSuggestions = false;
        return;
      }

      /* SE CE UN VALORE FACCIO UNA CHIMATA API AL TOMTOM  */
      axios.get(`${this.form.baseUri}${query}.json`, {
        params: this.form.baseParams
      }).then(res => {
        const { results } = res.data;
        this.form.suggestions = results.map(result => ({
          address: result.address.freeformAddress,
          lat: result.position.lat,
          lon: result.position.lon
        }));
      }).catch(err => {
        console.error(err);
        this.form.suggestions = [];
        this.form.showSuggestions = false;
      });

    },

    /* FUNZIONE CHE VIENE RTICHIAMTA AL @CLICK SU UNA VIA SCLETA DALL'UTENTE */
    selectSuggestion(suggestion) {
      this.form.searchTerm = suggestion.address;
      this.form.lat = suggestion.lat;
      this.form.lon = suggestion.lon;
      this.form.showSuggestions = false;
    },

    /* FUNZIONE CHE VIENE RICHIMATA AL @CLICK PER RESETTTARE */
    resetFilter() {
      this.form.rooms = 1,
        this.form.beds = 1,
        this.form.lat = null,
        this.form.lon = null,
        this.form.searchTerm = '',
        this.form.selectedServices = [],
        this.showSuggestions = false,
        this.suggestions = [],
        this.radius = 5000,
        this.baseUri = 'https://api.tomtom.com/search/2/geocode/',
        this.submitSearch();
    },


    /* FUZNIONE PER PASSARE COME EMITS I VALORI DEL FORM */
    submitSearch() {
      this.$emit('submit-search', this.form);
    },

    /* FUZNIONE CHE VIENE RICHIAMATA AL @CLICK QUANDO L'UTENTE SCEGLIE IL RAGGIO */
    selectRadius(radius) {
      this.form.radius = radius;
    }
  },
  computed: {
    radiusInKm() {
      return this.form.radius / 1000;
    }
  },


  props: {
    services: Array
  }

}

</script>


<template>
  <!-- FORM -->
  <div class="row justify-content-between gap-3 row-form">

    <form @submit.prevent="submitSearch" class="col">
      <div class="row justify-content-center px-0 box-form">
        <div class="col p-0">
          <!-- INDIRIZZO -->
          <div class="input-container">
            <input type="text" v-model.trim="form.searchTerm" @input="searchPlace" placeholder="Cerca un indirizzo"
              class="form-control">
            <i class="fa-solid fa-location-dot icon text-black"></i>
            <ul v-if="form.showSuggestions" class="suggestions w-75">
              <li v-for="suggestion in form.suggestions" :key="suggestion.lat + suggestion.lon"
                @click="selectSuggestion(suggestion)">
                {{ suggestion.address }}
              </li>
              <li v-if="form.showSuggestions && form.suggestions.length === 0" class="pe-none">
                <i class="fas fa-spinner fa-pulse p-3"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-2 d-flex justify-content-end p-0">
          <!-- BOTTONE CERCA -->
          <button class="btn btn text-white bg-hover" type="submit"><i
              class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div class="col-1" v-if="form.lat && form.lon">
          <button class="btn btn-light border border-light-subtle" type="button" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
            <i class="fa-solid fa-sliders"></i>
          </button>
          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Filtri</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4 d-flex flex-column gap-5">
                  <!-- STANZE E POSTI LETTO -->
                  <div>
                    <h5>Stanze e Posti letto</h5>
                    <ul>
                      <li class="d-flex justify-content-start align-items-center mb-2">
                        <i class="fa-solid fa-door-open mx-2"></i>

                        <input type="number" class="form-control form" id="rooms" name="rooms" min="1"
                          v-model="form.rooms">
                      </li>
                      <li class="d-flex justify-content-start align-items-center">
                        <i class="fa-solid fa-bed mx-2"></i>

                        <input type="number" class="form-control form" id="beds" name="beds" min="1"
                          v-model="form.beds">
                      </li>
                    </ul>
                  </div>

                  <!-- SERVIZI -->
                  <div class="">
                    <h5>Servizi</h5>
                    <ul>
                      <li v-for="service in services" :key="service.id">
                        <div class="form-check d-flex gap-3 my-2">
                          <input class="form-check-input" type="checkbox" name="selectedServices[]" :value="service.id"
                            :id="service.id" v-model="form.selectedServices">
                          <span class="material-symbols-outlined">{{ service.icon }}</span>
                          <label class="form-check-label" :for="service.id">
                            {{ service.label }}
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <!-- RAGGIO -->
                  <div class="rangekm">
                    <h5>Distanza</h5>

                    <div class="d-flex gap-3">
                      <label for="customRange3" class="form-label">Km {{ radiusInKm }} </label>
                      <input type="range" class="form-range" min="5000" max="20000" step="5000" id="customRange3"
                        v-model="form.radius">
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="btn text-white bg-hover" type="submit" data-bs-dismiss="modal"><i
                      class="fa-solid fa-magnifying-glass"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="col-2 box-button" v-if="form.lat && form.lon">

      <!-- BOTTONE RESET -->
      <button class="btn btn-secondary" type="reset" @click="resetFilter">Reset</button>
    </div>
  </div>


</template>



<style lang="scss" scoped>
.row-form {
  background-color: #f2f2f2;
  padding: 7px;
  border-radius: 10px;
}

/* CONTENITORE INPUT INDIRIZZO */
.input-container {
  position: relative;

  /* ICONA */
  .icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: rgb(165, 164, 164);
  }

  /* SCRITTA INPUT */
  input {
    padding-left: 35px;
  }
}

/* EFFETTO HOVER AL BOTTONE */
.bg-hover {
  background-color: #ff5a5f;

  &:hover {
    background-color: #ff999c;
  }
}

.form-check-input:checked {
  background-color: #ff5a5f;
  border-color: #ff5a5f;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

input[type="range"]::-webkit-slider-thumb {
  background-color: #ff5a5f;
  /* Colore personalizzato */
}



.form-range {
  width: 85%;
}

/* INDIRIZZI SUGGERITI */
.suggestions {
  background-color: whitesmoke;
  list-style: none;
  margin: 1px;
  padding: 10px;
  position: absolute;
  border-radius: 2px;
  z-index: 1;

  li {
    cursor: pointer;
    padding: 5px;

    &:hover {
      background-color: white;
    }
  }
}

// .box-form {
//   position: relative;
// }

// .box-button {
//   position: absolute;

//   right: 25%;
// }</style>