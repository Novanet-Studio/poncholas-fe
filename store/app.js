import data from "~/static/data/account-links.json";
import { baseUrl } from "~/repositories/Repository";
import Repository, { serializeQuery } from "~/repositories/Repository.js";

export const state = () => ({
	appDrawer: false,
	currentDrawerContent: null,
	currency: "$",
	links: data.data,
	fabrics: [],
	sizes: [],
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
	setFabrics(state, payload) {
		state.fabrics = payload;
	},
	setSizes(state, payload) {
		state.sizes = payload;
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
					var payload = response.data.data.map((item) => {
						return {
							text: item.attributes.name,
							id: item.id,
						};
					});
					commit("setFabrics", payload);
					// const cookieParams = {
					// 	data: response.data.data,
					// };
					// this.$cookies.set("fabrics", cookieParams, {
					// 	path: "/",
					// 	maxAge: 60 * 60 * 24 * 7,
					// });
				}
			})
			.catch((error) => ({ error: JSON.stringify(error) }));
	},
	async getSizes({ commit, state }, payload) {
		const reponse = await Repository.get(`${baseUrl}/sizes`)
			.then((response) => {
				if (response.data.data.length > 0) {
					var payload = response.data.data.map((item) => {
						return {
							text: item.attributes.talla,
							id: item.id,
						};
					});
					commit("setSizes", payload);

					// const cookieParams = {
					// 	data: response.data.data,
					// };
					// this.$cookies.set("sizes", cookieParams, {
					// 	path: "/",
					// 	maxAge: 60 * 60 * 24 * 7,
					// });
				}
			})
			.catch((error) => ({ error: JSON.stringify(error) }));
	},
};
