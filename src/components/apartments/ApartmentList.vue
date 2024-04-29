<script>

import ApartmentCard from './ApartmentCard.vue';
export default {
    name: 'ApartmentList',
    components: { ApartmentCard },
    props: { apartments: Array }
};
</script>

<template>
    <section id="Apartments-list ">
        <div v-if="apartments.length" class="row mt-5">


            <ApartmentCard v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" />


        </div>
        <h4 v-else>Non ci sono appartamenti</h4>
    </section>

</template>

<style scoped></style>