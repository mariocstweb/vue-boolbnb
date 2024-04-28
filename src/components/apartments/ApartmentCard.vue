<script>
export default {
    name: 'ApartmentCard',
    props: { apartment: Object, isDetail: Boolean },
    computed: {
        abstract() {
            const abstract = this.apartment.description.slice(0, 150);
            return abstract + '...';
        },
        pubblicationDate() {
            const date = new Date(this.apartment.created_at);

            let day = date.getDate();
            let month = date.getMonth() + 1;
            const year = date.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();

            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month;
            if (hours < 10) hours = '0' + hours;
            if (minutes < 10) minutes = '0' + minutes;


            return `${day}/${month}/${year} alle ${hours}:${minutes}`;
        }
    }
};
</script>

<template>
    <div class="card w-100 d-flex  my-3">
        <div class="card-header fw-semibold border-bottom-0 d-flex align-items-center justify-content-between">
            <h3>
                {{ apartment.title }}
            </h3>
            <RouterLink v-if="!isDetail" class="btn show-button"><i class="fa-solid fa-eye"></i>
            </RouterLink>
        </div>
        <div class="card-body my-3 clearfix">
            <img v-if="apartment.cover" :src="apartment.cover" :alt="apartment.title" class="img-fluid float-start">

            <p>

                {{ isDetail ? apartment.description : abstract }}
            </p>
            <!-- <div>
                <h5>Link</h5>
                <a :href="apartment.link.url"></a>
            </div> -->

            <!-- <div v-if="apartment.tags.length" class="d-flex align-items-center justify-content-end">
                <span v-for="tag in apartment.tags" :key="tag.id" class="me-2 badge rounded-pill"
                    :class="`text-bg-${tag.color}`">{{ tag.label }}</span>
            </div> -->
        </div>
    </div>

</template>

<style lang="scss" scoped>
.card {
    border: 1px solid #258277;
}

.card-header,
.card-footer {
    background-color: #51a59b;

    .show-button {
        background-color: #454c81;
        color: #fff;
    }
}
</style>