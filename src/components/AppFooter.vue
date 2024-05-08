<script>
import { store } from '../data/store';

export default {
    name: 'AppFooter',
    data: () => ({
        store,
    }),

};
</script>

<template>
    <div v-if="store.isLoading"></div>
    <!-- FOOTER -->
    <footer v-else id="footer">
        <hr>
        <section class="footer-body container">
            <div class="row align-items-center">
                <div class="col col-md-9">
                    <ul class="list-social flex-column flex-lg-row align-items-lg-center align-items-start">
                        <li>
                            <address><strong>© 2024 Airbnb, Inc.</strong></address>
                        </li>
                        <li>
                            <address><strong>Privacy</strong></address>
                        </li>
                        <li>
                            <address><strong>Termini</strong></address>

                        </li>
                        <li>
                            <address><strong>Mappa del sito</strong></address>
                        </li>
                        <li>
                            <address><strong>Dettagli dell'azienda</strong></address>
                        </li>
                    </ul>
                </div>
                <div class="col col-md-3 justify-content-end d-flex">
                    <ul>
                        <li><i class="fa-solid fa-globe"></i> Italiano (IT)</li>
                    </ul>

                </div>
            </div>
        </section>
    </footer>
</template>

<style lang="scss" scoped>
/* FOOTER */
#footer {
    height: 150px;

    ul {
        list-style-type: none;
    }
}

/* LISTA COLLABOLATORI */
.list-social {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    margin-bottom: 0;
}
</style>