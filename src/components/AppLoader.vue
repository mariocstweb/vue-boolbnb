<script>

export default {
    name: 'AppLoader'
};

</script>

<template>
    <!-- loader -->
    <div class="loader-overlay">
        <div class="spinner-border" role="status"></div>
    </div>

</template>

<style lang="scss" scoped>

/* CONTENITORE LOADER */
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(.5, .5, .5, .2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    /* GRANDEZZA E COLORE LOADER */
    .spinner-border {
        width: 150px;
        height: 150px;
        color: #ff5a5f;
    }
}
</style>