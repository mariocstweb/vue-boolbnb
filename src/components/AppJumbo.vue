<script>


export default {
    name: 'Appjumbo',

    data: () => ({}),

    props: {
        services: Array
    }
};

</script>

<template>
    <!-- JUMBO -->
    <div class="jumbotron">
        <div class="container-jumbo h-100 d-flex justify-content-center align-items-center flex-column">
            <h2 class="text mb-3">Trova l'appartamento dei tuoi sogni con</h2>
            <div class="box-img">
                <img src="../img/logo-jumbo.png" alt="logo" class="img-fluid">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* CONTENITORE JUMBO */
.container-jumbo {
    margin: 0 auto;
    max-width: 650px;
    text-align: center;
}

/* GRANDEZZA TESTO */
.text {
    font-size: 45px;
    font-weight: 600;
}

/* SFONDO JUMBO */
.jumbotron {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 80%), url(../img/jumbotron.jpg);
    background-size: cover;
    background-position: center;
    height: 500px;
    color: white;
}

@media screen and (max-width: 576px) {
    .text {
        font-size: 32px;
    }

    .box-img {
        height: auto;
        width: 300px;
    }
}
</style>