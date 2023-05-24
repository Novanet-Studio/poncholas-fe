import { defineStore } from 'pinia';
import links from '~/data/account-links.json';
type Currency = '$' | '€' | 'Bs';

interface GlobalStore {
  appDrawer: boolean;
  currentDrawerContent: any;
  currency: Currency;
  fabrics: FabricsMapped[];
  sizes: SizesMapped[];
}

const initialState: GlobalStore = {
  appDrawer: false,
  currentDrawerContent: null,
  currency: '$',
  fabrics: [],
  sizes: [],
};

export const useGlobal = defineStore('global', {
  state: (): GlobalStore => ({
    ...initialState,
  }),
  getters: {
    getLinks() {
      return links.data;
    },
  },
  actions: {
    async nuxtServerInit() {
      // const cartItems = this.$cookies.get('cart', { parseJSON: true });
      // const wishlistItems = this.$cookies.get('wishlist', {
      //   parseJSON: true,
      // });
      // const compareItems = this.$cookies.get('compare', { parseJSON: true });
      // const auth = this.$cookies.get('auth', { parseJSON: true });
      // const currency = this.$cookies.get('currency', { parseJSON: true });
      // if (cartItems && cartItems.cartItems.length > 0) {
      //   commit('cart/initCart', {
      //     cartItems: cartItems.cartItems,
      //     total: cartItems.total,
      //     amount: cartItems.amount,
      //   });
      //   let query = [];
      //   cartItems.cartItems.forEach((item) => {
      //     query.push(item.id);
      //   });
      //   await dispatch('product/getCartProducts', query);
      // }
      // if (wishlistItems) {
      //   commit('wishlist/initWishlist', {
      //     items: wishlistItems.items,
      //     total: wishlistItems.total,
      //   });
      // }
      // if (compareItems) {
      //   commit('compare/initCompare', {
      //     items: compareItems.items,
      //     total: compareItems.total,
      //   });
      // }
      // if (auth) {
      //   commit('auth/setIsLoggedIn', Boolean(auth.isLoggedIn));
      // }
      // if (currency) {
      //   commit('app/setCurrency', currency.data);
      // }
    },
    changeCurrency(currency: Currency) {
      this.currency = currency;
    },

    async getSizes() {
      const graphql = useStrapiGraphQL();
      const response = await graphql<SizesRequest>(`
        query Sizes {
          sizes {
            data {
              id
              attributes {
                talla
              }
            }
          }
        }
      `);

      this.sizes = mapperData(response.data.sizes.data);
    },

    async getFabrics() {
      const graphql = useStrapiGraphQL();
      const response = await graphql<FabricsRequest>(`
        query Fabrics {
          fabrics {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      `);

      this.fabrics = mapperData(response.data.fabrics.data);
    },
  },
});
