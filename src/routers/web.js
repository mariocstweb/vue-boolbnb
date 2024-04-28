import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ApartmentDetailPage from '../pages/ApartmentDetailPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage, name: 'home' },
        { path: '/apartments/:id', component: ApartmentDetailPage, name: 'apartment-detail' },
        { path: '/notfound', component: NotFoundPage, name: 'not-found' },
        { path: '/:pathMatch(.)', redirect: '/notfound' }

    ]
});

export { router };