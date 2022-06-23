import {createSlice} from "@reduxjs/toolkit";

const whislistSlice = createSlice({
    name: "whislist",
    initialState: {
        username: '',
        products: [],
        quantity: 0,
    },
    reducers: {
        addWhislistProduct: (state, action) => {

            const isExist = state.products.find((product) => product._id === action.payload._id)

            if (!isExist) {
                state.quantity += 1;
                console.log(action.payload);
                state.products.push(action.payload);
            }
        },
        removeWhislistProduct: (state, action) => {
            state.products = state.products.filter((x) => x._id !== action.payload._id)
            state.quantity -= 1;
        },
        cleanWhislist: (state) => {
            state.products = [];
            state.quantity = 0;
        },
        createWhislistStart: () => {
        },
        createWhislistSuccess: () => {
        },
        createWhislistFailure: () => {
        },
        iniciateLista: (state, action) => {
            state.products = action.payload.products;
            state.quantity = action.payload.products.length;
            state.username = action.payload.user.username;
        }
    },
});

export const {addWhislistProduct, removeWhislistProduct, cleanWhislist, createWhislistFailure, createWhislistSuccess, createWhislistStart, iniciateLista} = whislistSlice.actions;
export default whislistSlice.reducer;
