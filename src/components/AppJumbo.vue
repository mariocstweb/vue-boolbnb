<script>
import SearchForm from './SearchForm.vue'
export default {
    name: 'Appjumbo',
    data: () => ({}),
    components: { SearchForm },
    emits: ['search-apartments', 'range-menu'],
};
</script>

<template>
    <div class="jumbotron">
        <div class="container-jumbo h-100 d-flex justify-content-center align-items-center flex-column">

            <h2 class="text mb-3">Trova l'appartamento dei tuoi sogni con</h2>
            <div>
                <img src="../img/logo-jumbo.png" alt="logo" class="logo">
            </div>
        </div>
    </div>
    <SearchForm @submit-search="$emit('search-apartments', $event)" />




</template>

<style lang="scss" scoped>
.container-jumbo {
    margin: 0 auto;
    max-width: 650px;
    text-align: center;
}

.text {
    font-size: 45px;
    font-weight: 600;
}

.jumbotron {

    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 80%), url(../img/jumbotron.jpg);
    background-size: cover;
    background-position: center;
    height: 500px;
    color: white;
}



.title-jumbo {
    font-size: 100px;
}
</style>