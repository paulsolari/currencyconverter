import Vue from 'vue'
import Router from 'vue-router'
import CurrencyConverter from './views/CurrencyConverter.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	linkActiveClass: 'active',
  	routes: [
		{
			path: '/',
			name: 'currency-converter',
			component: CurrencyConverter
		},
		{
			path: '/exchange-rates',
			name: 'exchange-rates',
			component: () => import(/* webpackChunkName: "exchange-rates" */ './views/ExchangeRates.vue')
		}
  	]
})