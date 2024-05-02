<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchTerm: '',
            suggestions: [],
            showSuggestions: false,
            timeoutId: null,
            baseUri: 'https://api.tomtom.com/search/2/geocode/',
            baseParams: {
                key: '53sGOQMX7vlm9luNV3aNYNhTMmaEKsKx',
                limit: 5,
                countrySet: 'IT',
                language: 'it-IT'
            }
        };
    },
    methods: {
        searchPlace() {
            this.showSuggestions = true;
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.fetchApi(this.searchTerm);
            }, 400);
        },
        fetchApi(query) {
            if (!query) {
                this.suggestions = [];
                this.showSuggestions = false;
                return;
            }
            axios.get(`${this.baseUri}${query}.json`, {
                params: this.baseParams
            }).then(res => {
                const { results } = res.data;
                this.suggestions = results.map(result => ({
                    address: result.address.freeformAddress,
                    lat: result.position.lat,
                    lon: result.position.lon
                }));
            }).catch(err => {
                console.error(err);
                this.suggestions = [];
                this.showSuggestions = false;
            });
        },
        selectSuggestion(suggestion) {
            this.searchTerm = suggestion.address;
            this.$emit('select', suggestion);
            this.showSuggestions = false;
        }
    }
};
</script>


<template>
    <div class="input-container">
        <input type="text" v-model.trim="searchTerm" @input="searchPlace" placeholder="Cerca un indirizzo"
            class="form-control form">
        <i class="fa-solid fa-location-dot icon text-black"></i>
        <ul v-if="showSuggestions" class="suggestions">
            <li v-for="suggestion in suggestions" :key="suggestion.lat + suggestion.lon"
                @click="selectSuggestion(suggestion)">
                {{ suggestion.address }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.input-container {
    position: relative;

    .icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: rgb(165, 164, 164);
    }

    input {
        padding-left: 35px;
    }
}

.suggestions {
    background-color: whitesmoke;
    list-style: none;
    margin: 0;
    padding: 10px;
    position: absolute;

    li {
        cursor: pointer;
        padding: 5px;

        &:hover {
            background-color: white;
        }
    }
}
</style>