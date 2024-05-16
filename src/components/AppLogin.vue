<script>
import { store } from '../data/store.js';
import axios from 'axios';
const user_endpoint = 'http://localhost:8000/api/user';

export default {

    data() {
        return {
            user: '',
            store,
        };
    },

    methods: {
        // Get user details
        fetchUser() {
            store.isLoading = true;

            axios.get(user_endpoint)
                .then(res => { this.user = res.data; store.isLoading = false })
                .catch(err => { console.error(err.response.data) })
                .then(() => { store.isLoading = false });
        },

        // Get First letter of a string
        getFirstLetter: (word) => (word.substring(0, 1).toUpperCase()),
    },

    created() {
        this.fetchUser();
    }

}
</script>


<template>
    <div class="login-menu dropdown ">

        <!-- Generic Menu Togle -->
        <button class="dropdown-toggle btn color-main shadow d-none d-md-flex align-items-center"
            data-bs-toggle="dropdown">
            <i class="fa-solid fa-bars"></i>

            <div v-if="loading" class="user ms-2">
                <div class="spinner-border" role="status" style="width: 15px; height: 15px;">
                </div>
            </div>

            <div v-else-if="user.length && !store.isLoading" class="user ms-2">
                <span id="admin-name">{{ getFirstLetter(user[0]['name']) }}</span>
            </div>

            <div v-else class="user ms-2">
                <i class="fa-solid fa-user"></i>
            </div>

        </button>

        <!-- Logged Menu Toggle -->
        <button class="dropdown-toggle color-main btn shadow d-flex d-md-none align-items-center"
            data-bs-toggle="dropdown">
            <div class="user">
                <div v-if="store.isLoading" class="spinner-border" role="status" style="width: 15px; height: 15px;">
                </div>

                <span v-else-if="user.length && !store.isLoading" id="admin-name">{{
                    getFirstLetter(user[0]['name'])
                }}</span>

                <i v-else class="fa-solid fa-user"></i>
            </div>
        </button>

        <!-- Account Menu -->
        <ul v-if="user.length" class="dropdown-menu">
            <li><a class="dropdown-item" href="http://127.0.0.1:8000/admin/apartments">I miei
                    Boolbnb</a>
            </li>
            <li><a class="dropdown-item " href="http://127.0.0.1:8000/admin">Il mio Profilo</a></li>
            <li><a class="dropdown-item disabled" href="http://127.0.0.1:8000/login">Messaggi</a></li>
            <hr>
            <li><a class="dropdown-item" href="http://127.0.0.1:8000/admin/apartments/create">Apri un
                    Boolbnb</a>
            </li>
            <li><a class="dropdown-item" href="http://127.0.0.1:8000/profile">Account</a></li>
            <hr>
            <li>
                <RouterLink class="dropdown-item" :to="{ name: 'home' }">Torna alla Home</RouterLink>
            </li>
        </ul>

        <!-- Login Menu -->
        <ul v-else class="dropdown-menu">
            <li><a class="dropdown-item" href="http://127.0.0.1:8000/login"><b>Accedi</b></a></li>
            <li><a class="dropdown-item" href="http://127.0.0.1:8000/register">Registrati</a></li>
            <hr>
            <li>
                <RouterLink class="dropdown-item" :to="{ name: 'home' }">Torna alla Home</RouterLink>
            </li>
        </ul>

    </div>
</template>


<style lang="scss" scoped>
.color-main {
    color: #ff5a5f;

    /* BORDO ALL'HOVER */
    &:hover {
        border: 1px solid #ff5a5f;
    }
}

.login-menu {
    display: flex;

    .dropdown-toggle:after {
        display: none;
    }

    .user {
        border-radius: 40px;
        display: flex;
        color: #ff5a5f;
        background-color: transparent;
    }

    ul.dropdown-menu.show {
        list-style-type: none;
    }
}

@media (min-width: 768px) {
    .login-menu {
        padding: 0 6px 0 10px;
        border-radius: 40px;

        .user {
            border-radius: 30px;
        }
    }

}
</style>