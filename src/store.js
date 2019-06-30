import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

const API_URL = 'https://cors-anywhere.herokuapp.com/http://api.openrates.io/latest'

function sortCurrencies(currencies) {
	let list = Object.keys(currencies.rates)
	list.push(currencies.base)
	list.sort()

	let sortedCurrencies = list.reduce((currenciesObject, currency) => {
		if (currency === currencies.base) {
			currenciesObject[currency] = 1
		} else {
			currenciesObject[currency] = currencies.rates[currency]
		}

		return currenciesObject
	}, {})

	return sortedCurrencies
}

export default new Vuex.Store({
	state: {
		currencies: {},
		exchange: {},
		favorites: {
			'EUR': 'EUR',
			'USD': 'USD'
		},
		baseCurrency: 'EUR',
		exchangeCurrency: 'USD',
		rate: null,
		loading: false,
		rateLoading: false
	},

	mutations: {
		currencies(state, payload) {
			state.currencies = payload
		},

		exchange(state, payload) {
			state.exchange = payload
		},

		toggleFavorite(state, payload) {
			let savedFavorites = JSON.parse(localStorage['favorites'])

			if (payload in state.favorites) {
				Vue.delete(state.favorites, payload)
				delete savedFavorites[payload]
			}
			else {
				Vue.set(state.favorites, payload, payload)
				savedFavorites[payload] = payload
			}

			localStorage['favorites'] = JSON.stringify(savedFavorites)
		},

		setFavorites(state, payload) {
			state.favorites = payload
		},

		baseCurrency(state, payload) {
			state.baseCurrency = payload
		},

		exchangeCurrency(state, payload) {
			state.exchangeCurrency = payload
		},

		rate(state, payload) {
			state.rate = payload
		},

		loading(state, payload) {
			state.loading = payload
		},

		rateLoading(state, payload) {
			state.rateLoading = payload
		}
	},

	actions: {
		getCurrencies({commit}, {baseCurrency, mutationState, sortData = true}) {
			fetch(`${API_URL}?base=${baseCurrency}`)
			.then((response) => response.json())
			.then((data) => {
				if (sortData) data = sortCurrencies(data)
				commit(mutationState, data)
				commit('loading', false)
			})
			.catch((error) => console.error(error))
		},

		getRate({commit}, {baseCurrency, exchangeCurrency}) {
			if (baseCurrency === exchangeCurrency) {
				commit('rate', 1)
				return
			}

			commit('rateLoading', true)

			fetch(`${API_URL}?base=${baseCurrency}&symbols=${exchangeCurrency}`)
			.then((response) => response.json())
			.then((data) => {
				commit('rate', Object.values(data.rates)[0])
				commit('rateLoading', false)
			})
			.catch((error) => console.error(error))
		},

		getFavorites({commit, state}) {
			if (!localStorage.favorites) {
				localStorage.favorites = JSON.stringify(state.favorites)
			}
			else {
				commit('setFavorites', JSON.parse(localStorage.favorites))
			}
		},

		getSelectedCurrencies({commit, state}) {
			if (!localStorage.baseCurrency) {
				localStorage.baseCurrency = state.baseCurrency
			}
			else {
				commit('baseCurrency', localStorage.baseCurrency)
			}

			if (!localStorage.exchangeCurrency) {
				localStorage.exchangeCurrency = state.exchangeCurrency
			}
			else {
				commit('exchangeCurrency', localStorage.exchangeCurrency)
			}
		},

		selectCurrency({commit}, {mutationState, selectedCurrency}) {
			commit(mutationState, selectedCurrency)
			localStorage[mutationState] = selectedCurrency
		}
	}
})
