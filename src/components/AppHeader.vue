<script>
import AppLogin from './AppLogin.vue'
export default {
    name: 'AppHeader',
    components: { AppLogin },

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
        <div class=" container d-flex justify-content-between align-items-center">
            <!-- LOGO CON ROTTA ALLA HOMEPAGE -->

            <div>
                <RouterLink class="navbar-brand color-base p-0 me-4" :to="{ name: 'home' }">
                    <img src="../img/logo.png" alt="BoolBnB" width="40px">
                    BoolBnB
                </RouterLink>
                <!-- ROTTA ALLA HOMEPAGE -->
                <RouterLink class="navbar-brand mb-1 p-0" :to="{ name: 'home' }">
                    <span class="color-main h5">Home</span>
                </RouterLink>

                <a href="http://127.0.0.1:8000/" class="color-main me-3 h5">Pannello di controllo</a>


                <a href="http://127.0.0.1:8000/admin/apartments" class="color-main h5">Appartamenti</a>

            </div>
            <AppLogin />
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
    transition: 0.5s linear;

    /* COLORE ALLA CLASSE DINAMICA DOPO LO SCROLL */
    &.change_color {
        background-color: white;
        transition: 0.5s linear;
    }

    a {
        text-decoration: none;
    }

    /* COLORE BASE */
    .color-base {
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