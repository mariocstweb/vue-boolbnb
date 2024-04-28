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
    <div class="col-lg-3 col-md-4 col-sm-12 rounded-3">
        <div class="row h-100 justify-content-center align-items-center flex-column">
            <RouterLink class="navbar-brand " :to="{ name: 'apartment-detail', params: { id: apartment.id } }">

                <div class="col">
                    <img v-if="apartment.cover" :src="apartment.cover" :alt="apartment.title" class="box-img rounded-3">
                </div>
                <div class="col">
                    <h5 class="m-2">{{ apartment.title }}</h5>
                </div>
                <div class="col d-flex justify-content-start align-items-center">
                    <address class="ms-2"><i class="fa-solid fa-location-dot me-2 color-main"></i> {{ apartment.address
                        }}
                    </address>
                </div>
            </RouterLink>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.box-img {
    height: 270px;
    width: 100%;
}

.color-main {
    color: #ff5a5f;
}
</style>