export const state = () => ({
    // State
    cart: [],
    cartLength: 0,
    shippingPrice: 0,
    shippingEstimatedDelivery: "",
    browsingHistory: [],
    browsingHistoryLength: 0
})

export const actions = {
    addProductToCart({state, commit}, product) {
        const cartProduct = state.cart.find(prod => prod.id === product._id);

        if(!cartProduct) {
            commit("pushProductToCart", product);
        } else {
            commit("incrementProductQty", cartProduct);
        }

        commit("incrementCartLength");
    },
    addToBrowsingHistory({state, commit}, product)  {
        const productInHistory = state.browsingHistory.find(prod => prod.id === product._id );

        if(!productInHistory) {
            commit("pushProductToHistory", product)            
        } else {
            console.log("product already in history");
        }

    }
}

export const mutations = {
    pushProductToCart(state, product) {
        product.quantity = 1;
        state.cart.push(product);
    },
    pushProductToHistory(state, product) {
        state.browsingHistoryLength += 1;
        console.log(product)
        state.browsingHistory.push(product);
    },
    incrementProductQty(state, product) {
        product.quantity++;
        let indexOfProduct = state.cart.indexOf(product);
        state.cart.splice(indexOfProduct, 1, product);
    },
    incrementCartLength(state) {
        state.cartLength = 0;
        if(state.cart.length > 0) {
            state.cart.map(product => {
                state.cartLength += product.quantity;
            })
        }
    },
    changeQty(state, {product, qty}) {
        const cartProduct = state.cart.find(prod => prod._id === product._id);
        cartProduct.quantity = qty;

        state.cartLength = 0;
        if(state.cart.length > 0) {
            state.cart.map(product => {
                state.cartLength += product.quantity
            })
        }
        let indexOfProduct = state.cart.indexOf(product);
        state.cart.splice(indexOfProduct, 1, cartProduct);       
    },
    /*
        1: Remove product qrt from cartLength
        2: get the index of the product to be deleted
        3: remove the product with splice
    */
    removeProduct(state, product) {
        state.cartLength -= product.quantity;
        let indexOfProduct = state.cart.indexOf(product);
        state.cart.splice(indexOfProduct, 1);
    },
    setShipping(state, {price, estimatedDelivery}) {
        state.shippingPrice = price,
        state.shippingEstimatedDelivery = estimatedDelivery
    },
    clearCart(state) {
        state.cart = [];
        state.cartLength = 0;
        state.shippingPrice = 0;
        state.shippingEstimatedDelivery = "";
    }


}

export const getters = {
    getCartLength(state) {
        return state.cartLength;
    },
    getCartProducts(state) {
        return state.cart;
    },
    getCartTotalPrice(state) {
        let total = 0;
        state.cart.map(product => {
            total += product.price * product.quantity;           
        });
        total = (total).toLocaleString(
            undefined,
            {minimumFractionDigits: 2}
        )
        return total;
    },
    getCartTotalPriceWithShipping(state) {
        let total = 0;
        state.cart.map(product => {
            total += product.quantity * product.price
        });
        total = (total + state.shippingPrice).toLocaleString(
            undefined,
            {minimumFractionDigits: 2}
        )

        return total;
    },
    getEstimatedDelivery(state) {
        return state.shippingEstimatedDelivery;
    },
    getBrowsingHistory(state) {
        return state.browsingHistory
    },
    getHistoryLength(state) {
        return state.browsingHistoryLength
    },
    getTaxOfOrder(state) {
        let total = 0;
        state.cart.map(product => {
            total += product.price * product.quantity;           
        });
        let tax = (total/ 100) * 20;
        tax = tax.toFixed(2)
        return tax
    }
}
