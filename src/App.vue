<script>
import { RouterView } from 'vue-router';
import { store } from './data/store'
import AppHeader from "./components/AppHeader.vue";
import AppJumbo from "./components/AppJumbo.vue";
import AppLoader from './components/AppLoader.vue';
import AppFooter from "./components/AppFooter.vue";
export default {
  name: 'BoolBnB',
  components: { AppHeader, AppJumbo, AppFooter },
  data: () => ({
    store
  }),
};
</script>

<template>
  <AppHeader />
  <!-- <AppJumbo /> -->
  <main>
    <AppLoader v-if="store.isLoading" />
    <RouterView />
  </main>

  <AppFooter />


</template>

<style>
body {
  font-family: 'Manrope Variable', sans-serif;
}
</style>