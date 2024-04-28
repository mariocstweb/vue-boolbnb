<script>
export default {
    name: 'AppFooter'
};
</script>

<template>
    <footer id="footer">
        <section class="footer-body container">
            <div class="row pt-3">
                <div class="col-6">
                    <h4>Collaboratori</h4>
                    <ul class="list-social">
                        <li>
                            <address>Luca Bellan</address>
                        </li>
                        <li>
                            <address>Fernando Verderame</address>
                        </li>
                        <li>
                            <address>Mario Costa</address>
                        </li>
                        <li>
                            <address>Marco Fonti</address>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </footer>
</template>

<style lang="scss" scoped>
#footer {
    color: black;
    margin-top: 20px;
}

.list-social {
    list-style-type: none;
}
</style>