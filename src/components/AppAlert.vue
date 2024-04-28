<script>
export default {
    name: 'AppAlert',
    props: { show: Boolean },
    emits: ['close', 'retry']
};
</script>

<template>
    <div v-if="show" class="alert alert-danger alert-dismissible fade show" role="alert">
        Si è verificato un errore. <strong class="text-decoration-underline" role="button"
            @click="$emit('retry')">Riprova</strong>
        <button type="button" class="btn-close" @click="$emit('close')"></button>
    </div>

</template>

<style scoped></style>