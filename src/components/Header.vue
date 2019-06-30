<template>
	<header>
		<h1>Currencies</h1>
		<nav>
			<router-link exact :to="{name: 'currency-converter'}">Currency converter</router-link>
			<router-link :to="{name: 'exchange-rates'}">Exchange Rates</router-link>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
header {
	position: relative;
	z-index: 2;
	padding: 10px 20px 20px 20px;
	text-align: center;
	background-color: $grey;

	@include breakpoint($sm) {
		padding-left: 10px;
		padding-right: 10px;
	}
}

h1 {
	margin-bottom: 20px;
	font-weight: 700;
	font-size: $fontSize-h1;
	color: $blue;

	@include breakpoint($sm) {
		font-size: $fontSize-h1 - 8;
	}
}

nav {
	a {
		position: relative;
		margin: 0 20px;
		font-size: $fontSize-medium;

		@include breakpoint($sm) {
			margin: 10px;
			font-size: $fontSize-smaller;
		}

		@include hover {
			&::before {
				content: "";
				position: absolute;
				bottom: -5px;
				left: 0;
				width: 100%;
				height: 1px;
				background-color: currentColor;
			}
		}
	}
}
</style>