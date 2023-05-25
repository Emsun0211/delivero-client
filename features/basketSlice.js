import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
};

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			state.items = [...state.items, action.payload];
		},
		removeFromBasket: (state, action) => {
			const index = state.items.findIndex(
				(item) => item.id === action.payload.id
			);
			const newBasket = [...state.items];
			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				`Cant remove product ${action.payload.id} as it is not in your basket`;
			}
			state.items = newBasket;
		},
		// emptyBasket: (state, action) => {
		// 	state.items = [];
		// },
	},
});

// Action creators are generated for each case reducer function/for the dispatch
export const { addToBasket, removeFromBasket, emptyBasket } =
	basketSlice.actions;

export const selectBasketItemWithId = (state, id) =>
	state.basket.items.filter((item) => item.id === id);

export const selectBasketItem = (state) => state.basket.items;

export const selectBasketTotal = (state) =>
	state.basket.items.reduce((total, item) => (total += item.price), 0);

// This works for the store
export default basketSlice.reducer;
