<script>
export default {
    name: 'Appjumbo'
};
</script>

<template>

    <div class="jumbotron">
        <div class="container h-100 d-flex justify-content-center align-items-center flex-column">

            <h2 class="text mb-3">Trova l'appartamento dei tuoi sogni con</h2>
            <div>
                <img src="../img/logo-jumbo.png" alt="logo" class="logo">

            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
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