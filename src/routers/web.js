import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';

import NotFoundPage from '../pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage, name: 'home' },
        { path: '/notfound', component: NotFoundPage, name: 'not-found' },
        { path: '/:pathMatch(.)', redirect: '/notfound' }

    ]
});

export { router };