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


  props: {
    services: Array
  }

}

</script>


<template>
  <!-- FORM -->
  <form @submit.prevent="submitSearch">
    <div class="d-flex justify-content-center align-items-center gap-1">
      <!-- INDIRIZZO -->
      <div class="input-container">
        <input type="text" v-model.trim="form.searchTerm" @input="searchPlace" placeholder="Cerca un indirizzo"
          class="form-control form">
        <i class="fa-solid fa-location-dot icon text-black"></i>
        <ul v-if="form.showSuggestions" class="suggestions w-75">
          <li v-for="suggestion in form.suggestions" :key="suggestion.lat + suggestion.lon"
            @click="selectSuggestion(suggestion)">
            {{ suggestion.address }}
          </li>
        </ul>
      </div>
      <!-- STANZE E POSTI LETTO -->
      <div class="dropdown">
        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-door-open me-3"></i><span class="me-4">{{ form.rooms }}Stanze &#8226;<i
              class="fa-solid fa-bed mx-3"></i>{{ form.beds }} Posti letto</span>
        </button>
        <ul class="dropdown-menu p-3">
          <li>
            <i class="fa-solid fa-door-open mx-3"></i>
            Stanze
            <input type="number" class="form-control form" id="rooms" name="rooms" min="1" v-model="form.rooms">
          </li>
          <li>
            <i class="fa-solid fa-bed mx-3"></i>
            Posti letto
            <input type="number" class="form-control form" id="beds" name="beds" min="1" v-model="form.beds">
          </li>
        </ul>
      </div>
      <!-- SERVIZI -->
      <div class="dropdown">
        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-hand-holding-heart me-3"></i><span class="me-4">Servizi</span>
        </button>
        <ul class="dropdown-menu p-1">
          <li v-for="service in services" :key="service.id">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="selectedServices[]" :value="service.id"
                :id="service.id" v-model="form.selectedServices">
              <label class="form-check-label" :for="service.id">
                {{ service.label }}
              </label>
            </div>
          </li>
        </ul>
      </div>
      <!-- RAGGIO -->
      <div class="dropdown">
        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-ruler-horizontal me-3"></i><span class="me-4">Cerca entro 20 Km</span>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" @click="selectRadius(5000)" v-bind:class="{ 'active': form.radius === 5000 }">5
              km</a></li>
          <li><a class="dropdown-item" @click="selectRadius(10000)"
              v-bind:class="{ 'active': form.radius === 10000 }">10 km</a></li>
          <li><a class="dropdown-item" @click="selectRadius(15000)"
              v-bind:class="{ 'active': form.radius === 15000 }">15 km</a></li>
          <li><a class="dropdown-item" @click="selectRadius(20000)"
              v-bind:class="{ 'active': form.radius === 20000 }">20 km</a></li>
        </ul>
      </div>
      <!-- BOOTONE CERCA -->
      <button class="btn text-white bg-hover" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
  </form>
  <!-- BOTTONE RESET -->
  <button class="btn text-white bg-hover" type="reset" @click="resetFilter">Reset</button>

</template>



<style lang="scss" scoped>
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

/* INDIRIZZI SUGGERITI */
.suggestions {
  background-color: whitesmoke;
  list-style: none;
  margin: 1px;
  padding: 10px;
  position: absolute;
  border-radius: 2px;

  li {
    cursor: pointer;
    padding: 5px;

    &:hover {
      background-color: white;
    }
  }
}
</style>