<script>
export default {
    name: 'NotFoundPage'
};
</script>

<template>
    <div class="vh-100 d-flex flex-column align-items-center justify-content-center">
        <h3 class="text-center">404 | Page not Found</h3>
        <button class="btn btn-secondary mt-3" @click="$router.back()">Torna Indietro</button>
    </div>
</template>

<style scoped></style>