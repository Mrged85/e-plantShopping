import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.name === action.payload.name);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity += 1; // Incrementa a quantidade se o item já estiver no carrinho
            } else {
                state.items.push({ ...action.payload, quantity: 1 }); // Adiciona o item ao carrinho com quantidade 1
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload.name); // Remove o item do carrinho
        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const itemIndex = state.items.findIndex(item => item.name === name);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity = quantity; // Atualiza a quantidade do item
            }
        }
    }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export const selectTotalItems = state => state.cart.items.reduce((total, item) => total + item.quantity, 0); // Seleciona o número total de itens no carrinho

export default cartSlice.reducer;
