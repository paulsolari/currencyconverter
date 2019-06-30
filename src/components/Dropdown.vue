<template>
	<div class="dropdown-wrapper">
		<div class="dropdown" :class="{active: isOpened}">
			<button
				class="current-option"
				:class="{active: isOpened}"
				@click="toggleDropdown"
				ref="currentOption"
			>
				{{selected}}
				<Icon :name="flagIcon[selected]"/>
				<Icon name="chevron" size="14px"/>
			</button>

			<div class="dropdown-list">
				<ul class="options">
					<li
						v-for="(rate, currency) in options"
						:key="currency"
						class="option"
						:class="{
							current: currency === selected,
							favorite: currency === favorites[currency]
						}"
					>
						<div class="option-inner" @click="selectOption">
							{{currency}}
							<Icon :name="flagIcon[currency]"/>
						</div>
						<Icon
							:name="(currency == favorites[currency]) ? 'star-1' : 'star-2'"
							@click:icon="toggleFavorite($event, currency)"
							v-if="chooseFavorite"
						/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
	components: {
		Icon
	},

	props: {
		options: {required: true},
		selected: {required: true},
		chooseFavorite: {default: true}
	},

	data() {
		return {
			isOpened: false,
			flagIcon:  {
				CAD: 'canada',
				HKD: 'hong-kong',
				ISK: 'iceland',
				PHP: 'philippines',
				DKK: 'denmark',
				HUF: 'hungary',
				CZK: 'czech-republic',
				AUD: 'australia',
				RON: 'romania',
				SEK: 'sweden',
				IDR: 'indonesia',
				INR: 'india',
				BRL: 'brazil',
				RUB: 'russia',
				HRK: 'croatia',
				JPY: 'japan',
				THB: 'thailand',
				CHF: 'switzerland',
				SGD: 'singapore',
				PLN: 'poland',
				BGN: 'bulgaria',
				TRY: 'turkey',
				CNY: 'china',
				NOK: 'norway',
				NZD: 'new-zealand',
				ZAR: 'south-africa',
				USD: 'united-states-of-america',
				MXN: 'mexico',
				ILS: 'israel',
				GBP: 'united-kingdom',
				KRW: 'south-korea',
				MYR: 'malaysia',
				EUR: 'european-union'
			}
		}
	},

	methods: {
		toggleDropdown() {
			this.isOpened = !this.isOpened
		},

		selectOption(event) {
			this.$emit("select:option", event.currentTarget.innerText)
		},

		toggleFavorite(event, currency) {
			this.$store.commit('toggleFavorite', currency)
		}
	},

	created() {
		this.$store.dispatch('getFavorites')
	},

	mounted() {
		document.addEventListener("click", (event) => {
			if (event.target.closest('.current-option') !== this.$refs.currentOption
			&& !event.target.closest('.icon-star-1') && !event.target.closest('.icon-star-2')) {
				this.isOpened = false
			}
		})
	},

	computed: {
		favorites() {
			return this.$store.state.favorites
		}
	}
}
</script>

<style lang="scss" scoped>
.current-option {
	position: relative;
	padding: 10px;
	width: 100%;
	height: 50px;
	font-weight: 700;
	font: 700 #{$fontSize-small}/1.2 $font-primary;
	letter-spacing: inherit;
	text-align: left;
	color: $blue;
	background-color: $white;
	border: 1px solid $blue;

	@include hover {
		color: $white;
		background-color: $blue;
	}

	&.active {
		.icon-chevron {
			transform: rotate(-90deg);
		}
	}

	.icon-chevron {
		left: auto;
		right: 10px;
		transform: rotate(90deg);
	}
}

.current-option,
.option-inner {
	padding: 10px 10px 10px 50px;
}

.icon {
	position: absolute;
	top: 50%;
	left: 10px;
	margin-top: -0.5em;
}

.dropdown-list {
	position: absolute;
	top: calc(100% + 20px);
	left: 0;
	z-index: 10;
	display: none;
	width: 100%;
	overflow: hidden;
	font-size: $fontSize-small;
	background: $white;
	border: 1px solid $blue;
	@include shadow;

	.dropdown.active & {
		display: block;
	}
}

.options {
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	max-height: 332px;
	margin: -1px 0;

	li {
		position: relative;
		order: 1;
		font-weight: 700;
		color: $blue;
		background: $white;
		cursor: pointer;

		.option-inner {
			border-bottom: 1px solid $blue;
		}

		&.current {
			color: $white;
			background-color: $blue;
		}

		&.favorite {
			order: 0;
		}

		@include hover {
			color: $white;
			background-color: $blue;

			.icon-star-2 {
				#app:not(.touch) & {
					display: block;
				}
			}
		}

		.icon-star-2 {
			#app:not(.touch) & {
				display: none;
			}
		}

		.icon-star-1,
		.icon-star-2 {
			left: auto;
			right: 10px;
			fill: $yellow;
		}
	}
}
</style>