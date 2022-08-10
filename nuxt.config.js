export default {
	target: "static",
	head: {
		titleTemplate: "Farine by Vane - Cachitos",
		title: "Farine by Vane - Cachitos",
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				hid: "description",
				name: "description",
				content: "Farine by Vane - Cachitos",
			},
		],
		link: [
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext",
			},
			{
				rel: "stylesheet",
				href:
					"https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css",
			},
		],
		script: [
			{
				type: "module",
				src: "https://sandbox.web.squarecdn.com/v1/square.js",
			},
			{
				type: "module",
				src:
					"https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js",
			},
		],
	},
	env: {
		//Must match the values found in the corresponding production or sandbox environment
		SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
		SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
		SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
		SENDGRID_SENDER_MAIL: process.env.SENDGRID_SENDER_MAIL,
		SENDGRID_ORDER_RECEIVER_MAIL: process.env.SENDGRID_ORDER_RECEIVER_MAIL,
		PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
	},

	css: [
		"swiper/dist/css/swiper.css",
		"~/static/fonts/Linearicons/Font/demo-files/demo.css",
		"~/static/fonts/fontawesome/css/fontawesome.css",
		"~/static/fonts/fontawesome/css/brands.css",
		"~/static/fonts/fontawesome/css/regular.css",
		"~/static/fonts/fontawesome/css/solid.css",
		"~/static/css/bootstrap.min.css",
		"~/assets/scss/style.scss",
	],

	plugins: [
		{ src: "~plugins/vueliate.js", ssr: false },
		{ src: "~/plugins/swiper-plugin.js", ssr: false },
		{ src: "~/plugins/vue-notification.js", mode: "client" },
		{ src: "~/plugins/axios.js", ssr: false },
		{ src: "~/plugins/lazyLoad.js", ssr: false },
		{ src: "~/plugins/http.js", ssr: false },
		{ src: "~/plugins/firebase.js", ssr: false },
		{ src: "~/plugins/vue-html2pdf", mode: "client" },
		{ src: "~/plugins/lodash.js" },
	],

	buildModules: [
		"@nuxtjs/vuetify",
		"@nuxtjs/style-resources",
		"cookie-universal-nuxt",
		"@nuxtjs/pwa",
		"@nuxt/postcss8",
	],

	styleResources: {
		scss: "./assets/scss/env.scss",
	},

	modules: [
		[
			"@nuxtjs/axios",
			{
				// baseURL: 'http://localhost:4002'
			},
		],
		"nuxt-i18n",
		"@nuxtjs/proxy",
		"@nuxt/http",
		[
			"@nuxtjs/firebase",
			{
				config: {
					apiKey: "AIzaSyBWxVzb6ORAxXHYa_-27zqfm0C8TdM3nPY",
					authDomain: "poncholas-1a51a.firebaseapp.com",
					projectId: "poncholas-1a51a",
					storageBucket: "poncholas-1a51a.appspot.com",
					messagingSenderId: "538839590230",
					appId: "1:538839590230:web:9e1cb9456ee4bff1a4e2f7",
					measurementId: "G-47V1YVMCBY",
				},
				services: {
					functions: true,
				},
				functions: {
					location: "us-central1",
					emulatorPort: 12345,
					emulatorHost: "http://10.10.10.3",
				},
			},
		],
	],

	i18n: {
		locales: [
			{ code: "en", file: "en.json" },
			{ code: "es", file: "es.json" },
			{ code: "fr", file: "fr.json" },
		],
		lazy: true,
		defaultLocale: "en",
		langDir: "lang/locales/",
	},

	router: {
		linkActiveClass: "",
		linkExactActiveClass: "active",
	},

	server: {
		port: 4002,
		host: "localhost",
	},

	serverMiddleware: ["~/api/sendgrid-mail.js"],

	axios: {
		credentials: false,
		proxyheaders: false,
	},
	pwa: {
		meta: {
			title: "Farine by Vane",
			author: "Novanet Studio <info@novanet.studio>",
			description: "Tienda en mano de Farine by Vane",
		},
		manifest: {
			name: "Farine by Vane web app",
			short_name: "Farine app",
			lang: "es",
			background_color: "#feeed7",
		},
	},
};
