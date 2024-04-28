<script>

import ApartmentCard from './ApartmentCard.vue';
export default {
    name: 'ApartmentList',
    components: { ApartmentCard },
    props: { apartments: Array }
};
</script>

<template>
    <section id="Apartments-list">
        <div v-if="apartments.length" class="d-flex justify-conten-center align-items-center flex-column">
            <ApartmentCard v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" />

        </div>
        <h4 v-else>Non ci sono Vocaboli</h4>
    </section>

</template>

<style scoped></style>