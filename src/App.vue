<template>
	<div id="app" v-cloak :class="{loading: loading, touch: isTouch}">
		<Header/>
		<main>
			<div class="wrapper" >
				<div class="loader" v-show="loading"><img :src="loader" alt="loader"></div>

				<keep-alive>
					<router-view/>
				</keep-alive>
			</div>
		</main>
	</div>
</template>

<script>
import Header from "@/components/Header"
import loader from "@/assets/images/loader.svg"

export default {
	components: {
		Header
	},

	data() {
		return {
			isTouch: 'ontouchstart' in window,
			loader
		}
	},

	computed: {
		loading() {
			return this.$store.state.loading
		}
	}
}
</script>

<style lang="scss">
body {
	font: 400 #{$fontSize-main}/1.2 $font-primary;
	letter-spacing: 0.03em;
	color: $black;
	overflow-y: scroll;
}

main {
	padding: 80px 20px;

	@include breakpoint($sm) {
		padding: 40px 10px;
	}
}

.wrapper {
	max-width: 900px;
	margin: 0 auto;
	padding: 40px;
	border: 1px solid $blue;

	@include breakpoint($sm) {
		padding: 0;
		border: none;
	}
}

.loader {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: $white;

	img {
		width: 80px;
		height: 80px;
	}
}
</style>