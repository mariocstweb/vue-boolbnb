<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            scrollposition: null
        }
    },
    methods: {
        // imagePath(image) {
        //     const url = new URL(`../../assets/svg/${image}`, import.meta.url)
        //     return url.href
        // },

        updatescroll() {
            this.scrollposition = window.scrollY
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updatescroll);
    }
}
</script>

<template>
    <nav class="navbar" id="navbar" :class="{ change_color: scrollposition > 50 }">
        <div class=" container d-flex justify-content-start align-items-center">
            <RouterLink class="navbar-brand color-main p-0 me-5" :to="{ name: 'home' }">
                <img src="../img/logo.png" alt="BoolBnB" width="40px">
                BoolBnB
            </RouterLink>
            <RouterLink class="navbar-brand " :to="{ name: 'home' }">
                <span class="color-main">Home</span>
            </RouterLink>

        </div>
    </nav>



</template>

<style scoped lang="scss">
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

    &.change_color {
        background-color: white;
        transition: 0.5s linear;

    }

    .box-img {
        width: 40px;
    }


    .hover-color {
        color: white;

        &:hover {
            color: #ff5a5f;
        }
    }


    .color-main {
        color: #ff5a5f;
    }

    a {
        text-decoration: none;
        color: black;

    }
}
</style>