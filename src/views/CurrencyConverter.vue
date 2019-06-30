<template>
	<div class="currency-converter">
		<div class="currency-form" :class="{loading: rateLoading}">
			<div class="currency-box">
				<Dropdown
					id="firstCurrency"
					:options="currencies"
					:selected="baseCurrency"
					@select:option="selectCurrency($event, 'baseCurrency')"
				/>
				<input
					class="source"
					type="number"
					min="0"
					v-model="amount"
				>
			</div>

			<Icon
				:name="(rateLoading) ? 'refresh' : 'arrow'"
				:class="{loading: rateLoading}"
			/>

			<div class="currency-box">
				<Dropdown
					id="lastCurrency"
					:options="currencies"
					:selected="exchangeCurrency"
					@select:option="selectCurrency($event, 'exchangeCurrency')"
				/>
				<input type="text" readonly class="result" :value="computedRate">
			</div>
		</div>
	</div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import Icon from '@/components/Icon'

export default {
	components: {
		Dropdown,
		Icon
	},

	data() {
		return {
			amount: 1
		}
	},

	methods: {
		getRate() {
			this.$store.dispatch('getRate', {
				baseCurrency: this.baseCurrency,
				exchangeCurrency: this.exchangeCurrency
			})
		},

		selectCurrency(selectedCurrency, mutationState) {
			this.$store.dispatch('selectCurrency', {
				mutationState,
				selectedCurrency
			})

			this.getRate()
		}
	},

	created() {
		this.$store.commit('loading', true)

		this.$store.dispatch('getSelectedCurrencies')

		this.$store.dispatch('getCurrencies', {
			baseCurrency: this.baseCurrency,
			mutationState: 'currencies'
		})

		this.getRate(this.baseCurrency, this.exchangeCurrency)
	},

	computed: {
		currencies() {
			return this.$store.state.currencies
		},

		computedRate() {
			if (this.$store.state.rate) {
				return (this.amount * this.$store.state.rate).toFixed(2)
			}
		},

		rateLoading() {
			return this.$store.state.rateLoading
		},

		baseCurrency() {
			return this.$store.state.baseCurrency
		},

		exchangeCurrency() {
			return this.$store.state.exchangeCurrency
		}
	}
}
</script>

<style lang="scss" scoped>
.currency-form {
	position: relative;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 40px;

	@include breakpoint($md) {
		grid-template-columns: none;
		grid-column-gap: 0;
		grid-row-gap: 40px;
	}
}

.currency-box {
	position: relative;
	display: grid;
	grid-template-columns: 120px 1fr;
}

.source,
.result {
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	width: 100%;
	height: 50px;
	padding: 10px;
	font-weight: 700;
	font-size: $fontSize-big;
	text-align: center;
	border: 1px solid $blue;
	border-left: none;
}

.icon-refresh,
.icon-arrow {
	position: absolute;
	top: 50%;
	left: 50%;
	margin: -0.5em 0 0 -0.5em;

	@include breakpoint($md) {
		left: 60px;
	}

	@keyframes spin {
		from {
			transform: rotate(0)
		}

		to {
			transform: rotate(360deg)
		}
	}

	&.loading {
		animation-name: spin;
		animation-duration: 1s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
}

.icon-arrow {
	@include breakpoint($md) {
		transform: rotate(90deg)
	}
}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  	appearance: none;
}

input[type=number] {
    appearance: textfield;
}
</style>