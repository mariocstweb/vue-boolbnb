<script>
//Javascript
export default {
    name: 'BasePagination',
    props: {
        links: Array
    },
    emits: ['change-page']
}
</script>

<template>
    <div class="w-100 mt-2 d-flex justify-content-end">
        <nav aria-label="Page navigation example">
            <ul class="pagination">

                <li v-for="link in links" :key="link.label" class="page-item"
                    :class="{ 'active': link.active, 'disabled ': !link.url }">
                    <button :disabled="!link.url" class="page-link" v-html="link.label"
                        @click="$emit('change-page', link.url)"></button>
                </li>

            </ul>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
.active>.page-link {
    background-color: #454c81;
    border-color: #2a2f50;
    color: #fff;

}

button.page-link {
    font-weight: 500;
    color: #000;
}
</style>