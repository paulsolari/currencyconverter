module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/currencyconverter/' : '/',

	css: {
		loaderOptions: {
			sass: {
				data: `@import "@/assets/styles/main.scss";`
			}
		}
	},

	chainWebpack: (config) => {
		config.module
		.rule('svg-sprite')
		.use('svgo-loader')
		.loader('svgo-loader')
	}
}