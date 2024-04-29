<script>
export default {
  name: 'SearchForm',
  data: () => ({ searchTerm: '', range: '' }),
  emits: ['submit-search', 'range-menu'],
}
</script>


<template>

  <form @submit.prevent="$emit('submit-search', searchTerm)">
    <div class="d-flex justify-content-center align-items-center search-form gap-1">
      <div class="input-container w-50">
        <!-- Input Ricerca -->
        <input type="text" class="form-control form" id="address" name="address" placeholder="Indirizzo..." value=""
          v-model="searchTerm">
        <i class="fa-solid fa-location-dot icon text-black"></i>
      </div>
      <div class="dropdown">
        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-door-open me-3"></i><span class="me-4">Stanze &#8226; Posti
            letto</span>
        </button>
        <ul class="dropdown-menu">
          <li><i class="fa-solid fa-door-open mx-3"></i>Stanze</li>
          <li><i class="fa-solid fa-bed mx-3"></i>Posti letto</li>
        </ul>
      </div>
      <div class="dropdown">
        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-hand-holding-heart me-3"></i><span class="me-4">Servizi</span>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
      <div class="dropdown">
        <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"
          v-model="range" @change="$emit('range-menu', range)">
          <i class="fa-solid fa-ruler-horizontal me-3"></i><span class="me-4">Cerca entro 20 Km</span>
        </button>
        <ul class="dropdown-menu">
          <!-- <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li> -->
          <li><a class="dropdown-item" @click="searchByRange(5)">5 km</a></li>
          <li><a class="dropdown-item" @click="searchByRange(10)">10 km</a></li>
          <li><a class="dropdown-item" @click="searchByRange(15)">15 km</a></li>
          <li><a class="dropdown-item" @click="searchByRange(20)">20 km</a></li>
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

.search-form {
  margin: 0 auto;
  position: relative;
  bottom: 25px;
  background-color: #f2f2f2;
  padding: 5px 5px;
  border-radius: 10px;
  max-width: 900px;

  .btn-light {
    background-color: white;
    color: black;
    border: 1px solid #DEE2E6;

  }
}
</style>