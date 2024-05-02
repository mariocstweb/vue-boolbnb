<script>
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
  methods: {
    searchPlace() {
      this.form.showSuggestions = true;
      clearTimeout(this.form.timeoutId);
      this.form.timeoutId = setTimeout(() => {
        this.fetchApi(this.form.searchTerm);
      }, 400);
    },
    fetchApi(query) {
      if (!query) {
        this.form.suggestions = [];
        this.form.showSuggestions = false;
        return;
      }
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
    selectSuggestion(suggestion) {
      this.form.searchTerm = suggestion.address;
      this.form.lat = suggestion.lat;
      this.form.lon = suggestion.lon;
      this.form.showSuggestions = false;
    },
    resetFilter() {
      this.form.rooms = 1,
        this.form.beds = 1,
        this.form.lat = null,
        this.form.lon = null,
        this.form.searchTerm = '',
        this.form.selectedServices = [],
        this.submitSearch();
    },
    submitSearch() {
      // Emetti un evento 'submit-search' con i dati del form
      this.$emit('submit-search', this.form);
    }
  },
  props: {
    services: Array
  }
}
</script>


<template>

  <form @submit.prevent="submitSearch">
    <div class="d-flex justify-content-center align-items-center gap-1">
      <div class="input-container">
        <input type="text" v-model.trim="form.searchTerm" @input="searchPlace" placeholder="Cerca un indirizzo"
          class="form-control form">
        <i class="fa-solid fa-location-dot icon text-black"></i>
        <ul v-if="form.showSuggestions" class="suggestions">
          <li v-for="suggestion in form.suggestions" :key="suggestion.lat + suggestion.lon"
            @click="selectSuggestion(suggestion)">
            {{ suggestion.address }}
          </li>
        </ul>
      </div>
      <div class="dropdown">
        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-door-open me-3"></i><span class="me-4">{{ form.rooms }} Stanze &#8226; {{ form.beds }}
            Posti
            letto</span>
        </button>
        <ul class="dropdown-menu">
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
      <div class="dropdown">
        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-hand-holding-heart me-3"></i><span class="me-4">Servizi</span>
        </button>
        <ul class="dropdown-menu">
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
      <div class="dropdown">
        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-ruler-horizontal me-3"></i><span class="me-4">Cerca entro 20 Km</span>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
      <button class="btn text-white bg-hover" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
  </form>

  <button class="btn text-white bg-hover" type="reset" @click="resetFilter">Reset</button>

</template>



<style lang="scss" scoped>
.input-container {
  position: relative;

  .icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: rgb(165, 164, 164);
  }

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

.suggestions {
  background-color: whitesmoke;
  list-style: none;
  margin: 0;
  padding: 10px;
  position: absolute;

  li {
    cursor: pointer;
    padding: 5px;

    &:hover {
      background-color: white;
    }
  }
}
</style>