import data from "~/static/data/account-links.json";

export const state = () => ({
	appDrawer: false,
	currentDrawerContent: null,
	currency: "$",
	links: data.data,
});

export const getters = {
	getLinks: (state) => {
		return state.links;
	},
};

export const mutations = {
	setAppDrawer(state, payload) {
		state.appDrawer = payload;
	},

	setCurrentDrawerContent(state, payload) {
		state.currentDrawerContent = payload;
	},

	setCurrency(state, payload) {
		state.currency = payload;
	},
};

export const actions = {
	changeCurrency({ commit, state }, payload) {
		commit("setCurrency", payload);
		const cookieParams = {
			data: state.currency,
		};

		this.$cookies.set("currency", cookieParams, {
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});
	},
	getLinks() {
		return data.data;
	},
	async getFabrics({ commit, state }, payload) {
		const reponse = await Repository.get(`${baseUrl}/fabrics`)
			.then((response) => {
				if (response.data.data.length > 0) {
					this.$cookies.set("fabrics", cookieParams, {
						path: "/",
						maxAge: 60 * 60 * 24 * 7,
					});
				}
			})
			.catch((error) => ({ error: JSON.stringify(error) }));
		return reponse;
	},
	async getSizes({ commit, state }, payload) {
		const reponse = await Repository.get(`${baseUrl}/sizes`)
			.then((response) => {
				if (response.data.data.length > 0) {
					this.$cookies.set("sizes", cookieParams, {
						path: "/",
						maxAge: 60 * 60 * 24 * 7,
					});
				}
			})
			.catch((error) => ({ error: JSON.stringify(error) }));
		return reponse;
	},
};
