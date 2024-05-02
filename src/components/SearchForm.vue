<script>
import axios from 'axios';

export default {
  name: 'SearchForm',
  data() {
    return {
      form: {
        address: '',
        rooms: 1,
        beds: 1,
        selectedServices: []
      }
    };
  },
  methods: {
    submitSearch() {
      // Costruisci l'endpoint per la ricerca
      let endpoint = 'http://localhost:8000/api/apartments/?';

      // Aggiungi i parametri di ricerca per rooms e beds
      endpoint += `rooms=${this.form.rooms}&beds=${this.form.beds}`;

      // Se sono selezionati dei servizi, aggiungili come parametri
      if (this.form.selectedServices.length > 0) {
        const serviceParams = this.form.selectedServices.map(serviceId => `services=${serviceId}`).join('&');
        endpoint += `&${serviceParams}`;
      }

      // Esegui la chiamata Axios al backend
      axios.get(endpoint)
        .then(response => {
          const { apartments } = response.data;
          // Aggiorna la lista degli appartamenti nel componente padre
          this.$emit('submit-search', apartments);
        })
        .catch(error => {
          console.error(error);
          // Gestisci eventuali errori
        });
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
            <input type="number" class="form-control form" id="rooms" name="rooms" placeholder="Min 1"
              v-model="form.rooms">
          </li>
          <li>
            <i class="fa-solid fa-bed mx-3"></i>
            Posti letto
            <input type="number" class="form-control form" id="beds" name="beds" placeholder="Min 1"
              v-model="form.beds">
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
</style>