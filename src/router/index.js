import Vue from 'vue';
import VueRouter from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'MainLayout',
		redirect: '/weather/dashboard',
		component: MainLayout,
		children: [
			{
				name: 'weather-report',
				path: 'weather/dashboard',
				component: () => import(
					/* webpackChunkName: "tablero-reporte-clima" */
					'@/views/WeatherDashboardPage.vue'
				),
			},
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
