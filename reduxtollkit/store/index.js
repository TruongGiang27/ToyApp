import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../ProductSlice'
import userReducer from '../UserSlice';
import OrderSlice from '../OrderSlice';
import CartSlice from '../CartSlice';
import categoryReducer from '../CatagorySlice';
const store = configureStore({

    reducer: {
        products: productReducer,
        user: userReducer,
        order: OrderSlice,
        cart: CartSlice,
        categories: categoryReducer

    },
});

export default store;

