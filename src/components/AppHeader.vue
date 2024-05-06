<script>
export default {
    name: 'AppHeader',

    data() {
        return {
            scrollposition: null
        }
    },

    methods: {

        /* FUINZIONE PER CONTROLLORARE QUANTO SCROLL VERTICALE E' STATO FATTO */
        updatescroll() {
            this.scrollposition = window.scrollY
        }
    },

    /* UTILIZZO IL METODO MOUNT PER AGGIUNGERE UN EVENTO ALLA SCROLL DELLA FINESTRA DEL BROWSER */
    mounted() {
        window.addEventListener('scroll', this.updatescroll);
    }
}
</script>

<template>

    <!-- HEADER -->
    <nav class="navbar" id="navbar" :class="{ change_color: scrollposition > 100 }">
        <div class=" container d-flex justify-content-start align-items-center">
            <!-- LOGO CON ROTTA ALLA HOMEPAGE -->
            <RouterLink class="navbar-brand color-base p-0 me-4" :to="{ name: 'home' }">
                <img src="../img/logo.png" alt="BoolBnB" width="40px">
                BoolBnB
            </RouterLink>
            <!-- ROTTA ALLA HOMEPAGE -->
            <RouterLink class="navbar-brand mb-1 p-0" :to="{ name: 'home' }">
                <span class="color-main h5">Home</span>
            </RouterLink>
        </div>
    </nav>

</template>

<style scoped lang="scss">

/* HEADER */
#navbar {
    width: 100%;
    max-height: 100px;
    padding: 20px 0;
    position: fixed;
    z-index: 2;
    top: 0;
    right: 0;
    left: 0;
    background-color: transparent;

    /* COLORE ALLA CLASSE DINAMICA DOPO LO SCROLL */
    &.change_color {
        background-color: white;
        transition: 0.5s linear;
    }

    /* COLORE BASE */
    .color-base{
        color: #ff5a5f;
    }

    /* COLORE BASE */
    .color-main {
        color: #ff5a5f;

        /* BORDO ALL'HOVER */
        &:hover {
            border-bottom: 1px solid #ff5a5f;
        }
    }

}
</style>