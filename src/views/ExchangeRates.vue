<template>
	<div class="exchange-rates">
		<Dropdown
			:options="exchange"
			:selected="baseCurrency"
			:chooseFavorite="false"
			@select:option="selectCurrency($event, 'baseCurrency')"
		/>

		<table>
			<thead>
				<tr>
					<th>Currency code</th>
					<th>Units per {{baseCurrency}}</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(rate, currency) in exchange"
					:key="currency"
					v-show="currency !== baseCurrency"
				>
					<td>{{currency}}</td>
					<td>{{rate.toFixed(2)}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import Dropdown from '@/components/Dropdown'

export default {
	components: {
		Dropdown
	},

	methods: {
		getCurrencies() {
			this.$store.dispatch('getCurrencies', {
				baseCurrency: this.baseCurrency,
				mutationState: 'exchange'
			})
		},

		selectCurrency(selectedCurrency, mutationState) {
			this.$store.dispatch('selectCurrency', {
				mutationState,
				selectedCurrency
			})

			this.getCurrencies()
		}
	},

	created() {
		this.$store.commit('loading', true)

		this.$store.dispatch('getSelectedCurrencies')

		this.getCurrencies()
	},

	computed: {
		exchange() {
			return this.$store.state.exchange
		},

		baseCurrency() {
			return this.$store.state.baseCurrency
		}
	}
}
</script>

<style lang="scss" scoped>
.exchange-rates {
	.dropdown-wrapper {
		position: relative;
		max-width: 320px;
		margin: 0 auto 40px;
	}

	table {
		width: 100%;
		max-width: 320px;
		margin: 0 auto;
		text-align: left;
		border: 1px solid $grey;
		border-collapse: separate;
	}

	th,
	td {
		padding: 5px 10px;

		&:last-child {
			text-align: right;
			border-left: 1px solid $grey;
		}
	}

	th {
		color: $blue;
		background-color: $grey;
	}

	td {
		border-bottom: 1px solid $grey;
	}

	tr:last-child {
		td {
			border-bottom: none;
		}
	}
}
</style>