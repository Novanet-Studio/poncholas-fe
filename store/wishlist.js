export const state = () => ({
	items: [],
	total: null,
	loading: false,
});

export const mutations = {
	initWishlist(state, payload) {
		console.log("test");
		state.items = payload.items;
		state.total = payload.total;
	},
	setItems(state, payload) {
		if (state.total !== null) {
			const existItem = state.items.find((item) => item.id === payload.id);
			if (!existItem) {
				state.items.push({
					id: payload.id,
					fakeId: payload.fakeId,
					size: payload.size,
					custom: payload.custom,
					fabric: payload.fabric,
					name: payload.name,
					sizeName: payload.sizeName,
					fabricName: payload.fabricName,
					quantity: payload.quantity,
					price: payload.price,
					image: payload.image,
				});
				state.total = state.total + 1;
			} else {
				//verify if is it a custom item
				if (existItem.customItem !== false) {
					state.items.push({
						id: payload.id,
						fakeId: payload.fakeId,
						size: payload.size,
						custom: payload.custom,
						fabric: payload.fabric,
						name: payload.name,
						sizeName: payload.sizeName,
						fabricName: payload.fabricName,
						quantity: payload.quantity,
						price: payload.price,
						image: payload.image,
					});
					state.total = state.total + 1;
				}
			}
		} else {
			state.items.push({
				id: payload.id,
				fakeId: payload.fakeId,
				size: payload.size,
				custom: payload.custom,
				fabric: payload.fabric,
				name: payload.name,
				sizeName: payload.sizeName,
				fabricName: payload.fabricName,
				quantity: payload.quantity,
				price: payload.price,
				image: payload.image,
			});
			state.total = state.total + 1;
		}
	},

	removeItem(state, payload) {
		const index = state.items.findIndex(
			(item) => item.fakeId === payload.fakeId
		);
		state.total = state.total - 1;
		state.items.splice(index, 1);
	},

	updateItem(state, payload) {
		const wishItem = state.items.find((item) => item.fakeId === payload.id);
		if (wishItem) {
			wishItem.fabric = payload.update.fabric;
			wishItem.size = payload.update.size;
			wishItem.quantity = payload.update.quantity;
			wishItem.fabricName = payload.update.fabricName;
			wishItem.sizeName = payload.update.sizeName;
		}
	},
};
export const actions = {
	addItemToWishlist({ commit, state }, payload) {
		commit("setItems", payload);
		const params = {
			items: state.items,
			total: state.total,
		};

		this.$cookies.set("wishlist", params, {
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});
	},

	removeItemFromWishlist({ commit, state }, payload) {
		commit("removeItem", payload);
		const params = {
			items: state.items,
			total: state.total,
		};

		this.$cookies.set("wishlist", params, {
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});
		// return console.log(this.$cookies.get('wishlist'))
	},

	updateItemFromWishlist({ commit, state }, payload) {
		commit("updateItem", payload);
		const params = {
			items: state.items,
			total: state.total,
		};

		this.$cookies.set("wishlist", params, {
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});
	},
};
