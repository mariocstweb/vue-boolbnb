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
    <div v-if="store.isLoading" ></div>
    <!-- FOOTER -->
    <footer v-else id="footer">
        <section class="footer-body container">
            <div class="row pt-3">
                <div class="col-6">
                    <h2 class="text-white">Collaboratori</h2>
                    <ul class="list-social mt-3">
                        <li>
                            <i class="fa-regular fa-hand-point-right"></i>
                        </li>
                        <li>
                            <address><strong>Luca Bellan</strong></address>
                        </li>
                        <li>
                            <address><strong>Fernando Verderame</strong></address>
                            
                        </li>
                        <li>
                            <address><strong>Mario Costa</strong></address>
                        </li>
                        <li>
                            <address><strong>Marco Fonti</strong></address>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </footer>
</template>

<style lang="scss" scoped>

/* FOOTER */
#footer {
    color: black;
    margin-top: 20px;
    background-color: #ff5a5f;
}

/* LISTA COLLABOLATORI */
.list-social {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
}
</style>